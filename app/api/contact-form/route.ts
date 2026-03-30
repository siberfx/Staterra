import { NextRequest, NextResponse } from 'next/server';

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL ?? 'https://studio.staterra.nl';

// Eenvoudige in-memory rate limiting per IP
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuut
const RATE_LIMIT_MAX = 3; // max 3 verzendingen per minuut
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limiting op basis van IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        message:
          'U heeft te veel verzoeken verstuurd. Probeer het over een minuut opnieuw.',
      },
      { status: 429 }
    );
  }

  try {
    const contentType = req.headers.get('content-type') ?? '';

    let cmsBody: BodyInit;
    let cmsContentType: string;

    if (contentType.includes('multipart/form-data')) {
      // Met bijlage: stuur als multipart door naar CMS
      const formData = await req.formData();
      cmsBody = formData;
      cmsContentType = ''; // fetch zet boundary automatisch
    } else {
      // Zonder bijlage: stuur als URL-encoded
      const text = await req.text();
      cmsBody = text;
      cmsContentType = 'application/x-www-form-urlencoded';
    }

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (cmsContentType) headers['Content-Type'] = cmsContentType;

    const cmsRes = await fetch(`${CMS_URL}/api/contact/verstuur`, {
      method: 'POST',
      headers,
      body: cmsBody,
    });

    // CMS geeft soms 200 met error-body, soms 422 bij validatie
    const data = await cmsRes.json().catch(() => null);

    if (!cmsRes.ok) {
      const message =
        data?.message ??
        'Het formulier kon niet worden verstuurd. Controleer uw gegevens en probeer het opnieuw.';
      return NextResponse.json({ success: false, message }, { status: cmsRes.status });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          'Er is een technische fout opgetreden. Probeer het later opnieuw of neem direct contact op via contact@staterra.nl.',
      },
      { status: 500 }
    );
  }
}

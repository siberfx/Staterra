import { useState, useRef, useId } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { mapMenuUrl } from '@/services/cms';
import type { HomepageResponse } from '@/lib/types';

interface CTABlockProps {
  data: HomepageResponse['bottom_cta'];
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function CTABlock({ data }: CTABlockProps) {
  const [state, setState] = useState<FormState>('idle');
  const [email, setEmail] = useState('');
  const emailId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const secondaryHref = data.cta_secondary_url
    ? mapMenuUrl(data.cta_secondary_url)
    : '/aanpak';
  const secondaryLabel = data.cta_secondary_text ?? 'Bekijk onze aanpak';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'submitting') return;

    setState('submitting');

    const body = new URLSearchParams({
      email,
      reden: 'Verkenningsgesprek',
      'avg-optin': 'true',
      bericht: 'Aanvraag via homepage email capture',
      first_name: 'Website',
      last_name: 'Bezoeker',
    });

    try {
      const cmsUrl = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || 'https://studio.staterra.nl');

      const res = await fetch(`${cmsUrl}/api/contact/verstuur`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: body.toString(),
      });

      if (res.ok) {
        setState('success');
        setEmail('');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  function handleRetry() {
    setState('idle');
    // Focus terug op het input-veld
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      aria-labelledby="cta-heading"
      style={{ background: 'var(--gradient-brand)' }}
    >
      {/* Decoratieve cirkels */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10 bg-white"
      />

      <Container variant="text">
        <div className="text-center relative z-10">
          {/* Koptekst */}
          <h2
            id="cta-heading"
            className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
          >
            {data.heading}
          </h2>

          {data.subtext && (
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              {data.subtext}
            </p>
          )}

          {/* ── Success ──────────────────────────────────────── */}
          {state === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="mx-auto max-w-md rounded-[14px] bg-white/10 border border-white/20 backdrop-blur-sm px-8 py-7"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold text-body-sm mb-1">
                Bedankt! We nemen binnen twee werkdagen contact op.
              </p>
              <p className="text-brand-200/80 text-caption">
                Uw aanvraag is ontvangen. U hoeft niets meer te doen.
              </p>
            </div>
          ) : state === 'error' ? (
            /* ── Error ──────────────────────────────────────── */
            <div
              role="alert"
              aria-live="assertive"
              className="mx-auto max-w-md rounded-[14px] bg-white/10 border border-white/20 backdrop-blur-sm px-8 py-7"
            >
              <p className="text-white font-semibold text-body-sm mb-3">
                Er ging iets mis. Probeer het opnieuw of mail naar{' '}
                <a
                  href="mailto:contact@staterra.nl"
                  className="underline hover:no-underline text-brand-300"
                >
                  contact@staterra.nl
                </a>
              </p>
              <button
                onClick={handleRetry}
                className="text-caption font-semibold text-white/80 hover:text-white underline transition-colors duration-[150ms]"
              >
                Opnieuw proberen
              </button>
            </div>
          ) : (
            /* ── Formulier ───────────────────────────────────── */
            <div className="mx-auto max-w-md">
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Verkenningsgesprek aanvragen"
              >
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <label htmlFor={emailId} className="sr-only">
                    Uw e-mailadres
                  </label>
                  <input
                    ref={inputRef}
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Uw e-mailadres"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={state === 'submitting'}
                    className="flex-1 min-w-0 rounded-[10px] border border-white/25 bg-white/20 px-4 py-3 text-body-sm text-white placeholder:text-white/55 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 disabled:opacity-60 transition-colors duration-[150ms]"
                  />
                  <button
                    type="submit"
                    disabled={state === 'submitting' || !email.trim()}
                    className="flex-shrink-0 rounded-[10px] bg-white px-6 py-3 text-body-sm font-semibold text-brand-900 hover:bg-brand-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-[150ms] whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
                  >
                    {state === 'submitting' ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Versturen…
                      </span>
                    ) : (
                      'Plan een verkenningsgesprek'
                    )}
                  </button>
                </div>

              </form>

              {/* Secondary link */}
              <div className="mt-7">
                <Link
                  to={secondaryHref}
                  className="inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-200 hover:text-white transition-colors duration-[150ms] group"
                >
                  {secondaryLabel}
                  <svg
                    className="w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Vertrouwensregel — alleen bij idle/submit */}
          {(state === 'idle' || state === 'submitting') && (
            <p className="mt-8 text-caption text-brand-200/60">
              Geen verkoopdruk. Geen automatische nieuwsbrief.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

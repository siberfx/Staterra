export interface CookieConsent {
  functional: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const COOKIE_NAME = 'cookie_consent';
const MAX_AGE = 365 * 24 * 60 * 60; // 12 maanden

export function getCookieConsent(): CookieConsent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function setCookieConsent(prefs: Pick<CookieConsent, 'analytics' | 'marketing'>): void {
  const consent: CookieConsent = {
    functional: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: new Date().toISOString(),
  };
  const value = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
}

export function removeAnalyticsCookies(): void {
  const cookiesToRemove = document.cookie
    .split('; ')
    .map((c) => c.split('=')[0])
    .filter((name) => name === '_ga' || name === '_gid' || name.startsWith('_ga_'));

  for (const name of cookiesToRemove) {
    document.cookie = `${name}=; path=/; max-age=0`;
    document.cookie = `${name}=; path=/; max-age=0; domain=${location.hostname}`;
    document.cookie = `${name}=; path=/; max-age=0; domain=.${location.hostname}`;
  }
}

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { getCookieConsent, setCookieConsent, removeAnalyticsCookies, type CookieConsent } from './cookieUtils';

interface CookieContextValue {
  consent: CookieConsent | null;
  hasConsented: boolean;
  settingsOpen: boolean;
  updateConsent: (prefs: Pick<CookieConsent, 'analytics' | 'marketing'>) => void;
  showSettings: () => void;
  hideSettings: () => void;
}

const CookieContext = createContext<CookieContextValue | null>(null);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(() => getCookieConsent());
  const [settingsOpen, setSettingsOpen] = useState(false);

  const hasConsented = consent !== null;

  const updateConsent = useCallback((prefs: Pick<CookieConsent, 'analytics' | 'marketing'>) => {
    setCookieConsent(prefs);
    setConsent(getCookieConsent());
    setSettingsOpen(false);

    // Verwijder analytics cookies bij intrekking
    if (!prefs.analytics) {
      removeAnalyticsCookies();
    }
  }, []);

  const showSettings = useCallback(() => setSettingsOpen(true), []);
  const hideSettings = useCallback(() => setSettingsOpen(false), []);

  // Laad analytics conditioneel
  useEffect(() => {
    if (!consent?.analytics) return;
    loadAnalytics();
  }, [consent?.analytics]);

  return (
    <CookieContext.Provider value={{ consent, hasConsented, settingsOpen, updateConsent, showSettings, hideSettings }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent(): CookieContextValue {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error('useCookieConsent must be used within CookieProvider');
  return ctx;
}

// ── Analytics laden ──────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function loadAnalytics() {
  // Gebruik een hardcoded placeholder — vervang met echt GA ID wanneer beschikbaar
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) return;
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookieConsent } from './CookieProvider';

export function CookieBanner() {
  const { hasConsented, updateConsent, showSettings } = useCookieConsent();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Toon banner na hydration als er geen consent is
  useEffect(() => {
    if (!hasConsented) {
      setMounted(true);
      // Kleine delay voor slide-up animatie
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }
  }, [hasConsented]);

  // Verberg na consent
  useEffect(() => {
    if (hasConsented && mounted) {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(timer);
    }
  }, [hasConsented, mounted]);

  if (!mounted) return null;

  return (
    <div
      role="region"
      aria-label="Cookie-melding"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-neutral-200 bg-white"
      style={{
        boxShadow: '0 -4px 24px rgba(22, 62, 116, 0.10)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 400ms ease',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-4 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
          {/* Tekst */}
          <div className="flex-1">
            <h2 className="font-heading text-[18px] font-semibold text-neutral-950 mb-2">
              Staterra gebruikt cookies
            </h2>
            <p className="text-[16px] leading-[1.6] text-neutral-700">
              Wij gebruiken functionele cookies om de website goed te laten werken.
              Daarnaast gebruiken wij analytische cookies om inzicht te krijgen in
              het gebruik van de website — alleen met uw toestemming. Lees meer in
              ons{' '}
              <Link
                to="/cookies"
                className="text-brand-700 hover:text-brand-900 underline underline-offset-2 transition-colors duration-[180ms]"
              >
                cookiebeleid
              </Link>
              .
            </p>
          </div>

          {/* Knoppen */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            {/* Mobiel: Alles accepteren bovenaan */}
            <button
              type="button"
              onClick={() => updateConsent({ analytics: true, marketing: true })}
              className="sm:order-3 rounded-[10px] bg-brand-700 px-5 py-3 text-[16px] font-medium text-white hover:bg-brand-900 transition-all duration-[180ms] whitespace-nowrap"
            >
              Alles accepteren
            </button>
            <button
              type="button"
              onClick={showSettings}
              className="sm:order-2 rounded-[10px] border border-brand-700 bg-white px-5 py-3 text-[16px] font-medium text-brand-700 hover:bg-brand-100 transition-all duration-[180ms] whitespace-nowrap"
            >
              Instellingen
            </button>
            <button
              type="button"
              onClick={() => updateConsent({ analytics: false, marketing: false })}
              className="sm:order-1 rounded-[10px] border border-neutral-300 bg-white px-5 py-3 text-[16px] font-medium text-neutral-800 hover:bg-neutral-50 transition-all duration-[180ms] whitespace-nowrap"
            >
              Alleen noodzakelijk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

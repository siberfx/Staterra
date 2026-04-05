import { useState, useEffect, useRef, useCallback } from 'react';
import { useCookieConsent } from './CookieProvider';

// ── Toggle switch ────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  disabled = false,
  id,
  label,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id: string;
  label: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={[
        'relative inline-flex flex-shrink-0 w-[44px] h-[24px] rounded-full transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2',
        disabled
          ? 'bg-brand-200 opacity-70 cursor-not-allowed'
          : checked
            ? 'bg-brand-700 cursor-pointer'
            : 'bg-neutral-300 cursor-pointer',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'inline-block w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform duration-[180ms]',
          checked ? 'translate-x-[22px]' : 'translate-x-[2px]',
          'mt-[2px]',
        ].join(' ')}
      />
    </button>
  );
}

// ── Cookie-categorie ─────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'functional',
    titel: 'Functionele cookies',
    beschrijving: 'Noodzakelijk voor het goed functioneren van de website. Paginanavigatie, formulierverwerking en sessiebeheer.',
    disabled: true,
    defaultChecked: true,
    srLabel: 'Functionele cookies, altijd actief',
  },
  {
    id: 'analytics',
    titel: 'Analytische cookies',
    beschrijving: 'Helpen ons inzicht te krijgen in het gebruik van de website, zodat wij deze kunnen verbeteren. Gegevens worden geanonimiseerd verwerkt.',
    disabled: false,
    defaultChecked: false,
    srLabel: 'Analytische cookies',
  },
  {
    id: 'marketing',
    titel: 'Marketing cookies',
    beschrijving: 'Momenteel niet actief. Mochten wij in de toekomst marketingcookies inzetten, dan wordt uw toestemming gevraagd.',
    disabled: false,
    defaultChecked: false,
    srLabel: 'Marketing cookies',
  },
] as const;

// ── Modal ────────────────────────────────────────────────────

export function CookieSettingsModal() {
  const { consent, settingsOpen, updateConsent, hideSettings } = useCookieConsent();

  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  // Sync state when modal opens
  useEffect(() => {
    if (settingsOpen) {
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
    }
  }, [settingsOpen, consent]);

  // Focus trap
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!settingsOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus first focusable element
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        hideSettings();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusableEls = dialog!.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length === 0) return;

      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [settingsOpen, hideSettings]);

  const handleSave = useCallback(() => {
    updateConsent({ analytics, marketing });
  }, [analytics, marketing, updateConsent]);

  const handleAcceptAll = useCallback(() => {
    updateConsent({ analytics: true, marketing: true });
  }, [updateConsent]);

  if (!settingsOpen) return null;

  const toggleState: Record<string, { checked: boolean; set: (v: boolean) => void }> = {
    analytics: { checked: analytics, set: setAnalytics },
    marketing: { checked: marketing, set: setMarketing },
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ animation: 'cookieFadeIn 250ms ease' }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={hideSettings}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-heading"
        className="relative z-10 w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[16px] bg-white"
        style={{
          boxShadow: '0 16px 48px rgba(22, 62, 116, 0.14)',
          animation: 'cookieScaleIn 250ms ease',
        }}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <h2
              id="cookie-settings-heading"
              className="font-heading text-[18px] font-semibold text-neutral-950"
            >
              Cookie-instellingen
            </h2>
            <button
              type="button"
              onClick={hideSettings}
              aria-label="Sluiten"
              className="flex-shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors duration-[180ms]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-[16px] leading-[1.6] text-neutral-700 mb-6">
            Kies welke cookies u wilt toestaan.
          </p>

          {/* Categorieën */}
          <div className="space-y-3 mb-8">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <label
                      htmlFor={`cookie-toggle-${cat.id}`}
                      className="font-heading text-[16px] font-semibold text-neutral-950 cursor-pointer"
                    >
                      {cat.titel}
                    </label>
                    {cat.disabled && (
                      <span className="text-caption text-neutral-500">(altijd)</span>
                    )}
                  </div>
                  <p className="text-caption text-neutral-600 leading-relaxed">
                    {cat.beschrijving}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <Toggle
                    id={`cookie-toggle-${cat.id}`}
                    checked={cat.disabled ? true : (toggleState[cat.id]?.checked ?? false)}
                    onChange={cat.disabled ? undefined : (v) => toggleState[cat.id]?.set(v)}
                    disabled={cat.disabled}
                    label={cat.srLabel}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Knoppen */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-[10px] border border-brand-700 bg-white px-5 py-3 text-[16px] font-medium text-brand-700 hover:bg-brand-100 transition-all duration-[180ms]"
            >
              Opslaan
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 rounded-[10px] bg-brand-700 px-5 py-3 text-[16px] font-medium text-white hover:bg-brand-900 transition-all duration-[180ms]"
            >
              Alles accepteren
            </button>
          </div>
        </div>
      </div>

      {/* Animatie keyframes */}
      <style>{`
        @keyframes cookieFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cookieScaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

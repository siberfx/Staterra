import { useCookieConsent } from './CookieProvider';

export function CookieFloatingIcon() {
  const { hasConsented, showSettings } = useCookieConsent();

  // Alleen tonen na consent
  if (!hasConsented) return null;

  return (
    <button
      type="button"
      onClick={showSettings}
      aria-label="Cookie-instellingen"
      className="fixed left-6 bottom-6 z-[9998] w-[44px] h-[44px] rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:scale-105 transition-all duration-[180ms]"
      style={{
        boxShadow: '0 8px 24px rgba(22, 62, 116, 0.06)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(22, 62, 116, 0.10)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(22, 62, 116, 0.06)';
      }}
    >
      <svg
        className="w-5 h-5 text-brand-700"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-.34-.02-.674-.057-1.002a1.5 1.5 0 01-1.943-1.44 1.5 1.5 0 01.057-.408A8.003 8.003 0 0012 4a1.5 1.5 0 01-.002-2zm-2.5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5.5 2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm2-5a1 1 0 110-2 1 1 0 010 2zm-5 4a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </button>
  );
}

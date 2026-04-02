import { useState } from 'react';

interface FormData {
  email: string;
  name: string;
  organisation: string;
}

export default function LeadMagnetBanner() {
  const [formData, setFormData] = useState<FormData>({ email: '', name: '', organisation: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const body = new URLSearchParams({
      first_name: formData.name || 'Checklist',
      last_name: 'Download',
      email: formData.email,
      reden: 'checklist-download',
      bericht: `Download Woo-compliance checklist via lead magnet op ${window.location.pathname}`,
      organisatie: formData.organisation || '',
      'avg-optin': '1',
    });

    try {
      const res = await fetch('https://studio.staterra.nl/api/contact/verstuur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (res.ok || res.status === 201) {
        setStatus('success');
        if ((window as any).gtag) {
          (window as any).gtag('event', 'lead_magnet_download', {
            event_category: 'Lead Generation',
            event_label: 'Woo-compliance checklist',
            page_path: window.location.pathname,
          });
        }
      } else if (res.status === 422) {
        setErrorMsg('Controleer uw e-mailadres en probeer opnieuw.');
        setStatus('error');
      } else {
        setErrorMsg('Er ging iets mis. Probeer het later opnieuw.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Geen verbinding. Controleer uw internet en probeer opnieuw.');
      setStatus('error');
    }
  };

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section
      className="bg-brand-100 py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="lead-magnet-heading"
    >
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-10 items-center">

          {/* Linkerkolom — content */}
          <div>
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
              Gratis download
            </span>
            <h2
              id="lead-magnet-heading"
              className="font-heading text-h2 font-semibold text-neutral-950"
            >
              Woo-compliance checklist
            </h2>
            <p className="text-body text-neutral-700 mt-3 leading-relaxed">
              Ontdek in 15 minuten hoe ver uw organisatie is met de Wet open
              overheid. 37 checkpunten verdeeld over 6 categorieën.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Gebaseerd op officiële bronnen (BZK, Woo)',
                'Inclusief tranche-overzicht en scoring',
                'Direct toepasbaar als interne audit-tool',
              ].map((usp) => (
                <li key={usp} className="flex items-start gap-2.5">
                  <svg
                    className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body-sm text-neutral-700">{usp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechterkolom — formulier */}
          <div className="bg-white rounded-[20px] p-8 shadow-[0_12px_32px_rgba(22,62,116,0.10)] border border-neutral-200">
            {status === 'success' ? (
              <div className="text-center py-4">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-neutral-950 mb-2">
                  Checklist is onderweg!
                </h3>
                <p className="text-body-sm text-neutral-600 mb-4">
                  We hebben de Woo-compliance checklist naar{' '}
                  <strong className="text-neutral-800">{formData.email}</strong>{' '}
                  gestuurd. Controleer eventueel uw spamfolder.
                </p>
                <a
                  href="/downloads/Woo-Compliance-Checklist-Staterra.pdf"
                  className="text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150"
                  download
                >
                  Of download direct (PDF) →
                </a>
              </div>
            ) : (
              <>
                {/* Icoon */}
                <div className="w-10 h-10 rounded-[10px] bg-brand-700 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>

                <h3 className="font-heading text-lg font-semibold text-neutral-950 mt-4 mb-5">
                  Download de checklist
                </h3>

                <form
                  onSubmit={handleSubmit}
                  aria-label="Download Woo-compliance checklist"
                  className="space-y-3"
                >
                  <div>
                    <label htmlFor="lm-email" className="sr-only">E-mailadres</label>
                    <input
                      id="lm-email"
                      type="email"
                      value={formData.email}
                      onChange={update('email')}
                      placeholder="uw@email.nl"
                      required
                      autoComplete="email"
                      className="w-full rounded-[10px] border border-neutral-200 px-4 py-3 text-body-sm text-neutral-950 placeholder:text-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/25 focus:outline-none transition-all duration-[180ms]"
                    />
                  </div>
                  <div>
                    <label htmlFor="lm-name" className="sr-only">Naam</label>
                    <input
                      id="lm-name"
                      type="text"
                      value={formData.name}
                      onChange={update('name')}
                      placeholder="Uw naam (optioneel)"
                      autoComplete="name"
                      className="w-full rounded-[10px] border border-neutral-200 px-4 py-3 text-body-sm text-neutral-950 placeholder:text-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/25 focus:outline-none transition-all duration-[180ms]"
                    />
                  </div>
                  <div>
                    <label htmlFor="lm-org" className="sr-only">Organisatie</label>
                    <input
                      id="lm-org"
                      type="text"
                      value={formData.organisation}
                      onChange={update('organisation')}
                      placeholder="Organisatie (optioneel)"
                      autoComplete="organization"
                      className="w-full rounded-[10px] border border-neutral-200 px-4 py-3 text-body-sm text-neutral-950 placeholder:text-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/25 focus:outline-none transition-all duration-[180ms]"
                    />
                  </div>

                  {status === 'error' && (
                    <div role="alert" className="bg-red-50 border border-red-200 rounded-[10px] p-3 text-red-700 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-700 text-white rounded-[10px] px-7 py-4 text-body-sm font-medium hover:bg-brand-900 transition-all duration-[180ms] focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Verzenden...
                      </span>
                    ) : (
                      'Download checklist (PDF)'
                    )}
                  </button>

                  <p className="text-xs text-neutral-400 text-center mt-3">
                    Direct in uw inbox. Geen spam, geen verplichtingen.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

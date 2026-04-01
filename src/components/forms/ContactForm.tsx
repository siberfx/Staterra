import { useState, useRef, useId } from 'react';
import type { ContactSubject } from '@/lib/types';

// ── Types ─────────────────────────────────────────────────────

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organisatie: string;
  reden: string;
  bericht: string;
  'avg-optin': boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// ── Validatie ─────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

function validate(values: FormValues, file: File | null): FormErrors {
  const errors: FormErrors = {};

  if (!values.first_name.trim())
    errors.first_name = 'Voornaam is verplicht.';

  if (!values.last_name.trim())
    errors.last_name = 'Achternaam is verplicht.';

  if (!values.email.trim()) {
    errors.email = 'E-mailadres is verplicht.';
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Voer een geldig e-mailadres in.';
  }

  if (!values.reden) errors.reden = 'Kies een onderwerp.';

  if (!values.bericht.trim()) {
    errors.bericht = 'Bericht is verplicht.';
  } else if (values.bericht.trim().length < 20) {
    errors.bericht = 'Geef een toelichting van minimaal 20 tekens.';
  }

  if (!values['avg-optin'])
    errors['avg-optin'] = 'U dient akkoord te gaan met het privacybeleid.';

  if (file && file.size > MAX_FILE_BYTES)
    errors.bericht = `Bijlage mag maximaal 10 MB zijn (huidig: ${(file.size / 1024 / 1024).toFixed(1)} MB).`;

  return errors;
}

// ── Hulpcomponenten ───────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-caption text-error flex items-center gap-1">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      {message}
    </p>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-body-sm font-medium text-neutral-800 mb-1.5"
    >
      {children}
      {required && (
        <span className="text-error ml-0.5" aria-label="verplicht">
          *
        </span>
      )}
    </label>
  );
}

const inputBase =
  'w-full bg-white text-neutral-950 border border-neutral-300 rounded-[10px] px-4 py-3.5 text-body-sm transition-all duration-[180ms] placeholder:text-neutral-500 focus:outline-none focus:border-brand-600 focus:ring-3 focus:ring-brand-400/22 disabled:opacity-60 disabled:cursor-not-allowed';

const inputError =
  'border-error focus:border-error focus:ring-error/20';

// ── Succes-scherm ─────────────────────────────────────────────

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center text-center py-12 px-6"
    >
      <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-brand-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">
        Bericht verstuurd
      </h3>
      <p className="text-body-sm text-neutral-700 mb-6 max-w-sm">
        Bedankt voor uw bericht. U ontvangt binnen{' '}
        <strong className="font-semibold text-neutral-950">twee werkdagen</strong> een
        inhoudelijke reactie van een Staterra-adviseur.
      </p>
      <button
        onClick={onReset}
        className="text-body-sm font-medium text-brand-700 hover:text-brand-900 transition-colors duration-[180ms] underline underline-offset-2"
      >
        Nog een bericht sturen
      </button>
    </div>
  );
}

// ── Hoofdcomponent ────────────────────────────────────────────

interface ContactFormProps {
  subjects: ContactSubject[];
}

const INITIAL: FormValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  organisatie: '',
  reden: '',
  bericht: '',
  'avg-optin': false,
};

export function ContactForm({ subjects }: ContactFormProps) {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const firstErrorRef = useRef<HTMLElement | null>(null);

  const isSubmitting = status === 'submitting';

  // Veld-update
  function set<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) {
      const newErrors = validate({ ...values, [field]: value }, file);
      setErrors((e) => ({ ...e, [field]: newErrors[field] }));
    }
  }

  function blur(field: keyof FormValues) {
    setTouched((t) => ({ ...t, [field]: true }));
    const newErrors = validate(values, file);
    setErrors((e) => ({ ...e, [field]: newErrors[field] }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected && selected.size > MAX_FILE_BYTES) {
      setErrors((e) => ({
        ...e,
        bericht: `Bijlage mag maximaal 10 MB zijn (huidig: ${(selected.size / 1024 / 1024).toFixed(1)} MB).`,
      }));
    } else {
      setErrors((e) => ({ ...e, bericht: validate(values, selected).bericht }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Valideer alles
    const allErrors = validate(values, file);
    setErrors(allErrors);
    setTouched(Object.fromEntries(Object.keys(INITIAL).map((k) => [k, true])));

    if (Object.keys(allErrors).length > 0) {
      // Focus eerste fout
      setTimeout(() => {
        const firstErrorEl = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
        firstErrorEl?.focus();
        firstErrorRef.current = firstErrorEl;
      }, 50);
      return;
    }

    setStatus('submitting');
    setServerError('');

    try {
      let body: BodyInit;
      let contentType: string | undefined;

      if (file) {
        const fd = new FormData();
        fd.append('first_name', values.first_name);
        fd.append('last_name', values.last_name);
        fd.append('email', values.email);
        if (values.phone) fd.append('phone', values.phone);
        if (values.organisatie) fd.append('organisatie', values.organisatie);
        fd.append('reden', values.reden);
        fd.append('bericht', values.bericht);
        fd.append('avg-optin', '1');
        fd.append('bijlage', file, file.name);
        body = fd;
        // Geen Content-Type header — browser zet boundary automatisch
      } else {
        const params = new URLSearchParams();
        params.append('first_name', values.first_name);
        params.append('last_name', values.last_name);
        params.append('email', values.email);
        if (values.phone) params.append('phone', values.phone);
        if (values.organisatie) params.append('organisatie', values.organisatie);
        params.append('reden', values.reden);
        params.append('bericht', values.bericht);
        params.append('avg-optin', '1');
        body = params;
        contentType = 'application/x-www-form-urlencoded';
      }

      const headers: Record<string, string> = {};
      if (contentType) headers['Content-Type'] = contentType;

      const cmsUrl = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || 'https://studio.staterra.nl');

      const res = await fetch(`${cmsUrl}/api/contact/verstuur`, {
        method: 'POST',
        headers: {
          ...headers,
          Accept: 'application/json',
        },
        body,
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => null);
        setStatus('error');
        setServerError(
          data?.message ?? 'Er is een fout opgetreden. Probeer het later opnieuw.'
        );
      }
    } catch {
      setStatus('error');
      setServerError(
        'Er is een verbindingsfout opgetreden. Controleer uw internetverbinding en probeer het opnieuw.'
      );
    }
  }

  function reset() {
    setValues(INITIAL);
    setErrors({});
    setTouched({});
    setFile(null);
    setStatus('idle');
    setServerError('');
    if (fileRef.current) fileRef.current.value = '';
  }

  if (status === 'success') return <SuccessScreen onReset={reset} />;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contactformulier"
      className="space-y-5"
    >
      {/* Server-fout */}
      {status === 'error' && serverError && (
        <div
          role="alert"
          className="rounded-[10px] bg-error/8 border border-error/20 px-4 py-3.5 flex items-start gap-3"
        >
          <svg className="w-5 h-5 text-error flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-body-sm text-error">{serverError}</p>
        </div>
      )}

      {/* Naam (2 kolommen) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={id('first_name')} required>Voornaam</Label>
          <input
            id={id('first_name')}
            name="first_name"
            type="text"
            autoComplete="given-name"
            value={values.first_name}
            onChange={(e) => set('first_name', e.target.value)}
            onBlur={() => blur('first_name')}
            disabled={isSubmitting}
            aria-invalid={!!errors.first_name}
            aria-describedby={errors.first_name ? `${id('first_name')}-error` : undefined}
            placeholder="Jan"
            className={`${inputBase} ${errors.first_name ? inputError : ''}`}
          />
          <FieldError message={errors.first_name} />
        </div>
        <div>
          <Label htmlFor={id('last_name')} required>Achternaam</Label>
          <input
            id={id('last_name')}
            name="last_name"
            type="text"
            autoComplete="family-name"
            value={values.last_name}
            onChange={(e) => set('last_name', e.target.value)}
            onBlur={() => blur('last_name')}
            disabled={isSubmitting}
            aria-invalid={!!errors.last_name}
            placeholder="de Vries"
            className={`${inputBase} ${errors.last_name ? inputError : ''}`}
          />
          <FieldError message={errors.last_name} />
        </div>
      </div>

      {/* E-mail */}
      <div>
        <Label htmlFor={id('email')} required>E-mailadres</Label>
        <input
          id={id('email')}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          onBlur={() => blur('email')}
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          placeholder="jan.devries@organisatie.nl"
          className={`${inputBase} ${errors.email ? inputError : ''}`}
        />
        <FieldError message={errors.email} />
      </div>

      {/* Telefoon + Organisatie (2 kolommen) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={id('phone')}>Telefoonnummer</Label>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            disabled={isSubmitting}
            placeholder="+31 6 12345678"
            className={inputBase}
          />
        </div>
        <div>
          <Label htmlFor={id('organisatie')}>Organisatie</Label>
          <input
            id={id('organisatie')}
            name="organisatie"
            type="text"
            autoComplete="organization"
            value={values.organisatie}
            onChange={(e) => set('organisatie', e.target.value)}
            disabled={isSubmitting}
            placeholder="Gemeente Utrecht"
            className={inputBase}
          />
        </div>
      </div>

      {/* Reden / Onderwerp */}
      <div>
        <Label htmlFor={id('reden')} required>Onderwerp</Label>
        <div className="relative">
          <select
            id={id('reden')}
            name="reden"
            value={values.reden}
            onChange={(e) => set('reden', e.target.value)}
            onBlur={() => blur('reden')}
            disabled={isSubmitting}
            aria-invalid={!!errors.reden}
            className={[
              inputBase,
              'appearance-none pr-10 cursor-pointer',
              errors.reden ? inputError : '',
              !values.reden ? 'text-neutral-500' : '',
            ].join(' ')}
          >
            <option value="" disabled>
              Kies een onderwerp…
            </option>
            {subjects.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
          {/* Pijltje */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
        <FieldError message={errors.reden} />
      </div>

      {/* Bericht */}
      <div>
        <Label htmlFor={id('bericht')} required>Bericht</Label>
        <textarea
          id={id('bericht')}
          name="bericht"
          rows={5}
          value={values.bericht}
          onChange={(e) => set('bericht', e.target.value)}
          onBlur={() => blur('bericht')}
          disabled={isSubmitting}
          aria-invalid={!!errors.bericht}
          placeholder="Beschrijf kort uw vraagstuk of situatie…"
          className={`${inputBase} resize-y min-h-[120px] ${errors.bericht ? inputError : ''}`}
        />
        <div className="flex items-start justify-between mt-1">
          <FieldError message={errors.bericht} />
          <span className={`text-caption ml-auto ${values.bericht.length < 20 ? 'text-neutral-400' : 'text-success'}`}>
            {values.bericht.length} tekens
          </span>
        </div>
      </div>

      {/* Bijlage */}
      <div>
        <Label htmlFor={id('bijlage')}>Bijlage</Label>
        <div
          className={[
            'relative rounded-[10px] border border-dashed transition-colors duration-[180ms]',
            'border-neutral-300 hover:border-brand-400',
          ].join(' ')}
        >
          <input
            ref={fileRef}
            id={id('bijlage')}
            name="bijlage"
            type="file"
            onChange={handleFileChange}
            disabled={isSubmitting}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            aria-describedby={`${id('bijlage')}-hint`}
          />
          <div className="flex items-center gap-3 px-4 py-3.5">
            <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
            <span className="text-body-sm text-neutral-500 truncate">
              {file ? file.name : 'Kies een bestand of sleep het hierheen'}
            </span>
            {file && (
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileRef.current) fileRef.current.value = '';
                }}
                className="ml-auto flex-shrink-0 text-neutral-400 hover:text-error transition-colors"
                aria-label="Bijlage verwijderen"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <p id={`${id('bijlage')}-hint`} className="mt-1.5 text-caption text-neutral-500">
          Maximaal 10 MB. Toegestane bestandstypen: PDF, Word, Excel, afbeeldingen, ZIP.
        </p>
      </div>

      {/* AVG-akkoord */}
      <div>
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              id={id('avg-optin')}
              name="avg-optin"
              type="checkbox"
              checked={values['avg-optin']}
              onChange={(e) => set('avg-optin', e.target.checked)}
              onBlur={() => blur('avg-optin')}
              disabled={isSubmitting}
              aria-invalid={!!errors['avg-optin']}
              className="sr-only"
            />
            <button
              type="button"
              role="checkbox"
              aria-checked={values['avg-optin']}
              aria-labelledby={`${id('avg-optin')}-label`}
              onClick={() => set('avg-optin', !values['avg-optin'])}
              disabled={isSubmitting}
              className={[
                'w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-all duration-[180ms] focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-1',
                values['avg-optin']
                  ? 'bg-brand-700 border-brand-700'
                  : errors['avg-optin']
                  ? 'border-error bg-white'
                  : 'border-neutral-300 bg-white hover:border-brand-400',
              ].join(' ')}
            >
              {values['avg-optin'] && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
          <label
            id={`${id('avg-optin')}-label`}
            htmlFor={id('avg-optin')}
            className="text-body-sm text-neutral-700 cursor-pointer select-none"
          >
            Ik ga akkoord met het{' '}
            <a
              href="/privacy"
              className="text-brand-700 hover:text-brand-900 underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacybeleid
            </a>{' '}
            van Staterra en geef toestemming voor verwerking van mijn gegevens.
            <span className="text-error ml-0.5" aria-label="verplicht">*</span>
          </label>
        </div>
        <FieldError message={errors['avg-optin']} />
      </div>

      {/* Verzendknop */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={[
            'w-full flex items-center justify-center gap-2.5',
            'bg-brand-700 text-white font-medium text-body-sm',
            'rounded-[10px] px-6 py-4',
            'transition-all duration-[180ms]',
            'hover:bg-brand-900 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2',
            'disabled:opacity-60 disabled:cursor-not-allowed',
          ].join(' ')}
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Versturen…
            </>
          ) : (
            <>
              Bericht versturen
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </>
          )}
        </button>
        <p className="text-caption text-neutral-500 text-center mt-3">
          Geen verkoopdruk. Binnen twee werkdagen een inhoudelijke reactie.
        </p>
      </div>
    </form>
  );
}

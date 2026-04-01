import { useContactForm } from '../../hooks/useContactForm'
import { nl } from '../../translations'

function formatFileSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function ContactForm() {
  const {
    config,
    submitting,
    success,
    error,
    reden,
    setReden,
    selectedFile,
    setSelectedFile,
    handleSubmit,
    getFieldError,
    subjects,
    contactPreferences,
    showAttachment,
  } = useContactForm()

  if (!config) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-12 rounded bg-gray-200" />
        <div className="h-12 rounded bg-gray-200" />
        <div className="h-32 rounded bg-gray-200" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
          {success}
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="first_name" className="mb-2 block text-sm font-medium text-gray-700">
            {nl('contact.firstName')}
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            autoComplete="given-name"
            required
            className={`block w-full rounded-lg border px-4 py-3 text-sm focus:ring-1 focus:ring-primary ${
              getFieldError('first_name') ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
          {getFieldError('first_name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('first_name')}</p>
          )}
        </div>
        <div>
          <label htmlFor="last_name" className="mb-2 block text-sm font-medium text-gray-700">
            {nl('contact.lastName')}
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            autoComplete="family-name"
            required
            className={`block w-full rounded-lg border px-4 py-3 text-sm focus:ring-1 focus:ring-primary ${
              getFieldError('last_name') ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
          {getFieldError('last_name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('last_name')}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          {nl('contact.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          className={`block w-full rounded-lg border px-4 py-3 text-sm focus:ring-1 focus:ring-primary ${
            getFieldError('email') ? 'border-red-500' : 'border-gray-300 focus:border-primary'
          }`}
        />
        {getFieldError('email') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
          {nl('contact.phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          placeholder={nl('contact.phonePlaceholder')}
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="reden" className="mb-2 block text-sm font-medium text-gray-700">
          {nl('contact.subject')}
        </label>
        {subjects.length > 0 ? (
          <select
            id="reden"
            name="reden"
            required
            value={reden}
            onChange={(e) => setReden(e.target.value)}
            className={`block w-full rounded-lg border px-4 py-3 text-sm focus:ring-1 focus:ring-primary ${
              getFieldError('reden') ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          >
            <option value="">{nl('contact.subjectPlaceholder')}</option>
            {subjects.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label ?? s.value}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            id="reden"
            name="reden"
            required
            value={reden}
            onChange={(e) => setReden(e.target.value)}
            placeholder={nl('contact.subjectPlaceholder')}
            className={`block w-full rounded-lg border px-4 py-3 text-sm focus:ring-1 focus:ring-primary ${
              getFieldError('reden') ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
        )}
        {getFieldError('reden') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('reden')}</p>
        )}
      </div>
      <div>
        <label htmlFor="contact_preference" className="mb-2 block text-sm font-medium text-gray-700">
          {nl('contact.contactPreference')}
        </label>
        <select
          id="contact_preference"
          name="contact_preference"
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        >
          {contactPreferences.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label ?? p.value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="organisatie" className="mb-2 block text-sm font-medium text-gray-700">
          {nl('contact.organization')}
        </label>
        <input
          type="text"
          id="organisatie"
          name="organisatie"
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="bijlage" className="mb-2 block text-sm font-medium text-gray-700">
          {nl('contact.attachment')}
          {showAttachment ? ' *' : ''}
        </label>
        <label
          htmlFor="bijlage"
          className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 transition-colors hover:border-primary/40 hover:bg-gray-50"
        >
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Klik om bestanden te kiezen of sleep ze hierheen
          </span>
          <span className="mt-1 text-xs text-gray-400">
            PDF, JPG, PNG, DOC, XLS, PPT (max. 10 MB per bestand)
          </span>
          <input
            type="file"
            id="bijlage"
            name="bijlage"
            accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              setSelectedFile(f || null)
              e.target.value = ''
            }}
          />
        </label>
        {selectedFile && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 py-2 px-3">
            <span className="min-w-0 flex-1 truncate text-sm text-gray-700" title={selectedFile.name}>
              {selectedFile.name}
            </span>
            <span className="shrink-0 text-xs text-gray-500">{formatFileSize(selectedFile.size)}</span>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Verwijderen"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500">{nl('contact.attachmentHint')}</p>
      </div>
      <div>
        <label htmlFor="bericht" className="mb-2 block text-sm font-medium text-gray-700">
          {nl('contact.message')}
        </label>
        <textarea
          id="bericht"
          name="bericht"
          rows={4}
          required
          placeholder={nl('contact.messagePlaceholder')}
          className={`block w-full rounded-lg border px-4 py-3 text-sm focus:ring-1 focus:ring-primary ${
            getFieldError('bericht') ? 'border-red-500' : 'border-gray-300 focus:border-primary'
          }`}
        />
        {getFieldError('bericht') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('bericht')}</p>
        )}
      </div>
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="avg-optin"
            name="avg-optin"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="avg-optin" className="font-medium text-gray-700">
            {nl('contact.privacyLabel')}
          </label>
          <p className="text-gray-500">{nl('contact.privacyDesc')}</p>
        </div>
      </div>
      {getFieldError('avg-optin') && (
        <p className="text-sm text-red-600">{getFieldError('avg-optin')}</p>
      )}
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="nieuwsbrief"
            name="nieuwsbrief"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="nieuwsbrief" className="font-medium text-gray-700">
            {nl('contact.newsletterLabel')}
          </label>
          <p className="text-gray-500">{nl('contact.newsletterDesc')}</p>
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full justify-center border border-transparent bg-primary px-4 py-4 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? '...' : nl('contact.submit')}
      </button>
    </form>
  )
}

export default ContactForm

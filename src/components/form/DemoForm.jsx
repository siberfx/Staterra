import { nl } from '../../translations'

function DemoForm() {
  return (
    <form action="#" method="POST" className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="demo-first-name" className="block text-sm font-medium text-gray-700 mb-2">
            {nl('contact.demoFirstName')}
          </label>
          <input
            type="text"
            id="demo-first-name"
            name="demo-first-name"
            autoComplete="given-name"
            placeholder="Jane"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="demo-last-name" className="block text-sm font-medium text-gray-700 mb-2">
            {nl('contact.demoLastName')}
          </label>
          <input
            type="text"
            id="demo-last-name"
            name="demo-last-name"
            autoComplete="family-name"
            placeholder="Doe"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label htmlFor="demo-email" className="block text-sm font-medium text-gray-700 mb-2">
          {nl('contact.email')} (zakelijk)
        </label>
        <input
          type="email"
          id="demo-email"
          name="demo-email"
          autoComplete="email"
          placeholder="jane@organisatie.nl"
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="demo-organization" className="block text-sm font-medium text-gray-700 mb-2">
          {nl('contact.demoOrganization')}
        </label>
        <input
          type="text"
          id="demo-organization"
          name="demo-organization"
          placeholder="Gemeente, ministerie, waterschap..."
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="demo-phone" className="block text-sm font-medium text-gray-700 mb-2">
          {nl('contact.demoPhone')} (optioneel)
        </label>
        <input
          type="tel"
          id="demo-phone"
          name="demo-phone"
          placeholder="+31 6 12345678"
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="demo-how-heard" className="block text-sm font-medium text-gray-700 mb-2">
          {nl('contact.demoHowHeard')} (optioneel)
        </label>
        <select
          id="demo-how-heard"
          name="demo-how-heard"
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">{nl('contact.demoHowHeardPlaceholder')}</option>
          <option value="search">{nl('contact.demoHowHeardSearch')}</option>
          <option value="referral">{nl('contact.demoHowHeardReferral')}</option>
          <option value="event">{nl('contact.demoHowHeardEvent')}</option>
          <option value="other">{nl('contact.demoHowHeardOther')}</option>
        </select>
      </div>
      <div>
        <label htmlFor="demo-questions" className="block text-sm font-medium text-gray-700 mb-2">
          {nl('contact.demoQuestions')} (optioneel)
        </label>
        <textarea
          id="demo-questions"
          name="demo-questions"
          rows={3}
          placeholder={nl('contact.demoQuestionsPlaceholder')}
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="demo-privacy"
            name="demo-privacy"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="demo-privacy" className="font-medium text-gray-700">
            {nl('contact.privacyLabel')}
          </label>
          <p className="text-gray-500">{nl('contact.privacyDesc')}</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="demo-newsletter"
            name="demo-newsletter"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="demo-newsletter" className="font-medium text-gray-700">
            {nl('contact.newsletterLabel')}
          </label>
          <p className="text-gray-500">{nl('contact.newsletterDesc')}</p>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-colors"
      >
        {nl('demo.submit')}
      </button>
    </form>
  )
}

export default DemoForm

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { useSettings } from '../contexts/SiteContext'
import { getVacancy, submitApplication } from '../services/vacanciesService'
import { ApiError } from '../services/api'

function VacancyDetail() {
  const { slug } = useParams()
  const { settings } = useSettings()
  const [vacancy, setVacancy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', cover_letter: '', resume: '', linkedin_url: '', portfolio_url: '', repo_url: '' })

  useEffect(() => {
    let cancelled = false
    getVacancy(slug)
      .then((data) => {
        if (!cancelled) setVacancy(data)
      })
      .catch((err) => {
        if (!cancelled && err instanceof ApiError && err.status === 404) {
          setNotFound(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [slug])

  useEffect(() => {
    if (vacancy) {
      document.title = `${vacancy.title} - ${settings.site?.name || 'OpenPublication'}`
    }
  }, [vacancy, settings.site?.name])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await submitApplication(slug, {
        name: form.name,
        email: form.email,
        ...(form.phone && { phone: form.phone }),
        ...(form.cover_letter && { cover_letter: form.cover_letter }),
        ...(form.resume && { resume: form.resume }),
        ...(form.linkedin_url && { linkedin_url: form.linkedin_url }),
        ...(form.portfolio_url && { portfolio_url: form.portfolio_url }),
        ...(form.repo_url && { repo_url: form.repo_url }),
      })
      setSubmitted(true)
    } catch (err) {
      setError(err?.message ?? nl('vacancies.applyError'))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading && !vacancy) {
    return (
      <>
        <section className="pt-12 pb-8 bg-white">
          <div className="container-page animate-pulse">
            <div className="flex gap-2 mb-6">
              <div className="h-3 w-12 bg-gray-200 rounded" />
              <div className="h-3 w-3 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-3 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-12 md:h-14 bg-gray-200 rounded w-3/4 mb-6" />
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="h-5 w-28 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        </section>
        <div className="container-page mb-16 animate-pulse">
          <div className="max-w-3xl space-y-10">
            <div className="space-y-3">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="space-y-3">
              <div className="h-6 w-36 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
            <div className="space-y-3">
              <div className="h-6 w-44 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="h-8 w-56 bg-gray-200 rounded mb-6" />
            <div className="max-w-xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="h-[72px] bg-gray-200 rounded-lg" />
                <div className="h-[72px] bg-gray-200 rounded-lg" />
              </div>
              <div className="h-[72px] bg-gray-200 rounded-lg" />
              <div className="h-[120px] bg-gray-200 rounded-lg" />
              <div className="h-[72px] bg-gray-200 rounded-lg" />
              <div className="h-12 w-40 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </>
    )
  }

  if (notFound || !vacancy) {
    return (
      <div className="container-page py-16">
        <p className="text-gray-500">{nl('vacancies.notFound')}</p>
        <Link to={R.vacancies} className="text-primary hover:underline mt-4 inline-block">
          ← {nl('vacancies.backToVacancies')}
        </Link>
      </div>
    )
  }

  return (
    <>
      <section className="pt-12 pb-8 bg-white">
        <div className="container-page">
          <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-black transition-colors">
              {nl('actueel.breadcrumbHome')}
            </Link>
            <span className="mx-2">/</span>
            <Link to={R.vacancies} className="hover:text-black transition-colors">
              {nl('nav.werkenBij')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 truncate max-w-[200px] sm:max-w-xs inline-block" title={vacancy.title}>
              {vacancy.title}
            </span>
          </nav>

          <h1 className="type-h1 text-black tracking-tight mb-6">
            {vacancy.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
            {vacancy.location && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">location_on</span>
                {vacancy.location}
              </span>
            )}
            {vacancy.type && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">schedule</span>
                {vacancy.type}
              </span>
            )}
            {vacancy.department && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">business</span>
                {vacancy.department}
              </span>
            )}
            {vacancy.category && (
              <span className="px-2 py-0.5 bg-gray-100 rounded">{vacancy.category}</span>
            )}
            {vacancy.closing_date && (
              <span>{nl('vacancies.closingDate')}: {vacancy.closing_date}</span>
            )}
          </div>
        </div>
      </section>

      <article className="container-page mb-16">
        <div className="max-w-3xl rich-text max-w-none">
          {vacancy.description && (
            <section className="mb-10">
              <h2 className="type-h2 text-primary mb-4">{nl('vacancies.description')}</h2>
              <div className="whitespace-pre-wrap text-gray-600">{vacancy.description}</div>
            </section>
          )}
          {vacancy.requirements && (
            <section className="mb-10">
              <h2 className="type-h2 text-primary mb-4">{nl('vacancies.requirements')}</h2>
              <div className="whitespace-pre-wrap text-gray-600">{vacancy.requirements}</div>
            </section>
          )}
          {vacancy.responsibilities && (
            <section className="mb-10">
              <h2 className="type-h2 text-primary mb-4">{nl('vacancies.responsibilities')}</h2>
              <div className="whitespace-pre-wrap text-gray-600">{vacancy.responsibilities}</div>
            </section>
          )}
          {(vacancy.salary_range || vacancy.hours_per_week || vacancy.experience_level) && (
            <section className="mb-10 flex flex-wrap gap-6 text-sm">
              {vacancy.salary_range && (
                <p><span className="font-medium text-gray-700">{nl('vacancies.salaryRange')}:</span> {vacancy.salary_range}</p>
              )}
              {vacancy.hours_per_week && (
                <p><span className="font-medium text-gray-700">{nl('vacancies.hoursPerWeek')}:</span> {vacancy.hours_per_week}</p>
              )}
              {vacancy.experience_level && (
                <p><span className="font-medium text-gray-700">{nl('vacancies.experienceLevel')}:</span> {vacancy.experience_level}</p>
              )}
            </section>
          )}
        </div>

        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="type-h2 text-primary mb-6">{nl('vacancies.applyFormTitle')}</h2>
          {submitted ? (
            <div className="p-6 bg-green-50 border border-green-200 text-green-800">
              {nl('vacancies.applySuccess')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {nl('contact.firstName')} / {nl('contact.lastName')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {nl('contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefoon
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 mb-2">
                  Motivatie
                </label>
                <textarea
                  id="cover_letter"
                  rows={4}
                  value={form.cover_letter}
                  onChange={(e) => setForm((f) => ({ ...f, cover_letter: e.target.value }))}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin_url"
                  placeholder="https://linkedin.com/in/..."
                  value={form.linkedin_url}
                  onChange={(e) => setForm((f) => ({ ...f, linkedin_url: e.target.value }))}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              {error && (
                <p className="text-amber-600 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? nl('vacancies.loading') : nl('vacancies.apply')}
              </button>
            </form>
          )}
        </div>
      </article>
    </>
  )
}

export default VacancyDetail

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../contexts/SiteContext'
import { FaIcon } from './Icons/FaIcon'

const STORAGE_KEY = 'cookie_consent'
const STORAGE_PREFS_KEY = 'cookie_preferences'

function getStoredConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function setStoredConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore
  }
}

function getStoredPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_PREFS_KEY)
    if (!raw) return { functional: true, analytics: false, marketing: false }
    return { ...{ functional: true, analytics: false, marketing: false }, ...JSON.parse(raw) }
  } catch {
    return { functional: true, analytics: false, marketing: false }
  }
}

function setStoredPrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify(prefs))
  } catch {
    // ignore
  }
}

function CookieSettingsButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed left-4 bottom-6 z-[10000] w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary/40 hover:shadow-xl transition-all"
      aria-label="Cookie-instellingen"
      title="Cookie-instellingen"
    >
      <FaIcon icon="cookie-bite" className="w-5 h-5" fallback="fa-solid fa-cookie-bite" />
    </button>
  )
}

export default function CookieBanner() {
  const { settings } = useSettings()
  const [showIntro, setShowIntro] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState(() => getStoredPrefs())

  const cookie = settings.cookie ?? {}
  const enabled = cookie.banner_enabled === true

  useEffect(() => {
    if (!enabled) return
    const consent = getStoredConsent()
    setShowIntro(!consent)
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const openPrefs = () => {
      setShowPrefs(true)
      setShowIntro(false)
    }
    window.addEventListener('open-cookie-preferences', openPrefs)
    return () => window.removeEventListener('open-cookie-preferences', openPrefs)
  }, [enabled])

  const notifyConsentChange = () => {
    window.dispatchEvent(new CustomEvent('cookie-consent-changed'))
  }

  const acceptAll = () => {
    setStoredConsent('all')
    setStoredPrefs({ functional: true, analytics: true, marketing: true })
    setShowIntro(false)
    notifyConsentChange()
  }

  const acceptEssential = () => {
    setStoredConsent('essential')
    setStoredPrefs({ functional: true, analytics: false, marketing: false })
    setShowIntro(false)
    setShowPrefs(false)
    notifyConsentChange()
  }

  const savePreferences = () => {
    setStoredConsent('custom')
    setStoredPrefs(prefs)
    setShowIntro(false)
    setShowPrefs(false)
    notifyConsentChange()
  }

  const openPrefs = () => setShowPrefs(true)
  const closePrefs = () => setShowPrefs(false)

  if (!enabled) return null

  return (
    <>
      <CookieSettingsButton onClick={openPrefs} />
      {showPrefs && <CookiePreferencesPanel cookie={cookie} prefs={prefs} setPrefs={setPrefs} onSave={savePreferences} onClose={closePrefs} />}
      {showIntro && <CookieIntroBanner cookie={cookie} onAcceptAll={acceptAll} onAcceptEssential={acceptEssential} onOpenPrefs={openPrefs} />}
    </>
  )
}

function CookiePreferencesPanel({ cookie, prefs, setPrefs, onSave, onClose }) {
  const policyUrl = cookie.policy_url && !cookie.policy_url.startsWith('javascript:') ? cookie.policy_url : '/privacy'

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {cookie.preferences_title || 'Manage cookie preferences'}
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            {cookie.preferences_summary}
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{cookie.category_functional_label || 'Functional cookies'}</p>
                <p className="text-sm text-gray-600 mt-0.5">{cookie.category_functional_description}</p>
              </div>
              <span className="text-xs text-gray-500 shrink-0">Always on</span>
            </div>
            <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{cookie.category_analytics_label || 'Analytics cookies'}</p>
                <p className="text-sm text-gray-600 mt-0.5">{cookie.category_analytics_description}</p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
            <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{cookie.category_marketing_label || 'Marketing cookies'}</p>
                <p className="text-sm text-gray-600 mt-0.5">{cookie.category_marketing_description}</p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Save preferences
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {policyUrl.startsWith('http') ? (
              <a
                href={policyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-primary font-medium hover:underline text-center sm:ml-auto"
              >
                {cookie.settings_label || 'Cookie policy'}
              </a>
            ) : (
              <Link
                to={policyUrl}
                className="px-4 py-2.5 text-primary font-medium hover:underline text-center sm:ml-auto"
              >
                {cookie.settings_label || 'Cookie policy'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CookieIntroBanner({ cookie, onAcceptAll, onAcceptEssential, onOpenPrefs }) {
  const policyUrl = cookie.policy_url && !cookie.policy_url.startsWith('javascript:') ? cookie.policy_url : '/privacy'

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6">
      <div className="container-page max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {cookie.intro_title || 'We use cookies'}
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            {cookie.intro_summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onAcceptAll}
              className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={onAcceptEssential}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Only essential
            </button>
            <button
              type="button"
              onClick={onOpenPrefs}
              className="px-5 py-2.5 text-primary font-medium hover:underline"
            >
              {cookie.preferences_title || 'Manage preferences'}
            </button>
            {policyUrl.startsWith('http') ? (
              <a
                href={policyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-gray-500 text-sm hover:text-gray-700 sm:ml-auto"
              >
                {cookie.settings_label || 'Cookie policy'}
              </a>
            ) : (
              <Link
                to={policyUrl}
                className="px-5 py-2.5 text-gray-500 text-sm hover:text-gray-700 sm:ml-auto"
              >
                {cookie.settings_label || 'Cookie policy'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

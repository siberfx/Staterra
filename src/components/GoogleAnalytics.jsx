import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSettings } from '../contexts/SiteContext'

function hasAnalyticsConsent() {
  try {
    const consent = localStorage.getItem('cookie_consent')
    if (consent === 'all') return true
    if (consent === 'custom') {
      const prefs = JSON.parse(localStorage.getItem('cookie_preferences') || '{}')
      return prefs.analytics === true
    }
    return false
  } catch {
    return false
  }
}

export default function GoogleAnalytics() {
  const { settings } = useSettings()
  const { pathname } = useLocation()
  const [consentGiven, setConsentGiven] = useState(hasAnalyticsConsent)

  useEffect(() => {
    const check = () => setConsentGiven(hasAnalyticsConsent())
    window.addEventListener('cookie-consent-changed', check)
    return () => window.removeEventListener('cookie-consent-changed', check)
  }, [])

  const rawId = settings.seo?.google_analytics_id?.trim()
  const gaId = rawId && /^[A-Za-z0-9_-]+$/.test(rawId) ? rawId : null

  useEffect(() => {
    if (!gaId || !consentGiven) return
    if (document.querySelector(`script[src*="googletagmanager.com/gtag"][src*="${gaId}"]`)) return

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId)
  }, [gaId])

  useEffect(() => {
    if (!gaId || !consentGiven || !window.gtag) return
    window.gtag('config', gaId, { page_path: pathname })
  }, [gaId, pathname, consentGiven])

  return null
}

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { SettingsResponse, HeaderMenuResponse, FooterMenuResponse } from '@/lib/types'
import { getSettings, getHeaderMenu, getFooterMenu } from '@/services/cms'

interface SiteContextValue {
  settings: SettingsResponse | null
  headerMenu: HeaderMenuResponse | null
  footerMenu: FooterMenuResponse | null
  loading: boolean
}

const SiteContext = createContext<SiteContextValue>({
  settings: null,
  headerMenu: null,
  footerMenu: null,
  loading: true,
})

export function useSite() {
  return useContext(SiteContext)
}

// ── Compatibiliteit met oude pagina's ────────────────────────
// Oude JSX-pagina's gebruiken useSettings() en useMenu()

export function useSettings() {
  const { settings, loading } = useSite()
  return {
    settings: settings ?? {},
    loading,
    error: null,
  }
}

export function useMenu() {
  const { headerMenu, footerMenu, loading } = useSite()
  return {
    headerMenu: headerMenu ?? { items: [], settings: {} },
    footerMenu: footerMenu ?? { columns: [] },
    loading,
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingsResponse | null>(null)
  const [headerMenu, setHeaderMenu] = useState<HeaderMenuResponse | null>(null)
  const [footerMenu, setFooterMenu] = useState<FooterMenuResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    Promise.all([getSettings(), getHeaderMenu(), getFooterMenu()])
      .then(([s, h, f]) => {
        if (cancelled) return
        setSettings(s)
        setHeaderMenu(h)
        setFooterMenu(f)
      })
      .catch((err) => {
        if (!cancelled) console.warn('SiteContext: laden mislukt', err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  return (
    <SiteContext.Provider value={{ settings, headerMenu, footerMenu, loading }}>
      {children}
    </SiteContext.Provider>
  )
}

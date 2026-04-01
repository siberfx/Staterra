import { Outlet } from 'react-router-dom'
import { useSite } from '@/contexts/SiteContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export function Layout() {
  const { settings, headerMenu, footerMenu } = useSite()

  return (
    <>
      <a href="#main-content" className="skip-nav">
        Naar hoofdinhoud
      </a>

      <Header menu={headerMenu} settings={settings} />

      <main id="main-content" className="flex-1 pt-16 lg:pt-18">
        <Outlet />
      </main>

      <Footer menu={footerMenu} settings={settings} />
    </>
  )
}

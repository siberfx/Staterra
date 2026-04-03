import { Outlet } from 'react-router-dom'
import { useSite } from '@/contexts/SiteContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/Breadcrumb'
import { DefaultPageMeta } from '@/components/PageMeta'

export function Layout() {
  const { settings, headerMenu, footerMenu } = useSite()

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-brand-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
      >
        Spring naar inhoud
      </a>

      <Header menu={headerMenu} settings={settings} />

      <div className="pt-16 lg:pt-18">
        <Breadcrumb />
      </div>

      {/* Fallback SEO — wordt overschreven door pagina's met eigen <PageMeta /> */}
      <DefaultPageMeta />

      <main id="main-content" role="main" className="flex-1">
        <Outlet />
      </main>

      <Footer menu={footerMenu} settings={settings} />
    </>
  )
}

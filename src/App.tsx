import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense, Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { Layout } from '@/components/Layout'

// ── Nieuwe pagina's (TypeScript, nieuw design) ──────────────
const Home = lazy(() => import('@/pages/Home'))
const Contact = lazy(() => import('@/pages/Contact'))
const Oplossingen = lazy(() => import('@/pages/Oplossingen'))
const WooOplossing = lazy(() => import('@/pages/WooOplossing'))
const SamenOntwikkelen = lazy(() => import('@/pages/SamenOntwikkelen'))
const OpenSource = lazy(() => import('@/pages/OpenSource'))
const Aanpak = lazy(() => import('@/pages/Aanpak'))
const OverOns = lazy(() => import('@/pages/OverOns'))
const Dienstverlening = lazy(() => import('@/pages/Dienstverlening'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Cookies = lazy(() => import('@/pages/Cookies'))
const Kennisbank = lazy(() => import('@/pages/Kennisbank'))
const KennisbankArticle = lazy(() => import('@/pages/KennisbankArticle'))
const DynamicPage = lazy(() => import('@/pages/DynamicPage'))

// ── Oude pagina's (JavaScript, oud design) ──────────────────
const Solutions = lazy(() => import('@/pages/Solutions'))
const SolutionDetail = lazy(() => import('@/pages/SolutionDetail'))
const Academy = lazy(() => import('@/pages/Academy'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogDetail = lazy(() => import('@/pages/BlogDetail'))
const Nieuws = lazy(() => import('@/pages/Nieuws'))
const NieuwsDetail = lazy(() => import('@/pages/NieuwsDetail'))
const Succesverhalen = lazy(() => import('@/pages/Succesverhalen'))
const SuccesverhalenDetail = lazy(() => import('@/pages/SuccesverhalenDetail'))
const Changelog = lazy(() => import('@/pages/Changelog'))
const ChangelogDetail = lazy(() => import('@/pages/ChangelogDetail'))
const Aankondigingen = lazy(() => import('@/pages/Aankondigingen'))
const AnnouncementDetail = lazy(() => import('@/pages/AnnouncementDetail'))
const Roadmap = lazy(() => import('@/pages/Roadmap'))
const FeatureRequests = lazy(() => import('@/pages/FeatureRequests'))
const FeatureRequestDetail = lazy(() => import('@/pages/FeatureRequestDetail'))
const Demo = lazy(() => import('@/pages/Demo'))
const WerkenBij = lazy(() => import('@/pages/WerkenBij'))
const VacancyDetail = lazy(() => import('@/pages/VacancyDetail'))
const KnowledgeBase = lazy(() => import('@/pages/KnowledgeBase'))
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'))
const Actueel = lazy(() => import('@/pages/Actueel'))
const ActueelDetail = lazy(() => import('@/pages/ActueelDetail'))
const Zoeken = lazy(() => import('@/pages/Zoeken'))
const ProgrammaVanEisen = lazy(() => import('@/pages/ProgrammaVanEisen'))
const Docs = lazy(() => import('@/pages/Docs'))
const OnsVerhaal = lazy(() => import('@/pages/OnsVerhaal'))
const Partners = lazy(() => import('@/pages/Partners'))
const TechStack = lazy(() => import('@/pages/TechStack'))
const FAQ = lazy(() => import('@/pages/FAQ'))
const HelpCenter = lazy(() => import('@/pages/HelpCenter'))
const Support = lazy(() => import('@/pages/Support'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse text-brand-600 text-body-sm">Laden…</div>
    </div>
  )
}

class PageErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Page crash:', error, info) }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <h1 className="font-heading text-h3 font-semibold text-neutral-950 mb-3">Er ging iets mis</h1>
          <p className="text-body text-neutral-600 mb-6">Deze pagina kon niet geladen worden.</p>
          <button onClick={() => window.location.reload()} className="text-brand-700 font-semibold hover:text-brand-900">
            Pagina herladen →
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <PageErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          {/* ── Homepage ─────────────────────────────────────── */}
          <Route index element={<Home />} />

          {/* ── Nieuwe pagina's (Staterra design) ────────────── */}
          <Route path="contact" element={<Contact />} />
          <Route path="oplossingen" element={<Oplossingen />} />
          <Route path="woo-oplossing" element={<WooOplossing />} />
          <Route path="samen-ontwikkelen" element={<SamenOntwikkelen />} />
          <Route path="open-source" element={<OpenSource />} />
          <Route path="aanpak" element={<Aanpak />} />
          <Route path="over-ons" element={<OverOns />} />
          <Route path="dienstverlening" element={<Dienstverlening />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="kennisbank" element={<Kennisbank />} />

          {/* ── Solutions ────────────────────────────────────── */}
          <Route path="solutions" element={<Solutions />} />
          <Route path="solutions/:slug" element={<SolutionDetail />} />

          {/* ── Academy ──────────────────────────────────────── */}
          <Route path="academy" element={<Academy />} />
          <Route path="academy/categories" element={<Academy />} />
          <Route path="academy/category/:slug" element={<Academy />} />
          <Route path="academy/video/:slug" element={<Academy />} />
          <Route path="academy/live-sessions" element={<Academy />} />
          <Route path="academy/live-sessions/recordings" element={<Academy />} />
          <Route path="academy/live-sessions/:slug" element={<Academy />} />
          <Route path="live-sessions" element={<Academy />} />

          {/* ── Blog / Nieuws / Content ──────────────────────── */}
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="nieuws" element={<Nieuws />} />
          <Route path="nieuws/:slug" element={<NieuwsDetail />} />
          <Route path="succesverhalen" element={<Succesverhalen />} />
          <Route path="succesverhalen/:slug" element={<SuccesverhalenDetail />} />
          <Route path="actueel" element={<Actueel />} />
          <Route path="actueel/:slug" element={<ActueelDetail />} />
          <Route path="kennisbank/:slug" element={<KennisbankArticle />} />

          {/* ── Changelog ecosystem ──────────────────────────── */}
          <Route path="changelog" element={<Changelog />} />
          <Route path="changelog/aankondigingen" element={<Aankondigingen />} />
          <Route path="changelog/aankondigingen/:id" element={<AnnouncementDetail />} />
          <Route path="changelog/roadmap" element={<Roadmap />} />
          <Route path="changelog/feature-requests" element={<FeatureRequests />} />
          <Route path="changelog/feature-requests/:id" element={<FeatureRequestDetail />} />
          <Route path="changelog/:slug" element={<ChangelogDetail />} />

          {/* ── Overige pagina's ─────────────────────────────── */}
          <Route path="faq" element={<FAQ />} />
          <Route path="help" element={<HelpCenter />} />
          <Route path="helpcentrum" element={<Navigate to="/help" replace />} />
          <Route path="support" element={<Support />} />
          <Route path="ondersteuning" element={<Support />} />
          <Route path="proefversie" element={<Demo />} />
          <Route path="demo" element={<Navigate to="/proefversie" replace />} />
          <Route path="vacancies" element={<WerkenBij />} />
          <Route path="vacancies/:slug" element={<VacancyDetail />} />
          <Route path="werken-bij" element={<Navigate to="/vacancies" replace />} />
          <Route path="zoeken" element={<Zoeken />} />
          <Route path="search" element={<Zoeken />} />
          <Route path="docs" element={<Docs />} />
          <Route path="docs/:section/:page" element={<Docs />} />
          <Route path="programma-van-eisen" element={<ProgrammaVanEisen />} />
          <Route path="ons-verhaal" element={<OnsVerhaal />} />
          <Route path="partners" element={<Partners />} />
          <Route path="tech-stack" element={<TechStack />} />

          {/* ── Redirects ──────────────────────────────────────── */}
          <Route path="woo-rijkspartijen" element={<Navigate to="/woo-rijksoverheid" replace />} />

          {/* ── Statische marketingpagina's (oud pad) ────────── */}
          <Route path="over-ons/samen-ontwikkelen" element={<SamenOntwikkelen />} />
          <Route path="over-ons/woo-oplossing" element={<WooOplossing />} />
          <Route path="over-ons/open-source" element={<OpenSource />} />

          {/* ── Error pagina's ───────────────────────────────── */}
          <Route path="404" element={<ErrorPage />} />

          {/* ── Catch-all: dynamische CMS pagina's ───────────── */}
          <Route path=":slug" element={<DynamicPage />} />
        </Route>
      </Routes>
    </Suspense>
    </PageErrorBoundary>
  )
}

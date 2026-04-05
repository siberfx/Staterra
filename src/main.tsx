import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SiteProvider } from '@/contexts/SiteContext'
import { CookieProvider } from '@/components/cookies/CookieProvider'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SiteProvider>
          <CookieProvider>
            <App />
          </CookieProvider>
        </SiteProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getHeaderMenu, getFooterMenu, getSettings } from '@/lib/cms';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Staterra — Woo-compliance oplossing voor de overheid',
    template: '%s — Staterra',
  },
  description:
    'Staterra implementeert en beheert OPMS, het open source platform voor Woo-compliance. Direct inzetbaar voor 530+ bestuursorganen.',
  keywords: ['Woo', 'compliance', 'overheid', 'OPMS', 'open source', 'bestuursorganen'],
  authors: [{ name: 'Staterra B.V.' }],
  creator: 'Staterra B.V.',
  publisher: 'Staterra B.V.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://staterra.nl'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: '/',
    siteName: 'Staterra',
    title: 'Staterra — Woo-compliance oplossing voor de overheid',
    description:
      'Staterra implementeert en beheert OPMS, het open source platform voor Woo-compliance. Direct inzetbaar voor 530+ bestuursorganen.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staterra — Woo-compliance oplossing voor de overheid',
    description:
      'Staterra implementeert en beheert OPMS, het open source platform voor Woo-compliance.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, headerMenu, footerMenu] = await Promise.all([
    getSettings(),
    getHeaderMenu(),
    getFooterMenu(),
  ]);

  return (
    <html
      lang="nl"
      className={`${sora.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {/* Skip-navigatie voor schermlezer-gebruikers */}
        <a href="#main-content" className="skip-nav">
          Naar hoofdinhoud
        </a>

        <Header menu={headerMenu} settings={settings} />

        <main id="main-content" className="flex-1 pt-16 lg:pt-18">
          {children}
        </main>

        <Footer menu={footerMenu} settings={settings} />
      </body>
    </html>
  );
}

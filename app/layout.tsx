import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SITE, organizationJsonLd } from '@/lib/site';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { Preloader } from '@/components/site/preloader';
import './globals.css';

/**
 * Inter is the self-hosted fallback. Apple hardware resolves to genuine
 * SF Pro through the `-apple-system` stack in globals.css before reaching
 * this — so there is no external font request on the platforms that matter
 * most for the design, and no layout shift anywhere.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Tax architecture, incorporation & digital infrastructure`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    'tax filing India',
    'GST compliance',
    'income tax scrutiny defence',
    'company incorporation',
    'private limited registration',
    'statutory audit',
    'compliance calendar',
    'custom web development',
    'financial SaaS',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  category: 'business',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <body className="bg-canvas text-ink min-h-dvh antialiased">
        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />

        <Preloader />

        <a
          href="#main"
          className="sr-only-focusable bg-brand-600 focus:ring-brand-200 fixed top-4 left-4 z-[100] rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg focus:ring-4"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}

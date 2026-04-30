import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import QuotePopup from '@/components/QuotePopup';
import SiteChrome from '@/components/SiteChrome';
import { getSettings } from '@/lib/settings';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const DEFAULT_OG_IMAGE =
  'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/hero.png';

const R2_HOST = 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();

  const defaultTitle =
    s.metaTitleDefault || `24/7 Emergency Plumber UK | ${s.brand}`;
  const description =
    s.metaDescriptionDefault ||
    `24/7 emergency plumbers across 12 UK cities. Burst pipes, blocked drains, leaks & boiler repairs. Gas Safe registered. Transparent quotes. Call now.`;

  const verification: Metadata['verification'] = {};
  if (s.googleSiteVerification) verification.google = s.googleSiteVerification;
  if (s.bingSiteVerification) {
    verification.other = { ...(verification.other ?? {}), 'msvalidate.01': s.bingSiteVerification };
  }

  const ogImage = s.ogImageUrl || DEFAULT_OG_IMAGE;

  return {
    metadataBase: new URL(s.siteUrl),
    title: {
      default: defaultTitle,
      template: `%s`,
    },
    description,
    icons: s.faviconUrl ? { icon: s.faviconUrl } : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: s.brand,
      images: [{ url: ogImage, width: 1200, height: 630, alt: s.brand }],
    },
    twitter: {
      card: 'summary_large_image',
      site: s.twitterHandle || undefined,
      creator: s.twitterHandle || undefined,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    verification: Object.keys(verification).length ? verification : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <link rel="preconnect" href={R2_HOST} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={R2_HOST} />
        {s.gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${s.gtmId}');`}
          </Script>
        )}
        {s.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${s.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${s.gaId}');`}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans text-ink antialiased" suppressHydrationWarning>
        {s.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${s.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <SiteChrome
          header={
            <Header
              brand={s.brand}
              phoneDisplay={s.phoneDisplay}
              phoneTel={s.phoneTel}
              logoUrl={s.logoUrl}
            />
          }
          footer={<Footer />}
          stickyBar={<MobileStickyBar />}
          popup={<QuotePopup />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}

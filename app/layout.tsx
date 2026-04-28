import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import QuotePopup from '@/components/QuotePopup';
import SiteChrome from '@/components/SiteChrome';
import { getSettings } from '@/lib/settings';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();

  const defaultTitle =
    s.metaTitleDefault || `${s.brand} - 24/7 Emergency Plumber UK`;
  const description =
    s.metaDescriptionDefault ||
    `${s.brand} - 24/7 emergency plumbing across the UK. Burst pipes, boiler repair, blocked drains. Gas Safe registered. Same-rate nights and weekends.`;

  const verification: Metadata['verification'] = {};
  if (s.googleSiteVerification) verification.google = s.googleSiteVerification;
  if (s.bingSiteVerification) {
    verification.other = { ...(verification.other ?? {}), 'msvalidate.01': s.bingSiteVerification };
  }

  return {
    metadataBase: new URL(s.siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${s.brand}`,
    },
    description,
    keywords: s.keywords ? s.keywords.split(',').map((k) => k.trim()).filter(Boolean) : undefined,
    icons: s.faviconUrl ? { icon: s.faviconUrl } : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: s.brand,
      title: defaultTitle,
      description,
      images: s.ogImageUrl ? [{ url: s.ogImageUrl, width: 1200, height: 630, alt: s.brand }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      site: s.twitterHandle || undefined,
      creator: s.twitterHandle || undefined,
      images: s.ogImageUrl ? [s.ogImageUrl] : undefined,
    },
    robots: { index: true, follow: true },
    verification: Object.keys(verification).length ? verification : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <html lang="en-GB" className={`${poppins.variable} ${inter.variable}`}>
      <head>
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
      <body className="font-sans text-ink antialiased">
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

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
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

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(s.siteUrl),
    title: {
      default: `${s.brand} - 24/7 Emergency Plumber UK`,
      template: `%s | ${s.brand}`,
    },
    description: `${s.brand} - 24/7 emergency plumbing across the UK. Burst pipes, boiler repair, blocked drains. Gas Safe registered. Same-rate nights and weekends.`,
    icons: s.faviconUrl ? { icon: s.faviconUrl } : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: s.brand,
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <html lang="en-GB" className={poppins.variable}>
      <body className="font-sans text-ink antialiased">
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

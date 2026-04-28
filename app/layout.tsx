import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import { BRAND, SITE_URL } from '@/lib/constants';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND} - 24/7 Emergency Plumber UK`,
    template: `%s | ${BRAND}`,
  },
  description: `${BRAND} - 24/7 emergency plumbing across the UK. Burst pipes, boiler repair, blocked drains. Gas Safe registered. Same-rate nights and weekends.`,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: BRAND,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={poppins.variable}>
      <body className="font-sans text-ink antialiased">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}

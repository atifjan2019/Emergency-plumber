import Link from 'next/link';
import CallButton from '@/components/CallButton';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-content max-w-2xl text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3">Page not found</h1>
        <p className="mt-4 text-gray-soft">The page you were looking for has moved or never existed. Try the homepage, our service list or call us directly.</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <CallButton size="lg" />
          <Link href="/" className="btn-ghost">Back to homepage</Link>
        </div>
      </div>
    </section>
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  async redirects() {
    return [
      // Force www host (301). Edge / hosting layer should also enforce HTTPS.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'emergencyplumbernow.co.uk' }],
        destination: 'https://www.emergencyplumbernow.co.uk/:path*',
        permanent: true,
      },
      // Belt-and-braces HTTPS upgrade if a request arrives over HTTP via x-forwarded-proto.
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://www.emergencyplumbernow.co.uk/:path*',
        permanent: true,
      },
      // Collapse the duplicate /plumbing-services tree onto the canonical /emergency-plumber tree (301).
      // City pages were noindex with canonical pointing at /emergency-plumber/[city]; redirect saves crawl budget.
      {
        source: '/plumbing-services/:city',
        destination: '/emergency-plumber/:city',
        permanent: true,
      },
      {
        source: '/plumbing-services',
        destination: '/services',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rtlrqoaarbcqxjaituyz.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-d2063e290531450c8615a5e9338ff332.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.emergencyplumbernow.co.uk',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

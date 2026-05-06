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
      // Force www host. Next.js receives the request after the host hits this app,
      // so this catches any request that arrives with a non-www Host header.
      // Edge / DNS / hosting layer should also enforce HTTPS at the network level.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'emergencyplumbernow.co.uk' }],
        destination: 'https://www.emergencyplumbernow.co.uk/:path*',
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

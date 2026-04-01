import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'studio.staterra.nl',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      {
        source: '/over-ons/woo-oplossing',
        destination: '/woo-oplossing',
        permanent: true,
      },
      {
        source: '/over-ons/samen-ontwikkelen',
        destination: '/samen-ontwikkelen',
        permanent: true,
      },
      {
        source: '/over-ons/open-source',
        destination: '/open-source',
        permanent: true,
      },
      {
        source: '/oplossingen/woo-oplossing',
        destination: '/woo-oplossing',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  env: {
    NEXT_PUBLIC_CMS_URL:
      process.env.NEXT_PUBLIC_CMS_URL ?? 'https://studio.staterra.nl',
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://staterra.nl',
  },
};

export default nextConfig;

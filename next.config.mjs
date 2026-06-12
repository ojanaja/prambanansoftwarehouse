import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "placehold.co" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "imagedelivery.net" },
      { hostname: "cdn.sanity.io" },
      { hostname: "image.pollinations.ai" }
    ],
    dangerouslyAllowSVG: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://cdmmwcuqiysfjgbgyodz.supabase.co wss://cdmmwcuqiysfjgbgyodz.supabase.co https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com; frame-ancestors 'none'; object-src 'none';",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/projects/:id',
        destination: '/work/:id',
        permanent: true,
      },
      {
        source: '/education',
        destination: '/solutions/education',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/insights/:slug',
        permanent: true,
      },
      // Localized redirects
      {
        source: '/:locale(id|en)/projects',
        destination: '/:locale/work',
        permanent: true,
      },
      {
        source: '/:locale(id|en)/projects/:id',
        destination: '/:locale/work/:id',
        permanent: true,
      },
      {
        source: '/:locale(id|en)/education',
        destination: '/:locale/solutions/education',
        permanent: true,
      },
      {
        source: '/:locale(id|en)/blog',
        destination: '/:locale/insights',
        permanent: true,
      },
      {
        source: '/:locale(id|en)/blog/:slug',
        destination: '/:locale/insights/:slug',
        permanent: true,
      },
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(withNextIntl(nextConfig));

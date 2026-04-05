import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default withNextIntl(nextConfig);

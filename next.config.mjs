import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "placehold.co", "lh3.googleusercontent.com", "imagedelivery.net", "cdn.sanity.io"],
    dangerouslyAllowSVG: true,
  },
};

export default withNextIntl(nextConfig);

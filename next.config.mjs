/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "placehold.co", "lh3.googleusercontent.com", "imagedelivery.net"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;

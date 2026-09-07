/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Product photos are served locally from /public/images.
    formats: ['image/webp'],
  },
};

export default nextConfig;

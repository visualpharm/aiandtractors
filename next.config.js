/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable React strict mode
  reactStrictMode: true,

  // Enable source maps in development
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
};

module.exports = nextConfig;
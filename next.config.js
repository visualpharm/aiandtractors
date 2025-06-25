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

  // Redirects for invalid years and old multilingual routes
  async redirects() {
    return [
      // Redirect invalid years to latest valid year
      {
        source: '/tech-events-2027',
        destination: '/tech-events-2026',
        permanent: false,
      },
      {
        source: '/tech-events-2028',
        destination: '/tech-events-2026', 
        permanent: false,
      },
      {
        source: '/tech-events-2029',
        destination: '/tech-events-2026',
        permanent: false,
      },
      // Redirect old Spanish routes to English
      {
        source: '/eventos-tech-:year',
        destination: '/tech-events-:year',
        permanent: true,
      },
      {
        source: '/es/eventos-tech-:year',
        destination: '/tech-events-:year',
        permanent: true,
      },
      {
        source: '/es/tech-events-:year',
        destination: '/tech-events-:year', 
        permanent: true,
      },
      // Redirect old Portuguese routes to English
      {
        source: '/pt/eventos-tech-:year',
        destination: '/tech-events-:year',
        permanent: true,
      },
      {
        source: '/pt/tech-events-:year',
        destination: '/tech-events-:year',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
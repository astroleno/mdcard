/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  distDir: '.next',
  generateBuildId: async () => {
    return 'build-' + Date.now();
  }
};

module.exports = nextConfig; 
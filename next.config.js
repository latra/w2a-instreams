/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/w2a-instreams',
  assetPrefix: '/w2a-instreams/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: 'out',

  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig; 
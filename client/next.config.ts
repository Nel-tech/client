import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2000'}/api/:path*`, 
      },
    ];
  },
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'developers.google.com',
    ],
  },
};

export default nextConfig;

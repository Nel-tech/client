import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'developers.google.com',
    ],
  },
};

export default nextConfig;

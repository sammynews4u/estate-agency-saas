import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracing: false,
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'lucide-react': path.resolve(__dirname, 'components/vendor/lucide-react.tsx'),
      recharts: path.resolve(__dirname, 'components/vendor/recharts.tsx'),
    };
    return config;
  },
};

export default nextConfig;

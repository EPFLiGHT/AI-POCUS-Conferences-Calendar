/** @type {import('next').NextConfig} */
const basePath = '/AI-POCUS-Conferences-Calendar';

const nextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig

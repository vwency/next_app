import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '',
  images: {
    unoptimized: false,
  },
}

export default nextConfig

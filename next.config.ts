import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  reactCompiler: true,
  trailingSlash: false,
  generateEtags: true,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true
    }
  },
  // one hour in seconds
  expireTime: 3600,
  allowedDevOrigins: ['localhost', '127.0.0.1', '::1', '[::1]', '[::ffff:127.0.0.1]'],
  typescript: {
    tsconfigPath: 'tsconfig.json'
  },
  devIndicators: {
    position: 'bottom-left'
  },
  distDir: '.next',
  images: {
    remotePatterns: [
      //
    ]
  }
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['ai', 'openai', '@ai-sdk/openai'],
  experimental: {
    streaming: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}

export default nextConfig

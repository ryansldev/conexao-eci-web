/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram.fcpv5-1.fna.fbcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'scontent.fcpv5-1.fna.fbcdn.net'
      }
    ]
  }
}

module.exports = nextConfig

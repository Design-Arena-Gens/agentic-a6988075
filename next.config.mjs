/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: [
      'fluent-ffmpeg',
      '@ffmpeg-installer/ffmpeg',
      '@ffprobe-installer/ffprobe'
    ]
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      canvas: 'commonjs canvas'
    });
    return config;
  }
};

export default nextConfig;

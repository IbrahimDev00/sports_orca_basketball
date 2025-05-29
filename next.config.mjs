/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // This allows any hostname, but you should restrict it to specific domains in production
      },
    ],
  },
};

export default nextConfig;
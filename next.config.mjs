/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

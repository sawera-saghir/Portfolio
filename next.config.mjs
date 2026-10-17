/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    unoptimized: true, // Allows seamless local file and static serving
  },
};

export default nextConfig;

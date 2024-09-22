/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pub-97a967ed06b44efbb305e3f0c3d121ec.r2.dev",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions : {
      bodySizeLimit: "4mb", //we can snet images up to 4mb
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swekxyf8ozdwipnh.public.blob.vercel-storage.com",
      }
    ]
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions : {
      bodySizeLimit: "4mb", //we can snet images up to 4mb
    }
  }
};

export default nextConfig;

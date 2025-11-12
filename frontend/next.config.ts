import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Thêm domain agoda.net vào đây
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pix8.agoda.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["cdn.sanity.io"],
    // Ovdje možeš dodati i druge domene
    // domains: ['cdn.sanity.io', 'example.com'],
  },
  /* config options here */
};

export default nextConfig;

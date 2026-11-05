import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    // Optimizirane slike se dulje keširaju (manje ponovnih transformacija)
    minimumCacheTTL: 2678400, // 31 dan
  },
};

export default nextConfig;

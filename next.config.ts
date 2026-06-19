import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Silence turbopack workspace root warning
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Allow larger request bodies for image uploads (default 1 MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "11mb",
    },
  },
};

export default nextConfig;

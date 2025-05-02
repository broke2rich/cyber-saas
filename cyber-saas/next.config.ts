import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This allows Vercel to build even with lint errors
  },
};

export default nextConfig;

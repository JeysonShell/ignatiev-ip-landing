import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 70, 75],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  headers: () =>
    Promise.resolve([{ source: "/:path*", headers: [...SECURITY_HEADERS] }]),
};

export default nextConfig;

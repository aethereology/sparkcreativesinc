import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Pin the workspace root (a stray lockfile higher in the tree confuses inference).
  turbopack: { root: import.meta.dirname },
  // Tree-shake Phosphor icon imports so dev/build don't compile the whole icon set.
  experimental: { optimizePackageImports: ["@phosphor-icons/react"] },
  // Allow ?v=N cache-busting queries on local images (files keep stable names when re-shot).
  images: { localPatterns: [{ pathname: "/images/**" }] },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        ],
      },
    ];
  },
  async redirects() {
    // Legacy concept → new destination (02_information_architecture/01-sitemap.md).
    return [
      { source: "/sparklearn", destination: "/programs/spark-labs", permanent: true },
      { source: "/spark-learn", destination: "/programs/spark-labs", permanent: true },
      { source: "/ventures", destination: "/programs/spark-studio", permanent: true },
      { source: "/spark-ventures", destination: "/programs/spark-studio", permanent: true },
      { source: "/sparkyouth", destination: "/get-involved#volunteer", permanent: true },
      { source: "/spark-youth", destination: "/get-involved#volunteer", permanent: true },
      { source: "/aethelo", destination: "/about#operations", permanent: true },
    ];
  },
};

export default nextConfig;

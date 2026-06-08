import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray lockfile higher in the tree confuses inference).
  turbopack: { root: import.meta.dirname },
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

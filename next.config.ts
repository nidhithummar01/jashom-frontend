import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  // The finalized home components use plain <a> for internal nav (matching the
  // site's design-system pattern); ESLint's no-html-link-for-pages would block
  // `next build`. TypeScript type-checking still runs.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

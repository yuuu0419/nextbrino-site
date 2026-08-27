import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 注意: experimental.inlineCss は検証済みNG。このサイトはCSSの大半が
     フォントの@font-face定義のため、インライン化するとHTMLが20KB→145KB(gz)に
     膨張してかえって初回表示が遅くなる（2026-07-07計測） */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "prod-files-secure-apne1.s3.ap-northeast-1.amazonaws.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nextbrino.com" }],
        destination: "https://nextbrino.com/:path*",
        permanent: true,
      },
      {
        source: "/lp",
        destination: "/website-lp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nextbrino.com" }],
        destination: "https://nextbrino.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

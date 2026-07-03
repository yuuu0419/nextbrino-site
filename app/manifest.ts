import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXT BRINO",
    short_name: "NEXT BRINO",
    description: "NEXT BRINOの公式サイトです。ITシステム開発・Web制作を中心に6つの事業を提供しております。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#15263b",
    icons: [
      {
        src: "/images/add-logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

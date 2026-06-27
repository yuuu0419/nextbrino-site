import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "NEXT BRINO | IT技術を駆使して日常をデザインする",
  description:
    "NEXT BRINOの公式サイトです。ITシステム開発・Web制作を中心に6つの事業を提供しております。",
  alternates: {
    canonical: "https://nextbrino.com",
  },
  openGraph: {
    title: "NEXT BRINO | IT技術を駆使して日常をデザインする",
    description:
      "NEXT BRINOの公式サイトです。ITシステム開発・Web制作を中心に6つの事業を提供しております。",
    url: "https://nextbrino.com",
    siteName: "NEXT BRINO",
    images: [
      {
        url: "https://nextbrino.com/images/toppage-ogp.jpg",
        width: 1200,
        height: 630,
        alt: "NEXT BRINO | IT技術を駆使して日常をデザインする",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT BRINO | IT技術を駆使して日常をデザインする",
    description:
      "NEXT BRINOの公式サイトです。ITシステム開発・Web制作を中心に6つの事業を提供しております。",
    images: ["https://nextbrino.com/images/toppage-ogp.jpg"],
  },
};

export default function Home() {
  return (
    <HomeClient />
  );
}

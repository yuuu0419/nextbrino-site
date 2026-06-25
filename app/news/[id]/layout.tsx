import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お知らせ詳細｜NEXT BRINO",
  description: "NEXT BRINOからの最新のお知らせ・ニュースをご覧いただけます。",
  openGraph: {
    title: "お知らせ詳細｜NEXT BRINO",
    description: "NEXT BRINOからの最新のお知らせ・ニュースをご覧いただけます。",
    url: "https://nextbrino.com/news",
    siteName: "NEXT BRINO",
    images: [{ url: "https://nextbrino.com/images/news-ogp.jpg", width: 1200, height: 630, alt: "お知らせ｜NEXT BRINO" }],
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "お知らせ詳細｜NEXT BRINO",
    description: "NEXT BRINOからの最新のお知らせ・ニュースをご覧いただけます。",
    images: ["https://nextbrino.com/images/news-ogp.jpg"],
  },
};

export default function NewsDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

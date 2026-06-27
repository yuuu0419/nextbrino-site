import type { Metadata } from "next";

const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const BASE_URL = "https://nextbrino.com";

async function fetchPageTitle(id: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const page = await res.json();
    const props = page.properties;
    const titleProp = props["名前"] ?? props["タイトル"] ?? props["title"];
    return titleProp?.title?.map((t: any) => t.plain_text).join("") ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const title = await fetchPageTitle(id);
  const pageTitle = title ? `${title}｜NEXT BRINO` : "お知らせ詳細｜NEXT BRINO";
  const description = title
    ? `${title} — NEXT BRINOからのお知らせです。`
    : "NEXT BRINOからの最新のお知らせ・ニュースをご覧いただけます。";
  const url = `${BASE_URL}/news/${id}`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: "NEXT BRINO",
      images: [{ url: `${BASE_URL}/images/news-ogp.jpg`, width: 1200, height: 630, alt: "お知らせ｜NEXT BRINO" }],
      locale: "ja_JP",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [`${BASE_URL}/images/news-ogp.jpg`],
    },
  };
}

export default function NewsDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

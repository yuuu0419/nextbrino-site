import { MetadataRoute } from "next";

const BASE_URL = "https://nextbrino.com";

async function getNewsPages(): Promise<{ id: string; lastModified: Date }[]> {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: { property: "公開", checkbox: { equals: true } },
        }),
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results ?? []).map((page: any) => ({
      id: page.id.replace(/-/g, ""),
      lastModified: new Date(page.last_edited_time ?? page.created_time),
    }));
  } catch {
    return [];
  }
}

const NOW = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1.0, lastModified: NOW },
    { url: `${BASE_URL}/service`, changeFrequency: "monthly", priority: 0.8, lastModified: NOW },
    { url: `${BASE_URL}/philosophy`, changeFrequency: "monthly", priority: 0.8, lastModified: NOW },
    { url: `${BASE_URL}/overview`, changeFrequency: "monthly", priority: 0.8, lastModified: NOW },
    { url: `${BASE_URL}/news`, changeFrequency: "weekly", priority: 0.7, lastModified: NOW },
    { url: `${BASE_URL}/recruit`, changeFrequency: "monthly", priority: 0.7, lastModified: NOW },
    { url: `${BASE_URL}/internship`, changeFrequency: "monthly", priority: 0.6, lastModified: NOW },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6, lastModified: NOW },
    { url: `${BASE_URL}/message-kuroki-yuta`, changeFrequency: "monthly", priority: 0.5, lastModified: NOW },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3, lastModified: NOW },
    { url: `${BASE_URL}/legal-notice`, changeFrequency: "yearly", priority: 0.3, lastModified: NOW },
    { url: `${BASE_URL}/anti-social-forces-policy`, changeFrequency: "yearly", priority: 0.3, lastModified: NOW },
    { url: `${BASE_URL}/contact-policy`, changeFrequency: "yearly", priority: 0.3, lastModified: NOW },
  ];

  const newsPages_data = await getNewsPages();
  const newsPages: MetadataRoute.Sitemap = newsPages_data.map(({ id, lastModified }) => ({
    url: `${BASE_URL}/news/${id}`,
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified,
  }));

  return [...staticPages, ...newsPages];
}

import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "公開",
            checkbox: { equals: true },
          },
          sorts: [{ property: "日付", direction: "descending" }],
        }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Notion error:", err);
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();

    const posts = (data.results ?? []).map((page: any, i: number) => {
      const props = page.properties;

      const titleProp = props["名前"] ?? props["タイトル"] ?? props["title"];
      const title =
        titleProp?.title?.map((t: any) => t.plain_text).join("") ?? "（タイトルなし）";

      const dateProp = props["日付"];
      const date = dateProp?.date?.start ?? page.created_time;

      const urlProp = props["URL"];
      const link = urlProp?.url ?? page.url;

      const thumbProp = props["サムネイル"];
      const thumbFile = thumbProp?.files?.[0];
      const thumbnail =
        thumbFile?.type === "file"
          ? thumbFile.file.url
          : thumbFile?.type === "external"
          ? thumbFile.external.url
          : null;

      return {
        id: i,
        notionId: page.id.replace(/-/g, ""),
        title: { rendered: title },
        link,
        date,
        thumbnail,
      };
    });

    return NextResponse.json(posts);
  } catch (e) {
    console.error("fetch error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

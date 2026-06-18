import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN!;

async function fetchBlocks(blockId: string): Promise<any[]> {
  const res = await fetch(
    `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`,
    {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // ページのプロパティ取得
    const pageRes = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
      cache: "no-store",
    });
    if (!pageRes.ok) return NextResponse.json({ error: "not found" }, { status: 404 });
    const page = await pageRes.json();

    const props = page.properties;
    const titleProp = props["名前"] ?? props["タイトル"] ?? props["title"];
    const title = titleProp?.title?.map((t: any) => t.plain_text).join("") ?? "";
    const dateProp = props["日付"];
    const date = dateProp?.date?.start ?? page.created_time;

    // ブロック取得
    const blocks = await fetchBlocks(id);

    return NextResponse.json({ title, date, blocks });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}

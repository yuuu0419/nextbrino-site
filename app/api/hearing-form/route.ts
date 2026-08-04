import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

type Row = { label: string; value: string };

const BLOCKS_PER_REQUEST = 50;

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

export async function POST(req: NextRequest) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = process.env.NOTION_HEARING_DATABASE_ID!;

  try {
    const body = await req.json();
    const rows: Row[] = Array.isArray(body?.rows) ? body.rows : [];
    const companyName = rows[0]?.value || "（会社名未入力）";

    const page = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        会社名: { title: [{ text: { content: companyName } }] },
        送信日時: { date: { start: new Date().toISOString() } },
      },
    });

    const blocks = rows.map((row) => ({
      object: "block" as const,
      type: "paragraph" as const,
      paragraph: {
        rich_text: [
          { type: "text" as const, text: { content: `${row.label}: ` }, annotations: { bold: true } },
          { type: "text" as const, text: { content: row.value || "（未回答）" } },
        ],
      },
    }));

    for (const batch of chunk(blocks, BLOCKS_PER_REQUEST)) {
      await notion.blocks.children.append({ block_id: page.id, children: batch });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Hearing form submission error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}

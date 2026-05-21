import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://nextbrino.com/wp-json/wp/v2/posts?per_page=50&orderby=date&order=desc&status=publish&_fields=id,title,link,date",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error("fetch failed");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Client } from "@notionhq/client";

const resend = new Resend(process.env.RESEND_API_KEY);
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      category,
      company,
      department,
      name,
      email,
      phone,
      lineId,
      postalCode,
      address,
      url,
      message,
      budget,
    } = body;

    // Notionに保存
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        氏名: { title: [{ text: { content: name || "" } }] },
        カテゴリー: { rich_text: [{ text: { content: category || "" } }] },
        "会社名・団体名": { rich_text: [{ text: { content: company || "" } }] },
        部署名: { rich_text: [{ text: { content: department || "" } }] },
        メールアドレス: { rich_text: [{ text: { content: email || "" } }] },
        電話番号: { rich_text: [{ text: { content: phone || "" } }] },
        "LINE ID": { rich_text: [{ text: { content: lineId || "" } }] },
        問合せ内容: { rich_text: [{ text: { content: message || "" } }] },
        受信日時: { date: { start: new Date().toISOString() } },
      },
    });

    // 管理者へ通知メール
    await resend.emails.send({
      from: "NEXT BRINO <noreply@nextbrino.com>",
      to: "kuroki-yuta@nextbrino.com",
      subject: `【お問い合わせ】${category} - ${name}様`,
      html: `
        <h2>新しいお問い合わせが届きました</h2>
        <table border="1" cellpadding="8" style="border-collapse:collapse;">
          <tr><th>お問い合わせ種別</th><td>${category || "-"}</td></tr>
          <tr><th>会社名・団体名</th><td>${company || "-"}</td></tr>
          <tr><th>部署名</th><td>${department || "-"}</td></tr>
          <tr><th>氏名</th><td>${name || "-"}</td></tr>
          <tr><th>メールアドレス</th><td>${email || "-"}</td></tr>
          <tr><th>電話番号</th><td>${phone || "-"}</td></tr>
          <tr><th>LINE ID</th><td>${lineId || "-"}</td></tr>
          <tr><th>郵便番号</th><td>${postalCode || "-"}</td></tr>
          <tr><th>住所</th><td>${address || "-"}</td></tr>
          <tr><th>ホームページURL</th><td>${url || "-"}</td></tr>
          <tr><th>お問い合わせ内容</th><td>${message || "-"}</td></tr>
          <tr><th>ご予算</th><td>${budget ? budget + "万円" : "-"}</td></tr>
        </table>
      `,
    });

    // 自動返信メール
    await resend.emails.send({
      from: "NEXT BRINO <noreply@nextbrino.com>",
      to: email,
      subject: "【NEXT BRINO】お問い合わせを受け付けました",
      html: `
        <p>${name} 様</p>
        <p>この度はNEXT BRINOへお問い合わせいただき、誠にありがとうございます。</p>
        <p>以下の内容でお問い合わせを受け付けました。<br>
        内容を確認のうえ、担当者よりご連絡いたします。</p>
        <hr>
        <table border="1" cellpadding="8" style="border-collapse:collapse;">
          <tr><th>お問い合わせ種別</th><td>${category || "-"}</td></tr>
          <tr><th>お問い合わせ内容</th><td>${message || "-"}</td></tr>
        </table>
        <hr>
        <p>※このメールは自動送信です。返信はできません。</p>
        <p>NEXT BRINO</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}

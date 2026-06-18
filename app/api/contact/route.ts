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
        "予算（万円）": { rich_text: [{ text: { content: budget || "" } }] },
        受信日時: { date: { start: new Date().toISOString() } },
      },
    });

    // 管理者へ通知メール
    const adminOptionalFields: { label: string; value: string }[] = [
      { label: "会社名・団体名", value: company },
      { label: "電話番号", value: phone },
      { label: "LINE ID", value: lineId },
      { label: "ホームページURL", value: url },
      { label: "ご予算", value: budget ? `${budget}万円` : "" },
    ];

    const adminOptionalRows = adminOptionalFields
      .filter((f) => f.value)
      .map((f) => `<tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">${f.label}</th><td style="padding:8px 16px;">${f.value}</td></tr>`)
      .join("");

    await resend.emails.send({
      from: "NEXT BRINO <onboarding@resend.dev>",
      to: "kuroki-yuta@nextbrino.com",
      subject: "NEXT BRINO｜問合せ",
      html: `
        <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">カテゴリー</th><td style="padding:8px 16px;">${category}</td></tr>
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">氏名</th><td style="padding:8px 16px;">${name}</td></tr>
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">メールアドレス</th><td style="padding:8px 16px;">${email}</td></tr>
          ${adminOptionalRows}
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">お問い合わせ内容</th><td style="padding:8px 16px;white-space:pre-wrap;">${message}</td></tr>
        </table>
      `,
    });

    // 自動返信メール
    const optionalFields: { label: string; value: string }[] = [
      { label: "会社名・団体名", value: company },
      { label: "部署名", value: department },
      { label: "電話番号", value: phone },
      { label: "LINE ID", value: lineId },
      { label: "郵便番号", value: postalCode },
      { label: "住所", value: address },
      { label: "ホームページURL", value: url },
      { label: "ご予算", value: budget ? `${budget}万円` : "" },
    ];

    const optionalRows = optionalFields
      .filter((f) => f.value)
      .map((f) => `<tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">${f.label}</th><td style="padding:8px 16px;">${f.value}</td></tr>`)
      .join("");

    await resend.emails.send({
      from: "NEXT BRINO <onboarding@resend.dev>",
      to: email,
      subject: "お問い合わせを受け付けました。",
      html: `
        <p>${name} 様</p>
        <p>この度はNEXT BRINOにお問い合わせいただき、<br>誠にありがとうございます。</p>
        <p>以下の内容でお問い合わせを受け付けました。</p>
        <p>通常2〜5営業日以内に担当者よりご返信いたします。</p>
        <p>お問い合わせの内容によっては、回答いたしかねる場合がございますので、あらかじめご了承ください。</p>
        <p style="color:#999;font-size:.85em;">※このメールは自動送信です。返信はできません。</p>
        <hr>
        <p><strong>お問い合わせ内容</strong></p>
        <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">お問い合わせ種別</th><td style="padding:8px 16px;">${category}</td></tr>
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">氏名</th><td style="padding:8px 16px;">${name} 様</td></tr>
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">メールアドレス</th><td style="padding:8px 16px;">${email}</td></tr>
          ${optionalRows}
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">お問い合わせ内容</th><td style="padding:8px 16px;white-space:pre-wrap;">${message}</td></tr>
        </table>
        <hr>
        <p>上記の内容に誤りがございましたら、<br>お手数ですが改めてお問い合わせフォームよりご送信ください。</p>
        <p>引き続きよろしくお願いいたします。</p>
        <p>【 お問い合わせ基本方針 】<br>
        <a href="https://nextbrino.com/contact-policy">https://nextbrino.com/contact-policy</a></p>
        <hr>
        <p>NEXT BRINO｜ネクストブライノ<br>
        E-mail：support@nextbrino.com<br>
        公式サイト：<a href="https://nextbrino.com">https://nextbrino.com</a></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}

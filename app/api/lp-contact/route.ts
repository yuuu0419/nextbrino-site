import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Client } from "@notionhq/client";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!token) return false;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: token,
    }),
  });
  const data = await res.json();
  return data.success === true && data.action === "lp_contact" && data.score >= RECAPTCHA_SCORE_THRESHOLD;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const NOTIFY_TO = process.env.LP_NOTIFY_EMAIL || "kuroki-yuta@nextbrino.com";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const NOTION_LP_DATABASE_ID = process.env.NOTION_LP_DATABASE_ID;
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "送信回数の上限に達しました。時間をおいて再度お試しください。" }, { status: 429 });
    }

    const body = await req.json();
    const {
      category,
      name,
      company,
      email,
      phone,
      lineId,
      instagram,
      siteType,
      budget,
      timeline,
      message,
      referrer,
      website,
      recaptchaToken,
    } = body;

    // Honeypot: ボットが自動入力するため、値が入っていれば静かに成功扱いで破棄
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!category || !name || !email || !message) {
      return NextResponse.json({ error: "必須項目が未入力です。" }, { status: 400 });
    }

    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) {
      return NextResponse.json({ error: "reCAPTCHA認証に失敗しました。再度お試しください。" }, { status: 400 });
    }

    // Notionに保存（データベースIDが未設定の間はスキップし、メール通知のみで運用継続する）
    if (NOTION_LP_DATABASE_ID) {
      await notion.pages.create({
        parent: { database_id: NOTION_LP_DATABASE_ID },
        properties: {
          氏名: { title: [{ text: { content: name || "" } }] },
          種別: { rich_text: [{ text: { content: category || "" } }] },
          "会社名・団体名": { rich_text: [{ text: { content: company || "" } }] },
          メールアドレス: { rich_text: [{ text: { content: email || "" } }] },
          電話番号: { rich_text: [{ text: { content: phone || "" } }] },
          "LINE ID": { rich_text: [{ text: { content: lineId || "" } }] },
          Instagram: { rich_text: [{ text: { content: instagram || "" } }] },
          サイトタイプ: { rich_text: [{ text: { content: siteType || "" } }] },
          "予算（万円）": { rich_text: [{ text: { content: budget || "" } }] },
          公開時期: { rich_text: [{ text: { content: timeline || "" } }] },
          きっかけ: { rich_text: [{ text: { content: referrer || "" } }] },
          ご相談内容: { rich_text: [{ text: { content: message || "" } }] },
          受信日時: { date: { start: new Date().toISOString() } },
        },
      });
    } else {
      console.warn("NOTION_LP_DATABASE_ID 未設定のため、Notionへの登録をスキップしました。");
    }

    // 管理者へ通知メール
    const optionalFields: { label: string; value: string }[] = [
      { label: "会社名・団体名", value: company },
      { label: "電話番号", value: phone },
      { label: "LINE ID", value: lineId },
      { label: "Instagram", value: instagram },
      { label: "ご希望のサイトタイプ", value: siteType },
      { label: "ご予算", value: budget ? `${budget}万円` : "" },
      { label: "ご希望の公開時期", value: timeline },
      { label: "知ったきっかけ", value: referrer },
    ];

    const optionalRows = optionalFields
      .filter((f) => f.value)
      .map((f) => `<tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">${escapeHtml(f.label)}</th><td style="padding:8px 16px;">${escapeHtml(f.value)}</td></tr>`)
      .join("");

    await resend.emails.send({
      from: "NEXT BRINO <noreply@nextbrino.com>",
      to: NOTIFY_TO,
      subject: "【LP】ホームページ制作サービス｜問合せ",
      html: `
        <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">お問い合わせ種別</th><td style="padding:8px 16px;">${escapeHtml(category)}</td></tr>
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">氏名</th><td style="padding:8px 16px;">${escapeHtml(name)}</td></tr>
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">メールアドレス</th><td style="padding:8px 16px;">${escapeHtml(email)}</td></tr>
          ${optionalRows}
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">ご相談内容・ご要望</th><td style="padding:8px 16px;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
        </table>
      `,
    });

    // 自動返信メール
    await resend.emails.send({
      from: "NEXT BRINO <noreply@nextbrino.com>",
      to: email,
      subject: "お問い合わせを受け付けました。",
      html: `
        <p>${escapeHtml(name)} 様</p>
        <p>この度はNEXT BRINOのホームページ制作サービスにお問い合わせいただき、<br>誠にありがとうございます。</p>
        <p>以下の内容でお問い合わせを受け付けました。</p>
        <p>通常2〜5営業日以内に担当者よりご返信いたします。</p>
        <p style="color:#999;font-size:.85em;">※このメールは自動送信です。返信はできません。</p>
        <hr>
        <p><strong>お問い合わせ内容</strong></p>
        <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">お問い合わせ種別</th><td style="padding:8px 16px;">${escapeHtml(category)}</td></tr>
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">氏名</th><td style="padding:8px 16px;">${escapeHtml(name)} 様</td></tr>
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">メールアドレス</th><td style="padding:8px 16px;">${escapeHtml(email)}</td></tr>
          ${optionalRows}
          <tr><th style="text-align:left;padding:8px 16px;white-space:nowrap;background:#f5f5f5;">ご相談内容・ご要望</th><td style="padding:8px 16px;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
        </table>
        <hr>
        <p>上記の内容に誤りがございましたら、<br>お手数ですが改めてお問い合わせフォームよりご送信ください。</p>
        <p>引き続きよろしくお願いいたします。</p>
        <hr>
        <p>NEXT BRINO｜ネクストブライノ<br>
        E-mail：support@nextbrino.com<br>
        公式サイト：<a href="https://nextbrino.com">https://nextbrino.com</a></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LP contact form error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}

"use client";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function LpForm() {
  const [form, setForm] = useState({
    category: "", name: "", company: "", email: "", phone: "",
    lineId: "", instagram: "", siteType: "", budget: "",
    timeline: "", message: "", referrer: "",
  });
  const [website, setWebsite] = useState("");
  const [agrees, setAgrees] = useState([false, false, false]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const toggleAgree = (i: number) =>
    setAgrees((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const canSubmit = agrees.every(Boolean) && form.category && form.name && form.email && form.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      const recaptchaToken: string = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: "lp_contact" })
            .then(resolve, reject);
        });
      });

      const res = await fetch("/api/lp-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, recaptchaToken }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="lpf-complete">
        <p className="lpf-complete-title">送信が完了しました</p>
        <p className="lpf-complete-text">お問い合わせありがとうございます。<br />内容を確認のうえ、担当者よりご連絡いたします。</p>
      </div>
    );
  }

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} strategy="afterInteractive" />
      <form className="lpf-form" onSubmit={handleSubmit}>
        <div className="lpf-honeypot" aria-hidden="true">
          <label htmlFor="lp-website">Website</label>
          <input
            type="text"
            id="lp-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="lpf-table">
          <div className="lpf-row">
            <div className="lpf-label-cell">お問い合わせ種別 <span className="lpf-req">必須</span></div>
            <div className="lpf-input-cell">
              <div className="lpf-select-wrap">
                <select className="lpf-input" value={form.category} onChange={set("category")}>
                  <option value="">選択してください</option>
                  <option>サイト制作依頼</option>
                  <option>見積もり依頼</option>
                  <option>無料相談</option>
                  <option>その他</option>
                </select>
                <span className="lpf-select-arrow">▼</span>
              </div>
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">お名前 <span className="lpf-req">必須</span></div>
            <div className="lpf-input-cell">
              <input type="text" className="lpf-input" placeholder="例 ) 山田 太郎" value={form.name} onChange={set("name")} />
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">会社名・団体名 <span className="lpf-opt">任意</span></div>
            <div className="lpf-input-cell">
              <input type="text" className="lpf-input" placeholder="例 ) 株式会社〇〇〇〇（個人の場合は空欄可）" value={form.company} onChange={set("company")} />
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">メールアドレス <span className="lpf-req">必須</span></div>
            <div className="lpf-input-cell">
              <input type="email" className="lpf-input" placeholder="例 ) taro@example.com" value={form.email} onChange={set("email")} />
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">電話番号 <span className="lpf-opt">任意</span></div>
            <div className="lpf-input-cell">
              <input type="tel" className="lpf-input" placeholder="例 ) 00-0000-0000（携帯可）" value={form.phone} onChange={set("phone")} />
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">LINE ID <span className="lpf-opt">任意</span></div>
            <div className="lpf-input-cell">
              <input type="text" className="lpf-input" placeholder="LINEでの連絡をご希望の場合にご入力ください" value={form.lineId} onChange={set("lineId")} />
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">Instagramアカウント <span className="lpf-opt">任意</span></div>
            <div className="lpf-input-cell">
              <input type="text" className="lpf-input" placeholder="例 ) @nextbrino" value={form.instagram} onChange={set("instagram")} />
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">ご希望のサイトタイプ <span className="lpf-opt">任意</span></div>
            <div className="lpf-input-cell">
              <div className="lpf-select-wrap">
                <select className="lpf-input" value={form.siteType} onChange={set("siteType")}>
                  <option value="">選択してください</option>
                  <option>コーポレートサイト</option>
                  <option>LP</option>
                  <option>採用サイト</option>
                  <option>ECサイト</option>
                  <option>その他・未定</option>
                </select>
                <span className="lpf-select-arrow">▼</span>
              </div>
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">ご予算 <span className="lpf-opt">任意</span></div>
            <div className="lpf-input-cell">
              <div className="lpf-budget-wrap">
                <input type="text" inputMode="numeric" className="lpf-input lpf-budget-input" placeholder="50" value={form.budget} onChange={set("budget")} />
                <span className="lpf-budget-unit">万円</span>
              </div>
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">ご希望の公開時期 <span className="lpf-opt">任意</span></div>
            <div className="lpf-input-cell">
              <div className="lpf-select-wrap">
                <select className="lpf-input" value={form.timeline} onChange={set("timeline")}>
                  <option value="">選択してください</option>
                  <option>1ヶ月以内</option>
                  <option>1〜3ヶ月</option>
                  <option>3ヶ月以上先</option>
                  <option>未定</option>
                </select>
                <span className="lpf-select-arrow">▼</span>
              </div>
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">ご相談内容・ご要望 <span className="lpf-req">必須</span></div>
            <div className="lpf-input-cell">
              <textarea
                className="lpf-input lpf-textarea"
                placeholder="例 ) 現在のサイトの問い合わせが少なく、集客に強いサイトへ刷新したいです。会社の強みをしっかり伝えられるデザインを希望します。"
                value={form.message}
                onChange={set("message")}
              />
            </div>
          </div>

          <div className="lpf-row">
            <div className="lpf-label-cell">知ったきっかけ <span className="lpf-opt">任意</span></div>
            <div className="lpf-input-cell">
              <div className="lpf-select-wrap">
                <select className="lpf-input" value={form.referrer} onChange={set("referrer")}>
                  <option value="">選択してください</option>
                  <option>紹介</option>
                  <option>SNS</option>
                  <option>検索</option>
                  <option>営業資料</option>
                  <option>その他</option>
                </select>
                <span className="lpf-select-arrow">▼</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lpf-agree-section">
          {[
            { href: "/privacy-policy", label: "個人情報保護方針" },
            { href: "/contact-policy", label: "お問合せ対応基本方針" },
            { href: "/anti-social-forces-policy", label: "反社会的勢力に対する基本方針" },
          ].map((item, i) => (
            <label key={i} className="lpf-agree-row">
              <input type="checkbox" className="lpf-checkbox" checked={agrees[i]} onChange={() => toggleAgree(i)} />
              <span><Link href={item.href} className="lpf-policy-link">{item.label}</Link>に同意する</span>
            </label>
          ))}
        </div>

        {status === "error" && (
          <p className="lpf-error">送信に失敗しました。時間をおいて再度お試しください。</p>
        )}

        <div className="lpf-submit-wrap">
          <button type="submit" className="lpf-submit" disabled={!canSubmit || status === "sending"}>
            {status === "sending" ? "送信中..." : "無料相談を送信する"}
          </button>
        </div>

        <p className="lpf-recaptcha-note">
          このサイトはreCAPTCHAによって保護されており、Googleの
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>と
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">利用規約</a>が適用されます。
        </p>

        <style>{`
          .lpf-honeypot { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
          .lpf-complete { text-align: center; padding: 80px 0; }
          .lpf-complete-title { font-size: 1.4rem; font-weight: 700; color: #15263b; margin-bottom: 16px; }
          .lpf-complete-text { font-size: .95rem; line-height: 2; color: rgba(21,38,59,0.75); }

          .lpf-form { display: flex; flex-direction: column; }
          .lpf-table { width: 100%; border-top: 1px solid rgba(21,38,59,0.15); }
          .lpf-row { display: flex; align-items: flex-start; border-bottom: 1px solid rgba(21,38,59,0.15); padding: 22px 0; }
          .lpf-label-cell {
            width: 240px; min-width: 240px; font-size: .88rem; font-weight: 700;
            color: rgba(21,38,59,0.9); letter-spacing: .03em;
            display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
            padding-right: 24px; padding-top: 10px;
          }
          .lpf-req {
            font-size: .7rem; background: #e8720c; color: #fff; padding: 2px 8px;
            border-radius: 2px; letter-spacing: .06em; font-weight: 700; flex-shrink: 0;
          }
          .lpf-opt {
            font-size: .7rem; background: rgba(21,38,59,0.12); color: rgba(21,38,59,0.7);
            padding: 2px 8px; border-radius: 2px; letter-spacing: .06em; font-weight: 700; flex-shrink: 0;
          }
          .lpf-input-cell { flex: 1; display: flex; flex-direction: column; }
          .lpf-select-wrap { position: relative; display: block; width: 100%; }
          .lpf-select-wrap select { appearance: none; -webkit-appearance: none; }
          .lpf-select-arrow {
            position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
            pointer-events: none; font-size: .7rem; color: rgba(21,38,59,0.5);
          }
          .lpf-input {
            width: 100%; padding: 11px 14px; border: 1px solid rgba(21,38,59,0.2);
            border-radius: 4px; font-size: .9rem; font-family: var(--font-main);
            color: #15263b; background: rgba(255,255,255,0.7); outline: none;
            box-sizing: border-box; transition: border-color .2s, background .2s;
          }
          .lpf-input::placeholder { color: rgba(21,38,59,0.35); }
          .lpf-input:focus { border-color: #e8720c; background: #fff; }
          .lpf-textarea { min-height: 160px; resize: vertical; }
          .lpf-budget-wrap { display: flex; align-items: center; gap: 10px; }
          .lpf-budget-input { max-width: 160px; }
          .lpf-budget-unit { font-size: .9rem; color: rgba(21,38,59,0.8); white-space: nowrap; }

          .lpf-agree-section { margin: 30px 0 36px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
          .lpf-agree-row { display: flex; align-items: center; gap: 10px; font-size: .88rem; color: rgba(21,38,59,0.8); cursor: pointer; }
          .lpf-checkbox { width: 18px; height: 18px; accent-color: #e8720c; flex-shrink: 0; }
          .lpf-policy-link { color: #15263b; font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }
          .lpf-policy-link:hover { opacity: .65; }

          .lpf-submit-wrap { text-align: center; margin-bottom: 8px; }
          .lpf-submit {
            display: inline-block; width: 100%; max-width: 600px; padding: 18px 0;
            background: #e8720c; color: #fff; border: 1px solid #e8720c;
            font-size: .95rem; letter-spacing: .18em; font-family: var(--font-main);
            font-weight: 700; cursor: pointer; border-radius: 4px;
            transition: background .25s, border-color .25s;
          }
          .lpf-submit:hover:not(:disabled) { background: #cc6109; border-color: #cc6109; }
          .lpf-submit:disabled { opacity: 0.4; cursor: not-allowed; }
          .lpf-error { text-align: center; color: #c0392b; font-size: .9rem; margin-bottom: 16px; }

          .lpf-recaptcha-note {
            text-align: center; font-size: .68rem; color: rgba(21,38,59,0.45);
            letter-spacing: .02em; line-height: 1.8; margin-top: 14px;
          }
          .lpf-recaptcha-note a { color: rgba(21,38,59,0.55); text-decoration: underline; }

          @media (max-width: 640px) {
            .lpf-row { flex-direction: column; gap: 10px; padding: 18px 0; }
            .lpf-label-cell { width: 100%; min-width: unset; padding-top: 0; padding-right: 0; }
            .lpf-input-cell { width: 100%; }
            .lpf-submit { max-width: 100%; padding: 16px 0; font-size: .88rem; }
          }
        `}</style>
      </form>
    </>
  );
}

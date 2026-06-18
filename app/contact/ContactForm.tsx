"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [form, setForm] = useState({
    category: "", company: "", department: "", name: "",
    email: "", phone: "", lineId: "", postalCode: "",
    address: "", url: "", message: "", budget: "",
  });
  const [agrees, setAgrees] = useState([false, false, false]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const toggleAgree = (i: number) =>
    setAgrees((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const canSubmit = agrees.every(Boolean) && form.name && form.email && form.phone && form.category && form.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="ct-complete">
        <p className="ct-complete-title">送信が完了しました</p>
        <p className="ct-complete-text">お問い合わせありがとうございます。<br />内容を確認のうえ、担当者よりご連絡いたします。</p>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={handleSubmit}>
      <div className="ct-table">

        <div className="ct-row">
          <div className="ct-label-cell">お問い合わせ種別 <span className="ct-req">必須</span></div>
          <div className="ct-input-cell">
            <div className="ct-select-wrap">
              <select className="ct-input" value={form.category} onChange={set("category")}>
                <option value="">選択してください</option>
                <option>サービスについて</option>
                <option>見積もり依頼</option>
                <option>ご質問・ご相談</option>
                <option>取材・広報</option>
                <option>サポートについて</option>
                <option>パートナーシップ・協業について</option>
                <option>その他</option>
              </select>
              <span className="ct-select-arrow">▼</span>
            </div>
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">会社名・団体名 <span className="ct-opt">任意</span></div>
          <div className="ct-input-cell">
            <input type="text" className="ct-input" placeholder="例 ) 株式会社〇〇〇〇" value={form.company} onChange={set("company")} />
            <p className="ct-hint">個人事業主：屋号をお持ちの方はご入力ください</p>
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">部署名 <span className="ct-opt">任意</span></div>
          <div className="ct-input-cell">
            <input type="text" className="ct-input" placeholder="例 ) 営業部" value={form.department} onChange={set("department")} />
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">氏名 <span className="ct-req">必須</span></div>
          <div className="ct-input-cell">
            <input type="text" className="ct-input" placeholder="例 ) 山田 太郎" value={form.name} onChange={set("name")} />
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">メールアドレス <span className="ct-req">必須</span></div>
          <div className="ct-input-cell">
            <input type="email" className="ct-input" placeholder="例 ) taro@example.com" value={form.email} onChange={set("email")} />
            <p className="ct-hint">基本的にはメールにてご返信いたします。</p>
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">電話番号 <span className="ct-req">必須</span></div>
          <div className="ct-input-cell">
            <input type="tel" className="ct-input" placeholder="例 ) 00-0000-0000 ( 携帯可 )" value={form.phone} onChange={set("phone")} />
            <p className="ct-hint ct-hint-nowrap">お電話にてご連絡させていただく場合がございます。</p>
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">LINE ID <span className="ct-opt">任意</span></div>
          <div className="ct-input-cell">
            <input type="text" className="ct-input" placeholder="例 ) nextbrino" value={form.lineId} onChange={set("lineId")} />
            <p className="ct-hint ct-hint-nowrap">LINEにてご連絡させていただく場合がございます。</p>
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">郵便番号 <span className="ct-opt">任意</span></div>
          <div className="ct-input-cell">
            <input type="text" className="ct-input ct-input-half" placeholder="例 ) 106-0032" value={form.postalCode} onChange={set("postalCode")} />
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">住所 <span className="ct-opt">任意</span></div>
          <div className="ct-input-cell">
            <input type="text" className="ct-input" placeholder="例 ) 東京都港区六本木○-○-○" value={form.address} onChange={set("address")} />
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">ホームページURL <span className="ct-opt">任意</span></div>
          <div className="ct-input-cell">
            <input type="url" className="ct-input" placeholder="例 ) https://www.example.com" value={form.url} onChange={set("url")} />
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">お問い合わせ内容 <span className="ct-req">必須</span></div>
          <div className="ct-input-cell">
            <textarea className="ct-input ct-textarea" placeholder="お問い合わせ内容をご入力ください。" value={form.message} onChange={set("message")} />
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-label-cell">ご予算 <span className="ct-opt">任意</span></div>
          <div className="ct-input-cell">
            <div className="ct-budget-wrap">
              <input type="text" className="ct-input ct-budget-input" value={form.budget} onChange={set("budget")} />
              <span className="ct-budget-unit">万円</span>
            </div>
            <p className="ct-hint ct-hint-nowrap">ご入力いただけますと、より具体的なご提案が可能です。</p>
          </div>
        </div>

      </div>

      <div className="ct-agree-section">
        {[
          { href: "/privacy-policy/", label: "個人情報保護方針" },
          { href: "/contact-policy/", label: "お問合せ対応基本方針" },
          { href: "/anti-social-forces-policy/", label: "反社会的勢力に対する基本方針" },
        ].map((item, i) => (
          <label key={i} className="ct-agree-row">
            <input type="checkbox" className="ct-checkbox" checked={agrees[i]} onChange={() => toggleAgree(i)} />
            <span><Link href={item.href} className="ct-policy-link">{item.label}</Link>に同意する</span>
          </label>
        ))}
      </div>

      {status === "error" && (
        <p className="ct-error">送信に失敗しました。時間をおいて再度お試しください。</p>
      )}

      <div className="ct-submit-wrap">
        <button type="submit" className="ct-submit" disabled={!canSubmit || status === "sending"}>
          {status === "sending" ? "送信中..." : "送信する"}
        </button>
      </div>

      <style>{`
        .ct-complete { text-align: center; padding: 80px 0; }
        .ct-complete-title { font-size: 1.4rem; font-weight: 700; color: #15263b; margin-bottom: 16px; }
        .ct-complete-text { font-size: .95rem; line-height: 2; color: rgba(21,38,59,0.75); }
        .ct-error { text-align: center; color: #c0392b; font-size: .9rem; margin-bottom: 16px; }
        .ct-submit:disabled { opacity: 0.45; cursor: not-allowed; }
      `}</style>
    </form>
  );
}

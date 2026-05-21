import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "お問い合わせ | NEXT BRINO" };

export default function ContactPage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">CONTACT</h1>
        <div className="ph-line" />
        <p className="ph-ja">お問い合わせ</p>
      </div></div>
      <div className="pc" style={{ maxWidth: 800 }}>
        <p className="ct-intro">下記フォームに必要事項をご入力いただき、以下の3つの方針にご同意のうえ「送信する」ボタンをクリックしてください。</p>
        <div className="ct-policies">
          <p className="ct-policies-label">同意が必要な方針</p>
          <ul className="ct-policies-list">
            <li><Link href="/privacy-policy/" className="ct-pl">個人情報保護方針</Link></li>
            <li><Link href="/contact-policy/" className="ct-pl">お問合せ対応基本方針</Link></li>
            <li><Link href="/anti-social-forces-policy/" className="ct-pl">反社会的勢力に対する基本方針</Link></li>
          </ul>
        </div>
        <form className="ct-form" action="https://nextbrino.com/contact/" method="GET" target="_blank">
          <div className="ct-field-group">
            <div className="ct-field">
              <label className="ct-label">お問い合わせ種別 <span className="ct-req">必須</span></label>
              <select className="ct-input">
                <option value="">選択してください</option>
                <option>サービスに関するご相談</option>
                <option>採用・インターンシップについて</option>
                <option>取材・メディア関連</option>
                <option>その他</option>
              </select>
            </div>
            <div className="ct-field">
              <label className="ct-label">会社名・団体名</label>
              <input type="text" className="ct-input" placeholder="株式会社〇〇" />
            </div>
            <div className="ct-field">
              <label className="ct-label">部署名</label>
              <input type="text" className="ct-input" placeholder="〇〇部" />
            </div>
            <div className="ct-field">
              <label className="ct-label">氏名 <span className="ct-req">必須</span></label>
              <input type="text" className="ct-input" placeholder="山田 太郎" />
            </div>
            <div className="ct-field">
              <label className="ct-label">メールアドレス <span className="ct-req">必須</span></label>
              <input type="email" className="ct-input" placeholder="example@email.com" />
            </div>
            <div className="ct-field">
              <label className="ct-label">電話番号 <span className="ct-req">必須</span></label>
              <input type="tel" className="ct-input" placeholder="090-0000-0000" />
            </div>
            <div className="ct-field">
              <label className="ct-label">LINE ID</label>
              <input type="text" className="ct-input" placeholder="@lineid" />
            </div>
            <div className="ct-field ct-field-half">
              <label className="ct-label">郵便番号</label>
              <input type="text" className="ct-input" placeholder="000-0000" />
            </div>
            <div className="ct-field">
              <label className="ct-label">住所</label>
              <input type="text" className="ct-input" placeholder="東京都〇〇区..." />
            </div>
            <div className="ct-field">
              <label className="ct-label">ホームページURL</label>
              <input type="url" className="ct-input" placeholder="https://" />
            </div>
            <div className="ct-field">
              <label className="ct-label">お問い合わせ内容 <span className="ct-req">必須</span></label>
              <textarea className="ct-input ct-textarea" placeholder="お問い合わせ内容をご記入ください"></textarea>
            </div>
            <div className="ct-field">
              <label className="ct-label">ご予算</label>
              <input type="text" className="ct-input" placeholder="例：〇〇万円程度" />
            </div>
          </div>
          <div className="ct-agree">
            <label className="ct-agree-label">
              <input type="checkbox" className="ct-checkbox" />
              <span>上記3つの方針すべてに同意します</span>
            </label>
          </div>
          <div className="ct-submit-wrap">
            <button type="submit" className="ct-submit">送信する</button>
          </div>
        </form>
      </div>
      <style>{`
        
        .ph { background: #15263b; padding: 120px 0 64px; }
        .ph-inner { width: 88%; max-width: 1100px; margin: 0 auto; }
        .ph-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: 11px; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 12px; }
        .ph-en { font-family: var(--font-barlow-condensed), sans-serif; font-size: clamp(52px,8vw,110px); font-weight: 800; letter-spacing: .08em; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.35); margin: 0 0 20px; }
        .ph-line { width: 100%; height: 1px; background: rgba(255,255,255,.1); margin: 0 0 20px; }
        .ph-ja { font-size: clamp(18px,2.5vw,26px); font-weight: 300; letter-spacing: .1em; color: rgba(255,255,255,.72); margin: 0; }
        .pc { width: 88%; max-width: 1100px; margin: 0 auto; padding: 72px 0 100px; }

        .ct-intro { font-size: .93rem; line-height: 2; color: #555; margin: 0 0 28px; }
        .ct-policies { margin: 0 0 44px; padding: 20px 24px; background: rgba(21,38,59,.03); border: 1px solid rgba(21,38,59,.08); }
        .ct-policies-label { font-size: .75rem; letter-spacing: .18em; color: #9d8c56; margin: 0 0 10px; text-transform: uppercase; }
        .ct-policies-list { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 8px 20px; }
        .ct-pl { color: #15263b; font-size: .88rem; text-decoration: underline; text-underline-offset: 3px; }
        .ct-pl:hover { color: #9d8c56; }
        .ct-form { display: flex; flex-direction: column; gap: 0; }
        .ct-field-group { display: flex; flex-direction: column; gap: 24px; margin: 0 0 32px; }
        .ct-field { display: flex; flex-direction: column; gap: 8px; }
        .ct-label { font-size: .85rem; font-weight: 700; color: #15263b; letter-spacing: .04em; display: flex; align-items: center; gap: 8px; }
        .ct-req { font-size: .72rem; background: #15263b; color: #fff; padding: 2px 7px; letter-spacing: .08em; }
        .ct-input { width: 100%; padding: 12px 16px; border: 1px solid rgba(21,38,59,.2); font-size: .9rem; font-family: var(--font-main); color: #333; outline: none; transition: border-color .2s; background: #fff; }
        .ct-input:focus { border-color: #9d8c56; }
        .ct-textarea { min-height: 160px; resize: vertical; }
        .ct-agree { margin: 0 0 32px; }
        .ct-agree-label { display: flex; align-items: center; gap: 10px; font-size: .9rem; color: #444; cursor: pointer; }
        .ct-checkbox { width: 18px; height: 18px; accent-color: #15263b; flex-shrink: 0; }
        .ct-submit-wrap { text-align: center; }
        .ct-submit { padding: 16px 64px; background: #15263b; color: #fff; border: none; font-size: .9rem; letter-spacing: .18em; font-family: var(--font-main); cursor: pointer; transition: background .25s; }
        .ct-submit:hover { background: #9d8c56; }
      `}</style>
    </main>
  );
}

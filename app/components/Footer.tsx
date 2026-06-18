"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "HOME",           href: "/" },
  { label: "事業内容",        href: "/service/" },
  { label: "代表挨拶",        href: "/message-kuroki-yuta/" },
  { label: "理念・行動指針",   href: "/philosophy/" },
  { label: "概要・沿革",      href: "/overview/" },
  { label: "お知らせ",        href: "/news/" },
  { label: "採用情報",        href: "/recruit/" },
  { label: "インターンシップ",  href: "/internship/" },
  { label: "お問い合わせ",     href: "/contact/" },
];

const POLICY_LINKS = [
  { label: "個人情報保護方針",            href: "/privacy-policy/" },
  { label: "お問合せ対応基本方針",         href: "/contact-policy/" },
  { label: "反社会的勢力に対する基本方針",  href: "/anti-social-forces-policy/" },
  { label: "特定商取引法に基づく表記",     href: "/legal-notice/" },
];

export default function Footer() {
  return (
    <footer className="ft">
      {/* ── アーチボーダー ── */}
      <div className="ft-wave" aria-hidden>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,90 Q720,0 1440,90 L1440,90 L0,90 Z"
            fill="#0f1f33"
          />
          <path
            d="M0,90 Q720,0 1440,90"
            fill="none"
            stroke="url(#archGold)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(196,171,110,0)" />
              <stop offset="25%" stopColor="rgba(196,171,110,0.5)" />
              <stop offset="50%" stopColor="rgba(196,171,110,0.9)" />
              <stop offset="75%" stopColor="rgba(196,171,110,0.5)" />
              <stop offset="100%" stopColor="rgba(196,171,110,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="ft-wrap">

        {/* ── ナビ ── */}
        <nav aria-label="フッターナビゲーション" className="ft-nav-wrap">
          <p className="ft-nav-title">NAVIGATION</p>
          <ul className="ft-nav">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="ft-nav-item">
                <Link href={link.href} className="ft-nav-link">
                  <span className="ft-nav-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ft-nav-line" aria-hidden />
                  <span className="ft-nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── ポリシー＋ブランド（PCで2カラム）── */}
        <div className="ft-bottom">

          {/* 左：ポリシー */}
          <nav aria-label="ポリシーリンク" className="ft-policy-wrap">
            <p className="ft-policy-title">POLICY</p>
            <ul className="ft-policy">
              {POLICY_LINKS.map((link, i) => (
                <li key={link.href} className="ft-policy-item">
                  <Link href={link.href} className="ft-policy-link">
                    <span className="ft-policy-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ft-policy-line" aria-hidden />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 右：ロゴ＋コピーライト */}
          <div className="ft-brand-col">
            <div className="ft-divider" aria-hidden />
            <div className="ft-brand">
              <div className="ft-logo-wrap">
                <div className="ft-logo-circle" aria-hidden />
                <Link href="/" className="ft-logo">
                  <Image
                    src="/images/footer-logo.png"
                    alt="NEXT BRINO"
                    width={172}
                    height={52}
                    style={{ width: "100%", maxWidth: 172, height: "auto" }}
                  />
                </Link>
              </div>
              <div className="ft-logo-line" aria-hidden />
            </div>
            <div className="ft-copy">
              <p className="ft-copy-cr">©︎ 2026 NEXT BRINO｜ネクストブライノ</p>
              <p className="ft-copy-note">当サイトに掲載されている全ての著作物において、無断で使用することを禁じます。</p>
              <div className="ft-logo-line ft-copy-line" aria-hidden />
            </div>
          </div>

        </div>

      </div>

      <style>{`

        /* ─── ベース ─── */
        .ft {
          background: #0f1f33;
          color: #fff;
          position: relative;
          z-index: 30;
          font-family: var(--font-main);
        }


        /* ─── スキャロップボーダー ─── */
        .ft-wave {
          position: absolute;
          top: -89px; left: 0; right: 0;
          height: 90px;
          pointer-events: none;
          z-index: 1;
        }
        .ft-wave svg { width: 100%; height: 90px; display: block; }

/* ─── ノイズテクスチャ ─── */
        .ft::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }

        /* ─── 中央揃えラッパー ─── */
        .ft-wrap {
          width: 88%; max-width: 860px; margin: 0 auto;
          padding: 28px 0 52px;
          display: flex; flex-direction: column;
          align-items: center;
          position: relative; z-index: 2;
        }

        /* ─── ロゴラッパー ─── */
        .ft-logo-wrap {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 4px;
        }
        .ft-logo-circle {
          position: absolute;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,.04) 0%,
            rgba(255,255,255,.015) 45%,
            transparent 70%);
          pointer-events: none;
        }

        /* ─── ロゴ ─── */
        .ft-logo {
          display: inline-block;
          position: relative;
          margin-bottom: 0;
          transition: opacity .2s;
        }
        .ft-logo:hover { opacity: .72; }

        /* ゴールドアンダーライン */
        .ft-logo-line {
          width: 40px; height: 1px; margin: -6px auto 44px;
          background: linear-gradient(90deg, transparent, #c4ab6e, transparent);
        }

        /* ─── タグライン ─── */
        .ft-tagline {
          font-size: .72rem; letter-spacing: .14em;
          color: rgba(255,255,255,.32);
          margin: 0 0 52px; line-height: 1;
        }

        /* ─── ナビグリッド ─── */
        .ft-nav-wrap { width: 100%; margin-bottom: 8px; }

        @media (min-width: 641px) {
          .ft-nav-wrap { margin-bottom: 56px; }
        }
        .ft-nav-title {
          font-size: .60rem; letter-spacing: .25em;
          color: rgba(196,171,110,.65);
          font-family: 'Courier New', monospace;
          margin: 0 0 20px; padding: 8px 0;
          text-align: left; width: 100%;
          border-top: 1px solid rgba(196,171,110,.25);
          border-bottom: 1px solid rgba(196,171,110,.25);
        }
        .ft-nav {
          list-style: none; padding: 0; margin: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .ft-nav-item {
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .ft-nav-link {
          display: flex; align-items: center; gap: 8px;
          padding: 16px 8px 16px 0;
          color: rgba(255,255,255,.48);
          text-decoration: none;
          font-size: .78rem; letter-spacing: .05em;
          transition: color .22s;
        }
        .ft-nav-link:hover { color: rgba(255,255,255,.92); }

        /* 番号 */
        .ft-nav-num {
          font-size: .65rem; letter-spacing: .08em;
          color: rgba(196,171,110,.38);
          font-family: 'Courier New', monospace;
          flex-shrink: 0;
          transition: color .22s;
          line-height: 1;
        }
        .ft-nav-link:hover .ft-nav-num { color: rgba(196,171,110,.9); }

        /* 横線 */
        .ft-nav-line {
          display: inline-block;
          width: 16px; height: 1px; flex-shrink: 0;
          background: rgba(196,171,110,.22);
          transition: width .22s, background .22s;
        }
        .ft-nav-link:hover .ft-nav-line {
          width: 22px;
          background: rgba(196,171,110,.65);
        }

        /* ラベル */
        .ft-nav-label { line-height: 1; }

        /* ─── 区切り線 ─── */
        .ft-divider {
          width: 100%; height: 1px; margin-bottom: 28px;
          background: linear-gradient(90deg,
            transparent,
            rgba(196,171,110,.15) 20%,
            rgba(196,171,110,.25) 50%,
            rgba(196,171,110,.15) 80%,
            transparent);
        }

        /* ─── ポリシー＋ブランド 2カラムコンテナ ─── */
        .ft-bottom {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .ft-brand-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ─── ポリシー ─── */
        .ft-policy-wrap { width: 100%; margin-bottom: 28px; }
        .ft-policy-title {
          font-size: .60rem; letter-spacing: .25em;
          color: rgba(196,171,110,.65);
          font-family: 'Courier New', monospace;
          margin: 0 0 20px; padding: 8px 0;
          text-align: left; width: 100%;
          border-top: 1px solid rgba(196,171,110,.25);
          border-bottom: 1px solid rgba(196,171,110,.25);
        }
        .ft-policy {
          list-style: none; padding: 0; margin: 0;
        }
        .ft-policy-item { display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,.06); }
        .ft-policy-link {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 8px 12px 0;
          color: rgba(255,255,255,.38);
          text-decoration: none;
          font-size: .74rem; letter-spacing: .04em;
          transition: color .2s;
          width: 100%;
        }
        .ft-policy-link:hover { color: rgba(255,255,255,.75); }
        .ft-policy-num {
          font-size: .60rem; letter-spacing: .08em;
          color: rgba(196,171,110,.35);
          font-family: 'Courier New', monospace;
          flex-shrink: 0; transition: color .2s;
        }
        .ft-policy-link:hover .ft-policy-num { color: rgba(196,171,110,.8); }
        .ft-policy-line {
          display: inline-block;
          width: 14px; height: 1px; flex-shrink: 0;
          background: rgba(196,171,110,.20);
          transition: width .22s, background .22s;
        }
        .ft-policy-link:hover .ft-policy-line { width: 20px; background: rgba(196,171,110,.55); }

        /* ─── PC：ポリシー＋ブランド 2カラム ─── */
        @media (min-width: 641px) {
          .ft-bottom {
            flex-direction: row;
            align-items: stretch;
          }
          .ft-policy-wrap {
            width: 50%;
            flex-shrink: 0;
            padding-right: 48px;
            margin-bottom: 0;
          }
          .ft-brand-col {
            width: 50%;
            flex-shrink: 0;
            justify-content: space-between;
            align-items: center;
            position: relative;
          }
          .ft-brand-col .ft-brand { margin-bottom: 1px; margin-left: 64px; }
          .ft-brand-col .ft-copy { margin-left: 64px; }
          .ft-copy-cr { margin-bottom: 44px !important; transform: translateY(-12px); }
          .ft-brand-col .ft-copy-line { position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%); width: 100%; margin-top: 0 !important; }
          .ft-brand-col .ft-copy-note { transform: translateY(-38px); }
          .ft-brand-col .ft-divider {
            width: 100%;
            margin-bottom: 36px;
            margin-top: -2px;
          }
        }

        /* ─── コピーライト ─── */
        .ft-copy { text-align: center; }
        .ft-copy-line {
          width: 100% !important;
          height: 1px !important;
          background: rgba(255,255,255,.06) !important;
          margin-top: 12px !important;
          margin-bottom: 0 !important;
        }
        .ft-copy-cr {
          font-size: .60rem; color: rgba(255,255,255,.22);
          letter-spacing: .07em; margin: 0 0 12px;
        }
        .ft-copy-note {
          font-size: .52rem; color: rgba(255,255,255,.12);
          letter-spacing: .03em; margin: 0;
        }

        /* ─── スマホ（〜 640px）─── */
        @media (max-width: 640px) {
          .ft-wrap { padding: 28px 0 44px; }
          .ft-tagline { margin-bottom: 40px; }
          .ft-nav { grid-template-columns: repeat(2, 1fr); margin-bottom: 32px; }
          .ft-nav-link { font-size: .74rem; padding: 14px 4px 14px 0; }
          .ft-policy { gap: 8px 0; margin-bottom: 14px; }
        }
      `}</style>
    </footer>
  );
}

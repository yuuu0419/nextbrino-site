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

      {/* ── 背景 ── */}
      <div className="ft-bg-grid" aria-hidden />
      <div className="ft-bg-glow" aria-hidden />

      {/* ── ゴールドライン（スキャンアニメ付き） ── */}
      <div className="ft-line" aria-hidden>
        <span className="ft-line-scan" aria-hidden />
      </div>

      {/* ════════════ MAIN ════════════ */}
      <div className="ft-wrap">

        {/* ── ブランドブロック ── */}
        <div className="ft-brand">
          <Link href="/" className="ft-logo">
            <Image
              src="/images/footer-logo.png"
              alt="NEXT BRINO"
              width={172}
              height={52}
              style={{ width: "100%", maxWidth: 172, height: "auto" }}
            />
          </Link>

          <p className="ft-tagline">確かな技術で日常をデザインする</p>

          {/* ステータスバッジ（テック感演出） */}
          <div className="ft-status">
            <span className="ft-status-pulse" aria-hidden />
            <span className="ft-status-text">NEXT BRINO</span>
          </div>
        </div>

        {/* ── ナビブロック ── */}
        <div className="ft-nav-block">

          {/* ヘッダー行 */}
          <div className="ft-nav-meta">
            <span className="ft-nav-eyebrow">SITE MAP</span>
            <span className="ft-nav-rule" aria-hidden />
            <span className="ft-nav-total">09 PAGES</span>
          </div>

          {/* ナビグリッド */}
          <nav aria-label="フッターナビゲーション">
            <ul className="ft-nav-grid">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="ft-nav-cell">
                  <Link href={link.href} className="ft-nav-link">
                    <span className="ft-nav-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ft-nav-text">{link.label}</span>
                    <span className="ft-nav-arrow" aria-hidden>↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ════════════ BOTTOM BAR ════════════ */}
      <div className="ft-bar-wrap">
        <div className="ft-bar">

          {/* ポリシーリンク */}
          <div className="ft-policy-block">
            <div className="ft-policy-head">
              <span className="ft-policy-eyebrow">POLICY</span>
              <span className="ft-policy-rule" aria-hidden />
            </div>
            <nav aria-label="ポリシーリンク">
              <ul className="ft-policy">
                {POLICY_LINKS.map((link, i) => (
                  <li key={link.href} className="ft-policy-item">
                    {i > 0 && <span className="ft-policy-sep" aria-hidden>/</span>}
                    <Link href={link.href} className="ft-policy-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* コピーライト */}
          <div className="ft-copy">
            <p className="ft-copy-cr">©︎ 2026 NEXT BRINO｜ネクストブライノ</p>
            <p className="ft-copy-note">当サイトに掲載されている全ての著作物において、無断で使用することを禁じます。</p>
          </div>
        </div>
      </div>

      {/* ════════════ STYLES ════════════ */}
      <style>{`

        /* ────────────────────────────────
           ベース
        ──────────────────────────────── */
        .ft {
          background: #111f33;
          color: #fff;
          position: relative;
          overflow: hidden;
          z-index: 30;
          font-family: var(--font-main);
        }

        /* ────────────────────────────────
           背景デコ
        ──────────────────────────────── */
        .ft-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(157,140,86,.024) 1px, transparent 1px),
            linear-gradient(90deg, rgba(157,140,86,.024) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .ft-bg-glow {
          position: absolute; pointer-events: none;
          width: 600px; height: 600px;
          top: -200px; left: -120px;
          background: radial-gradient(circle, rgba(15,55,110,.22) 0%, transparent 65%);
        }

        /* ────────────────────────────────
           上部ゴールドライン + スキャン
        ──────────────────────────────── */
        .ft-line {
          height: 1px; position: relative; overflow: hidden;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(157,140,86,.25) 10%,
            #c4ab6e 35%, #e8c97a 50%, #c4ab6e 65%,
            rgba(157,140,86,.25) 90%, transparent 100%);
        }
        .ft-line::before {
          content: ''; position: absolute; inset: -3px 8%;
          background: inherit; filter: blur(7px); opacity: .5;
        }
        @keyframes ft-scan {
          0%   { transform: translateX(-120%) skewX(-12deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(520%) skewX(-12deg); opacity: 0; }
        }
        .ft-line-scan {
          position: absolute; top: -1px; left: 0;
          width: 18%; height: 3px;
          background: linear-gradient(90deg, transparent, rgba(232,201,122,.55), transparent);
          animation: ft-scan 3.8s cubic-bezier(.4,0,.6,1) infinite;
        }

        /* ────────────────────────────────
           メインラッパー（PC: 2カラム）
        ──────────────────────────────── */
        .ft-wrap {
          width: 88%; max-width: 1200px; margin: 0 auto;
          padding: 56px 0 52px;
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 0 60px;
          align-items: start;
          position: relative;
        }

        /* ────────────────────────────────
           ブランドエリア
        ──────────────────────────────── */
        .ft-logo {
          display: block; margin-bottom: 18px;
          transition: opacity .2s;
        }
        .ft-logo:hover { opacity: .72; }

        .ft-tagline {
          font-size: .68rem; line-height: 2;
          color: rgba(255,255,255,.36);
          letter-spacing: .09em;
          margin: 0 0 24px;
        }

        /* ステータスバッジ */
        .ft-status {
          display: inline-flex; align-items: center; gap: 8px;
        }
        @keyframes ft-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(157,140,86,.5); }
          60%       { box-shadow: 0 0 0 5px rgba(157,140,86,0); }
        }
        .ft-status-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: #9d8c56; flex-shrink: 0;
          animation: ft-pulse 2.8s ease infinite;
        }
        .ft-status-text {
          font-size: .52rem; letter-spacing: .28em;
          color: rgba(157,140,86,.65);
          font-family: var(--font-barlow-condensed), sans-serif;
        }

        /* ────────────────────────────────
           ナビブロック
        ──────────────────────────────── */
        .ft-nav-block { width: 100%; }

        /* ヘッダー行 */
        .ft-nav-meta {
          display: flex; align-items: center; gap: 12px;
          padding-bottom: 12px; margin-bottom: 0;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .ft-nav-eyebrow {
          font-size: .50rem; letter-spacing: .28em;
          color: rgba(157,140,86,.6);
          font-family: var(--font-barlow-condensed), sans-serif;
          white-space: nowrap; flex-shrink: 0;
        }
        .ft-nav-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,.06), transparent);
        }
        .ft-nav-total {
          font-size: .48rem; letter-spacing: .18em;
          color: rgba(255,255,255,.14);
          font-family: var(--font-barlow-condensed), sans-serif;
          white-space: nowrap; flex-shrink: 0;
        }

        /* ────────────────────────────────
           ナビグリッド本体（3列）
        ──────────────────────────────── */
        .ft-nav-grid {
          list-style: none; padding: 0; margin: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        /* 各セル */
        .ft-nav-cell {
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        /* リンク行: [番号] [テキスト] [矢印] */
        .ft-nav-link {
          display: grid;
          grid-template-columns: 26px 1fr 14px;
          align-items: center;
          gap: 0 8px;
          padding: 14px 8px 14px 0;
          text-decoration: none;
          color: rgba(255,255,255,.52);
          position: relative; overflow: hidden;
          transition: color .22s;
        }
        /* ホバー時の背景フィル */
        .ft-nav-link::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(157,140,86,.06), transparent);
          transform: translateX(-102%);
          transition: transform .32s cubic-bezier(.4,0,.2,1);
        }
        .ft-nav-link:hover::before { transform: translateX(0); }
        .ft-nav-link:hover { color: rgba(255,255,255,.9); }

        /* 番号 */
        .ft-nav-num {
          font-size: .48rem; letter-spacing: .10em;
          color: rgba(157,140,86,.38);
          font-family: 'Courier New', Courier, monospace;
          position: relative; transition: color .22s;
          line-height: 1;
        }
        .ft-nav-link:hover .ft-nav-num {
          color: rgba(157,140,86,.85);
        }

        /* テキスト */
        .ft-nav-text {
          font-size: .79rem; letter-spacing: .05em;
          line-height: 1; position: relative;
        }

        /* 矢印（ホバー時のみ表示） */
        .ft-nav-arrow {
          font-size: .56rem;
          color: rgba(157,140,86,0);
          text-align: right;
          transition: color .22s, transform .22s;
          position: relative;
        }
        .ft-nav-link:hover .ft-nav-arrow {
          color: rgba(157,140,86,.7);
          transform: translate(2px,-2px);
        }

        /* ────────────────────────────────
           ボトムバー
        ──────────────────────────────── */
        .ft-bar-wrap { border-top: 1px solid rgba(255,255,255,.06); }
        .ft-bar {
          width: 88%; max-width: 1200px; margin: 0 auto;
          padding: 18px 0;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 12px 24px; flex-wrap: wrap;
        }

        /* ポリシーブロック */
        .ft-policy-block { display: flex; flex-direction: column; gap: 8px; }
        .ft-policy-head {
          display: flex; align-items: center; gap: 10px;
        }
        .ft-policy-eyebrow {
          font-size: .48rem; letter-spacing: .28em;
          color: rgba(157,140,86,.5);
          font-family: var(--font-barlow-condensed), sans-serif;
          white-space: nowrap; flex-shrink: 0;
        }
        .ft-policy-rule {
          flex: 1; height: 1px; max-width: 60px;
          background: linear-gradient(90deg, rgba(255,255,255,.06), transparent);
        }

        /* ポリシー */
        .ft-policy {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-wrap: wrap;
          align-items: center; gap: 2px 0;
        }
        .ft-policy-item { display: flex; align-items: center; }
        .ft-policy-sep {
          margin: 0 9px;
          color: rgba(255,255,255,.12);
          font-size: .58rem;
        }
        .ft-policy-link {
          color: rgba(255,255,255,.25);
          text-decoration: none;
          font-size: .60rem; letter-spacing: .04em;
          transition: color .2s;
        }
        .ft-policy-link:hover { color: rgba(255,255,255,.6); }

        /* コピーライト */
        .ft-copy { text-align: right; }
        .ft-copy-cr {
          font-size: .62rem; color: rgba(255,255,255,.25);
          letter-spacing: .06em; margin: 0 0 2px;
        }
        .ft-copy-note {
          font-size: .54rem; color: rgba(255,255,255,.13);
          letter-spacing: .03em; margin: 0;
        }

        /* ════════════════════════════════
           タブレット（〜 1024px）
        ════════════════════════════════ */
        @media (max-width: 1024px) {
          .ft-wrap {
            grid-template-columns: 190px 1fr;
            gap: 0 44px;
            padding: 52px 0 48px;
          }
          .ft-nav-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ════════════════════════════════
           スマホ（〜 640px）
        ════════════════════════════════ */
        @media (max-width: 640px) {

          /* メイン縦積み */
          .ft-wrap {
            grid-template-columns: 1fr;
            gap: 36px 0;
            padding: 44px 0 36px;
          }

          /* ブランド: 左揃え */
          .ft-logo { margin-bottom: 14px; }
          .ft-tagline { font-size: .66rem; margin-bottom: 18px; }

          /* ナビ: 2列 */
          .ft-nav-grid { grid-template-columns: repeat(2, 1fr); }
          .ft-nav-link {
            grid-template-columns: 22px 1fr;  /* 矢印列を省く */
            padding: 12px 4px 12px 0;
          }
          .ft-nav-text  { font-size: .75rem; }
          .ft-nav-num   { font-size: .46rem; }
          .ft-nav-arrow { display: none; }

          /* ボトム: 縦積み */
          .ft-bar {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px 0 20px;
            gap: 14px;
          }
          .ft-policy-block { gap: 6px; }
          .ft-policy-rule  { display: none; }

          /* ポリシー: 2列グリッド */
          .ft-policy {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px 12px;
          }
          .ft-policy-item { display: block; }
          .ft-policy-sep  { display: none; }
          .ft-policy-link { font-size: .59rem; }

          /* コピーライト: 左揃え */
          .ft-copy { text-align: left; }
          .ft-copy-cr   { font-size: .60rem; }
          .ft-copy-note { font-size: .52rem; }
        }
      `}</style>
    </footer>
  );
}

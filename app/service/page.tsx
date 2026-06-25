import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import Link from "next/link";
import Image from "next/image";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import ServiceRows from "../components/ServiceRows";
import FadeIn from "../components/FadeIn";
export const metadata: Metadata = {
  title: "事業内容｜NEXT BRINO",
  description: "NEXT BRINOが手がける6つの事業をご紹介します。最先端の技術を積極的に取り入れ、お客様に新たな価値を提供します。",
  openGraph: {
    title: "事業内容｜NEXT BRINO",
    description: "NEXT BRINOが手がける6つの事業をご紹介します。最先端の技術を積極的に取り入れ、お客様に新たな価値を提供します。",
    url: "https://nextbrino.com/service",
    siteName: "NEXT BRINO",
    images: [{ url: "https://nextbrino.com/images/business-ogp.jpg", width: 1200, height: 630, alt: "事業内容｜NEXT BRINO" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "事業内容｜NEXT BRINO",
    description: "NEXT BRINOが手がける6つの事業をご紹介します。最先端の技術を積極的に取り入れ、お客様に新たな価値を提供します。",
    images: ["https://nextbrino.com/images/business-ogp.jpg"],
  },
};

const services = [
  { num:"01", en:"IT SOLUTION",        ja:"ITソリューション事業",  img:"/images/electronic-commerce-card.webp", desc:"業務効率化や課題解決など事業成長を支援するため、\nWeb制作・EC構築・アプリ開発・システム開発など、\n幅広いデジタルソリューションを提供しています。", items:["WEBサイト制作と運用保守","アプリ開発・システム開発","WEB決済システムの導入","販売管理等のトータルサポート"] },
  { num:"02", en:"WEB ADVERTISING",    ja:"WEB広告事業",          img:"/images/web-advertiding-card.webp",      desc:"美容・健康などの情報配信コンテンツの運営や、\nその他各種WEBメディアの運営管理、\n広告提供に付随するトータルサポートを提供しています。", descSp:"美容・健康などの情報配信コンテンツの運営や、\nその他各種WEBメディアの運営管理、\n広告に付随するトータルサポートを提供しています。", items:["各種情報配信コンテンツ運営","各種WEBメディア運営","広告出稿・メディア広告掲載","広告に付随するデザインサポート"] },
  { num:"03", en:"PLANNING SALES",     ja:"企画販売事業",          img:"/images/planning-sales-card.webp",       desc:"新規ブランド企画や商品製造、販売サイトの制作と運用保守、\n在庫分析などのトータルサポートの提供や、\nブランドフランチャイズを展開しています。", descSp:"ブランド企画や製造、販売サイトの制作と運用保守、\n在庫分析などのトータルサポートの提供や、\nブランドフランチャイズを展開しています。", items:["新規ブランド企画・商品製造","販売サイト制作・運用保守","在庫分析などのトータルサポート","新規・既存ブランドのFC展開"] },
  { num:"04", en:"IP MANAGEMENT",      ja:"IPマネジメント事業",    img:"/images/talent-management-card.webp",     desc:"IPの創出・育成・価値向上を目的として、\nマーケティングやブランディングのマネジメント、\n権利管理等を通じた持続的な事業成長を支援します。",         items:["クリエイティブタレントマネジメント","ブランディング・マーケティング","IP保護インフラの開発・運用保守","独立支援や関連事業サービスの提供"] },
  { num:"05", en:"EDUCATION",          ja:"教育学習支援事業",      img:"/images/education-card.webp",            desc:"主に小中学生を対象に、独自のPREP法を活用した、\n完全双方向のアクティブラーニングを目指します。",                                  items:["PREP法（独自開発）による指導","完全双方向型の学習","アクティブラーニングの確立"] },
  { num:"06", en:"HEALTH PROMOTION",   ja:"健康増進事業",          img:"/images/health-promotion-card.webp",     desc:"科学的根拠に基づいた、健康寿命の延伸を目的とした指導や、\nアスリートを対象とした指導など幅広いサポートを提供しています。", descSp:"健康寿命の延伸を目的とした指導や、\nアスリートを対象としたコーチングなど\n幅広いサポートを提供しています。",  items:["体組成トレーニング（ウェイトやピラティス等）","アスリートコーチング","栄養に関する指導","科学的根拠に基づいたトータル指導"] },
];

export default function ServicePage() {
  return (
    <main>
      <div className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-en">BUSINESS</p>
          <p className="hero-ja">確かな技術で、<br />日常をデザインする。</p>
        </div>
      </div>

      <Ticker text="SERVICE NEXT BRINO" overlapBottom={200} />

      <div className="sv-section-header">
        <p className="section-label">事業内容</p>
        <SplitTitle text="SERVICE" className="section-title-en" tag="h1" />
        <div className="section-divider" />
        <p className="sv-section-sub">NEXT BRINOは最先端の技術を積極的に取り入れ、<span className="sv-br" /><br className="sv-br" />６つの事業でお客様に新たな価値を提供します。</p>
      </div>

      <ServiceRows services={services} />

      {/* CONTACT */}
      <Ticker text="CONTACT NEXT BRINO" overlapBottom={330} />

      <section className="sv-contact-section">
        <div className="sv-contact-header">
          <p className="section-label">お問い合わせ</p>
          <SplitTitle text="CONTACT" className="section-title-en" tag="h2" />
          <div className="section-divider" />
        </div>

        <div className="sv-contact-box-wrap">
          {/* HUD四隅ブラケット */}
          <div className="sv-contact-bracket sv-contact-bracket--tl" />
          <div className="sv-contact-bracket sv-contact-bracket--tr" />
          <div className="sv-contact-bracket sv-contact-bracket--bl" />
          <div className="sv-contact-bracket sv-contact-bracket--br" />

          <div className="sv-contact-card">
            <div className="contact-shimmer-line" />

            {/* 左: navy パネル */}
            <div className="sv-contact-left">
              <div className="sv-contact-dot-grid" />
              {[160, 240, 320, 400, 480].map((size, i) => (
                <div key={i} className="sv-contact-arc" style={{
                  top: -size * 0.5,
                  right: -size * 0.5,
                  width: size,
                  height: size,
                  borderColor: `rgba(157,140,86,${(0.18 - i * 0.03).toFixed(2)})`,
                }} />
              ))}
              <div className="sv-contact-glow" />
              <div className="contact-scan-line" />

              <div style={{ position: "relative" }}>
                <p className="sv-contact-available">
                  <span className="contact-blink" />
                  Always Available
                </p>
                <h3 className="sv-contact-title">CONTACT</h3>
                <div className="sv-contact-gold-line" />
                <div className="sv-contact-status">
                  <p className="sv-contact-online">
                    <span className="sv-contact-online-dot" />
                    ONLINE
                  </p>
                  <p className="sv-contact-url">› nextbrino.com/contact</p>
                </div>
              </div>

              {/* 対応情報 */}
              <div className="sv-contact-info">
                <p className="sv-contact-info-line">対応時間：平日10:00〜17:00（土日祝を除く）</p>
                <p className="sv-contact-info-line">ご返答の目安：2〜5営業日程度（内容によって異なります）</p>
              </div>
            </div>

            {/* 右: white パネル */}
            <div className="sv-contact-right">
              <div className="sv-contact-bg-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/contact-box-logo.webp"
                  alt=""
                  style={{ objectFit: "cover", objectPosition: "top center", width: "100%", height: "100%", position: "absolute", inset: 0 }}
                />
              </div>
              <div className="sv-contact-right-inner">
                <p className="sv-contact-desc">
                  ご依頼等、お気軽にご連絡ください。<br />
                  担当者より順にご返信いたします。
                </p>
                <p className="sv-contact-note-box">対応枠が満枠の場合は、<br className="sv-contact-note-br" />ご返信できかねる場合がございます。</p>
                <div className="sv-contact-sep" />
                <a href="/contact/" className="sv-contact-btn">
                  <span>お問合せはこちら</span>
                  <span className="sv-contact-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sv-bottom-space" />

      <style>{`
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 560px;
          background: url('/images/service-hero.webp') center center / cover no-repeat;
          display: flex;
          align-items: center;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.52);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          width: 88%;
          max-width: 1100px;
          margin: 0 auto 0 6%;
        }
        .hero-en {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: clamp(54px, 7.8vw, 114px);
          font-weight: 600;
          letter-spacing: .08em;
          line-height: 1;
          color: #fff;
          margin: 0 0 16px;
        }
        .hero-ja {
          font-size: clamp(17px, 1.7vw, 25px);
          font-weight: 500;
          letter-spacing: .12em;
          color: rgba(255,255,255,.82);
          margin: 24px 0 0;
          line-height: 1.8;
        }

        .sv-section-header {
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 56px;
          position: relative;
          z-index: 20;
        }
        .section-label {
          font-size: .7rem;
          letter-spacing: .32em;
          color: #9d8c56;
          margin: 0 0 12px;
        }
        .section-title-en {
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 900;
          color: #15263b;
          letter-spacing: .08em;
          line-height: 1;
          margin: 0 0 20px;
        }
        .section-divider {
          width: 56px !important;
          height: 2px !important;
          background: linear-gradient(90deg, #9d8c56, rgba(157,140,86,.15)) !important;
        }
        .sv-section-sub {
          margin: 28px 0 0;
          font-size: clamp(.85rem, 1.1vw, 1rem);
          color: #555;
          font-weight: 300;
          letter-spacing: .08em;
          line-height: 1.9;
          white-space: nowrap;
        }
        .sv-br { display: none; }

        .sv-row {
          display: flex;
          align-items: stretch;
          min-height: 560px;
          overflow: hidden;
          margin-bottom: 2px;
        }
        .sv-row--ltr { flex-direction: row; }
        .sv-row--rtl { flex-direction: row-reverse; }

        .sv-row-img-wrap {
          flex: 0 0 52%;
          position: relative;
        }
        .sv-row-img-clip {
          position: absolute;
          inset: 0;
        }
        .sv-row--ltr .sv-row-img-clip {
          clip-path: polygon(0 0, 100% 0, 84% 100%, 0 100%);
        }
        .sv-row--rtl .sv-row-img-clip {
          clip-path: polygon(16% 0, 100% 0, 100% 100%, 0 100%);
        }
        .sv-row-img-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(135deg, rgba(21,38,59,.25) 0%, transparent 60%);
        }

        .sv-row-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 72px 64px 60px;
          position: relative;
          background: #fff;
        }
        .sv-row--rtl .sv-row-body {
          padding: 64px 60px 64px 72px;
        }

        .sv-row-body::before {
          content: "";
          position: absolute;
          bottom: 28px; right: 28px;
          width: 36px; height: 36px;
          border-bottom: 1px solid rgba(157,140,86,.35);
          border-right: 1px solid rgba(157,140,86,.35);
        }
        .sv-row--rtl .sv-row-body::before {
          right: auto; left: 28px;
          border-right: none;
          border-left: 1px solid rgba(157,140,86,.35);
        }

        .sv-row-num {
          position: absolute;
          top: -16px; right: 44px;
          font-family: var(--font-display), sans-serif;
          font-size: clamp(100px, 14vw, 180px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -.02em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(157,140,86,.22);
          pointer-events: none;
          user-select: none;
          z-index: 10;
        }
        .sv-row--rtl .sv-row-num {
          right: -10px; left: auto;
        }
        .sv-row--rtl .sv-row-line {
          background: linear-gradient(270deg, #9d8c56, rgba(157,140,86,.15));
        }

        .sv-row-en {
          font-size: .72rem;
          letter-spacing: .3em;
          color: #9d8c56;
          margin: 0 0 10px;
          position: relative; z-index: 1;
        }
        .sv-row-ja {
          font-size: clamp(22px, 2.4vw, 34px);
          font-weight: 700;
          color: #15263b;
          letter-spacing: .08em;
          margin: 0 0 24px;
          line-height: 1.3;
          position: relative; z-index: 1;
        }
        .sv-row-line {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, #9d8c56, rgba(157,140,86,.15));
          margin-bottom: 28px;
          position: relative; z-index: 1;
        }
        .sv-row-desc--sp { display: none; }
        .sv-row-desc {
          font-size: .88rem;
          line-height: 2.1;
          color: #555;
          font-weight: 300;
          letter-spacing: .04em;
          margin: 0 0 28px;
          position: relative; z-index: 1;
        }
        .sv-row-items {
          list-style: none;
          padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
          position: relative; z-index: 1;
        }
        .sv-row-items li {
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(157,140,86,.12);
          background: linear-gradient(135deg, rgba(157,140,86,.08) 0%, rgba(21,38,59,.04) 100%);
          border-left: none;
          border-radius: 0;
          position: relative;
          width: 100%;
        }
        .sv-row-items li:first-child { border-top: 1px solid rgba(157,140,86,.12); }
        .sv-row-items li::before { display: none; }
        .sv-row-items li::after { display: none; }
        .sv-item-num {
          font-family: var(--font-display), sans-serif;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .1em;
          color: #9d8c56;
          flex-shrink: 0;
          line-height: 1;
          padding-top: 1px;
        }
        .sv-item-text {
          font-size: .78rem;
          color: #444;
          letter-spacing: .05em;
          font-weight: 300;
          line-height: 1.5;
        }

        .sv-row-btn-wrap {
          margin-top: 32px;
          position: relative; z-index: 1;
        }
        .sv-btn-full {
          cursor: default;
          padding: 14px 60px;
        }

        .sv-bottom-space { height: 0; }

        /* CONTACT section */
        .sv-contact-section {
          width: 100%;
          background: transparent;
          position: relative;
          z-index: 20;
          padding: 140px 40px 40px;
        }
        .sv-contact-header {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto 80px;
          position: relative;
          z-index: 20;
        }
        .sv-contact-box-wrap {
          position: relative;
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
        }
        .sv-contact-bracket {
          position: absolute;
          width: 20px;
          height: 20px;
          pointer-events: none;
          z-index: 3;
        }
        .sv-contact-bracket--tl { top: -7px; left: -7px; border-top: 1.5px solid rgba(157,140,86,0.7); border-left: 1.5px solid rgba(157,140,86,0.7); }
        .sv-contact-bracket--tr { top: -7px; right: -7px; border-top: 1.5px solid rgba(157,140,86,0.7); border-right: 1.5px solid rgba(157,140,86,0.7); }
        .sv-contact-bracket--bl { bottom: -7px; left: -7px; border-bottom: 1.5px solid rgba(157,140,86,0.7); border-left: 1.5px solid rgba(157,140,86,0.7); }
        .sv-contact-bracket--br { bottom: -7px; right: -7px; border-bottom: 1.5px solid rgba(157,140,86,0.7); border-right: 1.5px solid rgba(157,140,86,0.7); }
        .sv-contact-card {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 10px 0 8px rgba(21,38,59,0.12), 0 10px 8px rgba(21,38,59,0.15);
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          border: 1px solid rgba(21,38,59,0.07);
          position: relative;
        }
        .sv-contact-left {
          background: linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%);
          padding: 56px 44px 48px 52px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .sv-contact-info {
          margin-top: auto;
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sv-contact-info-line {
          font-size: .6rem;
          letter-spacing: .04em;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }
        .sv-contact-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(157,140,86,0.12) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .sv-contact-arc {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          pointer-events: none;
        }
        .sv-contact-glow {
          position: absolute;
          top: 0; right: 0;
          width: 70%; height: 60%;
          background: radial-gradient(circle at 92% 6%, rgba(157,140,86,0.2) 0%, transparent 55%);
          pointer-events: none;
        }
        .sv-contact-available {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: .65rem;
          letter-spacing: .26em;
          color: rgba(157,140,86,0.85);
          text-transform: uppercase;
          margin: 0 0 18px;
          font-family: var(--font-noto-sans-jp), sans-serif;
          position: relative;
        }
        .sv-contact-title {
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          letter-spacing: .06em;
          line-height: 1;
          margin: 0 0 14px;
          font-family: var(--font-noto-sans-jp), sans-serif;
          text-shadow: 0 0 48px rgba(157,140,86,0.25);
        }
        .sv-contact-gold-line {
          width: 44px;
          height: 2px;
          background: linear-gradient(90deg, rgba(157,140,86,1), rgba(157,140,86,0.1));
        }
        .sv-contact-status {
          margin-top: 52px;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .sv-contact-online {
          font-size: .6rem;
          letter-spacing: .12em;
          color: rgba(157,140,86,0.6);
          font-family: var(--font-noto-sans-jp), sans-serif;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sv-contact-online-dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(157,140,86,0.75);
          flex-shrink: 0;
        }
        .sv-contact-url {
          font-size: .6rem;
          letter-spacing: .06em;
          color: rgba(255,255,255,0.18);
          font-family: var(--font-noto-sans-jp), sans-serif;
          margin: 0;
        }
        .sv-contact-right {
          background: #fafafa;
          padding: 56px 52px 48px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(21,38,59,0.05);
          position: relative;
        }
        .sv-contact-bg-logo {
          position: absolute;
          right: -30%;
          bottom: -8%;
          width: 94%;
          aspect-ratio: 1 / 0.64;
          overflow: hidden;
          opacity: 0.08;
          pointer-events: none;
          filter: grayscale(1);
        }
        .sv-contact-right-inner {
          position: relative;
        }
        .sv-contact-desc {
          font-size: 1rem;
          color: rgba(21,38,59,0.62);
          letter-spacing: .04em;
          line-height: 2.2;
          margin: 0 0 32px;
        }
        .sv-contact-note-br { display: none; }
        .sv-contact-note-box {
          width: fit-content;
          font-size: .78rem;
          color: rgba(21,38,59,0.55);
          letter-spacing: .04em;
          line-height: 1.7;
          margin: 4px 0 28px;
          padding: 8px 14px;
          border: 1px solid rgba(21,38,59,0.12);
          background: rgba(21,38,59,0.03);
          border-radius: 4px;
        }
        .sv-contact-sep {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(21,38,59,0.09), transparent 80%);
          margin: 0 0 16px;
        }
        .sv-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 17px 24px;
          background: linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%);
          color: #fff;
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: .78rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 6px;
          min-width: 280px;
          transition: background 0.3s ease;
        }
        .sv-contact-btn:hover {
          background: linear-gradient(135deg, #7a6a3a 0%, #9d8c56 55%, #b8a06a 100%);
        }
        .sv-contact-arrow {
          font-family: 'Courier New', monospace;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .sv-contact-note-br { display: inline; }
          .sv-contact-note-box { width: 100%; }
          .sv-contact-url { margin-bottom: 0; }
          .sv-contact-status { flex-direction: row; align-items: center; gap: 12px; margin-top: 20px; }
          .sv-contact-info { padding-top: 24px; }
          .sv-contact-section { padding: 220px 20px 40px; }
          .sv-contact-card { display: block; }
          .sv-contact-left { padding: 28px 24px 24px; }
          .sv-contact-title { font-size: clamp(28px, 8vw, 38px); }
          .sv-contact-status { margin-top: 20px; }
          .sv-contact-right {
            padding: 24px 24px 32px;
            border-left: none;
            border-top: 1px solid rgba(21,38,59,0.06);
          }
          .sv-contact-bg-logo { right: -32%; bottom: -10%; width: 101%; }
          .sv-contact-desc { font-size: .88rem; line-height: 1.8; margin: 0 0 16px; text-align: center; }
          .sv-contact-right-inner { text-align: center; }
          .sv-contact-btn { min-width: 80%; justify-content: center; align-self: center; }

          .sv-row {
            flex-direction: column !important;
            min-height: auto;
          }
          .sv-row-img-wrap {
            flex: 0 0 260px;
            height: 260px;
          }
          /* LTR: 左下カット */
          .sv-row--ltr .sv-row-img-clip {
            clip-path: polygon(0 0, 100% 0, 100% 84%, 0 100%);
          }
          /* RTL: 左下カット（交互） */
          .sv-row--rtl .sv-row-img-clip {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 84%);
          }

          /* 共通テキストエリア */
          .sv-row-body {
            padding: 44px 28px 52px !important;
          }

          /* モバイル LTR: 左揃え */
          .sv-row--ltr .sv-row-body {
            align-items: flex-start;
            text-align: left;
          }
          .sv-row--ltr .sv-row-num {
            top: -10px; right: 16px; left: auto !important;
          }

          /* モバイル RTL: 数字だけ左上、他は左揃え */
          .sv-row--rtl .sv-row-body {
            align-items: flex-start;
            text-align: left;
          }
          .sv-row--rtl .sv-row-en,
          .sv-row--rtl .sv-row-ja {
            align-self: flex-end;
            text-align: right;
          }
          .sv-row--rtl .sv-row-num {
            top: -10px; left: 16px !important; right: auto !important;
          }
          .sv-row--rtl .sv-row-line {
            margin-left: auto;
            margin-right: 0;
          }
          .sv-row--rtl .sv-row-items {
            align-items: flex-start;
            align-self: flex-start;
            width: 100%;
          }
          .sv-row--rtl .sv-row-items li {
            flex-direction: row;
          }

          /* 角装飾 */
          .sv-row-body::before {
            bottom: 20px; right: 20px; top: auto !important; left: auto !important;
            border-bottom: 1px solid rgba(157,140,86,.35);
            border-right: 1px solid rgba(157,140,86,.35);
            border-top: none !important; border-left: none !important;
          }
          .sv-row--rtl .sv-row-body::before {
            right: auto !important; left: 20px !important;
            border-right: none !important;
            border-left: 1px solid rgba(157,140,86,.35) !important;
          }

          .sv-row-num { font-size: 140px; }
          .sv-row-btn-wrap { display: flex; justify-content: center; width: 100%; }
          .sv-row-btn-wrap .btn-view-more { padding: 14px 56px; }
          .sv-bottom-space { height: 0; }
          .sv-section-sub { white-space: normal; }
          .sv-br { display: inline; }
          .sv-section-header { padding-top: 90px; }
          .sv-row-items { width: 100%; }
          .sv-row-desc { font-size: .82rem; }
          .sv-row-desc--pc { display: none; }
          .sv-row-desc--sp { display: block; }
        }

        .sv-banner-fadein { flex: 1; overflow: hidden; }
        .sv-banners {
          display: flex;
          flex-direction: row;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .sv-banner-link {
          display: block;
          flex: 1;
          overflow: hidden;
          border-radius: 0;
        }
        .sv-banner-img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
        @media (max-width: 640px) {
          .sv-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .sv-banner-link {
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          }
        }
      `}</style>

      <div className="sv-banners">
        <FadeIn delay={0} direction="up" className="sv-banner-fadein">
          <Link href="/philosophy/" className="sv-banner-link">
            <Image src="/images/philosophy-banner.webp" alt="理念・行動指針" width={1800} height={826} sizes="100vw" className="sv-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="sv-banner-fadein">
          <Link href="/overview/" className="sv-banner-link">
            <Image src="/images/overview-banner.webp" alt="概要・沿革" width={1800} height={826} sizes="100vw" className="sv-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="sv-banner-fadein">
          <Link href="/message-kuroki-yuta/" className="sv-banner-link">
            <Image src="/images/top-message-banner.webp" alt="代表挨拶" width={1800} height={826} sizes="100vw" className="sv-banner-img" />
          </Link>
        </FadeIn>
      </div>
      <ScrollLineIndicator />
    </main>
  );
}

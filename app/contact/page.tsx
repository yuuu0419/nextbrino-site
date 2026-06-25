import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import FadeIn from "../components/FadeIn";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "./ContactForm";
export const metadata: Metadata = { title: "お問い合わせ｜NEXT BRINO", description: "NEXT BRINOへのお問い合わせはこちらから。24時間受付しております。ご返答の目安は2〜5営業日です。" };

export default function ContactPage() {
  return (
    <main>
      <PageHero image="/images/contact-hero.webp" en="CONTACT" ja="お問い合わせ" />
      <Ticker text="CONTACT NEXT BRINO" overlapBottom={200} />

      <div className="ct-sec-header">
        <FadeIn delay={0}><p className="section-label">お問い合わせ</p></FadeIn>
        <FadeIn delay={180}><SplitTitle text="CONTACT" className="section-title-en" tag="h1" /></FadeIn>
        <FadeIn delay={350}><div className="section-divider" /></FadeIn>
      </div>

      <div className="ct-bg-wrap" data-header-dark>
        <div className="ct-bg-dots" />
      <div className="ct-body">
        <FadeIn delay={100}>
        <p className="ct-intro">
          <span className="ct-intro-pc">下記フォームに必要事項をご入力いただき、以下3つの方針にご同意のうえ、送信してください。</span>
          <span className="ct-intro-sp">下記フォームに必要事項をご入力いただき、<br />以下3つの方針にご同意のうえ、<br />送信してください。</span>
        </p>
        </FadeIn>
        <FadeIn delay={280}>
        <div className="ct-policy-notice">
          <p className="ct-policy-notice-title">【 同意必須項目 】</p>
          <p className="ct-policy-items-pc">
            <Link href="/privacy-policy/" className="ct-policy-link">個人情報保護方針</Link>、<Link href="/contact-policy/" className="ct-policy-link">お問合せ対応基本方針</Link>、<Link href="/anti-social-forces-policy/" className="ct-policy-link">反社会的勢力に対する基本方針</Link>
          </p>
          <div className="ct-policy-items-sp">
            <p className="ct-policy-notice-item"><Link href="/privacy-policy/" className="ct-policy-link">個人情報保護方針</Link></p>
            <p className="ct-policy-notice-item"><Link href="/contact-policy/" className="ct-policy-link">お問合せ対応基本方針</Link></p>
            <p className="ct-policy-notice-item"><Link href="/anti-social-forces-policy/" className="ct-policy-link">反社会的勢力に対する基本方針</Link></p>
          </div>
        </div>
        </FadeIn>

        <FadeIn delay={100} direction="up">
        <ContactForm />
        </FadeIn>
      </div>
      </div>

      <div className="ct-banners">
        <FadeIn delay={0} direction="up" className="ct-banner-fadein">
        <Link href="/contact-policy/" className="ct-banner-link">
          <Image src="/images/contact-policy-banner.webp" alt="お問合せ対応基本方針" width={1800} height={826} sizes="100vw" className="ct-banner-img" />
        </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="ct-banner-fadein">
        <Link href="/privacy-policy/" className="ct-banner-link">
          <Image src="/images/privacy-policy-banner.webp" alt="個人情報保護方針" width={1800} height={826} sizes="100vw" className="ct-banner-img" />
        </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="ct-banner-fadein">
        <Link href="/anti-social-forces-policy/" className="ct-banner-link">
          <Image src="/images/antisocial-policy-banner.webp" alt="反社会的勢力に対する基本方針" width={1800} height={826} sizes="100vw" className="ct-banner-img" />
        </Link>
        </FadeIn>
      </div>

      <style>{`
        /* セクションヘッダー（代表挨拶ページと同じ構造） */
        .ct-sec-header {
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 24px;
          position: relative;
          z-index: 20;
        }

        /* 白 × ネイビードット背景ラップ */
        .ct-bg-wrap {
          position: relative;
          background: #ffffff;
          overflow: hidden;
          padding: clamp(40px, 5vw, 80px) 0 clamp(20px, 2vw, 32px);
        }
        .ct-bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(21,38,59,0.18) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* フォーム本体 — ガラス調ボックス */
        .ct-body {
          position: relative;
          z-index: 1;
          width: 88%;
          max-width: 1100px;
          margin: 0 auto;
          background: rgba(21,38,59,0.07);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(21,38,59,0.18);
          border-radius: 8px;
          padding: 48px 56px 64px;
          box-shadow: 0 4px 40px rgba(21,38,59,0.06);
        }
        .ct-intro { font-size: .93rem; line-height: 2; color: rgba(21,38,59,0.75); margin: 0 0 20px; text-align: center; }
        .ct-intro-pc { display: inline; }
        .ct-intro-sp { display: none; }

        .ct-policy-notice {
          margin: 0 0 40px;
          padding: 16px 20px;
          border: 1px solid rgba(21,38,59,0.2);
          background: rgba(21,38,59,0.06);
          border-radius: 4px;
          text-align: center;
        }
        .ct-policy-notice-title {
          font-size: .85rem;
          font-weight: 700;
          color: rgba(21,38,59,0.8);
          letter-spacing: .06em;
          margin: 0 0 8px;
        }
        .ct-policy-notice-item {
          font-size: .85rem;
          color: rgba(21,38,59,0.65);
          margin: 4px 0 0;
          line-height: 1.8;
        }
        .ct-policy-items-pc { font-size: .85rem; color: rgba(21,38,59,0.65); margin: 4px 0 0; line-height: 1.8; }
        .ct-policy-items-sp { display: none; }

        .ct-opt {
          font-size: .72rem;
          background: rgba(21,38,59,0.12);
          color: rgba(21,38,59,0.7);
          padding: 2px 8px;
          border-radius: 2px;
          letter-spacing: .06em;
          font-weight: 700;
          flex-shrink: 0;
        }

        .ct-budget-wrap { display: flex; align-items: center; gap: 10px; }
        .ct-budget-input { max-width: 180px; }
        .ct-budget-unit { font-size: .9rem; color: rgba(21,38,59,0.8); white-space: nowrap; }

        .ct-form { display: flex; flex-direction: column; }

        .ct-table { width: 100%; border-top: 1px solid rgba(21,38,59,0.15); }

        .ct-row {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid rgba(21,38,59,0.15);
          padding: 24px 0;
        }

        .ct-label-cell {
          width: 260px;
          min-width: 260px;
          font-size: .9rem;
          font-weight: 600;
          color: rgba(21,38,59,0.9);
          letter-spacing: .03em;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          padding-right: 24px;
          padding-top: 10px;
        }

        .ct-req {
          font-size: .72rem;
          background: #1565c0;
          color: #fff;
          padding: 2px 8px;
          border-radius: 2px;
          letter-spacing: .06em;
          font-weight: 700;
          flex-shrink: 0;
        }

        .ct-input-cell {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ct-select-wrap { position: relative; display: block; width: 100%; }
        .ct-select-wrap select { appearance: none; -webkit-appearance: none; }
        .ct-select-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          font-size: .7rem;
          color: rgba(21,38,59,0.5);
        }

        .ct-input {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid rgba(21,38,59,0.2);
          border-radius: 4px;
          font-size: .9rem;
          font-family: var(--font-main);
          color: #15263b;
          background: rgba(255,255,255,0.55);
          outline: none;
          box-sizing: border-box;
          transition: border-color .2s, background .2s;
        }
        .ct-input::placeholder { color: rgba(21,38,59,0.35); }
        .ct-input:focus { border-color: rgba(21,38,59,0.5); background: rgba(255,255,255,0.8); }
        .ct-textarea { min-height: 180px; resize: vertical; }
        .ct-input-half { max-width: 220px; }

        .ct-hint {
          margin: 6px 0 0;
          font-size: .8rem;
          color: rgba(21,38,59,0.45);
          letter-spacing: .02em;
          white-space: nowrap;
        }

        .ct-postal-mark { margin: 0 0 4px; font-size: .9rem; color: rgba(21,38,59,0.8); }

        .ct-radios { display: flex; flex-direction: column; gap: 10px; padding-top: 10px; }
        .ct-radio-label { display: flex; align-items: center; gap: 8px; font-size: .9rem; color: rgba(21,38,59,0.85); cursor: pointer; }
        .ct-radio-label input[type="radio"] { accent-color: #15263b; width: 16px; height: 16px; }

        .ct-file-wrap { display: flex; align-items: center; gap: 12px; }
        .ct-file-btn {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          border: 1px solid rgba(21,38,59,0.25);
          border-radius: 4px;
          font-size: .85rem;
          color: rgba(21,38,59,0.85);
          background: rgba(255,255,255,0.4);
          cursor: pointer;
          white-space: nowrap;
          transition: background .2s;
        }
        .ct-file-btn:hover { background: rgba(255,255,255,0.65); }
        .ct-file-name { font-size: .85rem; color: rgba(21,38,59,0.45); }

        .ct-agree-section {
          margin: 32px 0 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .ct-agree-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: .9rem;
          color: rgba(21,38,59,0.8);
          cursor: pointer;
        }
        .ct-checkbox { width: 18px; height: 18px; accent-color: #15263b; flex-shrink: 0; }
        .ct-policy-link { color: #15263b; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
        .ct-policy-link:hover { opacity: .65; }

        .ct-submit-wrap { text-align: center; margin-bottom: 8px; }
        .ct-submit {
          display: inline-block;
          width: 100%;
          max-width: 600px;
          padding: 18px 0;
          background: rgba(21,38,59,0.85);
          color: #fff;
          border: 1px solid rgba(21,38,59,0.9);
          font-size: .95rem;
          letter-spacing: .2em;
          font-family: var(--font-main);
          font-weight: 700;
          cursor: pointer;
          border-radius: 4px;
          transition: background .25s, border-color .25s;
        }
        .ct-submit:hover { background: #15263b; border-color: #15263b; }

        @media (min-width: 641px) {
          .ct-table {
            border-top: 1px solid rgba(21,38,59,0.15);
          }
          .ct-row {
            border-bottom: 1px solid rgba(21,38,59,0.15);
          }
        }

        /* バナーセクション */
        .ct-banner-fadein { flex: 1; overflow: hidden; }
        .ct-banner-fadein .ct-banner-link { border-radius: 0; }
        .ct-banners {
          display: flex;
          flex-direction: row;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .ct-banner-link {
          display: block;
          flex: 1;
          overflow: hidden;
          border-radius: 0;
        }
        .ct-banner-img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }

        @media (max-width: 640px) {
          .ct-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            border-radius: 0;
            overflow: visible;
          }
          .ct-banner-link {
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          }
        }

        @media (max-width: 640px) {
          .ct-sec-header { padding-top: 90px; padding-bottom: 20px; }
          .ct-bg-wrap { padding: 32px 0 24px; }
          .ct-body { padding: 32px 24px 48px; border-radius: 6px; }
          .ct-row { flex-direction: column; gap: 12px; }
          .ct-label-cell { width: 100%; min-width: unset; padding-top: 0; padding-right: 0; }
          .ct-input-cell { width: 100%; }
          .ct-input-half { max-width: 100%; }
          .ct-submit { max-width: 80%; padding: 12px 0; font-size: .82rem; }
          .ct-intro-pc { display: none; }
          .ct-intro-sp { display: inline; }
          .ct-policy-items-pc { display: none; }
          .ct-policy-items-sp { display: block; }
          .ct-hint { white-space: normal; }
          .ct-hint-nowrap { white-space: nowrap; font-size: .66rem; overflow: visible; }
        }
      `}</style>
      <ScrollLineIndicator />
    </main>
  );
}

import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import FadeIn from "../components/FadeIn";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = { title: "インターンシップ｜NEXT BRINO", description: "NEXT BRINOのインターンシップ情報ページです。" };

export default function InternshipPage() {
  return (
    <main>
      <PageHero image="/images/internship-hero.webp" en="INTERNSHIP" ja="インターンシップ" />

      <Ticker text="INTERNSHIP NEXT BRINO" overlapBottom={200} />

      <div className="in-section-header">
        <p className="section-label">インターンシップ</p>
        <SplitTitle text="INTERNSHIP" className="section-title-en" tag="h1" />
        <div className="section-divider" />
      </div>

      <div className="in-body">
        <FadeIn delay={0}>
          <div className="in-status">
            <p className="in-status-label">INFORMATION</p>
            <h2 className="in-status-title">
              <span className="in-pc">インターンシップの受付は、一時中止しております。</span>
              <span className="in-sp">インターンシップの受付は<br />一時中止しております。</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100} direction="up">
          <div className="in-notice">
            {/* PC用テキスト */}
            <p className="in-notice-text in-pc">現在、新規事業を含め、受け入れ体制の整備を進めております。</p>
            <p className="in-notice-text in-pc">再開時期は、当ウェブサイトにて改めてお知らせいたします。</p>
            {/* SP用テキスト */}
            <p className="in-notice-text in-sp">現在、新規事業を含め、<br />受け入れ体制の整備を進めております。</p>
            <p className="in-notice-text in-sp">再開時期は、当ウェブサイトにて<br />改めてお知らせいたします。</p>
          </div>
        </FadeIn>
      </div>

      <div className="in-banners">
        <FadeIn delay={0} direction="up" className="in-banner-fadein">
          <Link href="/" className="in-banner-link">
            <Image src="/images/home-banner.webp" alt="HOME" width={1800} height={826} sizes="100vw" className="in-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={100} direction="up" className="in-banner-fadein">
          <Link href="/message-kuroki-yuta/" className="in-banner-link">
            <Image src="/images/top-message-banner.webp" alt="代表メッセージ" width={1800} height={826} sizes="100vw" className="in-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="in-banner-fadein">
          <Link href="/philosophy/" className="in-banner-link">
            <Image src="/images/philosophy-banner.webp" alt="企業理念" width={1800} height={826} sizes="100vw" className="in-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={200} direction="up" className="in-banner-fadein">
          <Link href="/service/" className="in-banner-link">
            <Image src="/images/business-banner.webp" alt="事業内容" width={1800} height={826} sizes="100vw" className="in-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={250} direction="up" className="in-banner-fadein">
          <Link href="/overview/" className="in-banner-link">
            <Image src="/images/overview-banner.webp" alt="会社概要" width={1800} height={826} sizes="100vw" className="in-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="in-banner-fadein">
          <Link href="/contact/" className="in-banner-link">
            <Image src="/images/contact-banner.webp" alt="お問い合わせ" width={1800} height={826} sizes="100vw" className="in-banner-img" />
          </Link>
        </FadeIn>
      </div>

      <style>{`
        .in-section-header {
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 56px;
          position: relative;
          z-index: 20;
        }
        .section-label { font-size: .7rem; letter-spacing: .32em; color: #9d8c56; margin: 0 0 12px; }
        .section-title-en { font-size: clamp(44px,6vw,80px); font-weight: 900; color: #15263b; letter-spacing: .08em; line-height: 1; margin: 0 0 20px; }
        .section-divider { width: 56px !important; height: 2px !important; background: linear-gradient(90deg,#9d8c56,rgba(157,140,86,.15)) !important; }

        .in-body {
          width: 88%;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 0 80px;
          text-align: center;
        }
        .in-status { margin: 0 0 48px; }
        .in-status-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: .72rem; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 16px; }
        .in-status-title { font-size: clamp(1.2rem,2.5vw,1.8rem); font-weight: 700; color: #15263b; margin: 0; letter-spacing: .04em; }
        .in-notice { margin: 0 0 32px; padding: 32px 40px; background: rgba(21,38,59,.03); border: 1px solid rgba(21,38,59,.08); text-align: center; }
        .in-notice-text { font-size: .93rem; line-height: 2; color: #555; margin: 0 0 12px; }
        .in-notice-text:last-child { margin-bottom: 0; }

        .in-pc { display: block; }
        .in-sp { display: none; }

        @media (max-width: 768px) {
          .in-section-header { padding-top: 90px; padding-bottom: 24px; }
        }

        @media (max-width: 640px) {
          .in-body { padding-bottom: 40px; }
          .in-notice { padding: 24px 20px; }
          .in-pc { display: none; }
          .in-sp { display: block; }
        }

        .in-banner-fadein { flex: 1; overflow: hidden; }
        .in-banners {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .in-banner-fadein { flex: 0 0 33.333%; overflow: hidden; }
        .in-banner-link { display: block; overflow: hidden; border-radius: 0; }
        .in-banner-img { width: 100% !important; height: auto !important; display: block; }

        @media (max-width: 640px) {
          .in-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .in-banner-fadein { flex: none; width: 100%; }
          .in-banner-link {
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          }
        }
      `}</style>
      <ScrollLineIndicator />
    </main>
  );
}

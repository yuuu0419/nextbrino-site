import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import FadeIn from "../components/FadeIn";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = { title: "採用情報｜NEXT BRINO", description: "NEXT BRINOの採用情報ページです。" };

export default function RecruitPage() {
  return (
    <main>
      <PageHero image="/images/recruit-hero.webp" en="RECRUIT" ja="採用情報" />

      <Ticker text="RECRUIT NEXT BRINO" overlapBottom={200} />

      <div className="rc-section-header">
        <p className="section-label">採用情報</p>
        <SplitTitle text="RECRUIT" className="section-title-en" tag="h1" />
        <div className="section-divider" />
      </div>

      <div className="rc-body">
        <FadeIn delay={0}>
          <div className="rc-status">
            <p className="rc-status-label">INFORMATION</p>
            <h2 className="rc-status-title">今期の募集は終了いたしました。</h2>
          </div>
        </FadeIn>

        <FadeIn delay={100} direction="up">
          <div className="rc-notice">
            {/* PC用テキスト */}
            <p className="rc-notice-text rc-pc">今期の募集につきましては、終了いたしました。</p>
            <p className="rc-notice-text rc-pc">次期募集の際は、当ウェブサイトにて改めてお知らせいたします。</p>
            <p className="rc-notice-text rc-pc">引き続きNEXT BRINOをどうぞよろしくお願いいたします。</p>
            {/* SP用テキスト */}
            <p className="rc-notice-text rc-sp">今期の募集は、終了いたしました。</p>
            <p className="rc-notice-text rc-sp">次期募集の際は、当ウェブサイトにて<br />改めてお知らせいたします。<br />引き続きよろしくお願いいたします。</p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <p className="rc-caution">
            <span className="rc-pc">募集期間外のご応募や採用に関するお問い合わせは受け付けておりません。</span>
            <span className="rc-sp">募集期間外のご応募や採用に関する<br />お問い合わせは受け付けておりません。</span>
          </p>
        </FadeIn>
      </div>

      <div className="rc-banners">
        <FadeIn delay={0} direction="up" className="rc-banner-fadein">
          <Link href="/" className="rc-banner-link">
            <Image src="/images/home-banner.webp" alt="HOME" width={1800} height={826} sizes="100vw" className="rc-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={100} direction="up" className="rc-banner-fadein">
          <Link href="/message-kuroki-yuta/" className="rc-banner-link">
            <Image src="/images/top-message-banner.webp" alt="代表メッセージ" width={1800} height={826} sizes="100vw" className="rc-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="rc-banner-fadein">
          <Link href="/philosophy/" className="rc-banner-link">
            <Image src="/images/philosophy-banner.webp" alt="企業理念" width={1800} height={826} sizes="100vw" className="rc-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={200} direction="up" className="rc-banner-fadein">
          <Link href="/service/" className="rc-banner-link">
            <Image src="/images/business-banner.webp" alt="事業内容" width={1800} height={826} sizes="100vw" className="rc-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={250} direction="up" className="rc-banner-fadein">
          <Link href="/overview/" className="rc-banner-link">
            <Image src="/images/overview-banner.webp" alt="会社概要" width={1800} height={826} sizes="100vw" className="rc-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="rc-banner-fadein">
          <Link href="/contact/" className="rc-banner-link">
            <Image src="/images/contact-banner.webp" alt="お問い合わせ" width={1800} height={826} sizes="100vw" className="rc-banner-img" />
          </Link>
        </FadeIn>
      </div>

      <style>{`
        .rc-section-header {
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

        .rc-body {
          width: 88%;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 0 80px;
          text-align: center;
        }
        .rc-status { margin: 0 0 48px; }
        .rc-status-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: .72rem; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 16px; }
        .rc-status-title { font-size: clamp(1.2rem,2.5vw,1.8rem); font-weight: 700; color: #15263b; margin: 0; letter-spacing: .04em; }
        .rc-notice { margin: 0 0 32px; padding: 32px 40px; background: rgba(21,38,59,.03); border: 1px solid rgba(21,38,59,.08); text-align: center; }
        .rc-notice-text { font-size: .93rem; line-height: 2; color: #555; margin: 0 0 12px; }
        .rc-notice-text:last-child { margin-bottom: 0; }
        .rc-caution { font-size: .88rem; line-height: 2; color: #666; margin: 0; }

        .rc-pc { display: block; }
        .rc-sp { display: none; }

        @media (max-width: 768px) {
          .rc-section-header { padding-top: 90px; padding-bottom: 24px; }
        }

        @media (max-width: 640px) {
          .rc-body { padding-bottom: 40px; }
          .rc-notice { padding: 24px 20px; }
          .rc-pc { display: none; }
          .rc-sp { display: block; }
        }

        .rc-banners {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .rc-banner-fadein { flex: 0 0 33.333%; overflow: hidden; }
        .rc-banner-link { display: block; overflow: hidden; border-radius: 0; }
        .rc-banner-img { width: 100% !important; height: auto !important; display: block; }

        @media (max-width: 640px) {
          .rc-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .rc-banner-fadein { flex: none; width: 100%; }
          .rc-banner-link {
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

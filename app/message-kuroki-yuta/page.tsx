import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import Link from "next/link";
import Image from "next/image";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import MessageLayout from "../components/MessageLayout";
import MessageSections from "../components/MessageSections";
import FadeIn from "../components/FadeIn";
export const metadata: Metadata = { title: "代表挨拶-黒木 雄太｜NEXT BRINO", description: "NEXT BRINO 代表・黒木雄太からのメッセージ。IT技術と誠実さを土台に、日常に新しい可能性をひらく想いをお伝えします。" };

export default function MessagePage() {
  return (
    <main>
      <PageHero image="/images/message-kuroki-yuta-hero.webp" en="TOP MESSAGE" ja={"繊細に想像し、\n大胆に創造する。"} />

      <Ticker text="TOP MESSAGE KUROKI YUTA" overlapBottom={200} />

      <div className="msg-section-header">
        <p className="section-label">代表挨拶</p>
        <SplitTitle text="TOP MESSAGE" className="section-title-en" tag="h1" />
        <div className="section-divider" />
        <div className="msg-header-role msg-header-role--mobile-only">
          <span className="msg-header-role-label">最高経営責任者 / CEO</span>
          <Image
            src="/images/ceo-sign.webp"
            alt="署名"
            width={5400}
            height={2354}
            className="msg-header-sign"
          />
        </div>
      </div>

      <div className="msg-bg-wrap">
        <div className="msg-bg-dots" />
        <MessageLayout />
      </div>

      <MessageSections />

      <style>{`
        .msg-section-header {
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 56px;
        }

        /* 役職・署名エリア */
        .msg-header-role--mobile-only {
          display: none !important;
        }
        /* スマホでも非表示（写真上に移動） */

        .msg-header-role {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 16px;
          margin-top: 20px;
        }
        .msg-header-role-label {
          font-size: clamp(.58rem, .75vw, .68rem);
          letter-spacing: .22em;
          color: rgba(157,140,86,0.85);
          font-family: var(--font-noto-sans-jp);
          white-space: nowrap;
        }
        .msg-header-sign {
          width: clamp(72px, 8vw, 120px);
          height: auto;
          opacity: 0.6;
          filter: brightness(0);
        }

        @media (max-width: 640px) {
          .msg-section-header { padding-top: 90px; padding-bottom: 20px; }
          .msg-header-role { margin-top: 36px; }
        }

        .msg-bg-wrap {
          position: relative;
          background: #15263b;
          overflow: hidden;
          padding: clamp(24px, 3vw, 44px) 0;
        }
        .msg-bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(157,140,86,0.14) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        .ms-section--navy:last-of-type { padding-bottom: 24px !important; }

        @media (max-width: 640px) {
          .msg-bg-wrap { background: transparent; padding: 0; }
          .msg-bg-dots { display: none; }
        }

        .msg-banner-fadein { flex: 1; overflow: hidden; }
        .msg-banners {
          display: flex;
          flex-direction: row;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .msg-banner-link {
          display: block;
          flex: 1;
          overflow: hidden;
          border-radius: 0;
        }
        .msg-banner-img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
        @media (max-width: 640px) {
          .msg-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .msg-banner-link {
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          }
        }
      `}</style>

      <div className="msg-banners">
        <FadeIn delay={0} direction="up" className="msg-banner-fadein">
          <Link href="/" className="msg-banner-link">
            <Image src="/images/home-banner.jpg" alt="HOME" width={1800} height={826} sizes="100vw" className="msg-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="msg-banner-fadein">
          <Link href="/philosophy/" className="msg-banner-link">
            <Image src="/images/philosophy-banner.jpg" alt="理念・行動指針" width={1800} height={826} sizes="100vw" className="msg-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="msg-banner-fadein">
          <Link href="/contact/" className="msg-banner-link">
            <Image src="/images/contact-banner.jpg" alt="お問い合わせ" width={1800} height={826} sizes="100vw" className="msg-banner-img" />
          </Link>
        </FadeIn>
      </div>
      <ScrollLineIndicator />
    </main>
  );
}

import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "../components/FadeIn";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import NewsListSection from "../components/NewsListSection";
export const metadata: Metadata = { title: "お知らせ｜NEXT BRINO", description: "NEXT BRINOからの最新のお知らせ・ニュースをご覧いただけます。グループの情報も掲載しております。" };

export default function NewsPage() {
  return (
    <main>
      <PageHero image="/images/news-hero.webp" en="NEWS" ja="お知らせ" />

      <Ticker text="NEWS  ·  お知らせ  ·  NEXT BRINO  ·  INFORMATION  ·  " overlapBottom={200} />

      <div className="nw-section-header">
        <p className="section-label">お知らせ</p>
        <SplitTitle text="NEWS" className="section-title-en" tag="h1" />
        <div className="section-divider" />
        <p className="nw-section-lead">NEXT BRINO、グループからのお知らせ</p>
      </div>

      <NewsListSection />

      <style>{`
        .nw-section-header {
          position: relative;
          z-index: 20;
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 56px;
        }
        .nw-section-lead {
          margin: 28px 0 0;
          font-size: clamp(.85rem, 1.1vw, 1rem);
          color: #555;
          font-weight: 300;
          letter-spacing: .08em;
          line-height: 1.9;
        }
        .nb-wrap { padding-bottom: 24px !important; }

        @media (max-width: 768px) {
          .nw-section-header { padding-top: 90px; padding-bottom: 24px; }
          .nb-wrap { padding-bottom: 24px !important; }
        }

        .nw-banner-fadein { flex: 1; overflow: hidden; }
        .nw-banners {
          display: flex;
          flex-direction: row;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .nw-banner-link {
          display: block;
          flex: 1;
          overflow: hidden;
          border-radius: 0;
        }
        .nw-banner-img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
        @media (max-width: 640px) {
          .nw-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .nw-banner-link {
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          }
        }
      `}</style>

      <div className="nw-banners">
        <FadeIn delay={0} direction="up" className="nw-banner-fadein">
          <Link href="/" className="nw-banner-link">
            <Image src="/images/home-banner.jpg" alt="HOME" width={1800} height={826} sizes="100vw" className="nw-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="nw-banner-fadein">
          <Link href="/service/" className="nw-banner-link">
            <Image src="/images/business-banner.jpg" alt="事業内容" width={1800} height={826} sizes="100vw" className="nw-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="nw-banner-fadein">
          <Link href="/contact/" className="nw-banner-link">
            <Image src="/images/contact-banner.jpg" alt="お問い合わせ" width={1800} height={826} sizes="100vw" className="nw-banner-img" />
          </Link>
        </FadeIn>
      </div>
      <ScrollLineIndicator />
    </main>
  );
}

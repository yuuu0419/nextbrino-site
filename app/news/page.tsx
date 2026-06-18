import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import NewsListSection from "../components/NewsListSection";
export const metadata: Metadata = { title: "お知らせ | NEXT BRINO" };

export default function NewsPage() {
  return (
    <main>
      <PageHero image="/images/news-hero.jpg" en="NEWS" ja="お知らせ" />

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
        @media (max-width: 768px) {
          .nw-section-header { padding-top: 90px; padding-bottom: 24px; }
        }
      `}</style>
    </main>
  );
}

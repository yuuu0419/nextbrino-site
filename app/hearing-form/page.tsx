import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import FadeIn from "../components/FadeIn";
import HearingForm from "./HearingForm";

export const metadata: Metadata = {
  title: "Webサイト制作ヒアリングシート｜NEXT BRINO",
  description: "NEXT BRINOのWebサイト制作にあたってのヒアリングシートです。",
  robots: { index: false, follow: false },
};

export default function HearingFormPage() {
  return (
    <main>
      <PageHero image="/images/contact-hero.webp" en="HEARING" ja="Webサイト制作ヒアリングシート" />
      <Ticker text="WEBSITE HEARING NEXT BRINO" overlapBottom={200} />

      <div className="hf-sec-header">
        <FadeIn delay={0}><p className="section-label">ヒアリングシート</p></FadeIn>
        <FadeIn delay={180}><SplitTitle text="HEARING" className="section-title-en" tag="h1" /></FadeIn>
        <FadeIn delay={350}><div className="section-divider" /></FadeIn>
      </div>

      <div className="hf-bg-wrap" data-header-dark>
        <div className="hf-bg-dots" />
        <div className="hf-body">
          <FadeIn delay={100}>
            <p className="hf-intro">
              Webサイト制作にあたり必要なヒアリングです。<br />
              分かる範囲・答えられる範囲でご記入ください。
            </p>
          </FadeIn>
          <FadeIn delay={100} direction="up">
            <HearingForm />
          </FadeIn>
        </div>
      </div>

      <style>{`
        .hf-sec-header {
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 24px;
          position: relative;
          z-index: 20;
        }

        .hf-bg-wrap {
          position: relative;
          background: #ffffff;
          overflow: hidden;
          padding: clamp(40px, 5vw, 80px) 0 clamp(40px, 5vw, 80px);
        }
        .hf-bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(21,38,59,0.18) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .hf-body {
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
        .hf-intro {
          font-size: .93rem;
          line-height: 2;
          color: rgba(21,38,59,0.75);
          margin: 0 0 36px;
          text-align: center;
        }
        .hf-intro strong { color: #15263b; }

        @media (max-width: 640px) {
          .hf-sec-header { padding-top: 90px; padding-bottom: 20px; }
          .hf-bg-wrap { padding: 32px 0; }
          .hf-body { padding: 32px 24px 48px; border-radius: 6px; }
        }
      `}</style>
      <ScrollLineIndicator />
    </main>
  );
}

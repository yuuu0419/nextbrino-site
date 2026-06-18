import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Link from "next/link";
export const metadata: Metadata = { title: "インターンシップ | NEXT BRINO" };

export default function InternshipPage() {
  return (
    <main>
      <PageHero image="/images/internship-hero.webp" en="INTERNSHIP" ja="インターンシップ" />
      <div className="pc" style={{ maxWidth: 800, textAlign: "center", paddingTop: 100, paddingBottom: 120 }}>
        <div className="in-status">
          <p className="in-status-label">INFORMATION</p>
          <h2 className="in-status-title">現在、インターンシップの受付は行っておりません</h2>
        </div>
        <div className="in-notice">
          <p className="in-notice-text">現在、新規事業を含め受け入れ体制の整備を進めており、インターンシップの募集を一時停止しております。</p>
          <p className="in-notice-text">次回の募集開始時期については、公式サイトにて改めてお知らせいたします。</p>
        </div>
        <p className="in-sub">インターンシップに関するお問い合わせは<Link href="/contact/" className="in-link">お問い合わせフォーム</Link>よりご連絡ください。</p>
        <p className="in-date">更新日：2026年4月29日</p>
      </div>
      <style>{`
        
        .ph { background: #15263b; padding: 120px 0 64px; }
        .ph-inner { width: 88%; max-width: 1100px; margin: 0 auto; }
        .ph-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: 11px; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 12px; }
        .ph-en { font-family: var(--font-barlow-condensed), sans-serif; font-size: clamp(52px,8vw,110px); font-weight: 800; letter-spacing: .08em; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.35); margin: 0 0 20px; }
        .ph-line { width: 100%; height: 1px; background: rgba(255,255,255,.1); margin: 0 0 20px; }
        .ph-ja { font-size: clamp(18px,2.5vw,26px); font-weight: 300; letter-spacing: .1em; color: rgba(255,255,255,.72); margin: 0; }
        .pc { width: 88%; max-width: 1100px; margin: 0 auto; padding: 72px 0 100px; }

        .in-status { margin: 0 0 48px; }
        .in-status-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: .72rem; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 16px; }
        .in-status-title { font-size: clamp(1.2rem,2.5vw,1.8rem); font-weight: 700; color: #15263b; margin: 0; letter-spacing: .04em; }
        .in-notice { margin: 0 0 40px; padding: 32px 40px; background: rgba(21,38,59,.03); border: 1px solid rgba(21,38,59,.08); text-align: left; }
        .in-notice-text { font-size: .93rem; line-height: 2; color: #555; margin: 0 0 12px; }
        .in-notice-text:last-child { margin-bottom: 0; }
        .in-sub { font-size: .88rem; line-height: 2; color: #666; margin: 0 0 24px; }
        .in-link { color: #9d8c56; text-decoration: underline; }
        .in-date { font-size: .8rem; color: rgba(21,38,59,.35); letter-spacing: .06em; }
      `}</style>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "採用情報 | NEXT BRINO" };

export default function RecruitPage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">RECRUIT</h1>
        <div className="ph-line" />
        <p className="ph-ja">採用情報</p>
      </div></div>
      <div className="pc" style={{ maxWidth: 800, textAlign: "center", paddingTop: 100, paddingBottom: 120 }}>
        <div className="rc-status">
          <p className="rc-status-label">INFORMATION</p>
          <h2 className="rc-status-title">今期の採用募集は終了いたしました</h2>
        </div>
        <div className="rc-notice">
          <p className="rc-notice-text">今期の採用募集につきましては、終了いたしました。ご関心をお寄せいただいた皆様に、心より御礼申し上げます。</p>
          <p className="rc-notice-text">次期採用募集の際は、当ウェブサイトにて改めてお知らせいたします。引き続きNEXT BRINOをどうぞよろしくお願いいたします。</p>
        </div>
        <p className="rc-sub">採用に関するお問い合わせは<Link href="/contact/" className="rc-link">お問い合わせフォーム</Link>よりご連絡ください。<br />募集期間外のご応募は受け付けておりません。</p>
        <p className="rc-date">公開日：2026年4月29日</p>
      </div>
      <style>{`
        
        .ph { background: #15263b; padding: 120px 0 64px; }
        .ph-inner { width: 88%; max-width: 1100px; margin: 0 auto; }
        .ph-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: 11px; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 12px; }
        .ph-en { font-family: var(--font-barlow-condensed), sans-serif; font-size: clamp(52px,8vw,110px); font-weight: 800; letter-spacing: .08em; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.35); margin: 0 0 20px; }
        .ph-line { width: 100%; height: 1px; background: rgba(255,255,255,.1); margin: 0 0 20px; }
        .ph-ja { font-size: clamp(18px,2.5vw,26px); font-weight: 300; letter-spacing: .1em; color: rgba(255,255,255,.72); margin: 0; }
        .pc { width: 88%; max-width: 1100px; margin: 0 auto; padding: 72px 0 100px; }

        .rc-status { margin: 0 0 48px; }
        .rc-status-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: .72rem; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 16px; }
        .rc-status-title { font-size: clamp(1.2rem,2.5vw,1.8rem); font-weight: 700; color: #15263b; margin: 0; letter-spacing: .04em; }
        .rc-notice { margin: 0 0 40px; padding: 32px 40px; background: rgba(21,38,59,.03); border: 1px solid rgba(21,38,59,.08); text-align: left; }
        .rc-notice-text { font-size: .93rem; line-height: 2; color: #555; margin: 0 0 12px; }
        .rc-notice-text:last-child { margin-bottom: 0; }
        .rc-sub { font-size: .88rem; line-height: 2; color: #666; margin: 0 0 24px; }
        .rc-link { color: #9d8c56; text-decoration: underline; }
        .rc-date { font-size: .8rem; color: rgba(21,38,59,.35); letter-spacing: .06em; }
      `}</style>
    </main>
  );
}

import type { Metadata } from "next";
export const metadata: Metadata = { title: "理念・行動指針 | NEXT BRINO" };

const values = [
  { cat: "人・信頼", items: ["変化の中心に人を置く", "誠実・謙虚・誠意を持って行動する", "大切な誰かのために創る", "少数意見を尊重しながら方向性を統一する"] },
  { cat: "価値創造・革新", items: ["想像力と大胆な創造のバランスをとる", "技術的な専門知識を継続的に磨く", "顧客の未充足ニーズに応える", "正しい方向に適切な努力をかける"] },
  { cat: "成長・変化", items: ["必要な変化に適応する", "結果よりプロセスを重視する", "立ち止まることも前進のうちと捉える"] },
  { cat: "持続可能性・責任", items: ["創るものすべてに環境への影響を考慮する"] },
  { cat: "幸福・パフォーマンス", items: ["心身の健康を維持する", "感情的な情熱と合理的な思考のバランスをとる"] },
];

export default function PhilosophyPage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">PHILOSOPHY</h1>
        <div className="ph-line" />
        <p className="ph-ja">理念・行動指針</p>
      </div></div>
      <div className="pc">
        <div className="pl-top-cards">
          <div className="pl-top-card">
            <p className="pl-top-label">経営理念</p>
            <p className="pl-top-text">繊細に想像し、大胆に創造する</p>
          </div>
          <div className="pl-top-card">
            <p className="pl-top-label">MISSION</p>
            <p className="pl-top-text">確かな技術で日常をデザインする</p>
            <p className="pl-top-sub">IT技術を単なる効率化の道具としてではなく、日常の細やかな不便を解消し、毎日をより快適で意味あるものにするための手段として活用します。</p>
          </div>
          <div className="pl-top-card">
            <p className="pl-top-label">VISION</p>
            <p className="pl-top-text">人生に輝きと革新的なアイデアを提供する</p>
            <p className="pl-top-sub">テクノロジーが未来を照らし、個人が本来の可能性を発見できる社会を創ることを目指します。</p>
          </div>
        </div>

        <div className="pl-values-section">
          <h2 className="pl-values-title">14の行動指針</h2>
          <div className="pl-values-grid">
            {values.map(({ cat, items }) => (
              <div key={cat} className="pl-value-group">
                <p className="pl-value-cat">{cat}</p>
                <ul className="pl-value-list">
                  {items.map((item) => <li key={item} className="pl-value-item">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        
        .ph { background: #15263b; padding: 120px 0 64px; }
        .ph-inner { width: 88%; max-width: 1100px; margin: 0 auto; }
        .ph-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: 11px; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 12px; }
        .ph-en { font-family: var(--font-barlow-condensed), sans-serif; font-size: clamp(52px,8vw,110px); font-weight: 800; letter-spacing: .08em; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.35); margin: 0 0 20px; }
        .ph-line { width: 100%; height: 1px; background: rgba(255,255,255,.1); margin: 0 0 20px; }
        .ph-ja { font-size: clamp(18px,2.5vw,26px); font-weight: 300; letter-spacing: .1em; color: rgba(255,255,255,.72); margin: 0; }
        .pc { width: 88%; max-width: 1100px; margin: 0 auto; padding: 72px 0 100px; }

        .pl-top-cards { display: flex; flex-direction: column; gap: 2px; margin: 0 0 72px; }
        .pl-top-card { padding: 36px 40px; border: 1px solid rgba(21,38,59,.1); }
        .pl-top-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: .72rem; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 12px; }
        .pl-top-text { font-size: clamp(1.1rem,2vw,1.5rem); font-weight: 700; color: #15263b; margin: 0 0 12px; letter-spacing: .06em; line-height: 1.5; }
        .pl-top-sub { font-size: .88rem; line-height: 1.95; color: #666; margin: 0; }
        .pl-values-section { }
        .pl-values-title { font-family: var(--font-barlow-condensed), sans-serif; font-size: clamp(22px,3vw,30px); font-weight: 700; letter-spacing: .12em; color: #15263b; margin: 0 0 36px; padding-bottom: 14px; border-bottom: 2px solid #9d8c56; }
        .pl-values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px 40px; }
        .pl-value-group { }
        .pl-value-cat { font-size: .75rem; letter-spacing: .18em; color: #9d8c56; margin: 0 0 14px; font-weight: 700; }
        .pl-value-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .pl-value-item { font-size: .9rem; line-height: 1.75; color: #444; padding-left: 16px; position: relative; }
        .pl-value-item::before { content: ""; position: absolute; left: 0; top: 11px; width: 6px; height: 1px; background: #9d8c56; }
        @media (max-width: 640px) {
          .pl-values-grid { grid-template-columns: 1fr; gap: 28px; }
          .pl-top-card { padding: 24px 20px; }
        }
      `}</style>
    </main>
  );
}

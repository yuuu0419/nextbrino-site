import type { Metadata } from "next";
export const metadata: Metadata = { title: "事業内容 | NEXT BRINO" };

const services = [
  {
    num: "01", en: "E-COMMERCE", ja: "EC事業",
    desc: "サービス業向けWEB決済システムの導入・各種ECサイト制作・ウェブサイト全般の制作・在庫管理や売上分析などの運営支援を行います。",
    items: ["WEB決済システム導入", "ECサイト制作", "ウェブサイト制作全般", "在庫管理・売上分析サポート"],
  },
  {
    num: "02", en: "WEB ADVERTISING", ja: "WEB広告",
    desc: "女性向けを中心とした情報発信・コンテンツ運用・WEBメディアの管理・広告枠販売・広告掲載サービスおよびデザイン支援を行います。",
    items: ["女性向けコンテンツ運用", "WEBメディア管理・広告枠販売", "広告掲載サービス", "デザイン支援"],
  },
  {
    num: "03", en: "PLANNING & SALES", ja: "企画・販売",
    desc: "新ブランドの開発・商品製造・販売サイトの作成と管理・在庫分析の総合支援・新規および既存ブランドのフランチャイズ展開を行います。",
    items: ["新ブランド開発・商品製造", "販売サイト作成・管理", "在庫・分析の総合支援", "フランチャイズ展開"],
  },
  {
    num: "04", en: "TALENT DEVELOPMENT", ja: "タレント育成・戦略",
    desc: "クリエイティブ系タレントのマネジメント・個人事業者への独立サポート・関連事業サービスを提供します。",
    items: ["クリエイティブタレントマネジメント", "個人事業者への独立サポート", "関連事業サービス"],
  },
  {
    num: "05", en: "EDUCATION", ja: "教育・学習支援",
    desc: "小中学生向けの個別指導・独自のPREP法を活用した双方向インタラクティブな学習・アクティブラーニングの確立を目指します。",
    items: ["小中学生向け個別指導", "独自PREP法による双方向学習", "アクティブラーニングの確立"],
  },
  {
    num: "06", en: "HEALTH & WELLNESS", ja: "健康・身体づくり",
    desc: "アスリートコーチング・体組成トレーニング（ウェイト・ピラティス）・栄養指導・科学的根拠に基づく安全で効果的な指導を行います。",
    items: ["アスリートパフォーマンスコーチング", "体組成トレーニング（ウェイト・ピラティス）", "栄養指導", "科学的根拠に基づく指導"],
  },
];

export default function ServicePage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">SERVICE</h1>
        <div className="ph-line" />
        <p className="ph-ja">事業内容</p>
      </div></div>
      <div className="pc">
        <p className="sv-lead">確かな技術で日常をデザインする。NEXT BRINOは6つの事業領域から、お客様の課題に向き合います。</p>
        <div className="sv-grid">
          {services.map(({ num, en, ja, desc, items }) => (
            <div key={num} className="sv-card">
              <div className="sv-card-head">
                <span className="sv-num">{num}</span>
                <div>
                  <p className="sv-en">{en}</p>
                  <h2 className="sv-ja">{ja}</h2>
                </div>
              </div>
              <p className="sv-desc">{desc}</p>
              <ul className="sv-items">
                {items.map((item) => <li key={item} className="sv-item">{item}</li>)}
              </ul>
            </div>
          ))}
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

        .sv-lead { font-size: .95rem; line-height: 2; color: #555; margin: 0 0 52px; }
        .sv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
        .sv-card { padding: 40px 36px; border: 1px solid rgba(21,38,59,.08); transition: border-color .25s; }
        .sv-card:hover { border-color: rgba(157,140,86,.4); }
        .sv-card-head { display: flex; align-items: flex-start; gap: 20px; margin: 0 0 20px; }
        .sv-num { font-family: var(--font-barlow-condensed), sans-serif; font-size: 3rem; font-weight: 800; color: rgba(21,38,59,.08); line-height: 1; flex-shrink: 0; }
        .sv-en { font-family: var(--font-barlow-condensed), sans-serif; font-size: .75rem; letter-spacing: .2em; color: #9d8c56; margin: 0 0 4px; }
        .sv-ja { font-size: 1.15rem; font-weight: 700; color: #15263b; margin: 0; letter-spacing: .05em; }
        .sv-desc { font-size: .88rem; line-height: 1.95; color: #555; margin: 0 0 20px; }
        .sv-items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .sv-item { font-size: .82rem; color: #666; padding-left: 14px; position: relative; }
        .sv-item::before { content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 5px; height: 1px; background: #9d8c56; }
        @media (max-width: 768px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-card { padding: 28px 20px; }
        }
      `}</style>
    </main>
  );
}

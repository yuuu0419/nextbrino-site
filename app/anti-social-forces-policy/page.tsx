import type { Metadata } from "next";
import PageHero from "../components/PageHero";
export const metadata: Metadata = { title: "反社会的勢力に対する基本方針 | NEXT BRINO" };

const policies = [
  { num: "01", title: "反社会的勢力との一切の関係遮断", body: "当社は、反社会的勢力とは、名目・形式にかかわらず一切の関係を持ちません。" },
  { num: "02", title: "取引開始前の確認", body: "取引の開始にあたっては、相手方と反社会的勢力との関係の有無を事前に確認します。" },
  { num: "03", title: "取引開始後に判明した場合の対応", body: "取引開始後に相手方が反社会的勢力であると判明した場合は、契約解除・取引停止等の必要な措置を速やかに講じます。" },
  { num: "04", title: "不当要求への毅然とした対応", body: "反社会的勢力からの不当要求には一切応じず、法的対応を含む毅然とした姿勢で対処します。" },
  { num: "05", title: "資金提供・利益供与等の禁止", body: "反社会的勢力に対する資金提供、利益供与その他一切の支援行為を行いません。" },
  { num: "06", title: "組織としての対応", body: "反社会的勢力への対応は、担当者個人の判断に委ねるのではなく、組織全体として統一的に行います。" },
  { num: "07", title: "外部専門機関との連携", body: "警察・弁護士・暴力追放運動推進センター等の外部専門機関と緊密に連携し、適切に対処します。" },
  { num: "08", title: "契約条項等の整備", body: "契約において反社会的勢力の排除条項を設け、適切に運用します。" },
];

export default function AntisocialPolicyPage() {
  return (
    <main>
      <PageHero image="/images/anti-social-forces-policy-hero.jpg" en={<>ANTISOCIAL<br />POLICY</>} ja="反社会的勢力に対する基本方針" />
      <div className="pc">
        <p className="ap-intro">NEXT BRINOは、健全かつ適正な事業活動を行うため、反社会的勢力との一切の関係を遮断し、不当要求に対しては毅然とした姿勢で対応します。</p>
        <div className="ap-list">
          {policies.map(({ num, title, body }) => (
            <div key={num} className="ap-item">
              <div className="ap-head"><span className="ap-num">{num}</span><h2 className="ap-title">{title}</h2></div>
              <p className="ap-body">{body}</p>
            </div>
          ))}
        </div>
        <p className="ap-date">制定日：2026年4月10日</p>
      </div>
      <style>{`
        
        .ph { background: #15263b; padding: 120px 0 64px; }
        .ph-inner { width: 88%; max-width: 1100px; margin: 0 auto; }
        .ph-label {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: 11px; letter-spacing: .28em; color: #9d8c56;
          text-transform: uppercase; margin: 0 0 12px;
        }
        .ph-en {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: clamp(52px,8vw,110px); font-weight: 800;
          letter-spacing: .08em; line-height: 1;
          color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.35);
          margin: 0 0 20px;
        }
        .ph-line { width: 100%; height: 1px; background: rgba(255,255,255,.1); margin: 0 0 20px; }
        .ph-ja {
          font-size: clamp(18px,2.5vw,26px); font-weight: 300;
          letter-spacing: .1em; color: rgba(255,255,255,.72); margin: 0;
        }
        .pc { width: 88%; max-width: 900px; margin: 0 auto; padding: 72px 0 100px; }

        .ap-intro { font-size: .95rem; line-height: 2; color: #444; margin: 0 0 52px; padding: 24px 28px; background: rgba(21,38,59,.04); border-left: 3px solid #9d8c56; }
        .ap-list { display: flex; flex-direction: column; }
        .ap-item { border-top: 1px solid rgba(21,38,59,.1); padding: 28px 0; }
        .ap-head { display: flex; align-items: baseline; gap: 18px; margin: 0 0 10px; }
        .ap-num { font-family: var(--font-barlow-condensed), sans-serif; font-size: 2rem; font-weight: 700; color: rgba(157,140,86,.5); line-height: 1; flex-shrink: 0; }
        .ap-title { font-size: 1rem; font-weight: 700; color: #15263b; margin: 0; letter-spacing: .04em; }
        .ap-body { font-size: .9rem; line-height: 2; color: #555; margin: 0; padding-left: 50px; }
        .ap-date { margin: 48px 0 0; font-size: .85rem; color: rgba(21,38,59,.5); }
      `}</style>
    </main>
  );
}

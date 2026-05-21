import type { Metadata } from "next";
export const metadata: Metadata = { title: "概要・沿革 | NEXT BRINO" };

const profile = [
  { label: "会社名", value: "NEXT BRINO（ネクストブライノ）" },
  { label: "代表者", value: "黒木 雄太" },
  { label: "設立", value: "2019年2月19日（事業開始）\n2022年2月19日（法人化）" },
  { label: "主な事業内容", value: "EC事業 / WEB広告 / 企画・販売 / タレント育成・戦略 / 教育・学習支援 / 健康・身体づくり" },
  { label: "メールアドレス", value: "support@nextbrino.com" },
  { label: "営業時間", value: "平日 10:00〜17:00（土日祝を除く）" },
  { label: "お問合せへの返答目安", value: "2〜5営業日程度" },
  { label: "ウェブサイト", value: "https://nextbrino.com" },
];

const history = [
  { year: "2019", items: ["商品の企画事業を開始", "アパレルブランドを設立"] },
  { year: "2020", items: ["EC事業を開始", "ブランドのフランチャイズ展開を開始"] },
  { year: "2021", items: ["WEB広告事業を開始", "東京都港区にオフィスを構える"] },
  { year: "2022", items: ["NEXT BRINO として正式に法人化", "健康・身体づくりサービスを開始"] },
  { year: "2025", items: ["教育・学習支援事業を開始（5月）"] },
  { year: "2026", items: ["クリエイティブタレントマネジメントサービス（N-Bright）を開始", "タレント育成・戦略事業部を本格始動"] },
];

export default function OverviewPage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">OVERVIEW</h1>
        <div className="ph-line" />
        <p className="ph-ja">概要・沿革</p>
      </div></div>
      <div className="pc" style={{ maxWidth: 1000 }}>
        <section>
          <h2 className="ov-section-title">会社概要</h2>
          <table className="ov-table"><tbody>
            {profile.map(({ label, value }) => (
              <tr key={label}>
                <th className="ov-th">{label}</th>
                <td className="ov-td">{value}</td>
              </tr>
            ))}
          </tbody></table>
        </section>
        <section style={{ marginTop: 72 }}>
          <h2 className="ov-section-title">沿革</h2>
          <div className="ov-timeline">
            {history.map(({ year, items }) => (
              <div key={year} className="ov-tl-row">
                <div className="ov-tl-year">{year}</div>
                <div className="ov-tl-content">
                  {items.map((item, i) => <p key={i} className="ov-tl-item">{item}</p>)}
                </div>
              </div>
            ))}
          </div>
        </section>
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

        .ov-section-title { font-family: var(--font-barlow-condensed), sans-serif; font-size: clamp(22px,3vw,30px); font-weight: 700; letter-spacing: .12em; color: #15263b; margin: 0 0 28px; padding-bottom: 14px; border-bottom: 2px solid #9d8c56; }
        .ov-table { width: 100%; border-collapse: collapse; }
        .ov-th { width: 220px; vertical-align: top; text-align: left; padding: 18px 24px 18px 0; border-top: 1px solid rgba(21,38,59,.1); font-size: .88rem; font-weight: 700; color: #15263b; white-space: nowrap; }
        .ov-td { vertical-align: top; padding: 18px 0; border-top: 1px solid rgba(21,38,59,.1); font-size: .9rem; line-height: 1.85; color: #555; white-space: pre-line; }
        .ov-timeline { display: flex; flex-direction: column; }
        .ov-tl-row { display: grid; grid-template-columns: 80px 1fr; gap: 0 32px; padding: 24px 0; border-top: 1px solid rgba(21,38,59,.1); }
        .ov-tl-year { font-family: var(--font-barlow-condensed), sans-serif; font-size: 1.4rem; font-weight: 700; color: #9d8c56; line-height: 1.6; }
        .ov-tl-content { display: flex; flex-direction: column; gap: 8px; }
        .ov-tl-item { font-size: .9rem; line-height: 1.85; color: #555; margin: 0; }
        @media (max-width: 640px) {
          .ov-table, .ov-th, .ov-td { display: block; width: 100%; }
          .ov-th { border-top: 1px solid rgba(21,38,59,.1); padding: 16px 0 4px; white-space: normal; }
          .ov-td { border-top: none; padding: 0 0 16px; }
          .ov-tl-row { grid-template-columns: 60px 1fr; gap: 0 16px; }
        }
      `}</style>
    </main>
  );
}

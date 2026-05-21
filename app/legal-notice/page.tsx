import type { Metadata } from "next";
export const metadata: Metadata = { title: "特定商取引法に基づく表記 | NEXT BRINO" };

const rows = [
  { label: "事業者名・代表者名", value: "NEXT BRINO　黒木 雄太" },
  { label: "所在地", value: "請求に応じて速やかに開示いたします" },
  { label: "電話番号", value: "請求に応じて速やかに開示いたします" },
  { label: "メールアドレス", value: "support@nextbrino.com" },
  { label: "営業時間", value: "平日 10:00〜17:00（土日祝を除く）" },
  { label: "販売価格", value: "各サービスのご提案時にお知らせいたします" },
  { label: "お支払方法", value: "銀行振込、クレジットカード等" },
  { label: "お支払時期", value: "ご請求書に記載の支払期日まで" },
  { label: "サービス提供時期", value: "ご契約後、別途協議のうえお知らせいたします" },
  { label: "返品・キャンセルについて", value: "お客様都合による決済完了後のキャンセルはお受けできません。ただし、当社側の瑕疵による場合はこの限りではありません。" },
  { label: "インボイス制度", value: "当社は適格請求書発行事業者です。" },
  { label: "ウェブサイト", value: "https://nextbrino.com" },
  { label: "最終更新", value: "2026年4月10日" },
];

export default function LegalNoticePage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">LEGAL NOTICE</h1>
        <div className="ph-line" />
        <p className="ph-ja">特定商取引法に基づく表記</p>
      </div></div>
      <div className="pc">
        <p className="ln-intro">特定商取引法に基づき、以下の事項を表記します。</p>
        <table className="ln-table"><tbody>
          {rows.map(({ label, value }) => (
            <tr key={label}>
              <th className="ln-th">{label}</th>
              <td className="ln-td">{value}</td>
            </tr>
          ))}
        </tbody></table>
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

        .ln-intro { font-size: .9rem; line-height: 2; color: #555; margin: 0 0 36px; }
        .ln-table { width: 100%; border-collapse: collapse; }
        .ln-th { width: 220px; vertical-align: top; text-align: left; padding: 20px 24px 20px 0; border-top: 1px solid rgba(21,38,59,.1); font-size: .88rem; font-weight: 700; color: #15263b; white-space: nowrap; }
        .ln-td { vertical-align: top; padding: 20px 0; border-top: 1px solid rgba(21,38,59,.1); font-size: .9rem; line-height: 1.85; color: #555; }
        @media (max-width: 640px) {
          .ln-table, .ln-th, .ln-td { display: block; width: 100%; }
          .ln-th { border-top: 1px solid rgba(21,38,59,.1); padding: 16px 0 4px; white-space: normal; }
          .ln-td { border-top: none; padding: 0 0 16px; }
        }
      `}</style>
    </main>
  );
}

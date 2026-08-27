"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "制作期間はどれくらいかかりますか？",
    a: "プランや内容により異なりますが、最短数週間からご案内可能です。まずはご希望の公開時期をお聞かせください。",
  },
  {
    q: "修正は何回までお願いできますか？",
    a: "修正回数に上限はありません。追加料金なしで、ご納得いただけるまで対応いたします。",
  },
  {
    q: "スマホ対応は追加料金がかかりますか？",
    a: "いいえ。レスポンシブ対応は全プラン標準装備のため、追加費用は発生しません。",
  },
  {
    q: "制作後の運用サポートはありますか？",
    a: "はい。公開後も安心してご利用いただけるよう、複数の保守プランをご用意しています。",
  },
  {
    q: "予算に合わせて内容を調整できますか？",
    a: "はい。目的やご予算に応じて、ページ数や機能を柔軟に調整してご提案します。",
  },
  {
    q: "サイト制作以外の相談もできますか？",
    a: "現在、Webサイト制作以外のITソリューション事業は満枠のため新規受付を一時停止しております（詳細はページ下部をご確認ください）。",
  },
];

export default function LpFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="lpq-list">
      {FAQS.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i} className={`lpq-item${open ? " lpq-item--open" : ""}`}>
            <button
              type="button"
              className="lpq-question"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <span className="lpq-q-mark">Q</span>
              <span className="lpq-q-text">{item.q}</span>
              <span className="lpq-toggle" aria-hidden>{open ? "－" : "＋"}</span>
            </button>
            {open && (
              <div className="lpq-answer">
                <span className="lpq-a-mark">A</span>
                <p className="lpq-a-text">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        .lpq-list { display: flex; flex-direction: column; gap: 12px; }
        .lpq-item {
          background: #fff;
          border: 1px solid rgba(21,38,59,0.14);
          border-radius: 8px;
          overflow: hidden;
          transition: border-color .25s;
        }
        .lpq-item--open { border-color: rgba(232,114,12,0.4); }
        .lpq-question {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-main);
        }
        .lpq-q-mark {
          flex-shrink: 0;
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #15263b;
          color: #fff;
          font-size: .85rem;
          font-weight: 900;
        }
        .lpq-q-text {
          flex: 1;
          font-size: .92rem;
          font-weight: 700;
          color: #15263b;
          letter-spacing: .02em;
          line-height: 1.6;
        }
        .lpq-toggle {
          flex-shrink: 0;
          font-size: 1.1rem;
          color: #e8720c;
          font-weight: 700;
        }
        .lpq-answer {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 0 24px 22px;
        }
        .lpq-a-mark {
          flex-shrink: 0;
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          border: 1.5px solid #e8720c;
          color: #e8720c;
          font-size: .85rem;
          font-weight: 900;
        }
        .lpq-a-text {
          flex: 1;
          font-size: .86rem;
          line-height: 1.9;
          color: rgba(21,38,59,0.72);
          margin: 4px 0 0;
        }
        @media (max-width: 640px) {
          .lpq-question { padding: 16px 18px; gap: 12px; }
          .lpq-answer { padding: 0 18px 18px; gap: 12px; }
          .lpq-q-text { font-size: .86rem; }
        }
      `}</style>
    </div>
  );
}

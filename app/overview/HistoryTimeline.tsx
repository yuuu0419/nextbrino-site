"use client";

import { useEffect, useRef, useState } from "react";

interface HistoryMonth {
  month: string;
  items: string[];
  note?: string;
}

interface HistoryYear {
  year: string;
  months: HistoryMonth[];
}

const historyData: HistoryYear[] = [
  {
    year: "2019",
    months: [
      { month: "2月", items: ["企画販売事業を開始", "新規ブランド企画・運営"] },
    ],
  },
  {
    year: "2020",
    months: [
      { month: "4月", items: ["ITソリューション事業を開始", "WEBサイト・アプリ・システム開発"] },
      { month: "7月", items: ["ブランドFC展開を開始"] },
      { month: "10月", items: ["企画販売トータルサポートを開始", "スタートアップサポートを開始", "個人様向けブランド展開を開始"] },
    ],
  },
  {
    year: "2021",
    months: [
      {
        month: "10月",
        items: ["WEB広告事業を開始", "配信販売コンテンツ等運営", "東京都港区南青山に事務所を設立"],
        note: "※現在、運営体制の最適化に伴い変更。",
      },
    ],
  },
  {
    year: "2022",
    months: [
      { month: "2月", items: ["NEXT BRINO設立 ( サービス名変更 )"] },
      { month: "3月", items: ["健康増進事業を開始"] },
    ],
  },
  {
    year: "2025",
    months: [
      { month: "5月", items: ["教育学習支援事業を開始"] },
    ],
  },
  {
    year: "2026",
    months: [
      { month: "2月", items: ["IPマネジメント事業を開始", "N-Bright設立"] },
    ],
  },
];

function YearBlock({ entry, index }: { entry: HistoryYear; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isRight = index % 2 === 0; // year奇数→左、カード右

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const ease = "cubic-bezier(0.22,1,0.36,1)";

  const yearStyle = {
    opacity: visible ? 0.55 : 0,
    transform: visible ? "translateX(0)" : `translateX(${isRight ? "-40px" : "40px"})`,
    transition: isMobile ? "none" : visible ? `opacity 0.5s ease 60ms, transform 0.55s ${ease} 60ms` : "none",
  };

  const cardStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : `translateX(${isRight ? "40px" : "-40px"})`,
    transition: isMobile ? "none" : visible ? `opacity 0.5s ease 100ms, transform 0.55s ${ease} 100ms` : "none",
  };

  const dotStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0)",
    transition: isMobile ? "none" : visible ? `opacity 0.5s ease 150ms, transform 0.5s ${ease} 150ms` : "none",
  };

  return (
    <div ref={ref} className={`ht-row ${isRight ? "ht-row--right" : "ht-row--left"}`}>
      {/* 年号（大きなアウトライン） */}
      <div className="ht-year-side" style={yearStyle}>
        <span className="ht-year-ghost">{entry.year}</span>
      </div>

      {/* 中央ライン＋ドット */}
      <div className="ht-center">
        <div className="ht-dot" style={dotStyle}>
          <div className="ht-dot-inner" />
        </div>
        <div className="ht-connector" />
      </div>

      {/* カード */}
      <div className="ht-card-side" style={cardStyle}>
        <div className="ht-card">
          {entry.months.map((m, mi) => (
            <div key={mi} className={`ht-month-row ${mi < entry.months.length - 1 ? "ht-month-row--sep" : ""}`}>
              <div className="ht-month-label">{m.month}</div>
              <div className="ht-month-content">
                {m.items.map((item, ii) => (
                  <p key={ii} className="ht-month-item">{item}</p>
                ))}
                {m.note && <p className="ht-month-note">{m.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HistoryTimeline() {
  return (
    <div className="ht-wrap">
      {/* 縦ライン */}
      <div className="ht-vline" />
      {historyData.map((entry, i) => (
        <YearBlock key={entry.year} entry={entry} index={i} />
      ))}

      <style>{`
        .ht-wrap {
          position: relative;
          padding: clamp(24px, 3vw, 48px) 0 clamp(36px, 4vw, 64px);
        }

        /* 中央縦ライン */
        .ht-vline {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(157,140,86,0.65) 12%,
            rgba(157,140,86,0.65) 88%,
            transparent 100%
          );
          transform: translateX(-50%);
          pointer-events: none;
        }

        /* 各年ブロック */
        .ht-row {
          display: grid;
          grid-template-columns: 1fr 0 1fr;
          align-items: center;
          min-height: clamp(220px, 28vw, 360px);
          position: relative;
          margin-bottom: clamp(24px, 3vw, 40px);
        }

        /* 年号サイド */
        .ht-year-side {
          display: flex;
          align-items: center;
        }
        .ht-row--right .ht-year-side { order: 1; justify-content: flex-end; padding-right: clamp(40px, 5vw, 80px); }
        .ht-row--left  .ht-year-side { order: 3; justify-content: flex-start; padding-left: clamp(40px, 5vw, 80px); }

        .ht-year-ghost {
          font-family: var(--font-noto-sans-jp), "Noto Sans JP", sans-serif;
          font-size: clamp(60px, 10vw, 130px);
          font-weight: 700;
          letter-spacing: .04em;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px #c9a84c;
          user-select: none;
          pointer-events: none;
        }

        /* 中央エリア */
        .ht-center {
          position: relative;
          width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }

        .ht-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(157,140,86,1);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #15263b;
        }
        .ht-dot-inner {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c4ae6e;
        }

        /* カードからセンターへの水平コネクター */
        .ht-connector {
          position: absolute;
          top: 50%;
          width: clamp(20px, 3vw, 40px);
          height: 1px;
          background: rgba(157,140,86,0.75);
          transform: translateY(-50%);
        }
        .ht-row--right .ht-connector { left: 7px; }
        .ht-row--left  .ht-connector { right: 7px; }

        /* カードサイド */
        .ht-card-side {
          display: flex;
          align-items: center;
        }
        .ht-row--right .ht-center { order: 2; }
        .ht-row--right .ht-card-side { order: 3; justify-content: flex-start; padding-left: clamp(40px, 5vw, 80px); }
        .ht-row--left  .ht-card-side { order: 1; justify-content: flex-end; padding-right: clamp(40px, 5vw, 80px); }
        .ht-row--left  .ht-center { order: 2; }

        /* カード本体 */
        .ht-card {
          border: 1px solid rgba(157,140,86,0.3);
          border-radius: 12px;
          padding: clamp(20px, 2.5vw, 32px) clamp(28px, 3vw, 44px);
          background: rgba(255,255,255,0.03);
          min-width: clamp(280px, 36vw, 580px);
          max-width: clamp(340px, 44vw, 660px);
        }

        /* 月行 */
        .ht-month-row {
          display: grid;
          grid-template-columns: clamp(36px, 4vw, 52px) 1fr;
          gap: 0 clamp(16px, 2vw, 28px);
          padding: 12px 0;
          align-items: start;
        }
        .ht-month-row--sep {
          border-bottom: 1px dashed rgba(157,140,86,0.25);
        }
        .ht-month-label {
          font-size: .82rem;
          font-weight: 700;
          color: #9d8c56;
          letter-spacing: .04em;
          padding-top: 2px;
          white-space: nowrap;
        }
        .ht-month-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ht-month-item {
          font-size: .88rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.78);
          margin: 0;
        }
        .ht-month-note {
          font-size: .75rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.42);
          margin: 6px 0 0;
        }

        /* ── レスポンシブ（SP） ── */
        @media (max-width: 768px) {
          .ht-vline {
            left: 24px;
          }

          .ht-row {
            display: block;
            position: relative;
            min-height: unset;
            margin-bottom: 40px;
            padding-left: 56px;
            padding-right: 16px;
          }

          .ht-row--left .ht-year-side,
          .ht-row--right .ht-year-side {
            display: block;
            padding: 0;
            justify-content: unset;
            margin-bottom: 28px;
          }

          .ht-year-ghost {
            font-size: clamp(44px, 12vw, 60px);
            -webkit-text-stroke: 1px #c9a84c;
          }

          .ht-center {
            position: absolute;
            left: 17px;
            top: 16px;
            transform: none;
            width: 14px;
          }

          .ht-connector { display: none; }

          .ht-row--left .ht-card-side,
          .ht-row--right .ht-card-side {
            order: unset;
            justify-content: unset;
            padding: 0;
            display: block;
          }

          .ht-card {
            min-width: 0;
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;
            padding: 16px 18px;
          }

          .ht-month-row {
            grid-template-columns: 40px 1fr;
            gap: 0 12px;
            padding: 10px 0;
          }

          .ht-month-item {
            font-size: .84rem;
          }
        }
      `}</style>
    </div>
  );
}

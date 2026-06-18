"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    num: "01", en: "E-COMMERCE", ja: "EC事業",
    img: "/images/electronic-commerce-card.webp",
    desc: "サービス業向けWEB決済システムの導入・各種ECサイト制作・ウェブサイト全般の制作・在庫管理や売上分析などの運営支援を行います。",
    items: ["WEB決済システム導入", "ECサイト制作", "ウェブサイト制作全般", "在庫管理・売上分析サポート"],
  },
  {
    num: "02", en: "WEB ADVERTISING", ja: "WEB広告事業",
    img: "/images/web-advertiding-card.webp",
    desc: "女性向けを中心とした情報発信・コンテンツ運用・WEBメディアの管理・広告枠販売・広告掲載サービスおよびデザイン支援を行います。",
    items: ["女性向けコンテンツ運用", "WEBメディア管理・広告枠販売", "広告掲載サービス", "デザイン支援"],
  },
  {
    num: "03", en: "PLANNING & SALES", ja: "企画・販売事業",
    img: "/images/planning-sales-card.webp",
    desc: "新ブランドの開発・商品製造・販売サイトの作成と管理・在庫分析の総合支援・新規および既存ブランドのフランチャイズ展開を行います。",
    items: ["新ブランド開発・商品製造", "販売サイト作成・管理", "在庫・分析の総合支援", "フランチャイズ展開"],
  },
  {
    num: "04", en: "TALENT DEVELOPMENT", ja: "タレント育成・戦略",
    img: "/images/talent-management-card.webp",
    desc: "クリエイティブ系タレントのマネジメント・個人事業者への独立サポート・関連事業サービスを提供します。",
    items: ["クリエイティブタレントマネジメント", "個人事業者への独立サポート", "関連事業サービス"],
  },
  {
    num: "05", en: "EDUCATION", ja: "教育・学習支援",
    img: "/images/education-card.webp",
    desc: "小中学生向けの個別指導・独自のPREP法を活用した双方向インタラクティブな学習・アクティブラーニングの確立を目指します。",
    items: ["小中学生向け個別指導", "独自PREP法による双方向学習", "アクティブラーニングの確立"],
  },
  {
    num: "06", en: "HEALTH & WELLNESS", ja: "健康・身体づくり",
    img: "/images/health-promotion-card.webp",
    desc: "アスリートコーチング・体組成トレーニング（ウェイト・ピラティス）・栄養指導・科学的根拠に基づく安全で効果的な指導を行います。",
    items: ["アスリートパフォーマンスコーチング", "体組成トレーニング（ウェイト・ピラティス）", "栄養指導", "科学的根拠に基づく指導"],
  },
];

export default function ServiceScroll() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(false);
            setTimeout(() => { setActive(i); setVisible(true); }, 180);
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const svc = services[active];

  return (
    <>
      {/* PC: sticky scroll */}
      <div className="ssc-wrap">
        <div className="ssc-left">
          <div className="ssc-progress">
            {services.map((s, i) => (
              <div key={s.num} className={`ssc-dot${i === active ? " ssc-dot--on" : ""}`} />
            ))}
          </div>
          <div
            className="ssc-content"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity .22s ease, transform .22s ease",
            }}
          >
            <span className="ssc-num">{svc.num}</span>
            <p className="ssc-en">{svc.en}</p>
            <h2 className="ssc-ja">{svc.ja}</h2>
            <div className="ssc-line" />
            <p className="ssc-desc">{svc.desc}</p>
            <ul className="ssc-items">
              {svc.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="ssc-right">
          {services.map((s, i) => (
            <div key={s.num} className="ssc-panel" ref={el => { panelRefs.current[i] = el; }}>
              <Image src={s.img} alt={s.ja} fill sizes="55vw" style={{ objectFit: "cover" }} />
              <div className="ssc-panel-overlay" />
              <span className="ssc-panel-num">{s.num}</span>
            </div>
          ))}
        </div>
      </div>

      {/* スマホ: 縦積み */}
      <div className="ssc-mobile">
        {services.map(s => (
          <div key={s.num} className="ssc-mobile-item">
            <div className="ssc-mobile-img">
              <Image src={s.img} alt={s.ja} fill sizes="100vw" style={{ objectFit: "cover" }} />
              <div className="ssc-mobile-overlay" />
              <span className="ssc-mobile-num">{s.num}</span>
            </div>
            <div className="ssc-mobile-body">
              <p className="ssc-en">{s.en}</p>
              <h2 className="ssc-ja">{s.ja}</h2>
              <div className="ssc-line" />
              <p className="ssc-desc">{s.desc}</p>
              <ul className="ssc-items">
                {s.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* ── PC ── */
        .ssc-wrap {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }

        .ssc-left {
          position: sticky;
          top: 0;
          width: 45%;
          height: 100vh;
          flex-shrink: 0;
          background: #15263b;
          display: flex;
          align-items: center;
          padding: 0 72px 0 8%;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* 上部のゴールドライン装飾 */
        .ssc-left::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9d8c56 40%, #c4aa6e 60%, transparent);
        }

        /* 右端の進捗ドット */
        .ssc-progress {
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }
        .ssc-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(157,140,86,.3);
          transition: background .3s, transform .3s;
        }
        .ssc-dot--on {
          background: #9d8c56;
          transform: scale(2);
        }

        .ssc-content { width: 100%; }

        .ssc-num {
          display: block;
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: clamp(72px, 10vw, 130px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -.02em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(157,140,86,.22);
          margin-bottom: 8px;
        }

        .ssc-en {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: .7rem;
          letter-spacing: .3em;
          color: #9d8c56;
          margin: 0 0 10px;
        }

        .ssc-ja {
          font-size: clamp(22px, 2.2vw, 32px);
          font-weight: 700;
          color: #fff;
          letter-spacing: .08em;
          margin: 0 0 24px;
          line-height: 1.3;
        }

        .ssc-line {
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, #9d8c56, rgba(157,140,86,.1));
          margin-bottom: 24px;
        }

        .ssc-desc {
          font-size: .86rem;
          line-height: 2.1;
          color: rgba(255,255,255,.58);
          font-weight: 300;
          letter-spacing: .04em;
          margin: 0 0 24px;
        }

        .ssc-items {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .ssc-items li {
          font-size: .76rem;
          color: rgba(255,255,255,.38);
          padding-left: 18px;
          position: relative;
          letter-spacing: .04em;
          font-weight: 300;
        }
        .ssc-items li::before {
          content: "";
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 9px; height: 1px;
          background: linear-gradient(90deg, #9d8c56, #c4aa6e);
        }

        /* 右: スクロール画像 */
        .ssc-right { flex: 1; }

        .ssc-panel {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .ssc-panel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(21,38,59,.65) 0%,
            rgba(21,38,59,.2) 35%,
            transparent 65%
          );
          z-index: 1;
        }

        .ssc-panel-num {
          position: absolute;
          bottom: 28px;
          right: 32px;
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: clamp(80px, 13vw, 160px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -.02em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,.1);
          z-index: 2;
          user-select: none;
        }

        /* スマホ非表示 */
        .ssc-mobile { display: none; }

        /* ── スマホ ── */
        @media (max-width: 768px) {
          .ssc-wrap    { display: none; }
          .ssc-mobile  { display: block; }

          .ssc-mobile-item { margin-bottom: 1px; background: #fff; }

          .ssc-mobile-img {
            position: relative;
            height: 260px;
            overflow: hidden;
          }
          .ssc-mobile-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent 30%, rgba(21,38,59,.55) 100%);
            z-index: 1;
          }
          .ssc-mobile-num {
            position: absolute;
            bottom: 14px; left: 18px;
            font-family: var(--font-barlow-condensed), sans-serif;
            font-size: 2.8rem;
            font-weight: 800;
            color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,.45);
            z-index: 2;
            line-height: 1;
          }

          .ssc-mobile-body {
            padding: 32px 22px 44px;
            border-top: 1px solid rgba(157,140,86,.12);
          }
          .ssc-en  { color: #9d8c56 !important; }
          .ssc-ja  { color: #15263b !important; }
          .ssc-desc { color: #555 !important; }
          .ssc-items li { color: #888 !important; }
          .ssc-line {
            background: linear-gradient(90deg, #9d8c56, rgba(157,140,86,.15)) !important;
          }
        }
      `}</style>
    </>
  );
}

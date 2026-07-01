"use client";
import { useState } from "react";

const valueGroups = [
  {
    en: "PEOPLE & TRUST",
    ja: "人を大切にし、信頼でつながる",
    items: [
      { num: "01", title: "人を大切に、人が主役", body: "改革の中心にはいつも人がいる。\n世の中に価値を提供する第一歩は、\n人を大切にするということから始まる。", spBody: "改革の中心にはいつも人がいる。\n世の中に価値を提供する第一歩は、\n人を大切にするということから始まる。" },
      { num: "02", title: "素直に、謙虚に、誠実に", body: "どこまでも素直に。そして謙虚に。\nいかなる時でも誠実に。信頼される人・組織を目指す。", spBody: "どこまでも素直に。そして謙虚に。\nいかなる時でも誠実に。\n信頼される人、組織を目指す。" },
      { num: "03", title: "大切な人のために", body: "家族、友人、恋人、お取引先。\n誰を想うかは人それぞれだが、\n誰かを想うことから良いものは生まれる。", spBody: "家族、友人、恋人、お取引先。\n誰を想うかは人それぞれだが、\n誰かを想うことから良いものは生まれる。" },
      { num: "04", title: "意思の統一と尊重", body: "少数であっても意見を尊重し、耳を傾け、\n決定されれば同じ方向へ進む。", spBody: "少数であっても意見を尊重し、耳を傾け、\n決定されれば同じ方向へ進む。" },
    ],
  },
  {
    en: "VALUE CREATION & INNOVATION",
    ja: "価値を生み出す、創造と技術",
    items: [
      { num: "05", title: "想像し、創造する", body: "より豊かな日常を提供するために、\n繊細に想像し、大胆に創造する。", spBody: "より豊かな日常を提供するために、\n繊細に想像し、大胆に創造する。" },
      { num: "06", title: "技術力に磨きを", body: "現状維持を退化と捉え、\n新たな技術を積極的に取り入れ、技術力向上を目指す。", spBody: "現状維持を退化と捉え、\n新たな技術を積極的に取り入れ、\n技術力向上を目指す。" },
      { num: "07", title: "潜在ニーズの価値を", body: "まだ気づいていない、〇〇だったらいいのに。\nそんな潜在ニーズの価値を提供する。", spBody: "まだ気づいていない、〇〇だったらいいのに。\nそんな潜在ニーズの価値を提供する。" },
      { num: "08", title: "適正な量と正しいベクトル", body: "正しいベクトルを選定してから、\n適正な量の努力を積むことで、より良い価値を提供する。", spBody: "正しいベクトルを選定してから、\n適正な量の努力を積むことで、\nより良い価値を提供する。" },
    ],
  },
  {
    en: "GROWTH & CHANGE",
    ja: "学び、変化し、進化する",
    items: [
      { num: "09", title: "変化に順応する", body: "常識や昨日までの当たり前を疑い、\n必要な変化には恐れずに順応する。", spBody: "常識や昨日までの当たり前を疑い、\n必要な変化には恐れずに順応する。" },
      { num: "10", title: "プロセスにこそ価値がある", body: "成功はアートで、失敗はサイエンス。\n結果ではなく、プロセスを科学し、\nより高い再現性を実現する。", spBody: "成功はアートで、失敗はサイエンス。\n結果ではなく、プロセスを科学し、\nより高い再現性を実現する。" },
      { num: "11", title: "本当の意味の進歩を", body: "進むことだけが進歩ではない。\n時には止まって冷静に考え、また進歩する。", spBody: "進むことだけが進歩ではない。\n時には止まって冷静に考え、また進歩する。" },
    ],
  },
  {
    en: "SUSTAINABILITY & RESPONSIBILITY",
    ja: "責任と持続可能性",
    items: [
      { num: "12", title: "持続可能な環境への配慮", body: "作るもの全てに責任を。その製品がその先で環境に\nどのような影響を及ぼすのかまで想像した上で作る。", spBody: "作るもの全てに責任を。\nその製品がその先で環境にどのような\n影響を及ぼすのかまで想像した上で作る。" },
    ],
  },
  {
    en: "WELL-BEING & PERFORMANCE",
    ja: "健康と、熱量と冷静さ",
    items: [
      { num: "13", title: "健康が最大の資本", body: "心も身体も健康な状態を保つ。\n健康であることが最大の資本であり、何よりも優先する。", spBody: "心も身体も健康な状態を保つ。\n健康であることが最大の資本であり、\n何よりも優先する。" },
      { num: "14", title: "頭は冷静に、心は熱く", body: "いつでも想いを大切に、心は熱く、頭は冷静に。", spBody: "いつでも想いを大切に、\n心は熱く、頭は冷静に。" },
    ],
  },
];

export default function ValueAccordion() {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="va-wrap">
      {valueGroups.map((group) => (
        <div key={group.en} className="va-group ph-reveal">
          <div className="va-group-header">
            <p className="va-group-en">{group.en}</p>
            <p className="va-group-ja">{group.ja}</p>
            <div className="va-group-line" />
          </div>
          <div className="va-items">
            {group.items.map((item) => {
              const open = openKeys.has(item.num);
              return (
                <div
                  key={item.num}
                  className={`va-item${open ? " va-item--open" : ""}`}
                >
                  <button
                    className="va-item-header"
                    onClick={() => toggle(item.num)}
                    aria-expanded={open}
                  >
                    <span className="va-item-left">
                      <span className="va-item-num">{item.num}.</span>
                      <span className="va-item-sep">｜</span>
                      <span className="va-item-title">{item.title}</span>
                    </span>
                    <span className={`va-chevron${open ? " va-chevron--open" : ""}`}>∨</span>
                  </button>
                  <div className="va-item-body-wrap">
                    <div className="va-item-body-inner">
                      <div className="va-item-divider" />
                      <p className="va-item-body va-item-body--pc">{item.body.split("\n").map((line, i, arr) => (<span key={i}>{line}{i < arr.length - 1 && <br />}</span>))}</p>
                      <p className="va-item-body va-item-body--sp">
                        {item.spBody.split("\n").map((line, i, arr) => (
                          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <style>{`
        .va-wrap { width: 100%; padding: 64px 0 80px; }
        .va-group { margin-bottom: 56px; }
        .va-group-header { margin-bottom: 24px; }
        .va-group-en {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: clamp(22px, 2.8vw, 32px);
          font-weight: 700;
          letter-spacing: .1em;
          color: #fff;
          margin: 0 0 4px;
        }
        .va-group-ja {
          font-size: .78rem;
          color: rgba(255,255,255,.5);
          margin: 0 0 14px;
          letter-spacing: .06em;
        }
        .va-group-line { width: 100%; height: 1px; background: rgba(255,255,255,.15); }
        .va-items {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 16px;
          align-items: start;
        }
        .va-item {
          background: rgba(255,255,255,.12);
          border-radius: 12px;
          overflow: hidden;
          transition: background .2s;
        }
        .va-item:hover { background: rgba(255,255,255,.17); }
        .va-item--open { background: rgba(255,255,255,.17); }

        .va-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 22px 22px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: #fff;
          gap: 8px;
        }
        .va-item-left { display: flex; align-items: center; gap: 4px; flex: 1; min-width: 0; }
        .va-item-num {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: .85rem;
          color: rgba(255,255,255,.6);
          letter-spacing: .04em;
          white-space: nowrap;
        }
        .va-item-sep { color: rgba(255,255,255,.4); font-size: .85rem; white-space: nowrap; }
        .va-item-title { font-size: .88rem; font-weight: 600; color: #fff; letter-spacing: .04em; }
        .va-chevron {
          font-size: .9rem;
          color: rgba(255,255,255,.6);
          transition: transform .3s ease;
          flex-shrink: 0;
        }
        .va-chevron--open { transform: rotate(180deg); }

        /* スムーズ開閉アニメーション */
        .va-item-body-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .35s ease;
        }
        .va-item--open .va-item-body-wrap {
          grid-template-rows: 1fr;
        }
        .va-item-body-inner {
          overflow: hidden;
        }
        .va-item-divider {
          height: 1px;
          background: rgba(255,255,255,.2);
          margin: 0 22px;
        }
        .va-item-body {
          padding: 18px 22px 24px;
          font-size: .84rem;
          line-height: 2;
          color: rgba(255,255,255,.65);
          margin: 0;
        }
        .va-item-body--sp { display: none; }

        @media (max-width: 900px) { .va-items { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .va-items { grid-template-columns: 1fr; } }
        @media (max-width: 768px) {
          .va-group-en { font-size: 15px; white-space: nowrap; }
          .va-wrap { padding-top: 4px; padding-bottom: 20px; }
          .va-item-body--pc { display: none; }
          .va-item-body--sp { display: block; }
          .va-group-header { text-align: center; }
          .va-group-line { width: 80%; margin: 0 auto; }
          .va-item-header { justify-content: center; }
          .va-item-left { flex: none; }
          .va-item-body { text-align: center; }
        }
      `}</style>
    </div>
  );
}

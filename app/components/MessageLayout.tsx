"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function MessageLayout() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ease = "cubic-bezier(0.22,1,0.36,1)";

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const slideLeft = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-28px)",
    transition: isMobile ? "none" : visible ? `opacity 0.5s ease 40ms, transform 0.55s ${ease} 40ms` : "none",
  };

  const photoTilt = {
    transform: "rotate(-1.5deg)",
  };

  const fadeUp = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: isMobile ? "none" : visible ? `opacity 0.5s ease ${delay}ms, transform 0.55s ${ease} ${delay}ms` : "none",
  });

  return (
    <>
      <div ref={ref} className="msg-navy-section" data-header-dark>
        {/* ドットグリッド背景 */}
        <div className="msg-dot-grid" />

        {/* 装飾アーク */}
        {[280, 420, 560].map((size, i) => (
          <div key={i} className="msg-arc" style={{
            width: size, height: size,
            top: -size * 0.3,
            right: -size * 0.3,
            borderColor: `rgba(157,140,86,${(0.14 - i * 0.04).toFixed(2)})`,
          }} />
        ))}

        <div className="msg-navy-inner">
          {/* 左：ゴールド枠写真カード */}
          <div className="msg-photo-card" style={slideLeft}>
            <div className="msg-photo-frame" style={photoTilt}>
              <Image
                src="/images/kuroki-yuta.webp"
                alt="代表取締役社長 黒木 雄太"
                fill
                sizes="(max-width: 768px) 80vw, 36vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div className="msg-photo-overlay" />
            </div>
            {/* モバイル用：写真右下に役職・署名オーバーレイ */}
            <div className="msg-role-photo-overlay">
              <span className="msg-role-photo-label">最高経営責任者 / CEO</span>
              <Image
                src="/images/ceo-sign.webp"
                alt="署名"
                width={5400}
                height={2354}
                className="msg-role-photo-sign"
                sizes="30vw"
              />
            </div>
          </div>

          {/* 右：テキスト */}
          <div className="msg-navy-body">

            <div style={fadeUp(200)}>
              <Image
                src="/images/top-message-title.webp"
                alt="大切な人のために創る"
                width={5400}
                height={1300}
                className="msg-navy-title-img"
                sizes="(max-width: 768px) 80vw, 38vw"
              />
            </div>

            <div className="msg-navy-gold-line-wrap msg-title-line" style={fadeUp(380)}>
              <div className="msg-navy-gold-line-base" />
              <div className="msg-navy-gold-slide" />
            </div>

            <p className="msg-navy-para" style={fadeUp(440)}>平素よりご支援を賜り、心より御礼申し上げます。</p>

            <p className="msg-navy-para msg-para-group-start" style={fadeUp(490)}>人は、誰かを想う時に、最も強く優しくなれる。<br className="sp-br" />私はそう信じています。</p>
            <p className="msg-navy-para" style={fadeUp(530)}>私たちが実現したいのは、単なる便利さや<br className="sp-br" />ただ効率が良いものではありません。</p>
            <p className="msg-navy-para" style={fadeUp(570)}>その先にある、一人ひとりの暮らしや時間が、<br className="sp-br" />より豊かなものになることです。</p>

            <p className="msg-navy-para msg-para-group-start" style={fadeUp(620)}>
              <span className="pc-line"><span className="pc-only">大切な人と言ってもその相手は人それぞれだと思います。</span><span className="sp-only">大切な人と言ってもその相手は人それぞれ。</span></span><br className="sp-br" />
              <span className="pc-line">家族や恋人、友人、働く仲間、お客様。<br className="sp-br" />そのかたちは違っていい。</span>
            </p>

            <p className="msg-navy-para" style={fadeUp(685)}>
              <span className="pc-line">誰かのためにより良くしたいと願う気持ちは、<br className="sp-br" />いつの時代も人を前へ進ませ、</span><br className="sp-br" />
              <span className="pc-line">社会を少しずつ良くしてきたのだと思います。</span>
            </p>

            <p className="msg-navy-para msg-para-group-start" style={fadeUp(730)}>だからこそ私たちは、「大切な人のために創る」<br className="sp-br" />という想いを、原点にしています。</p>

            <p className="msg-navy-para" style={fadeUp(760)}>仕事も、技術も、サービスも、<br className="sp-br" />すべては人の想いから始まる。</p>

            <p className="msg-navy-para" style={fadeUp(790)}>その原点を大切にし、これからも一つひとつ誠実に、<br className="sp-br" />価値を積み重ねてまいります。</p>

            {/* 役職・署名（右下） */}
            <div className="msg-role-bottom" style={fadeUp(860)}>
              <div className="msg-role-row">
                <span className="msg-navy-label">最高経営責任者 / CEO</span>
                <Image
                  src="/images/ceo-sign.webp"
                  alt="署名"
                  width={5400}
                  height={2354}
                  className="msg-photo-sign"
                  sizes="(max-width: 768px) 30vw, 14vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes msg-gold-slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }

        @keyframes msg-scan-line {
          0%   { top: -2px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .msg-navy-section {
          position: relative;
          background: #15263b;
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(32px, 4vw, 52px) clamp(16px, 2.5vw, 40px);
          overflow: hidden;
        }

        .msg-dot-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(157,140,86,0.18) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .msg-arc {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          pointer-events: none;
        }

        .msg-navy-inner {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(24px, 3vw, 48px);
          z-index: 1;
        }

        /* 写真カード */
        .msg-photo-card {
          flex: 0 0 auto;
          width: clamp(260px, 36vw, 440px);
          display: flex;
          flex-direction: column;
          gap: 24px;
          filter: drop-shadow(-8px 16px 40px rgba(0,0,0,0.5));
        }
        .msg-photo-frame {
          position: relative;
          aspect-ratio: 3 / 4;
          border: 2px solid #9d8c56;
          outline: 1px solid rgba(157,140,86,0.3);
          outline-offset: 6px;
          overflow: hidden;
        }
        .msg-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(21,38,59,0.4) 100%);
          z-index: 1;
        }
        .msg-photo-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
        }
        .msg-photo-label-role {
          font-size: .65rem;
          letter-spacing: .18em;
          color: rgba(157,140,86,0.85);
          font-weight: 500;
        }
        .msg-photo-sign {
          width: clamp(90px, 12vw, 160px);
          height: auto;
          filter: brightness(0) invert(1);
          opacity: 0.85;
          margin-bottom: -10px;
        }

        /* テキストエリア */
        .msg-navy-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-top: 80px;
          padding-left: clamp(48px, 9vw, 140px);
        }
        .msg-role-bottom {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-right: -32px;
          overflow: hidden;
        }
        .msg-role-bottom .msg-navy-gold-line-wrap {
          width: 100%;
          margin-bottom: 12px;
        }

        .msg-role-row {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 16px;
          margin-bottom: 0;
        }

        .msg-navy-label {
          font-size: .75rem;
          letter-spacing: .28em;
          color: #9d8c56;
          margin: 0;
          font-weight: 500;
          text-transform: uppercase;
        }

        .msg-navy-gold-line-wrap {
          position: relative;
          width: 100%; height: 1px;
          overflow: hidden;
          margin-bottom: 28px;
        }
        .msg-title-line {
          width: 90%;
          margin-top: -10px;
          margin-bottom: 34px;
        }
        .msg-navy-gold-line-base {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(157,140,86,.35) 0%, rgba(157,140,86,.08) 100%);
        }
        .msg-navy-gold-slide {
          position: absolute;
          top: 0; left: 0; width: 22%; height: 100%;
          background: linear-gradient(90deg,
            transparent 0%, rgba(157,140,86,.7) 38%,
            rgba(210,180,90,1) 50%, rgba(157,140,86,.7) 62%, transparent 100%
          );
          animation: msg-gold-slide 3.2s cubic-bezier(0.4,0,0.6,1) infinite;
        }

        .msg-navy-title-img {
          display: block;
          width: clamp(200px, 28vw, 380px);
          height: auto;
          filter: brightness(0) invert(1);
          opacity: 0.92;
          margin-top: -92px;
          margin-bottom: 0;
        }

        .msg-navy-hr {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(157,140,86,0.8) 0%, rgba(157,140,86,0.2) 60%, transparent 100%);
          margin: -8px 0 34px;
        }

        .msg-navy-para {
          font-size: clamp(.82rem, .95vw, .93rem);
          line-height: 1.75;
          color: rgba(255,255,255,0.72);
          margin: 0 0 10px;
          letter-spacing: .04em;
          white-space: nowrap;
        }
        .msg-navy-para:last-of-type { margin-bottom: 0; }
        .sp-br { display: none; }
        .pc-line { display: block; margin-bottom: 10px; }
        .pc-line:last-child { margin-bottom: 0; }
        .pc-only { display: inline; }
        .sp-only { display: none; }
        .msg-para-group-start { margin-top: 1.6em; }

        /* 写真上オーバーレイ（モバイル専用） */
        .msg-role-photo-overlay { display: none; }

        @media (max-width: 1024px) and (min-width: 769px) {
          .msg-navy-para { white-space: normal; }
          .msg-role-bottom { margin-right: 0; overflow: hidden; }
          .msg-role-row { flex-wrap: wrap; justify-content: flex-end; }
        }

        @media (max-width: 768px) {
          .sp-br { display: inline; }
          /* ── フルブリード：全幅・余白なし ── */
          .msg-navy-section {
            width: 100%;
            background: #15263b;
            padding: 0 0 56px;
            margin-bottom: 0;
            border-radius: 0;
            overflow: hidden;
          }
          .msg-dot-grid { display: block; z-index: 0; }
          .msg-arc { display: none; }

          /* 縦積みレイアウト */
          .msg-navy-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            background: transparent;
            position: relative;
            z-index: 1;
            padding: 0;
            width: 100%;
            max-width: 100%;
          }

          /* 写真：全幅フルブリード */
          .msg-photo-card {
            flex: none;
            width: 100%;
            max-width: 100%;
            height: auto;
            padding: 0;
            filter: none;
            position: relative;
            z-index: 2;
            margin: 0;
          }

          /* 写真フレーム：枠なし・全幅 */
          .msg-photo-frame {
            width: 100%;
            aspect-ratio: 3 / 4;
            border: none;
            outline: none;
            border-radius: 0;
            transform: none !important;
            overflow: hidden;
            position: relative;
          }

          /* 写真下部をネイビーにフェード */
          .msg-photo-overlay {
            background: linear-gradient(
              to bottom,
              rgba(0,0,0,0.12) 0%,
              rgba(0,0,0,0.05) 40%,
              rgba(21,38,59,0.65) 75%,
              rgba(21,38,59,1) 100%
            ) !important;
          }

          /* スキャンライン非表示 */
          .msg-photo-frame::after { display: none; }

          /* テキストエリア */
          .msg-navy-body {
            flex: none;
            background: transparent;
            backdrop-filter: none;
            border: none;
            border-radius: 0;
            padding: 0 6%;
            justify-content: flex-start;
            display: flex;
            flex-direction: column;
            width: 100%;
            box-sizing: border-box;
          }

          .msg-navy-gold-line-wrap { display: block; }
          .msg-title-line { width: 60%; margin: -8px auto 20px; }

          .msg-navy-title-img {
            width: clamp(200px, 68vw, 320px);
            filter: brightness(0) invert(1);
            opacity: 0.92;
            margin: 0 auto;
            display: block;
          }
          .msg-navy-hr { display: none; }
          .msg-navy-para {
            color: rgba(255,255,255,0.75);
            font-size: .82rem;
            line-height: 1.85;
            margin: 0 0 10px;
            white-space: normal;
            text-align: center;
          }
          .msg-role-bottom { display: none; }
          .pc-line { display: inline; }
          .msg-para-group-start { margin-top: 10px; }
          .pc-only { display: none; }
          .sp-only { display: inline; }
          .msg-photo-sign {
            filter: brightness(0) invert(1);
            opacity: 0.85;
            width: clamp(60px, 18vw, 90px);
          }

          /* 写真右下オーバーレイ */
          .msg-role-photo-overlay {
            display: flex;
            flex-direction: row;
            align-items: center;
            position: absolute;
            bottom: 45px;
            right: 20px;
            z-index: 10;
            gap: 10px;
          }
          .msg-role-photo-label {
            font-size: .7rem;
            letter-spacing: .18em;
            color: rgba(157,140,86,0.9);
            font-family: var(--font-noto-sans-jp);
            white-space: nowrap;
          }
          .msg-role-photo-sign {
            width: clamp(100px, 28vw, 150px);
            height: auto;
            filter: brightness(0) invert(1);
            opacity: 0.85;
            transform: translateY(-8px);
          }
        }
      `}</style>
    </>
  );
}

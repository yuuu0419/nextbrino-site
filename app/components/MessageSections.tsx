"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useVisible(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
      { threshold, rootMargin: "0px 0px 40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible, isMobile };
}

const ease = "cubic-bezier(0.22,1,0.36,1)";

function fadeUp(visible: boolean, delay: number, isMobile = false) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: isMobile
      ? "none"
      : visible
      ? `opacity 0.5s ease ${delay}ms, transform 0.55s ${ease} ${delay}ms`
      : "none",
  };
}

function slideIn(visible: boolean, dir: "left" | "right", delay: number, isMobile = false) {
  const tx = dir === "left" ? "-36px" : "36px";
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : `translateX(${tx})`,
    transition: isMobile
      ? "none"
      : visible
      ? `opacity 0.5s ease ${delay}ms, transform 0.6s ${ease} ${delay}ms`
      : "none",
  };
}

export default function MessageSections() {
  const s1 = useVisible();
  const s2 = useVisible();

  return (
    <>
      {/* ─── Section 1: 私たちが創造する世界 ─── */}
      <section ref={s1.ref} className="ms-section ms-section--light">
        <div className="ms-inner ms-inner--text-left">
          {/* テキスト */}
          <div className="ms-body" style={slideIn(s1.visible, "left", 60, s1.isMobile)}>
            <div style={fadeUp(s1.visible, 160, s1.isMobile)}>
              <Image
                src="/images/top-message-title-2.webp"
                alt="私たちが創造する世界"
                width={5400}
                height={1300}
                className="ms-title-img ms-title-img--light"
                sizes="(max-width: 768px) 80vw, 38vw"
              />
            </div>
            <div className="ms-anim-line" style={fadeUp(s1.visible, 220, s1.isMobile)}>
              <div className="ms-anim-line-base" />
              <div className="ms-anim-line-slide" />
            </div>
            <div className="ms-text-block" style={fadeUp(s1.visible, 280, s1.isMobile)}>
              <p>
                現代は、技術の進化により、あらゆるものが速く、<br className="pc-br" /><br className="sp-br" />
                便利になり、情報は瞬時に届くようになりました。<br className="pc-br" /><br className="sp-br" />
                繋がりも選択肢も、かつてないほど広がりました。<br className="pc-br" />
                <span className="sp-para-break" />
                その一方で、本当に大切な時間や感情まで、<br className="sp-br" />
                忙しさの中に埋もれてしまうこともあります。
              </p>
              <p>
                私たちは、技術を&quot;機能&quot;としてだけではなく、<br className="pc-br" /><br className="sp-br" />
                日常をより良くするための力として捉えています。<br className="pc-br" />
                <span className="sp-para-break" />
                人の暮らしに寄り添い、時間の質を高め、<br className="sp-br" />
                日常の中に余白や喜びを生み出していく。<br className="pc-br" />
                <span className="sp-para-break" />
                それが、私たちが考える技術の価値であり、<br className="sp-br" />
                創造を目指す世界です。
              </p>
              <p>
                そのために、私たちは確かな技術力を磨きながら、<br className="pc-br" /><br className="sp-br" />
                目の前の課題に誠実に向き合います。<br className="pc-br" />
                <span className="sp-para-break" />
                表面に見える要望に加え、その奥にある想いや、<br className="sp-br" />
                まだ言葉になっていない願いまで丁寧に想像する。<br className="pc-br" />
                <span className="sp-para-break" />
                そして、本当に必要とされる価値を、<br className="sp-br" />
                確かなかたちで社会へ届ける。<br className="pc-br" />
                <span className="sp-para-break" />
                人々の毎日が、もっと心地よくなること。<br className="sp-br" />
                大切な人と過ごす時間が、もっと豊かになること。<br className="pc-br" />
                <span className="sp-para-break" />
                働くことも、生きることも、自分らしく。<br className="pc-br" />
                <span className="sp-para-break" />
                その積み重ねの先に、人が輝く世界があると、<br className="sp-br" />
                私たちは信じています。
              </p>
            </div>
          </div>

          {/* 写真 */}
          <div className="ms-photo-wrap ms-photo-wrap--right" style={slideIn(s1.visible, "right", 120, s1.isMobile)}>
            <div className="ms-photo-inner ms-photo-inner--reverse">
              <Image
                src="/images/message-creative.webp"
                alt="私たちが創造する世界"
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                style={{ objectFit: "cover" }}
              />
              <div className="ms-photo-tint" />
            </div>
            <div className="ms-photo-deco ms-photo-deco--br" />
          </div>
        </div>
      </section>

      {/* ─── Section 2: 繊細に想像し、大胆に創造する + Profile ─── */}
      <section ref={s2.ref} className="ms-section ms-section--navy" data-header-dark>
        <div className="ms-inner ms-inner--photo-left ms-inner--shift-right">
          {/* 写真 */}
          <div className="ms-photo-wrap ms-photo-wrap--left" style={slideIn(s2.visible, "left", 60, s2.isMobile)}>
            <div className="ms-photo-inner">
              <Image
                src="/images/message-profile.webp"
                alt="繊細に想像し、大胆に創造する"
                fill
                sizes="(max-width: 768px) 90vw, 42vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div className="ms-photo-tint ms-photo-tint--navy" />
            </div>
            <div className="ms-photo-deco ms-photo-deco--tl" />
          </div>

          {/* テキスト */}
          <div className="ms-body ms-body--navy ms-body--shifted" style={slideIn(s2.visible, "right", 100, s2.isMobile)}>
            <div style={fadeUp(s2.visible, 200, s2.isMobile)}>
              <Image
                src="/images/top-message-title-4.webp"
                alt="繊細に想像し、大胆に創造する。"
                width={5400}
                height={1300}
                className="ms-title-img ms-title-img--navy"
                sizes="(max-width: 768px) 80vw, 38vw"
              />
            </div>
            <div className="ms-anim-line ms-anim-line--tight" style={fadeUp(s2.visible, 260, s2.isMobile)}>
              <div className="ms-anim-line-base" />
              <div className="ms-anim-line-slide" />
            </div>
            <div className="ms-text-block ms-text-block--white" style={fadeUp(s2.visible, 320, s2.isMobile)}>
              <p>
                「繊細に想像し、大胆に創造する」<br className="pc-br" />
                <span className="sp-para-break" />
                この言葉は、私が一番大切にしている言葉です。<br className="pc-br" />
                <span className="sp-para-break" />
                創造とは、単に新しいもの創ることではない。<br className="pc-br" />
                <span className="sp-para-break" />
                その先にいる人の感情や暮らしや関係性にまで<br className="sp-br" />
                思いを巡らせ、目の前の課題の奥にある、<br className="pc-br" /><br className="sp-br" />
                本質的な願いを見つめること。<br className="pc-br" />
                <span className="sp-para-break" />
                その繊細さがあってこそ、創るものは、<br className="sp-br" />
                誰かの価値になるのだと考えています。
              </p>
              <p>
                一方で、想像だけでは世界は変わりません。<br className="sp-br" />
                丁寧に考えても、形にしなければ届かない。<br className="pc-br" />
                <span className="sp-para-break" />
                最後は、信じた方向へ大胆に踏み出し、<br className="sp-br" />
                創り切る覚悟が必要です。<br className="pc-br" />
                <span className="sp-para-break" />
                繊細さと大胆さ。冷静さと情熱。誠実さと挑戦。<br className="pc-br" />
                <span className="sp-para-break" />
                これらを持ち続けることが、<br className="sp-br" />
                これからの時代に必要な創造だと思います。
              </p>
            </div>

            {/* プロフィール */}
            <div className="ms-profile ms-profile--glass" style={fadeUp(s2.visible, 420, s2.isMobile)}>
              <p className="ms-profile-label">― 代表プロフィール ―</p>
              <div className="ms-text-block ms-text-block--white ms-text-block--profile">
                {/* PC用 */}
                <p className="ms-profile-pc">
                  2001年生まれ。学生時代は長くサッカーに打ち込み、専門分野では主に健康・医療、情報、法律を学ぶ。
                </p>
                <p className="ms-profile-pc">
                  ある日、休日の大人たちが友人と過ごす時間に仕事の悩みや不満を語り合う光景を目にする。<br />
                  当時高校生だった私は、両親から仕事の不満を聞いたことがなく、そんな光景に違和感を覚える。<br />
                  会社の問題か、本人の問題か、またはただの話の引き出しの1つだったのかはわからなかったが、<br />
                  働く人の心と時間に余白をもたらす事ができる環境を創りたい。<br />
                  そんな想いを抱き、NEXT BRINOを創業。現在は6つの事業で理念を追求する。
                </p>
                {/* スマホ用 */}
                <p className="ms-profile-sp">
                  2001年生まれ。学生時代はサッカーに打ち込み、<br />
                  専門分野では主に健康・医療、情報、法律を学ぶ。
                </p>
                <p className="ms-profile-sp">
                  働く人の心と時間に余白をもたらす事ができる。<br />
                  そんな環境を創るために、NEXT BRINOを創業。<br />
                  現在は6つの事業で理念を追求する。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── 共通 ── */
        .ms-section {
          width: 100%;
          padding: clamp(72px, 9vw, 120px) 0;
        }
        .ms-section--light {
          background: #f9f8f5;
          padding: clamp(40px, 5vw, 72px) 0;
        }
        .ms-section--navy {
          padding-top: clamp(40px, 5vw, 72px);
          background: #15263b;
          position: relative;
          overflow: hidden;
        }
        .ms-section--navy::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(157,140,86,0.12) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        .ms-inner {
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: clamp(48px, 7vw, 100px);
        }
        .ms-inner--text-left { flex-direction: row; }
        .ms-inner--photo-left { flex-direction: row; }
        .ms-inner--shift-right { margin-left: 12%; margin-right: auto; }

        /* ── 写真 ── */
        .ms-photo-wrap {
          flex: 0 0 auto;
          width: clamp(220px, 30vw, 380px);
          position: relative;
          filter: drop-shadow(-8px 16px 40px rgba(0,0,0,0.4));
        }
        .ms-photo-inner {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border: 2px solid #9d8c56;
          outline: 1px solid rgba(157,140,86,0.3);
          outline-offset: 6px;
          transform: rotate(-1.5deg);
        }
        .ms-photo-inner--reverse {
          transform: rotate(1.5deg);
        }
        .ms-photo-tint {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(21,38,59,0.3) 100%);
          z-index: 1;
        }
        .ms-photo-tint--navy {
          background: linear-gradient(to bottom, transparent 60%, rgba(21,38,59,0.45) 100%);
        }

        .ms-photo-deco { display: none; }

        /* ── テキスト ── */
        .ms-body {
          flex: 1;
        }
        @keyframes ms-gold-slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }

        .ms-anim-line {
          position: relative;
          width: 90%;
          height: 1px;
          overflow: hidden;
          margin-top: -10px;
          margin-bottom: 34px;
        }
        .ms-anim-line-base {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(157,140,86,.35) 0%, rgba(157,140,86,.08) 100%);
        }
        .ms-anim-line--tight {
          margin-top: -22px;
        }
        .ms-anim-line-slide {
          position: absolute;
          top: 0; left: 0; width: 22%; height: 100%;
          background: linear-gradient(90deg,
            transparent 0%, rgba(157,140,86,.7) 38%,
            rgba(210,180,90,1) 50%, rgba(157,140,86,.7) 62%, transparent 100%
          );
          animation: ms-gold-slide 3.2s cubic-bezier(0.4,0,0.6,1) infinite;
        }

        .ms-title-img {
          display: block;
          width: clamp(200px, 28vw, 380px);
          height: auto;
          margin-bottom: 0;
        }
        .ms-title-img--light {
          opacity: 0.88;
        }
        .ms-title-img--navy {
          filter: brightness(0) invert(1);
          opacity: 0.92;
          width: clamp(260px, 38vw, 500px);
        }

        .ms-text-block p {
          font-size: clamp(.82rem, .95vw, .93rem);
          line-height: 1.9;
          color: #3a3a3a;
          margin: 0 0 16px;
          letter-spacing: .03em;
        }
        .ms-text-block p:last-child { margin-bottom: 0; }
        .ms-text-block--white p { color: rgba(255,255,255,0.75); }
        .ms-text-block--profile p {
          font-size: clamp(.68rem, .75vw, .76rem);
          color: rgba(255,255,255,0.65);
          white-space: nowrap;
          margin: 0 0 10px;
        }

        /* プロフィール */
        .ms-profile {
          margin-top: 36px;
        }
        .ms-body--shifted .ms-profile--glass { margin-left: calc(-1 * clamp(0px, 4vw, 60px) + 56px); }
        .ms-profile--glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          border: 1px solid rgba(157,140,86,0.25);
          border-radius: 8px;
          padding: 14px 18px 12px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.18);
          width: fit-content;
        }
        .ms-profile-sp { display: none; }
        .ms-profile-pc { display: block; }

        .ms-profile-label {
          font-size: .58rem;
          letter-spacing: .28em;
          color: rgba(157,140,86,0.8);
          margin: 0 0 10px;
          font-weight: 500;
        }

        /* ── レスポンシブ ── */
        .pc-br { display: block; }
        .sp-br { display: none; }
        .sp-para-break { display: none; }
        .ms-body--shifted { padding-left: clamp(0px, 4vw, 60px); }

        @media (max-width: 768px) {
          .pc-br { display: none; }
          .sp-br { display: inline; }
          .sp-para-break { display: block; height: 1em; }

          /* ── 共通：フルブリード構造 ── */
          .ms-section--light,
          .ms-section--navy { padding: 0 0 56px; }

          .ms-inner,
          .ms-inner--text-left,
          .ms-inner--photo-left,
          .ms-inner--shift-right {
            width: 100%;
            max-width: 100%;
            margin: 0;
            flex-direction: column;
            gap: 0;
          }

          /* 写真：全幅 */
          .ms-photo-wrap,
          .ms-photo-wrap--left,
          .ms-photo-wrap--right {
            width: 100%;
            filter: none;
            order: -1;
          }
          .ms-photo-inner,
          .ms-photo-inner--reverse {
            aspect-ratio: 4 / 3;
            border: none;
            outline: none;
            transform: none;
            border-radius: 0;
          }
          .ms-photo-deco { display: none; }

          /* Section 1：写真自体を少し暗く */
          .ms-section--light .ms-photo-inner img {
            filter: brightness(0.78);
          }
          /* Section 2：写真自体を少し暗く */
          .ms-section--navy .ms-photo-inner img {
            filter: brightness(0.72);
          }

          /* Section 1（ライト）：上部わずかに暗く、下部を背景色にフェード */
          .ms-section--light .ms-photo-tint {
            background: linear-gradient(
              to bottom,
              rgba(0,0,0,0.18) 0%,
              rgba(0,0,0,0.08) 40%,
              rgba(249,248,245,0.5) 72%,
              rgba(249,248,245,1) 100%
            );
          }
          /* Section 2（ネイビー）：上部わずかに暗く、下部を背景色にフェード */
          .ms-section--navy .ms-photo-tint--navy {
            background: linear-gradient(
              to bottom,
              rgba(0,0,0,0.18) 0%,
              rgba(0,0,0,0.05) 40%,
              rgba(21,38,59,0.6) 72%,
              rgba(21,38,59,1) 100%
            );
          }

          /* ── テキストエリア ── */
          .ms-body,
          .ms-body--navy,
          .ms-body--shifted {
            width: 88%;
            margin: 0 auto;
            padding: 24px 0 0;
            padding-left: 0 !important;
          }

          /* タイトル画像：中央揃え */
          .ms-title-img--light,
          .ms-title-img--navy {
            display: block;
            margin: 0 auto;
          }
          .ms-title-img--light { width: clamp(180px, 62vw, 280px); opacity: 0.9; }
          .ms-title-img--navy  { width: clamp(260px, 82vw, 400px); }

          /* ゴールドライン：中央揃え */
          .ms-anim-line { width: 60%; margin: 6px auto 20px; }
          .ms-section--navy .ms-anim-line { margin-top: -8px; }

          /* 本文テキスト */
          .ms-text-block p { font-size: .84rem; line-height: 1.85; text-align: center; }

          /* プロフィールボックス */
          .ms-body--shifted .ms-profile--glass {
            margin-left: 0 !important;
            width: 100% !important;
            margin-bottom: 40px;
          }
          .ms-text-block--profile p {
            white-space: normal;
            font-size: .78rem;
          }
          .ms-profile-sp { display: block; }
          .ms-profile-pc { display: none; }
        }
      `}</style>
    </>
  );
}

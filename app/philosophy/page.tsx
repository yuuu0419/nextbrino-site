import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "../components/FadeIn";
import PageHero from "../components/PageHero";
import ValueAccordion from "./ValueAccordion";
import PhilosophyReveal from "./PhilosophyReveal";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";

export const metadata: Metadata = {
  title: "理念・行動指針｜NEXT BRINO",
  description: "NEXT BRINOの経営理念・ミッション・ビジョン・バリューをご紹介します。「繊細に想像し、大胆に創造する」を軸に、より良い未来を目指します。",
  openGraph: {
    title: "理念・行動指針｜NEXT BRINO",
    description: "NEXT BRINOの経営理念・ミッション・ビジョン・バリューをご紹介します。「繊細に想像し、大胆に創造する」を軸に、より良い未来を目指します。",
    url: "https://nextbrino.com/philosophy",
    siteName: "NEXT BRINO",
    images: [{ url: "https://nextbrino.com/images/philosophy-ogp.jpg", width: 1200, height: 630, alt: "理念・行動指針｜NEXT BRINO" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "理念・行動指針｜NEXT BRINO",
    description: "NEXT BRINOの経営理念・ミッション・ビジョン・バリューをご紹介します。「繊細に想像し、大胆に創造する」を軸に、より良い未来を目指します。",
    images: ["https://nextbrino.com/images/philosophy-ogp.jpg"],
  },
};

export default function PhilosophyPage() {
  return (
    <main>
      <PageHero image="/images/philosophy-hero.webp" en="PHILOSOPHY" ja="経営理念・ビジョン・行動指針" />

      <Ticker text="PHILOSOPHY NEXT BRINO" overlapBottom={200} />

      <PhilosophyReveal />

      {/* ── 経営理念 ── */}
      <div className="ph-creed ph-reveal">
        <p className="section-label">経営理念</p>
        <SplitTitle text="繊細に想像し、大胆に創造する。" className="ph-creed-text" tag="h2" />
        <div className="section-divider" />
      </div>

      {/* ── Section 1: Mission ── */}
      <section className="ph-sec ph-mission ph-sec-reveal" data-header-dark>
        <div className="ph-inner">
          <div className="ph-col-left">
            <p className="ph-tag ph-reveal">Mission｜存在意義</p>
            <h2 className="ph-title ph-reveal ph-reveal--d1">TECH &amp; <br className="mission-title-br" />LIFE DESIGN</h2>
            <p className="ph-lead ph-reveal ph-reveal--d1">確かな技術で日常をデザインする。</p>
            <div className="ph-img-box ph-mission-img-box ph-reveal ph-reveal--d2">
              <Image src="/images/mission.webp" alt="Mission" fill style={{ objectFit: "contain", objectPosition: "bottom left" }} className="ph-mission-img" />
            </div>
          </div>
          <div className="ph-col-right">
            {/* PC版テキスト */}
            <div className="ph-pc-only">
              <p className="ph-body ph-reveal ph-reveal--d1">「IT・テクノロジー」とは、ただ世の中の不便を解消することや、<br className="pc-br" />効率を追求する為にあるものではありません。<br className="pc-br" />人々の想いに寄り添い、暮らしの中にある「小さな不便」や<br className="pc-br" />「見えにくい課題」に向き合いながら、毎日をより心地よく、<br className="pc-br" />より豊かにする為の技術だと考えています。</p>
              <p className="ph-body ph-reveal ph-reveal--d2">だからこそ、私たちのミッションは、「確かな技術で日常をデザインすること」<br className="pc-br" />安心して使えるシステムを作ることで、何気ない日常が少し快適になったり、<br className="pc-br" />誰かの時間や気持ちに余白が生まれたりする。<br className="pc-br" />一つひとつの積み重ねが、暮らしの質を高め、未来を静かに変えていくのだと信じています。</p>
              <p className="ph-body ph-reveal ph-reveal--d3">技術力と誠実さを土台に、先進性とあたたかさが共存する技術を。<br className="pc-br" />人の為に機能し、日常に自然と溶け込む価値を届けていく。<br className="pc-br" />そうすることで一歩ずつ、私たちは日常に新しい可能性をひらき、<br className="pc-br" />より良い未来の日常をデザインしていきます。</p>
            </div>
            {/* SP版テキスト */}
            <div className="ph-sp-only">
              <p className="ph-body ph-reveal">私たちにとって「IT・テクノロジー」とは、<br />ただ世の中の不便を解消することや、<br />効率を追求する為にあるものではありません。</p>
              <p className="ph-body ph-reveal ph-reveal--d1">人々の想いに寄り添い、暮らしの中にある<br />「小さな不便」や「見えにくい課題」に<br />向き合いながら、毎日をより心地よく、<br />より豊かにする為の技術だと考えています。</p>
              <p className="ph-body ph-reveal ph-reveal--d2">だからこそ、私たちのミッションは、<br />「確かな技術で日常をデザインすること」<br />安心して使えるシステムを作ることで、<br />何気ない日常が少し快適になったり、<br />誰かの時間や気持ちに余白が生まれたりする。<br />一つひとつの積み重ねが、暮らしの質を高め、<br />未来を静かに変えていくのだと信じています。</p>
              <p className="ph-body ph-reveal ph-reveal--d3">技術力と誠実さを土台に、<br />先進性とあたたかさが共存する技術を。<br />どんなときも人の為に機能し、<br />日常に自然と溶け込む価値を届けていく。<br />私たちは日常に新しい可能性をひらき、<br />より良い未来の日常をデザインしていきます。</p>
            </div>
          </div>
        </div>
        <p className="ph-watermark">TECH &amp; LIFE DESIGN</p>
      </section>

      {/* ── Section 2: Vision ── */}
      <section className="ph-sec ph-vision ph-sec-reveal">
        <div className="ph-inner">
          <div className="ph-col-left">
            <p className="ph-tag ph-tag--dark ph-reveal">Vision｜目指す未来</p>
            <h2 className="ph-title ph-title--dark ph-reveal ph-reveal--d1">BRIGHTNESS <br className="vision-title-br" />&amp; INNOVATION</h2>
            <p className="ph-lead ph-lead--dark ph-reveal ph-reveal--d1">人生に輝きと革新的なアイデアを提供する。</p>
            <div className="ph-img-box ph-reveal ph-reveal--d2">
              <Image src="/images/vision.webp" alt="Vision" fill style={{ objectFit: "contain", objectPosition: "bottom left" }} />
            </div>
          </div>
          <div className="ph-col-right">
            {/* PC版テキスト */}
            <div className="ph-pc-only">
              <p className="ph-body ph-body--dark ph-reveal ph-reveal--d1">私たちが目指すのは、テクノロジーとアイデアによって、<br className="pc-br" />人々の未来が優しく照らされ、1人でも多くの人が、<br className="pc-br" />「自分らしい輝き」を見つけられる社会です。</p>
              <p className="ph-body ph-body--dark ph-reveal ph-reveal--d2">ただ便利さや豊かさをもたらすだけでなく、<br className="pc-br" />一人ひとりが自分の時間を大切にし、<br className="pc-br" />日常の中に、新たな意味や喜びを見つける。</p>
              <p className="ph-body ph-body--dark ph-reveal ph-reveal--d3">挑戦に不安はつきものですが、希望や自信、誇りを持ち、<br className="pc-br" />それぞれの確かな未来へと繋がるように、<br className="pc-br" />私たちは社会にあたたかな革新と、心を動かす価値をもたらす。<br className="pc-br" />そんな存在でありたいと願っています。</p>
              <p className="ph-body ph-body--dark ph-reveal ph-reveal--d4">そのために私たちは、人の想いに深く耳を傾け、本質を見つめ、<br className="pc-br" />まだ見ぬ可能性を形にしていきます。日々の積み重ねの先に生まれる、<br className="pc-br" />確かな変化を感じながら、寄り添い、社会に確かな価値を。</p>
            </div>
            {/* SP版テキスト */}
            <div className="ph-sp-only">
              <p className="ph-body ph-body--dark ph-reveal">私たちが目指すのは、<br />テクノロジーとアイデアによって、<br />人々の未来が優しく照らされ、<br />1人でも多くの人が、「自分らしい輝き」を<br />見つけられる社会です。</p>
              <p className="ph-body ph-body--dark ph-reveal ph-reveal--d1">ただ便利さや豊かさをもたらすだけでなく、<br />一人ひとりが自分の時間を大切にし、<br />日常の中に、新たな意味や喜びを見つける。</p>
              <p className="ph-body ph-body--dark ph-reveal ph-reveal--d2">挑戦に不安はつきものですが、<br />希望や自信、誇りを持ち、<br />それぞれの確かな未来へと繋がるように、<br />私たちは社会にあたたかな革新と、<br />心を動かす価値をもたらす。<br />そんな存在でありたいと願っています。</p>
              <p className="ph-body ph-body--dark ph-reveal ph-reveal--d3">そのために私たちは、<br />人の想いに深く耳を傾け、本質を見つめ、<br />まだ見ぬ可能性を形にしていきます。<br />日々の積み重ねの先に生まれる、<br />確かな変化を感じながら、寄り添い、<br />社会に確かな価値を。</p>
            </div>
          </div>
        </div>
        <p className="ph-watermark ph-watermark--dark">BRIGHTNESS&amp;INNOVATION</p>
      </section>

      {/* ── Section 3: Value ── */}
      <section className="ph-sec ph-value ph-sec-reveal" data-header-dark>
        <div className="ph-inner ph-value-top">
          <div className="ph-col-left ph-col-left--value">
            <p className="ph-tag ph-reveal">Value｜行動指針</p>
            <p className="ph-lead ph-lead--value ph-reveal ph-reveal--d1">理念を追求するための<br className="value-lead-br" />14つの約束</p>
          </div>
          <div className="ph-col-right ph-col-right--value">
            <div className="ph-img-box ph-img-box--value ph-reveal ph-reveal--d2">
              <Image src="/images/value.webp" alt="Value" fill style={{ objectFit: "contain", objectPosition: "center right" }} />
            </div>
          </div>
        </div>
        <div className="ph-value-accordion">
          <ValueAccordion />
        </div>
      </section>

      <style>{`
        /* ── ページ背景 ── */
        main { background: #fff; }

        /* ── 経営理念 ── */
        .ph-creed {
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 56px;
        }
        .ph-creed-text {
          font-size: clamp(2rem, 4.8vw, 4.4rem);
          font-weight: 900;
          color: #15263b;
          letter-spacing: .02em;
          line-height: 1.1;
          margin: 6px 0 0;
        }

        /* ── カードボックス共通 ── */
        .ph-sec {
          position: relative;
          width: calc(100% - 4%);
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 20px;
          border-radius: 0 20px 20px 0;
          overflow: hidden;
        }
        .ph-sec:first-of-type { margin-top: 28px; }
        .ph-sec:last-of-type  { margin-bottom: 24px; }

        .ph-mission { background: #15263b; }
        .ph-vision  { background: #f5f0e6; }
        .ph-value   { background: #15263b; }

        /* ── 2カラムグリッド ── */
        .ph-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 72px 6% 0;
          gap: 48px;
          position: relative;
          z-index: 1;
        }

        /* ── 左カラム ── */
        .ph-col-left {
          display: flex;
          flex-direction: column;
          padding-top: 60px;
        }
        .ph-tag {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 11px;
          letter-spacing: .28em;
          color: rgba(255,255,255,.6);
          text-transform: uppercase;
          margin: 0 0 18px;
          font-weight: 600;
        }
        .ph-tag--dark { color: #15263b; opacity: .65; }

        .ph-title {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: clamp(24px, 3.2vw, 46px);
          font-weight: 700;
          letter-spacing: .04em;
          line-height: 1.05;
          color: #fff;
          margin: 0 0 28px;
        }
        .ph-title--dark { color: #15263b; }

        .ph-lead {
          font-size: clamp(.9rem, 1.3vw, 1.1rem);
          font-weight: 700;
          color: rgba(255,255,255,.85);
          letter-spacing: .06em;
          line-height: 1.75;
          margin: 0 0 32px;
        }
        .ph-lead--dark { color: #15263b; }
        .ph-lead--value {
          font-size: clamp(20px, 2.6vw, 38px);
          color: rgba(255,255,255,.85);
          margin: 0;
        }

        .ph-img-box {
          position: relative;
          flex: 1;
          min-height: 340px;
          max-height: 460px;
        }

        /* ── 右カラム ── */
        .ph-col-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 24px;
        }
        .ph-body {
          font-size: 1rem;
          line-height: 2.1;
          color: rgba(255,255,255,.68);
          margin: 0;
        }
        .ph-body--dark { color: #444; }
        .pc-br { display: block; }
        @media (max-width: 768px) { .pc-br { display: none; } }

        /* ── PC/SP 切り替え ── */
        .ph-pc-only { display: flex; flex-direction: column; gap: 24px; }
        .ph-sp-only { display: none; }

        /* ── ウォーターマーク ── */
        .ph-watermark {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: clamp(36px, 6vw, 88px);
          font-weight: 900;
          letter-spacing: .06em;
          color: rgba(255,255,255,.05);
          white-space: nowrap;
          overflow: hidden;
          margin: 0;
          padding: 0 6% 16px;
          line-height: 1.1;
          position: relative;
          text-align: center;
          z-index: 0;
        }
        .ph-watermark--dark { color: rgba(21,38,59,.06); text-align: left; }

        /* ── Valueセクション上部 ── */
        .ph-value-top { padding-bottom: 0; align-items: center; }
        .ph-col-left--value { justify-content: center; }
        .ph-img-box--value { min-height: 380px; max-height: 480px; }

        /* ── アコーディオン領域 ── */
        .ph-value-accordion {
          padding: 0 6%;
        }

        /* ── レスポンシブ ── */
        @media (max-width: 768px) {
          .ph-sec { width: 96%; border-radius: 14px; margin-bottom: 16px; }
          .ph-inner { grid-template-columns: 1fr; padding: 28px 6% 28px; gap: 20px; }
          .ph-img-box { min-height: 200px; max-height: 260px; }
          .ph-value-top { grid-template-columns: 1fr; padding-bottom: 0; }
          .ph-col-right--value { display: block; }
          .ph-img-box--value { min-height: unset; max-height: unset; height: 220px; flex: none; margin-top: -16px; margin-bottom: -12px; }
          .ph-img-box--value img { object-position: center center !important; }
          .ph-value-accordion { padding: 0 5%; }
          .ph-creed { width: 88%; margin: 0 auto; padding: 90px 0 20px; }
          .ph-sec:first-of-type { margin-top: 0; }
          .ph-creed-text { font-size: 1.38rem; font-weight: 900; letter-spacing: .01em; line-height: 1.2; white-space: nowrap; }

          /* Mission: タイトル1行・画像中央・本文小 */
          .mission-title-br { display: none; }
          .ph-mission .ph-title { font-size: clamp(18px, 5.8vw, 26px); white-space: nowrap; }
          .ph-mission-img-box { flex: none; height: 220px; min-height: unset; max-height: unset; margin-top: -16px; margin-bottom: -12px; }
          .ph-mission-img { object-position: center center !important; }
          .ph-mission .ph-body { font-size: 0.92rem; line-height: 2.0; text-align: center; }
          .ph-mission .ph-col-left { padding-top: 20px; text-align: center; }
          .ph-mission .ph-tag {
            display: inline-block;
            border: none;
            border-bottom: 1px solid rgba(157,140,86,0.7);
            padding: 4px 4px 8px;
            border-radius: 0;
            align-self: center;
            margin-bottom: 28px;
          }
          .ph-mission .ph-title {
            margin-bottom: 0;
            border: 1px solid rgba(157,140,86,0.45);
            border-bottom: none;
            padding: 18px 20px 10px;
            background: rgba(157,140,86,0.14);
          }
          .ph-mission .ph-lead {
            border: 1px solid rgba(157,140,86,0.45);
            border-top: none;
            padding: 0 20px 18px;
            margin-bottom: 0;
            background: rgba(157,140,86,0.14);
          }
          .ph-mission .ph-lead { margin-bottom: 4px; }
          .ph-mission .ph-inner { gap: 0; }
          .ph-mission .ph-col-right { padding-top: 0; padding-bottom: 28px; }

          /* PC/SP テキスト切り替え */
          .ph-pc-only { display: none; }
          .ph-sp-only { display: flex; flex-direction: column; gap: 18px; }

          /* Vision SP: Mission と同じデザインに統一 */
          .vision-title-br { display: none; }
          .ph-vision .ph-col-left { padding-top: 20px; text-align: center; }
          .ph-vision .ph-tag--dark {
            display: inline-block;
            border: none;
            border-bottom: 1px solid rgba(157,140,86,0.7);
            padding: 4px 4px 8px;
            border-radius: 0;
            align-self: center;
            margin-bottom: 28px;
          }
          .ph-vision .ph-title--dark {
            font-size: clamp(16px, 5.0vw, 24px);
            white-space: nowrap;
            margin-bottom: 0;
            border: 1px solid rgba(157,140,86,0.45);
            border-bottom: none;
            padding: 18px 20px 10px;
            background: rgba(157,140,86,0.14);
          }
          .ph-vision .ph-lead--dark {
            font-size: 0.82rem;
            border: 1px solid rgba(157,140,86,0.45);
            border-top: none;
            padding: 0 20px 18px;
            margin-bottom: 4px;
            background: rgba(157,140,86,0.14);
          }
          .ph-vision .ph-img-box { flex: none; height: 220px; min-height: unset; max-height: unset; margin-top: -16px; margin-bottom: -12px; }
          .ph-vision .ph-img-box img { object-position: center center !important; }
          .ph-vision .ph-inner { gap: 0; }
          .ph-vision .ph-col-right { padding-top: 0; padding-bottom: 28px; }
          .ph-vision .ph-body--dark { font-size: 0.92rem; line-height: 2.0; text-align: center; }

          /* Value SP */
          .value-lead-br { display: none; }
          .ph-value .ph-col-left { padding-top: 20px; text-align: center; }
          .ph-value .ph-tag {
            display: inline-block;
            border: none;
            border-bottom: 1px solid rgba(157,140,86,0.7);
            padding: 4px 4px 8px;
            border-radius: 0;
            align-self: center;
            margin-bottom: 28px;
          }
          .ph-value .ph-lead--value {
            font-size: 0.95rem;
            white-space: nowrap;
            border: 1px solid rgba(157,140,86,0.45);
            padding: 14px 20px;
            background: rgba(157,140,86,0.14);
            margin: 0;
            line-height: 1.6;
          }

          /* ウォーターマーク: アウトライン＋斜め背景配置 */
          .ph-watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-65deg);
            font-size: 80px;
            -webkit-text-stroke: 1.5px rgba(255,255,255,0.11);
            color: transparent;
            white-space: nowrap;
            padding: 0;
            pointer-events: none;
            z-index: 0;
          }
          .ph-watermark--dark {
            -webkit-text-stroke: 1.5px rgba(21,38,59,0.14);
            color: transparent;
            text-align: center;
          }
        }

        .ph-banner-fadein { flex: 1; overflow: hidden; }
        .ph-banners {
          display: flex;
          flex-direction: row;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .ph-banner-link {
          display: block;
          flex: 1;
          overflow: hidden;
          border-radius: 0;
        }
        .ph-banner-img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
        @media (max-width: 640px) {
          .ph-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .ph-banner-link {
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          }
        }
      `}</style>

      <div className="ph-banners">
        <FadeIn delay={0} direction="up" className="ph-banner-fadein">
          <Link href="/message-kuroki-yuta/" className="ph-banner-link">
            <Image src="/images/top-message-banner.webp" alt="代表挨拶" width={1800} height={826} sizes="100vw" className="ph-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="ph-banner-fadein">
          <Link href="/service/" className="ph-banner-link">
            <Image src="/images/business-banner.webp" alt="事業内容" width={1800} height={826} sizes="100vw" className="ph-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="ph-banner-fadein">
          <Link href="/contact/" className="ph-banner-link">
            <Image src="/images/contact-banner.webp" alt="お問い合わせ" width={1800} height={826} sizes="100vw" className="ph-banner-img" />
          </Link>
        </FadeIn>
      </div>
      <ScrollLineIndicator />
    </main>
  );
}

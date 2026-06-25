import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import Link from "next/link";
import Image from "next/image";
import PageHero from "../components/PageHero";
import FadeIn from "../components/FadeIn";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
export const metadata: Metadata = { title: "反社会的勢力に対する基本方針｜NEXT BRINO", description: "NEXT BRINOの反社会的勢力に対する基本方針をご確認いただけます。" };

const policies = [
  {
    num: "01",
    title: "反社会的勢力との一切の関係遮断",
    body: "反社会的勢力とは、一切の関係を持ちません。",
  },
  {
    num: "02",
    title: "取引開始前の確認",
    body: "取引先・提携先・委託先その他の関係先について、確認を行い、反社会的勢力との関係防止に努めます。\n反社会的勢力であることが判明した場合や、その疑いがある場合は、取引を行いません。",
    bodySp: "取引先・提携先・委託先その他の関係先について、\n確認を行い、反社会的勢力との関係防止に努めます。\n反社会的勢力であることが判明した場合や、\nその疑いがある場合は、取引を行いません。",
  },
  {
    num: "03",
    title: "取引開始後に判明した場合の対応",
    body: "開始後に反社会的勢力であることが判明した場合、またはそれに関与していることが判明した場合には、\n契約条項・関係法令その他の定めに基づき、以下の措置を講じ、速やかに関係を解消します。",
    bodySp: "開始後に反社会的勢力であることが判明した場合、\nまたはそれに関与していることが判明した場合には、\n契約条項・関係法令その他の定めに基づき、\n以下の措置を講じ、速やかに関係を解消します。",
  },
  {
    num: "04",
    title: "不当要求への毅然とした対応",
    body: "反社会的勢力による不当要求に対して一切応じません。 また、民事および刑事の両面から法的対応を行います。",
  },
  {
    num: "05",
    title: "資金提供・利益供与等の禁止",
    body: "反社会的勢力に対する資金提供、利益供与、便宜供与その他これに類する行為を一切行いません。\nまた、問題解決を名目とする不適切な支払い・譲歩・裏取引等は行いません。",
    bodySp: "反社会的勢力に対する資金提供、利益供与、便宜供与\nその他これに類する行為を一切行いません。\nまた、問題解決を名目とする不適切な支払い、\n譲歩、裏取引等は行いません。",
  },
  {
    num: "06",
    title: "組織としての対応",
    body: "対応を個人に任せることなく、いかなる状況でも組織として対応します。 対応にあたっては、従業員の安全確保に努めます。",
    bodySp: "対応を個人に任せることなく、いかなる状況でも\n組織として対応します。\n対応にあたっては、従業員の安全確保に努めます。",
  },
  {
    num: "07",
    title: "外部専門機関との連携",
    body: "反社会的勢力への対応にあたり、警察・弁護士等の外部専門機関と緊密に連携し、適切に対処します。",
    bodySp: "反社会的勢力への対応にあたり、警察・弁護士等の\n外部専門機関と緊密に連携し、適切に対処します。",
  },
  {
    num: "08",
    title: "契約条項等の整備",
    body: "反社会的勢力の排除を徹底するため、契約書等に反社会的勢力排除に関する条項を整備し、適切な運用に努めます。",
    bodySp: "反社会的勢力の排除を徹底するため、\n契約書等に反社会的勢力排除に関する条項を整備し、\n適切な運用に努めます。",
  },
];

export default function AntisocialPolicyPage() {
  return (
    <main>
      <PageHero image="/images/anti-social-forces-policy-hero.webp" en={<>ANTISOCIAL<br />POLICY</>} ja="反社会的勢力に対する基本方針" />

      <Ticker text="ANTISOCIAL POLICY NEXT BRINO" overlapBottom={200} />

      <div className="ap-section-header">
        <p className="section-label">反社会的勢力に対する基本方針</p>
        <SplitTitle text="ANTISOCIAL POLICY" className="section-title-en" tag="h1" />
        <div className="section-divider" />
      </div>

      <div className="ap-bg-wrap">
        <div className="ap-bg-dots" />
        <div className="ap-pc">
          <p className="ap-intro ap-intro--pc">NEXT BRINOは、健全で適正な事業を行うため、反社会的勢力との一切の関係を遮断し、不当要求に対しては毅然とした姿勢で対応します。<br />反社会的勢力による被害を防止するため、警察・弁護士等の外部専門機関と連携し、以下の方針に基づき、反社会的勢力の排除に取り組みます。</p>
          <p className="ap-intro ap-intro--sp">NEXT BRINOは、健全で適正な事業を行うため、<br />反社会的勢力との一切の関係を遮断し、<br />不当要求に対しては毅然とした姿勢で対応します。<br />反社会的勢力による被害を防止するため、<br />警察・弁護士等の外部専門機関と連携し、<br />以下に基づき、反社会的勢力排除に取り組みます。</p>
          <div className="ap-sections">
            {policies.map(({ num, title, body, bodySp }, i) => (
              <div key={num} className="ap-section">
                <div className="ap-head">
                  <span className="ap-num">{num}</span>
                  <h2 className="ap-title">{title}</h2>
                </div>
                <p className="ap-body ap-body--pc">{body}</p>
                <p className="ap-body ap-body--sp">{bodySp ?? body}</p>
                {/* スマホのみ：最後のボックス内下部に表示 */}
                {i === policies.length - 1 && (
                  <div className="ap-date ap-date--sp">
                    <p>制定日：2026年4月10日｜NEXT BRINO</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* PCのみ：セクションボックス外・ap-pcボックス内 */}
          <div className="ap-date ap-date--pc">
            <p>制定日：2026年4月10日｜NEXT BRINO</p>
          </div>
        </div>
      </div>

      <div className="ap-banners">
        <FadeIn delay={0} direction="up" className="ap-banner-fadein">
          <Link href="/privacy-policy/" className="ap-banner-link">
            <Image src="/images/privacy-policy-banner.jpg" alt="個人情報保護方針" width={1800} height={826} sizes="100vw" className="ap-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="ap-banner-fadein">
          <Link href="/contact-policy/" className="ap-banner-link">
            <Image src="/images/contact-policy-banner.jpg" alt="お問合せ対応基本方針" width={1800} height={826} sizes="100vw" className="ap-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="ap-banner-fadein">
          <Link href="/" className="ap-banner-link">
            <Image src="/images/home-banner.jpg" alt="HOME" width={1800} height={826} sizes="100vw" className="ap-banner-img" />
          </Link>
        </FadeIn>
      </div>

      <style>{`
        .ap-section-header {
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 56px;
          position: relative;
          z-index: 20;
        }
        .section-label {
          font-size: .7rem;
          letter-spacing: .32em;
          color: #9d8c56;
          margin: 0 0 12px;
        }
        .section-title-en {
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 900;
          color: #15263b;
          letter-spacing: .08em;
          line-height: 1;
          margin: 0 0 20px;
        }
        .section-divider {
          width: 56px !important;
          height: 2px !important;
          background: linear-gradient(90deg, #9d8c56, rgba(157,140,86,.15)) !important;
        }
        @media (max-width: 640px) {
          .ap-section-header { padding-top: 90px; padding-bottom: 40px; }
          .ap-section-header .section-title-en { font-size: clamp(27px, 7.3vw, 44px); }
        }

        /* ドット背景ラップ */
        .ap-bg-wrap {
          position: relative;
          background: #ffffff;
          overflow: hidden;
          padding: clamp(40px, 5vw, 80px) 0 clamp(20px, 2vw, 32px);
        }
        .ap-bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(21,38,59,0.18) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* コンテンツボックス */
        .ap-pc {
          position: relative;
          z-index: 1;
          width: 88%;
          max-width: 1100px;
          margin: 0 auto;
          background: rgba(21,38,59,0.07);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(21,38,59,0.18);
          border-radius: 8px;
          padding: 48px 56px 36px;
          box-shadow: 0 4px 40px rgba(21,38,59,0.06);
        }

        .ap-intro {
          font-size: .95rem;
          line-height: 2;
          color: #444;
          margin: 0 0 36px;
        }
        .ap-intro--sp { display: none; }
        .ap-intro--pc { display: block; }
        .ap-body--sp { display: none; }
        .ap-body--pc { display: block; }

        .ap-sections { display: flex; flex-direction: column; gap: 16px; }

        .ap-section {
          padding: 28px 32px;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(21,38,59,0.13);
          border-radius: 8px;
          box-shadow: 0 2px 16px rgba(21,38,59,0.05);
        }
        .ap-head { display: flex; align-items: center; gap: 20px; margin: 0 0 16px; }
        .ap-num {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 900;
          line-height: 1;
          flex-shrink: 0;
          color: transparent;
          -webkit-text-stroke: 2px rgba(157,140,86,0.5);
          letter-spacing: .04em;
          user-select: none;
        }
        .ap-title { font-size: clamp(.95rem, 1.5vw, 1.1rem); font-weight: 700; color: #15263b; margin: 0; letter-spacing: .04em; }
        .ap-body { font-size: .9rem; line-height: 2; color: #555; margin: 0; white-space: pre-line; }
        .ap-date { margin: 48px 0 0; font-size: .85rem; color: rgba(21,38,59,.5); display: flex; align-items: center; justify-content: flex-end; gap: 24px; }
        .ap-date p { margin: 0; white-space: nowrap; }
        .ap-date--sp { display: none; }
        .ap-date--pc { display: flex; }

        @media (max-width: 640px) {
          .ap-bg-wrap { padding: 0 0 12px; }
          .ap-date--pc { display: none; }
          .ap-date--sp { display: flex; flex-direction: row; justify-content: flex-end; font-size: .71875rem; margin: 24px 0 0; gap: 4px; }
          .ap-pc {
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            border: none;
            box-shadow: none;
            padding: 0 0 24px;
            border-radius: 0;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .ap-intro {
            padding: 20px 24px;
            background: rgba(255,255,255,0.55);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border: 1px solid rgba(21,38,59,0.13);
            border-radius: 8px;
            box-shadow: 0 2px 16px rgba(21,38,59,0.05);
            margin: 0;
            font-size: .78125rem;
          }
          .ap-sections { gap: 16px; }
          .ap-section { padding: 20px 16px; }
          .ap-title { font-size: .9375rem; }
          .ap-body { font-size: .78125rem; }
          .ap-intro--pc { display: none; }
          .ap-intro--sp { display: block; }
          .ap-body--pc { display: none; }
          .ap-body--sp { display: block; }
        }

        /* バナー */
        .ap-banner-fadein { flex: 1; overflow: hidden; }
        .ap-banners {
          display: flex;
          flex-direction: row;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .ap-banner-link {
          display: block;
          flex: 1;
          overflow: hidden;
        }
        .ap-banner-img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
        @media (max-width: 640px) {
          .ap-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .ap-banner-link {
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          }
        }
      `}</style>
      <ScrollLineIndicator />
    </main>
  );
}

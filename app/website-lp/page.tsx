import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "../components/FadeIn";
import LpForm from "./LpForm";
import LpFaq from "./LpFaq";
import LpFixedCta from "./LpFixedCta";

export const metadata: Metadata = {
  title: "ホームページ制作サービス｜NEXT BRINO",
  description:
    "経営理念・顧客像・競合分析まで踏み込むヒアリングから、デザイン・開発・保守まで一貫対応。修正回数無制限、レスポンシブ標準装備、追加料金なしのホームページ制作サービスです。",
  alternates: { canonical: "https://nextbrino.com/website-lp" },
  openGraph: {
    title: "ホームページ制作サービス｜NEXT BRINO",
    description:
      "経営理念・顧客像・競合分析まで踏み込むヒアリングから、デザイン・開発・保守まで一貫対応。修正回数無制限、レスポンシブ標準装備、追加料金なしのホームページ制作サービスです。",
    url: "https://nextbrino.com/website-lp",
    siteName: "NEXT BRINO",
    images: [{ url: "https://nextbrino.com/images/website-lp-ogp.webp", width: 1200, height: 630, alt: "ホームページ制作サービス｜NEXT BRINO" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ホームページ制作サービス｜NEXT BRINO",
    description:
      "経営理念・顧客像・競合分析まで踏み込むヒアリングから、デザイン・開発・保守まで一貫対応。修正回数無制限、レスポンシブ標準装備、追加料金なしのホームページ制作サービスです。",
    images: ["https://nextbrino.com/images/website-lp-ogp.webp"],
  },
};

function withBreaks(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

const MAINTENANCE_PLANS = [
  {
    name: "ライトプラン",
    price: "5,000円 / 月",
    desc: "基本的な保守だけの方におすすめ",
    features: ["サーバーチェック", "サイトの保守・管理", "軽微な修正（月2回まで）", "LINEサポート"],
    excluded: ["デザイン変更サポート"],
    featured: false,
  },
  {
    name: "スタンダードプラン",
    price: "10,000円 / 月",
    desc: "適度に更新もしたい方におすすめ",
    features: ["サーバーチェック", "サイトの保守・管理", "内容・記事更新（月5回まで）", "軽微なデザイン変更（月2回まで）", "LINEサポート"],
    excluded: [],
    featured: true,
  },
  {
    name: "プレミアムプラン",
    price: "30,000円 / 月",
    desc: "更新頻度が高い方におすすめ",
    features: ["サーバーチェック・保守管理", "内容・記事更新（無制限）", "デザイン変更・ページ追加（無制限）", "解析・定期ヒアリング（無制限）", "LINEサポート"],
    excluded: [],
    featured: false,
  },
];

const CAMPAIGNS = [
  { src: "/images/lp-campaign-cafe.png", alt: "カフェ応援キャンペーン｜通常30万円が半額15万円〜、2026年9月30日まで先着20店舗限定", w: 2172, h: 724 },
  { src: "/images/lp-campaign-soccer.png", alt: "サッカーチーム応援キャンペーン｜通常30万円が半額15万円〜、2026年9月30日まで先着20チーム限定", w: 2170, h: 725 },
];

const STRENGTH_GROUPS = [
  {
    num: "01",
    title: "制作プロセスへのこだわり",
    items: [
      {
        h: "ヒアリングの深さ",
        p: "経営理念・顧客像・競合分析まで綿密にヒアリング。\n「なぜこのサイトが必要か」という本質から設計し、\n完全オリジナルデザインでブランドの世界観を\n実現します。",
      },
      {
        h: "全業種対応",
        p: "業種を問わず柔軟に対応。\nお客様のイメージ・ブランドを、\nゼロから一貫して表現します。",
      },
      {
        h: "表示速度への配慮",
        p: "画像最適化・軽量設計で表示速度にこだわって制作。\n体感速度も重視しています。",
      },
    ],
  },
  {
    num: "02",
    title: "納品後も安心のサポート",
    items: [
      {
        h: "安心の保守サポート",
        p: "公開後も「育てる」視点で継続的にサポート。\n3種類の保守プランをご用意しています。",
      },
      {
        h: "一貫したサポート体制",
        p: "デザイン〜開発〜セキュリティ〜保守まで一貫対応。\n外注なしのため、低価格を実現しています。",
      },
      {
        h: "安心のセキュリティ",
        p: "SSL暗号化・不正アクセス対策など、\n幅広いセキュリティ対策を標準実装しています。",
      },
    ],
  },
  {
    num: "03",
    title: "料金・対応スピードの透明性",
    items: [
      {
        h: "スピード対応",
        p: "独自開発の管理システムにより体制を整備。\nスピード対応が可能です。",
      },
      {
        h: "修正回数無制限・追加料金なし",
        p: "見積もり以上の請求は発生しません。\nご納得いただけるまで対応いたします。",
      },
      {
        h: "レスポンシブ標準装備",
        p: "通常10〜30万円かかるスマホ対応が標準装備。\n追加料金なしで全端末に対応します。",
      },
    ],
  },
];

const PLANS = [
  {
    name: "必要最低限プラン",
    badge: null,
    price: "20〜45万円",
    target: "初めてのサイト制作に。\nまずは最低限、綺麗に整えたい企業向け",
    features: ["基本ページ制作", "豊富なデザイン案", "お問合せフォーム", "基本SEO設定"],
    featured: false,
  },
  {
    name: "標準プラン",
    badge: "おすすめ",
    price: "50〜120万円",
    target: "信頼感・問い合わせ・採用など\nバランスよく強化したい企業向け",
    features: [
      "完全オリジナルデザイン",
      "採用を含む複数ページ追加",
      "お問合せフォーム導線最適化",
      "ブログ・お知らせ機能",
      "SEO強化・解析設定",
    ],
    featured: true,
  },
  {
    name: "成果強化プラン",
    badge: null,
    price: "130〜200万円",
    target: "本格的に集客・採用・ブランディングを\n強化したい企業向け",
    features: [
      "完全オリジナルデザイン",
      "ページ追加を含む拡張設計",
      "コンテンツ設計・文章作成サポート",
      "SEO強化・解析設定",
      "写真撮影・素材制作（オプション）",
    ],
    featured: false,
  },
];

export default function LpPage() {
  return (
    <main className="lp">
      {/* ── FV ── */}
      <section className="lp-fv" data-header-dark>
        <div className="lp-fv-dots" aria-hidden />
        <div className="lp-fv-glow" aria-hidden />
        <div className="lp-fv-inner">
          <FadeIn delay={0}>
            <p className="lp-fv-label">WEBSITE PRODUCTION</p>
          </FadeIn>
          <FadeIn delay={150}>
            <h1 className="lp-fv-title">
              「なぜこのサイトが必要か」を、<br />
              本質から設計するホームページ制作。
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="lp-fv-sub lp-fv-sub-pc">
              経営理念・顧客像・競合分析まで踏み込むヒアリングから、デザイン・開発・保守までワンストップで対応。<br />
              修正回数無制限、レスポンシブ標準装備、追加料金なしで安心してお任せいただけます。
            </p>
            <p className="lp-fv-sub lp-fv-sub-sp">
              経営理念・顧客像・競合分析まで綿密なヒアリングから、<br />
              デザイン・開発・保守までワンストップで対応。<br />
              修正回数無制限、レスポンシブ標準装備、<br />
              追加料金なしで安心してお任せいただけます。
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <div className="lp-fv-cta-wrap">
              <a href="#lp-contact" className="lp-fv-cta">無料相談する</a>
              <p className="lp-fv-cta-note">最短数分〜2営業日以内にご返信いたします</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 選ばれる理由 ── */}
      <section className="lp-section" id="lp-strength">
        <div className="lp-section-header">
          <FadeIn delay={0}><p className="lp-section-label">WHY NEXT BRINO</p></FadeIn>
          <FadeIn delay={100}><h2 className="lp-section-title">選ばれる理由・私たちの強み</h2></FadeIn>
          <FadeIn delay={200}><div className="lp-section-divider" /></FadeIn>
        </div>

        <div className="lp-strength-groups">
          {STRENGTH_GROUPS.map((group, gi) => (
            <FadeIn key={group.num} delay={gi * 120} direction="up" className="lp-strength-group">
              <div className="lp-strength-group-head">
                <span className="lp-strength-num">{group.num}</span>
                <h3 className="lp-strength-group-title">{group.title}</h3>
              </div>
              <ul className="lp-strength-items">
                {group.items.map((item) => (
                  <li key={item.h} className="lp-strength-item">
                    <p className="lp-strength-item-h">{item.h}</p>
                    <p className="lp-strength-item-p">{withBreaks(item.p)}</p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>

        {/* 独自の問い合わせシステム ハイライト */}
        <FadeIn delay={150} direction="up">
          <div className="lp-system-banner">
            <div className="lp-system-text">
              <p className="lp-system-label">ONLY NEXT BRINO</p>
              <h3 className="lp-system-title">独自の問い合わせシステムを搭載</h3>
              <p className="lp-system-desc">
                問い合わせ受付から返信・リストアップ・対応状況管理までを一貫システムで自動化。<br />
                送信から数秒で反映され、PC・スマホからリアルタイムに状況を確認できます。<br />
                電話営業の削減にも寄与します。
              </p>
            </div>
            <div className="lp-system-flow">
              {["自動受付メール送信", "未対応 / 対応中 / 進行中で分類", "PC・スマホでリアルタイム確認"].map((step, i) => (
                <div key={step} className="lp-system-step">
                  <span className="lp-system-step-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lp-system-step-text">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── 料金プラン ── */}
      <section className="lp-section lp-section--gray" id="lp-plans">
        <div className="lp-section-header">
          <FadeIn delay={0}><p className="lp-section-label">PRICE</p></FadeIn>
          <FadeIn delay={100}><h2 className="lp-section-title">料金プラン</h2></FadeIn>
          <FadeIn delay={200}><div className="lp-section-divider" /></FadeIn>
        </div>

        <div className="lp-plans-grid">
          {PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 120} direction="up" className={`lp-plan-card${plan.featured ? " lp-plan-card--featured" : ""}`}>
              {plan.badge && <div className="lp-plan-badge">{plan.badge}</div>}
              <p className="lp-plan-name">{plan.name}</p>
              <p className="lp-plan-price">{plan.price}</p>
              <p className="lp-plan-target">{withBreaks(plan.target)}</p>
              <ul className="lp-plan-features">
                {plan.features.map((f) => (
                  <li key={f}><span className="lp-plan-check" aria-hidden>✓</span>{f}</li>
                ))}
              </ul>
              <a href="#lp-contact" className="lp-plan-btn">このプランで相談する</a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="lp-plans-notes">
            <p>※ 価格は目安です。ページ数、機能等により変動します。</p>
            <p>※ お見積り確定後、ご依頼範囲内で追加料金は発生しません。</p>
            <p>※ ご予算に応じて柔軟に調整いたします。お気軽にご相談ください。</p>
          </div>
        </FadeIn>
      </section>

      {/* ── 保守サポート ── */}
      <section className="lp-section" id="lp-maintenance">
        <div className="lp-section-header">
          <FadeIn delay={0}><p className="lp-section-label">SUPPORT</p></FadeIn>
          <FadeIn delay={100}><h2 className="lp-section-title">保守プランとサポート内容</h2></FadeIn>
          <FadeIn delay={200}><div className="lp-section-divider" /></FadeIn>
          <FadeIn delay={300}>
            <p className="lp-contact-intro">納品後も貴社のサイトを守り続けます。</p>
          </FadeIn>
        </div>

        <div className="lp-plans-grid">
          {MAINTENANCE_PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 120} direction="up" className={`lp-plan-card${plan.featured ? " lp-plan-card--featured" : ""}`}>
              {plan.featured && <div className="lp-plan-badge">人気</div>}
              <p className="lp-plan-name">{plan.name}</p>
              <p className="lp-plan-price">{plan.price}</p>
              <p className="lp-plan-target lp-plan-target--tight">{plan.desc}</p>
              <ul className="lp-plan-features">
                {plan.features.map((f) => (
                  <li key={f}><span className="lp-plan-check" aria-hidden>✓</span>{f}</li>
                ))}
                {plan.excluded.map((f) => (
                  <li key={f} className="lp-plan-feature-excluded"><span className="lp-plan-check lp-plan-check-excluded" aria-hidden>－</span>{f}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── キャンペーン ── */}
      <section className="lp-section lp-section--gray" id="lp-campaigns">
        <div className="lp-section-header">
          <FadeIn delay={0}><p className="lp-section-label">CAMPAIGN</p></FadeIn>
          <FadeIn delay={100}><h2 className="lp-section-title">実施中のキャンペーン</h2></FadeIn>
          <FadeIn delay={200}><div className="lp-section-divider" /></FadeIn>
        </div>
        <div className="lp-campaigns-wrap">
          {CAMPAIGNS.map((c, i) => (
            <FadeIn key={c.src} delay={i * 120} direction="up">
              <a href="#lp-contact" className="lp-campaign-link" aria-label="無料相談・ご依頼はこちら">
                <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="(max-width: 900px) 100vw, 900px" className="lp-campaign-img" />
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="lp-section" id="lp-faq">
        <div className="lp-section-header">
          <FadeIn delay={0}><p className="lp-section-label">FAQ</p></FadeIn>
          <FadeIn delay={100}><h2 className="lp-section-title">よくある質問</h2></FadeIn>
          <FadeIn delay={200}><div className="lp-section-divider" /></FadeIn>
        </div>
        <div className="lp-faq-wrap">
          <FadeIn delay={100} direction="up">
            <LpFaq />
          </FadeIn>
        </div>
      </section>

      {/* ── お問い合わせフォーム ── */}
      <section className="lp-section lp-section--gray" id="lp-contact">
        <div className="lp-section-header">
          <FadeIn delay={0}><p className="lp-section-label">CONTACT</p></FadeIn>
          <FadeIn delay={100}><h2 className="lp-section-title">無料相談・お問い合わせ</h2></FadeIn>
          <FadeIn delay={200}><div className="lp-section-divider" /></FadeIn>
          <FadeIn delay={300}>
            <p className="lp-contact-intro">下記フォームに必要事項をご入力いただき、3つの方針にご同意のうえ送信してください。</p>
          </FadeIn>
        </div>
        <div className="lp-form-box">
          <FadeIn delay={150} direction="up">
            <LpForm />
          </FadeIn>
        </div>
      </section>

      {/* ── 満枠案内 ── */}
      <section className="lp-notice-section">
        <FadeIn delay={0}>
          <div className="lp-notice-box">
            <span className="lp-notice-icon" aria-hidden>！</span>
            <p className="lp-notice-text">
              ※Webサイト制作以外のITソリューション事業は、現在満枠のため新規受付を停止中です。
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="lp-notice-sub">
            サイト制作・お見積り・無料相談は通常どおり承っております。お気軽に<Link href="#lp-contact" className="lp-notice-link">お問い合わせ</Link>ください。
          </p>
        </FadeIn>
      </section>

      <LpFixedCta />

      <style>{`
        .lp { background: #fff; }

        /* ===== FV ===== */
        .lp-fv {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          background: linear-gradient(155deg, #0d1e33 0%, #15263b 55%, #1a3060 100%);
          overflow: hidden;
          padding: 140px 0 80px;
        }
        .lp-fv-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .lp-fv-glow {
          position: absolute;
          top: -20%; right: -10%;
          width: 60vw; height: 60vw;
          max-width: 800px; max-height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,114,12,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .lp-fv-inner {
          position: relative; z-index: 2;
          width: 88%; max-width: 980px; margin: 0 auto;
          text-align: center;
        }
        .lp-fv-label {
          font-size: .78rem; letter-spacing: .3em; color: #e8720c;
          font-weight: 700; margin: 0 0 24px;
        }
        .lp-fv-title {
          font-size: clamp(26px, 4vw, 48px);
          font-weight: 900;
          color: #fff;
          line-height: 1.45;
          letter-spacing: .02em;
          margin: 0 0 28px;
        }
        .lp-fv-sub {
          font-size: clamp(.85rem, 1.1vw, 1rem);
          color: rgba(255,255,255,0.75);
          line-height: 2.1;
          margin: 0 0 44px;
        }
        .lp-fv-sub-sp { display: none; }
        .lp-fv-cta-wrap { display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .lp-fv-cta {
          display: inline-block;
          padding: 19px 64px;
          background: #e8720c;
          color: #fff;
          font-size: .96rem;
          font-weight: 700;
          letter-spacing: .12em;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 10px 32px rgba(232,114,12,0.38);
          transition: background .25s, transform .25s;
        }
        .lp-fv-cta:hover { background: #cc6109; transform: translateY(-2px); }
        .lp-fv-cta-note { font-size: .74rem; color: rgba(255,255,255,0.45); letter-spacing: .04em; }

        /* ===== セクション共通 ===== */
        .lp-section { padding: 96px 0; }
        .lp-section--gray { background: #f7f6f3; }
        .lp-section-header { width: 88%; max-width: 1100px; margin: 0 auto 56px; text-align: center; }
        .lp-section-label { font-size: .74rem; letter-spacing: .3em; color: #e8720c; font-weight: 700; margin: 0 0 14px; }
        .lp-section-title { font-size: clamp(24px, 3.2vw, 36px); font-weight: 900; color: #15263b; letter-spacing: .04em; margin: 0; }
        .lp-section-divider { width: 48px; height: 2px; background: #e8720c; margin: 20px auto 0; }
        .lp-contact-intro { margin: 20px 0 0; font-size: .88rem; color: rgba(21,38,59,0.65); line-height: 1.9; }

        /* ===== 強み ===== */
        .lp-strength-groups {
          width: 88%; max-width: 1100px; margin: 0 auto 40px;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .lp-strength-group {
          background: #fff;
          border: 1px solid rgba(21,38,59,0.1);
          border-radius: 10px;
          padding: 32px 28px;
        }
        .lp-strength-group-head { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
        .lp-strength-num {
          font-size: 1.6rem; font-weight: 900; color: transparent;
          -webkit-text-stroke: 1.5px rgba(232,114,12,0.55);
        }
        .lp-strength-group-title { font-size: 1rem; font-weight: 700; color: #15263b; letter-spacing: .03em; margin: 0; line-height: 1.5; }
        .lp-strength-items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 20px; }
        .lp-strength-item-h {
          font-size: .86rem; font-weight: 700; color: #15263b; margin: 0 0 6px;
          padding-left: 14px; position: relative;
        }
        .lp-strength-item-h::before {
          content: ""; position: absolute; left: 0; top: 7px; width: 6px; height: 6px;
          border-radius: 50%; background: #e8720c;
        }
        .lp-strength-item-p { font-size: .72rem; line-height: 1.9; color: rgba(21,38,59,0.6); margin: 0; padding-left: 14px; }

        /* ===== 問い合わせシステム バナー ===== */
        .lp-system-banner {
          width: 88%; max-width: 1100px; margin: 0 auto;
          background: linear-gradient(135deg, #0d1e33 0%, #15263b 60%, #1a3060 100%);
          border-radius: 12px;
          padding: 48px 48px;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .lp-system-banner::before {
          content: "";
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
        }
        .lp-system-text { position: relative; z-index: 1; }
        .lp-system-label { font-size: .7rem; letter-spacing: .28em; color: #e8720c; font-weight: 700; margin: 0 0 14px; }
        .lp-system-title { font-size: clamp(19px, 2.2vw, 26px); font-weight: 900; color: #fff; line-height: 1.6; margin: 0 0 18px; }
        .lp-system-desc { font-size: .78rem; line-height: 2; color: rgba(255,255,255,0.68); margin: 0; }
        .lp-system-flow { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 14px; }
        .lp-system-step {
          display: flex; align-items: center; gap: 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 16px 20px;
        }
        .lp-system-step-num { font-size: .78rem; font-weight: 900; color: #e8720c; flex-shrink: 0; }
        .lp-system-step-text { font-size: .82rem; color: rgba(255,255,255,0.85); letter-spacing: .02em; }

        /* ===== 料金プラン ===== */
        .lp-plans-grid {
          width: 88%; max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .lp-plan-card {
          position: relative;
          background: #fff;
          border: 1px solid rgba(21,38,59,0.12);
          border-radius: 12px;
          padding: 40px 30px 32px;
          display: flex; flex-direction: column;
        }
        .lp-plan-card--featured {
          border: 2px solid #e8720c;
          box-shadow: 0 16px 44px rgba(232,114,12,0.18);
          transform: translateY(-8px);
        }
        .lp-plan-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: #e8720c; color: #fff; font-size: .72rem; font-weight: 700;
          letter-spacing: .12em; padding: 6px 20px; border-radius: 999px;
          white-space: nowrap;
        }
        .lp-plan-name { font-size: 1.02rem; font-weight: 700; color: #15263b; text-align: center; margin: 4px 0 12px; }
        .lp-plan-price { font-size: 1.5rem; font-weight: 900; color: #e8720c; text-align: center; margin: 0 0 16px; }
        .lp-plan-target { font-size: .74rem; line-height: 1.8; color: rgba(21,38,59,0.55); text-align: center; margin: 0 0 24px; min-height: 62px; }
        .lp-plan-target--tight { min-height: 0; margin: 0 0 12px; }
        .lp-plan-features { list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .lp-plan-features li { font-size: .8rem; color: rgba(21,38,59,0.78); display: flex; align-items: flex-start; gap: 8px; line-height: 1.6; }
        .lp-plan-check { color: #e8720c; font-weight: 900; flex-shrink: 0; }
        .lp-plan-btn {
          display: block; text-align: center; padding: 13px 0;
          border: 1.5px solid #15263b; border-radius: 999px;
          color: #15263b; font-size: .8rem; font-weight: 700; letter-spacing: .06em;
          text-decoration: none; transition: background .25s, color .25s;
        }
        .lp-plan-card--featured .lp-plan-btn { background: #e8720c; border-color: #e8720c; color: #fff; }
        .lp-plan-btn:hover { background: #15263b; color: #fff; }
        .lp-plan-card--featured .lp-plan-btn:hover { background: #cc6109; border-color: #cc6109; }
        .lp-plans-notes { width: 88%; max-width: 1100px; margin: 40px auto 0; }
        .lp-plans-notes p { font-size: .74rem; line-height: 2; color: rgba(21,38,59,0.5); margin: 0; }
        .lp-plan-feature-excluded { color: rgba(21,38,59,0.35); }
        .lp-plan-check-excluded { color: rgba(21,38,59,0.3); }

        /* ===== キャンペーン ===== */
        .lp-campaigns-wrap {
          width: 88%; max-width: 1000px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 24px;
        }
        .lp-campaign-link {
          display: block;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(21,38,59,0.14);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .lp-campaign-link:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(21,38,59,0.2); }
        .lp-campaign-img { width: 100%; height: auto; display: block; }

        /* ===== FAQ ===== */
        .lp-faq-wrap { width: 88%; max-width: 820px; margin: 0 auto; }

        /* ===== フォーム ===== */
        .lp-form-box {
          width: 88%; max-width: 1000px; margin: 0 auto;
          background: #fff;
          border: 1px solid rgba(21,38,59,0.12);
          border-radius: 10px;
          padding: 48px 56px 56px;
        }

        /* ===== 満枠案内 ===== */
        .lp-notice-section { width: 88%; max-width: 900px; margin: 0 auto; padding: 64px 0 96px; text-align: center; }
        .lp-notice-box {
          display: inline-flex; align-items: center; gap: 14px;
          border: 1.5px solid #e8720c;
          background: rgba(232,114,12,0.06);
          border-radius: 8px;
          padding: 18px 28px;
          text-align: left;
        }
        .lp-notice-icon {
          flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%;
          background: #e8720c; color: #fff; font-weight: 900; font-size: .82rem;
          display: flex; align-items: center; justify-content: center;
        }
        .lp-notice-text { font-size: .82rem; color: #15263b; font-weight: 700; line-height: 1.7; margin: 0; }
        .lp-notice-sub { margin: 20px 0 0; font-size: .76rem; color: rgba(21,38,59,0.5); }
        .lp-notice-link { color: #e8720c; font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }

        /* ===== レスポンシブ ===== */
        @media (max-width: 1260px) {
          .lp-strength-groups { grid-template-columns: 1fr; }
          .lp-plans-grid { grid-template-columns: 1fr; max-width: 460px; }
          .lp-plan-card--featured { transform: none; }
          .lp-system-banner { grid-template-columns: 1fr; padding: 36px 28px; }
        }
        @media (max-width: 640px) {
          .lp-fv { padding: 120px 0 64px; min-height: unset; }
          .lp-fv-title { font-size: 4.8vw; line-height: 1.6; }
          .lp-fv-sub-pc { display: none; }
          .lp-fv-sub-sp { display: block; }
          .lp-fv-sub { font-size: 3.2vw; }
          .lp-section { padding: 64px 0; }
          .lp-section-header { margin-bottom: 40px; }
          .lp-form-box { padding: 32px 20px 40px; border-radius: 8px; }
          .lp-notice-box { flex-direction: row; padding: 16px 18px; }
          .lp-notice-section { padding: 48px 0 120px; }
        }
      `}</style>
    </main>
  );
}

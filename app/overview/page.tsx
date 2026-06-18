import React from "react";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import FadeIn from "../components/FadeIn";
import HistoryTimeline from "./HistoryTimeline";
export const metadata: Metadata = { title: "概要・沿革 | NEXT BRINO" };

const profile: { label: string; value: string; extra?: React.ReactNode }[] = [
  { label: "商号", value: "ネクストブライノ（ 英語表記：NEXT BRINO ）" },
  { label: "最高経営責任者 / CEO", value: "黒木 雄太（ KUROKI YUTA ）" },
  { label: "設立年月日", value: "サービス構築：2019年 2月 19日\nNEXT BRINO設立：2022年 2月 19日" },
  {
    label: "事業内容",
    value: "ITソリューション事業\nIPマネジメント事業\nWEB広告事業\n企画・販売事業\n教育・学習支援事業\n健康増進事業",
  },
  {
    label: "主なサービス",
    value: "WEBサイト制作・運用保守\nアプリ開発・システム開発\nECサイト販売管理サポート\nオウンドメディア運営\n情報配信・販売コンテンツ運営\nブランド企画\n製造販売に付随するトータルサポート\nブランドフランチャイズ\nクリエイティブタレントマネジメント\nIP保護インフラ開発\nPREP学習法による学習支援\n健康増進に関わるサポート　など",
    extra: <><br />詳細は <a href="/service" className="ov-td-link">事業内容ページ</a> をご覧ください。</>,
  },
  {
    label: "メールアドレス",
    value: "",
    extra: <><a href="mailto:support@nextbrino.com" className="ov-td-link">support@nextbrino.com</a><br />その他各サービスページにも掲載しております。</>,
  },
  {
    label: "問い合わせフォーム",
    value: "",
    extra: <><a href="/contact" className="ov-td-link">問い合わせフォーム</a><br />その他各サービスページにも設置しております。<br />お問合せ対応基本方針は<a href="/contact-policy" className="ov-td-link">こちら</a></>,
  },
  { label: "受付時間", value: "フォーム・メール：24時間" },
  { label: "対応時間", value: "10:00〜17:00（ 土日祝・休業日を除く ）" },
  { label: "返信目安", value: "2-5営業日（ 内容によって変動します ）" },
  {
    label: "公式サイト",
    value: "",
    extra: <>NEXT BRINO：<a href="https://nextbrino.com" className="ov-td-link" target="_blank" rel="noopener noreferrer">https://nextbrino.com</a><br />N-Bright：<a href="https://n-bright.jp" className="ov-td-link" target="_blank" rel="noopener noreferrer">https://n-bright.jp</a><br />その他、各サービスの公式サイトもございます。</>,
  },
];


export default function OverviewPage() {
  return (
    <main>
      <PageHero image="/images/overview-hero.jpg" en="OVERVIEW" ja="概要・沿革" />

      {/* ── OUR PROFILE ヘッダー ── */}
      <Ticker text="OUR PROFILE NEXT BRINO" overlapBottom={200} />

      <div className="ov-section-header">
        <FadeIn delay={0}><p className="section-label">概要</p></FadeIn>
        <SplitTitle text="OUR PROFILE" className="section-title-en" tag="h1" delay={120} />
        <FadeIn delay={200}><div className="section-divider" /></FadeIn>
        <FadeIn delay={300}><p className="ov-section-lead">NEXT BRINOの基本情報について</p></FadeIn>
      </div>

      {/* ── 会社概要（紺色ドット背景） ── */}
      <div className="ov-navy-wrap" data-header-dark>
        <div className="ov-navy-dots" />
        {[280, 420, 560].map((size, i) => (
          <div key={i} className="ov-arc" style={{
            width: size, height: size,
            top: -size * 0.3, right: -size * 0.3,
            borderColor: `rgba(157,140,86,${(0.14 - i * 0.04).toFixed(2)})`,
          }} />
        ))}
        <FadeIn direction="up" delay={100}>
          <div className="ov-table-wrap">
            <div className="ov-navy-inner">
              <table className="ov-table"><tbody>
                {profile.map(({ label, value, extra }) => (
                  <tr key={label}>
                    <th className="ov-th">{label}</th>
                    <td className="ov-td">
                      {value}
                      {extra && <>{value && <br />}{extra}</>}
                    </td>
                  </tr>
                ))}
              </tbody></table>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ── HISTORY ヘッダー ── */}
      <Ticker text="HISTORY NEXT BRINO" overlapBottom={200} />

      <div className="ov-section-header">
        <FadeIn delay={0}><p className="section-label">沿革</p></FadeIn>
        <SplitTitle text="HISTORY" className="section-title-en" tag="h2" delay={120} />
        <FadeIn delay={200}><div className="section-divider" /></FadeIn>
        <FadeIn delay={300}><p className="ov-section-lead">NEXT BRINO創業から現在までの事業の歩み</p></FadeIn>
      </div>

      {/* ── 沿革（紺色ドット背景） ── */}
      <div className="ov-navy-wrap ov-navy-wrap--history">
        <div className="ov-navy-dots" />
        {[280, 420, 560].map((size, i) => (
          <div key={i} className="ov-arc" style={{
            width: size, height: size,
            bottom: -size * 0.3, left: -size * 0.3,
            borderColor: `rgba(157,140,86,${(0.14 - i * 0.04).toFixed(2)})`,
          }} />
        ))}
        <HistoryTimeline />

        {/* ── インボイスバナー ── */}
        <FadeIn direction="up" delay={100} style={{position: "relative", zIndex: 1}}>
        <div className="ov-invoice-wrap">
          <div className="ov-invoice-box">
            <p className="ov-invoice-text">
              NEXT BRINO は適格請求書発行事業者です。<br className="ov-invoice-br" />適格請求書（インボイス）の発行が可能です。
            </p>
          </div>
        </div>
        </FadeIn>
      </div>

      <style>{`
        /* ── セクションヘッダー ── */
        .ov-section-header {
          position: relative;
          z-index: 20;
          width: 88%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0 56px;
        }

        /* ── セクションリード文 ── */
        .ov-section-lead {
          margin: 28px 0 0;
          font-size: clamp(.85rem, 1.1vw, 1rem);
          color: #555;
          font-weight: 300;
          letter-spacing: .08em;
          line-height: 1.9;
        }

        /* ── 紺色ドット背景ラッパー ── */
        .ov-navy-wrap {
          position: relative;
          background: #15263b;
          width: 100%;
          margin: 0 0 80px;
          padding: clamp(28px, 3vw, 52px) 0;
          overflow: hidden;
        }
        .ov-navy-wrap--history {
          margin-bottom: 100px;
        }
        .ov-navy-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(157,140,86,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .ov-arc {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          pointer-events: none;
        }
        .ov-navy-inner {
          position: relative;
          z-index: 1;
          width: 88%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .ov-table-wrap { width: 100%; }
        .ov-table { width: 100%; border-collapse: collapse; }
        .ov-th {
          width: clamp(160px, 20vw, 260px);
          vertical-align: top;
          text-align: left;
          padding: 32px 32px 32px 0;
          border-top: 1px solid rgba(255,255,255,0.07);
          border-right: 1px solid rgba(255,255,255,0.07);
          font-size: .9rem;
          font-weight: 400;
          color: #c4a96a;
          white-space: nowrap;
          letter-spacing: normal;
        }
        .ov-th::before {
          content: '';
          display: inline-block;
          width: 2px;
          height: 1.5em;
          background: rgba(255,255,255,0.7);
          vertical-align: middle;
          margin-right: 14px;
          border-radius: 1px;
        }
        .ov-td {
          vertical-align: top;
          padding: 32px 0 32px 40px;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-size: .9rem;
          line-height: 1.9;
          color: rgba(255,255,255,0.9);
          white-space: pre-line;
        }
        .ov-table tr:last-child .ov-th,
        .ov-table tr:last-child .ov-td {
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .ov-td-link {
          color: rgba(255,255,255,0.9);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

/* ── インボイスバナー ── */
        .ov-invoice-wrap {
          position: relative;
          z-index: 1;
          width: 80%;
          max-width: 920px;
          margin: 40px auto 48px;
        }
        .ov-invoice-box {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 28px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(196, 169, 106, 0.30);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .ov-invoice-text {
          font-size: .88rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.82);
          letter-spacing: .04em;
          margin: 0;
          text-align: center;
          width: 100%;
        }
        .ov-invoice-text strong {
          font-weight: 600;
        }
        .ov-invoice-br {
          display: none;
        }
        @media (max-width: 768px) {
          .ov-invoice-br {
            display: block;
          }
          .ov-invoice-wrap {
            width: 88%;
            margin-top: 16px;
          }
          .ov-invoice-box {
            padding: 16px 20px;
          }
          .ov-invoice-text {
            font-size: .78rem;
          }
        }

        /* ── レスポンシブ ── */
        @media (max-width: 768px) {
          .ov-section-header { padding-top: 90px; padding-bottom: 24px; }
          .ov-navy-wrap {
            padding: 28px 0;
            margin-bottom: 0;
          }
          .ov-navy-wrap--history { margin-bottom: 0; }
          .ov-navy-inner { width: 88%; }
          .ov-arc { display: none; }
          .ov-table, .ov-table tbody, .ov-table tr, .ov-th, .ov-td { display: block; width: 100%; }
          .ov-table tr {
            padding: 20px 0 24px;
          }
          .ov-table tr + tr {
            border-top: 1px solid rgba(255,255,255,0.10);
          }
          .ov-table tr:last-child {
            border-bottom: 1px solid rgba(255,255,255,0.10);
          }
          .ov-table tr:last-child .ov-th,
          .ov-table tr:last-child .ov-td {
            border-bottom: none;
          }
          .ov-th {
            border-top: none;
            border-right: none;
            border-bottom: none;
            border-left: 2px solid rgba(157,140,86,0.50);
            padding: 0 0 0 22px;
            white-space: normal;
            font-size: .85rem;
            color: #c4a96a;
          }
          .ov-th::before { display: none; }
          .ov-td {
            border: none;
            border-left: 1px solid rgba(255,255,255,0.18);
            padding: 8px 0 0 22px;
            margin-top: 6px;
            clip-path: inset(6px 0 0 0);
          }
          .ov-tl-row { grid-template-columns: 72px 1fr; gap: 0 12px; }
        }
      `}</style>
    </main>
  );
}

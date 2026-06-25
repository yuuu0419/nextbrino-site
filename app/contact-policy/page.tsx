import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import Link from "next/link";
import PageHero from "../components/PageHero";
import FadeIn from "../components/FadeIn";
import Image from "next/image";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
export const metadata: Metadata = { title: "お問合せ対応基本方針｜NEXT BRINO", description: "NEXT BRINOのお問合せ対応基本方針をご確認いただけます。お問合せの受付・返信・対応方針について定めています。" };

export default function ContactPolicyPage() {
  return (
    <main>
      <PageHero image="/images/contact-policy-hero.webp" en="CONTACT POLICY" ja="お問合せ対応基本方針" />

      <Ticker text="CONTACT POLICY NEXT BRINO" overlapBottom={200} />

      <div className="cp-section-header">
        <p className="section-label">お問合せ対応基本方針</p>
        <SplitTitle text="CONTACT POLICY" className="section-title-en" tag="h1" />
        <div className="section-divider" />
      </div>

      <div className="cp-bg-wrap">
        <div className="cp-bg-dots" />
      <div className="pc">
        <p className="cp-intro">当社サービスに関するお問合せをご検討のお客様へ、対応方針についてご案内いたします。<br />お手続き前にご一読いただけますと幸いです。</p>
        <div className="cp-notice">
          <div className="cp-notice-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="30" stroke="#9d8c56" strokeWidth="2.5"/>
              <path d="M24 20c.5 2.5 1.5 4.8 3 6.8l-2.5 2.5a.8.8 0 0 0-.1.9c1.7 3.4 4.4 6.1 7.8 7.8a.8.8 0 0 0 .9-.1l2.5-2.5c2 1.5 4.3 2.5 6.8 3 .5.1.9-.3.9-.8v-4.5c0-.4-.3-.8-.7-.8-1.7-.2-3.3-.7-4.8-1.4l-1.8 1.8c-2.1-1.1-3.8-2.8-4.9-4.9l1.8-1.8c-.7-1.5-1.2-3.1-1.4-4.8 0-.4-.4-.7-.8-.7h-4.5c-.5 0-.9.4-.8.9z" fill="#9d8c56"/>
              <line x1="18" y1="18" x2="46" y2="46" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="cp-notice-text">お電話でのお問合せサポートは終了いたしました。</p>
          <p className="cp-notice-sub"><span className="sp-hide">問合せ方法：各種サービス受付フォーム・メール</span><span className="sp-show">問合せ方法：問合せフォーム・メール</span><br />受付時間：24時間</p>
        </div>
        <div className="cp-sections">

          {/* 01 */}
          <div className="cp-section">
            <div className="cp-head"><span className="cp-num">01</span><h2 className="cp-title">電話サポート終了について</h2></div>
            <div className="cp-body-wrap">
              <p className="cp-body"><span className="sp-hide">お客様・担当者</span>双方にとって安全で適切なサポートを提供するため、<br className="sp-br" /><span className="sp-hide">文書ベースで</span><span className="sp-show">お問合せは文書ベースで</span>受け付けております。<br />また、社会的に以下のような課題が増えたため、<br className="sp-br" />電話での受付は2025年をもって終了いたしました。</p>
              <ul className="cp-list">
                <li>カスタマーハラスメントの増加<br className="sp-br" />（威圧・暴言・過度な要求など）</li>
                <li>口頭のやり取りによる記録・証跡の不在</li>
                <li>なりすましや虚偽申告による情報漏洩リスク</li>
                <li><span className="sp-hide">仕様・設定・契約など</span>技術的内容のミスコミュニケーション</li>
                <li>担当者への精神的負担による対応品質の低下</li>
              </ul>
              <p className="cp-body"><span className="sp-hide">文書ベース</span><span className="sp-show">文書</span>によるやり取りは内容を正確に記録・保全<br className="sp-br" />できるため、<br className="pc-br" /><span className="sp-hide">お客様・当社</span>双方の権利と安全を守るうえで<br className="sp-br" />最も適切な手段と考えております。</p>
            </div>
          </div>

          {/* 02 */}
          <div className="cp-section">
            <div className="cp-head"><span className="cp-num">02</span><h2 className="cp-title">お問合せの受付について</h2></div>
            <div className="cp-body-wrap">
              <table className="cp-table">
                <tbody>
                  <tr>
                    <th>受付方法<span className="sp-hide">・</span><span className="sp-show"> ・</span>受付時間</th>
                    <td>各問合せフォーム<span className="sp-hide">・メール　24時間受付</span><span className="sp-show">・メール<br />24時間受付</span></td>
                  </tr>
                  <tr>
                    <th>対応時間</th>
                    <td>10:00〜17:00（土日祝・休業日を除く）</td>
                  </tr>
                  <tr>
                    <th>返信目安</th>
                    <td>2〜5営業日（内容等により変動あり）</td>
                  </tr>
                </tbody>
              </table>
              <p className="cp-body">フォーム・メールは24時間受け付けております。<br className="sp-br" />送信後は自動返信メールにてご確認いただけます。<br />迷惑メールに振り分けられる場合もございますので、<br className="sp-br" />併せてご確認ください。</p>
              <p className="cp-body">返信は営業時間内に順次行っております。<br className="sp-br" />時間外・休業日のお問合せにつきましては、<br className="sp-br" />翌営業日以降の対応となります。<br />内容やお問い合わせの混雑状況によっては、<br className="sp-br" />開発・技術担当等との確認を要するため、<br className="sp-br" />返信まで日数をいただく場合がございます。</p>
            </div>
          </div>

          {/* 03 */}
          <div className="cp-section">
            <div className="cp-head"><span className="cp-num">03</span><h2 className="cp-title">当社からご連絡する場合</h2></div>
            <div className="cp-body-wrap">
              <p className="cp-body"><span className="sp-hide">お問合せ内容の確認や</span>詳細なご案内が必要と判断した場合には、<br className="sp-br" /><span className="sp-hide">担当者より</span>メールまたはお電話にてご連絡いたします。<br className="pc-br" /><span className="sp-hide">ご連絡先はお問合せ時にご入力いただいた情報を使用しますので、</span><br className="sp-br" />正確な情報のご記入をお願いいたします。</p>
              <p className="cp-body">なお、当社からのご連絡が不要な場合は、<br className="sp-br" />その旨をお問合せ内にお知らせください。</p>
            </div>
          </div>

          {/* 04 */}
          <div className="cp-section">
            <div className="cp-head"><span className="cp-num">04</span><h2 className="cp-title">返信を差し控える場合</h2></div>
            <div className="cp-body-wrap">
              <p className="cp-body">以下に該当すると<span className="sp-hide">当社が判断したお問合せについては、</span><span className="sp-show">判断した場合は、</span><br className="sp-br" />返信を行わない場合がございます。<br className="sp-br" />あらかじめご了承ください。</p>
              <ul className="cp-list cp-list--circle">
                <li>営業・広告・提携・採用媒体等に関するご案内</li>
                <li>誹謗中傷・脅迫・侮辱的な表現を含む内容</li>
                <li>短期間での同一内容の重複送信</li>
                <li>当社サービス・事業内容と無関係な内容</li>
                <li><span>個人情報の不正取得・調査<span className="sp-hide">・アンケート</span><span className="sp-show">等</span>を目的とするもの</span></li>
                <li><span>その他、<span className="sp-hide">当社が</span>不適切または悪質と判断したもの</span></li>
              </ul>
            </div>
          </div>

          {/* 05 */}
          <div className="cp-section">
            <div className="cp-head"><span className="cp-num">05</span><h2 className="cp-title">個人情報の取り扱い</h2></div>
            <div className="cp-body-wrap">
              <p className="cp-body">お問合せの際にご提供いただいた個人情報は、<br className="sp-br" />お問合せへの対応および当社からのご連絡の目的にのみ<br className="sp-br" />使用いたします。</p>
              <p className="cp-body">法令に定める場合を除き、<br className="sp-br" />第三者への提供・開示は行いません。<br className="sp-br" />詳細は当社の<Link href="/privacy-policy" className="cp-link">プライバシーポリシー</Link>をご参照ください。</p>
            </div>
          </div>

          {/* 06 */}
          <div className="cp-section">
            <div className="cp-head"><span className="cp-num">06</span><h2 className="cp-title">本方針の変更について</h2></div>
            <div className="cp-body-wrap">
              <p className="cp-body">本方針は、社会情勢・法令の改正・サービス体制の<br className="sp-br" />変化に応じて、予告なく変更する場合があります。<br className="pc-br" /><br className="sp-br" />変更後の内容は本ページへの掲載をもって<br className="sp-br" />効力を生じるものとします。<br className="sp-br" />定期的にご確認いただきますようお願いいたします。</p>
              {/* スマホのみ：06ボックス内 */}
              <div className="cp-date cp-date--sp">
                <p className="cp-date-right">制定日：2026年4月10日｜NEXT BRINO</p>
              </div>
            </div>
          </div>

        </div>
        {/* PCのみ：セクションボックス外・pcボックス内 */}
        <div className="cp-date cp-date--pc">
          <p className="cp-date-right">制定日：2026年4月10日｜NEXT BRINO</p>
        </div>
      </div>
      </div>

      <div className="cp-banners">
        <FadeIn delay={0} direction="up" className="cp-banner-fadein">
        <Link href="/privacy-policy/" className="cp-banner-link">
          <Image src="/images/privacy-policy-banner.jpg" alt="個人情報保護方針" width={1800} height={826} sizes="100vw" className="cp-banner-img" />
        </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="cp-banner-fadein">
        <Link href="/anti-social-forces-policy/" className="cp-banner-link">
          <Image src="/images/antisocial-policy-banner.jpg" alt="反社会的勢力に対する基本方針" width={1800} height={826} sizes="100vw" className="cp-banner-img" />
        </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="cp-banner-fadein">
        <Link href="/" className="cp-banner-link">
          <Image src="/images/home-banner.jpg" alt="HOME" width={1800} height={826} sizes="100vw" className="cp-banner-img" />
        </Link>
        </FadeIn>
      </div>
      <style>{`
        .cp-section-header {
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
          .cp-section-header { padding-top: 90px; padding-bottom: 40px; }
          .cp-section-header .section-title-en { font-size: clamp(33px, 8.8vw, 44px); }
        }
        /* ドット背景ラップ */
        .cp-bg-wrap {
          position: relative;
          background: #ffffff;
          overflow: hidden;
          padding: clamp(40px, 5vw, 80px) 0 clamp(20px, 2vw, 32px);
        }
        .cp-bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(21,38,59,0.18) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .pc { position: relative; z-index: 1; width: 88%; max-width: 1100px; margin: 0 auto; padding: 0;
          background: rgba(21,38,59,0.07);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(21,38,59,0.18);
          border-radius: 8px;
          padding: 48px 56px 36px;
          box-shadow: 0 4px 40px rgba(21,38,59,0.06);
        }

        .cp-intro { font-size: .95rem; line-height: 2; color: #444; margin: 0 0 36px; }
        .cp-notice { border: 1px solid rgba(157,140,86,.4); padding: 24px 28px; margin: 0 0 52px; background: rgba(157,140,86,.04); display: grid; grid-template-areas: "icon title" "icon sub"; grid-template-columns: 64px 1fr; column-gap: 24px; row-gap: 6px; align-items: start; border-radius: 6px; }
        .cp-notice-icon { grid-area: icon; width: 64px; height: 64px; }
        .cp-notice-icon svg { width: 100%; height: 100%; }
        .cp-notice-text { grid-area: title; font-size: 1rem; font-weight: 700; color: #15263b; margin: 0; }
        .cp-notice-sub { grid-area: sub; font-size: .85rem; color: #666; margin: 0; line-height: 1.8; }
        .cp-sections { display: flex; flex-direction: column; gap: 16px; }
        .cp-section {
          padding: 28px 32px;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(21,38,59,0.13);
          border-radius: 8px;
          box-shadow: 0 2px 16px rgba(21,38,59,0.05);
        }
        .cp-head { display: flex; align-items: center; gap: 20px; margin: 0 0 20px; }
        .cp-num { font-family: var(--font-noto-sans-jp), sans-serif; font-size: clamp(3rem, 5vw, 5rem); font-weight: 900; line-height: 1; flex-shrink: 0; color: transparent; -webkit-text-stroke: 2px rgba(157,140,86,0.5); letter-spacing: .04em; user-select: none; }
        .cp-title { font-size: clamp(.95rem, 1.5vw, 1.1rem); font-weight: 700; color: #15263b; margin: 0; letter-spacing: .04em; }
        .cp-body-wrap { display: flex; flex-direction: column; gap: 12px; }
        .cp-body { font-size: .9rem; line-height: 2; color: #555; margin: 0; }
        .cp-list { font-size: .9rem; line-height: 2; color: #555; margin: 0; padding-left: 1.2em; list-style: disc; display: flex; flex-direction: column; gap: 4px; }
        .cp-list--circle { list-style: none; padding-left: 0; }
        .cp-list--circle li { display: flex; align-items: flex-start; gap: 8px; }
        .cp-list--circle li::before { content: "\\2296"; color: rgba(255,255,255,.5); flex-shrink: 0; margin-top: 2px; }
        .cp-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: .9rem; }
        .cp-table th, .cp-table td { border: 1px solid rgba(21,38,59,.15); padding: 12px 16px; text-align: left; vertical-align: top; line-height: 1.8; }
        .cp-table th { width: 200px; font-weight: 600; color: #9d8c56; background: rgba(21,38,59,.04); white-space: nowrap; }
        .cp-table td { color: #555; }
        .cp-link { color: #9d8c56; text-decoration: underline; }
        .cp-date { margin: 48px 0 0; font-size: .85rem; color: rgba(21,38,59,.5); display: flex; align-items: center; justify-content: flex-end; gap: 24px; }
        .cp-date-right { margin-left: auto; white-space: nowrap; }
        .cp-date--sp { display: none; }
        .cp-date--pc { display: flex; }
        .pc-br { display: inline; }
        .sp-br { display: none; }
        .sp-show { display: none; }
        .sp-hide { display: inline; }
        @media (max-width: 640px) {
          .pc-br { display: none; }
          .sp-br { display: inline; }
          .sp-show { display: inline; }
          .sp-hide { display: none; }
          .cp-bg-wrap { padding: 0 0 12px; }
          .pc {
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
          .cp-intro {
            padding: 20px 24px;
            background: rgba(255,255,255,0.55);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border: 1px solid rgba(21,38,59,0.13);
            border-radius: 8px;
            box-shadow: 0 2px 16px rgba(21,38,59,0.05);
            margin: 0;
          }
          .cp-intro { order: 2; }
          .cp-notice {
            margin: 0;
            background: #f5f1e8;
            order: 1;
            grid-template-areas: "title title" "icon sub";
            grid-template-columns: 40px 1fr;
            column-gap: 12px;
            row-gap: 10px;
          }
          .cp-notice-icon { width: 40px; height: 40px; align-self: center; }
          .cp-notice-text { white-space: nowrap; font-size: .95rem; text-align: center; }
          .cp-notice-sub { align-self: center; }
          .cp-sections { order: 3; }
          .cp-sections { gap: 16px; }
          .cp-date--pc { display: none; }
          .cp-date--sp { display: flex; flex-direction: row; justify-content: flex-end; margin: 24px 0 0; gap: 4px; }
          .cp-date-right { margin-left: 0; }
          .cp-section { padding: 20px 16px; }
          .cp-table, .cp-table tbody, .cp-table tr, .cp-table th, .cp-table td { display: block; width: 100%; box-sizing: border-box; }
          .cp-table tr { border: 1px solid rgba(21,38,59,.15); margin-bottom: 8px; border-radius: 4px; overflow: hidden; }
          .cp-table th { border: none; border-bottom: 1px solid rgba(21,38,59,.1); padding: 8px 12px; white-space: normal; width: auto; font-size: .71875rem; }
          .cp-table td { border: none; padding: 8px 12px; font-size: .78125rem; }
          .cp-intro { font-size: .78125rem; }
          .cp-notice-text { font-size: .84375rem; }
          .cp-notice-sub { font-size: .78125rem; }
          .cp-title { font-size: .9375rem; }
          .cp-body { font-size: .78125rem; }
          .cp-list { font-size: .78125rem; }
          .cp-date { font-size: .71875rem; }
        }

        /* バナーセクション */
        .cp-banner-fadein { flex: 1; overflow: hidden; }
        .cp-banners {
          display: flex;
          flex-direction: row;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .cp-banner-link {
          display: block;
          flex: 1;
          overflow: hidden;
          border-radius: 0;
        }
        .cp-banner-img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
        @media (max-width: 640px) {
          .cp-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .cp-banner-link {
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

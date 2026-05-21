import type { Metadata } from "next";
export const metadata: Metadata = { title: "お問合せ対応基本方針 | NEXT BRINO" };

const sections = [
  { num: "01", title: "電話によるサポートの終了について", body: "当社では、お客様への安全・確実なサービス提供を目的として、書面（フォーム・メール）による対応に一本化いたしました。2025年より電話でのご対応を終了しております。これは、カスタマーハラスメントの増加、記録の欠如、なりすまし被害のリスク、技術的な説明における誤解の防止、担当者の精神的負担軽減などを総合的に判断した結果です。" },
  { num: "02", title: "お問合せの受付について", body: "受付方法：お問合せフォーム・メール\n受付時間：24時間\n対応時間：平日10:00〜17:00（土日祝を除く）\nご返答の目安：2〜5営業日程度（内容によって異なります）" },
  { num: "03", title: "当社からご連絡する場合", body: "お問合せ内容の確認のため、担当者よりメールまたはお電話でご連絡をさせていただく場合がございます。正確な連絡先情報のご記入をお願いいたします。" },
  { num: "04", title: "ご返答できない場合について", body: "以下に該当するお問合せには、ご返答できない場合がございます。\n・営業・セールスに関するお問合せ\n・誹謗中傷・差別的な内容を含むもの\n・同一内容の重複送信\n・当社事業と無関係な内容\n・個人情報の無断収集・一括取得を目的とするもの" },
  { num: "05", title: "個人情報の取扱いについて", body: "お問合せいただいた際にご提供いただいた個人情報は、お問合せへの対応のみに利用いたします。詳細は個人情報保護方針をご確認ください。" },
  { num: "06", title: "方針の変更について", body: "本方針は、社会情勢の変化やサービス内容の変更等に応じて、予告なく変更する場合がございます。" },
];

export default function ContactPolicyPage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">CONTACT POLICY</h1>
        <div className="ph-line" />
        <p className="ph-ja">お問合せ対応基本方針</p>
      </div></div>
      <div className="pc">
        <p className="cp-intro">当社サービスに関するお問合せをご検討のお客様へ、対応方針についてご案内いたします。お手続き前にご一読いただけますと幸いです。</p>
        <div className="cp-notice">
          <p className="cp-notice-text">電話によるお問合せは終了しております。</p>
          <p className="cp-notice-sub">お問合せはフォーム・メールにて24時間受付中</p>
        </div>
        <div className="cp-sections">
          {sections.map(({ num, title, body }) => (
            <div key={num} className="cp-section">
              <div className="cp-head"><span className="cp-num">{num}</span><h2 className="cp-title">{title}</h2></div>
              <p className="cp-body">{body}</p>
            </div>
          ))}
        </div>
        <p className="cp-date">制定日：2026年4月10日　最終改定：2026年4月10日</p>
      </div>
      <style>{`
        
        .ph { background: #15263b; padding: 120px 0 64px; }
        .ph-inner { width: 88%; max-width: 1100px; margin: 0 auto; }
        .ph-label {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: 11px; letter-spacing: .28em; color: #9d8c56;
          text-transform: uppercase; margin: 0 0 12px;
        }
        .ph-en {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: clamp(52px,8vw,110px); font-weight: 800;
          letter-spacing: .08em; line-height: 1;
          color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.35);
          margin: 0 0 20px;
        }
        .ph-line { width: 100%; height: 1px; background: rgba(255,255,255,.1); margin: 0 0 20px; }
        .ph-ja {
          font-size: clamp(18px,2.5vw,26px); font-weight: 300;
          letter-spacing: .1em; color: rgba(255,255,255,.72); margin: 0;
        }
        .pc { width: 88%; max-width: 900px; margin: 0 auto; padding: 72px 0 100px; }

        .cp-intro { font-size: .95rem; line-height: 2; color: #444; margin: 0 0 36px; }
        .cp-notice { border: 1px solid rgba(157,140,86,.4); padding: 24px 28px; margin: 0 0 52px; background: rgba(157,140,86,.04); }
        .cp-notice-text { font-size: 1rem; font-weight: 700; color: #15263b; margin: 0 0 6px; }
        .cp-notice-sub { font-size: .85rem; color: #666; margin: 0; }
        .cp-sections { display: flex; flex-direction: column; }
        .cp-section { border-top: 1px solid rgba(21,38,59,.1); padding: 32px 0; }
        .cp-head { display: flex; align-items: baseline; gap: 18px; margin: 0 0 14px; }
        .cp-num { font-family: var(--font-barlow-condensed), sans-serif; font-size: 2rem; font-weight: 700; color: rgba(157,140,86,.5); line-height: 1; flex-shrink: 0; }
        .cp-title { font-size: 1rem; font-weight: 700; color: #15263b; margin: 0; letter-spacing: .04em; }
        .cp-body { font-size: .9rem; line-height: 2; color: #555; margin: 0; white-space: pre-line; padding-left: 50px; }
        .cp-date { margin: 48px 0 0; font-size: .85rem; color: rgba(21,38,59,.5); }
      `}</style>
    </main>
  );
}

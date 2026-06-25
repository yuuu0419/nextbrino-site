import type { Metadata } from "next";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import PageHero from "../components/PageHero";
import Ticker from "../components/Ticker";
import SplitTitle from "../components/SplitTitle";
import FadeIn from "../components/FadeIn";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "個人情報保護方針｜NEXT BRINO",
  description: "NEXT BRINOの個人情報保護方針をご確認いただけます。お客様の個人情報を適切に管理・保護いたします。",
  openGraph: {
    title: "個人情報保護方針｜NEXT BRINO",
    description: "NEXT BRINOの個人情報保護方針をご確認いただけます。お客様の個人情報を適切に管理・保護いたします。",
    url: "https://nextbrino.com/privacy-policy",
    siteName: "NEXT BRINO",
    images: [{ url: "https://nextbrino.com/images/privacy-policy-ogp.jpg", width: 1200, height: 630, alt: "個人情報保護方針｜NEXT BRINO" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "個人情報保護方針｜NEXT BRINO",
    description: "NEXT BRINOの個人情報保護方針をご確認いただけます。お客様の個人情報を適切に管理・保護いたします。",
    images: ["https://nextbrino.com/images/privacy-policy-ogp.jpg"],
  },
};

const articles = [
  { title: "第1条（個人情報）", body: "「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって、\n当該情報に含まれる氏名，生年月日，住所，連絡先その他の記述等により特定の個人を識別できる情報及び 容貌、指紋，\n声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。" },
  { title: "第2条（個人情報の収集方法）", body: "当社は，ユーザー登録やお問合せの際に氏名，生年月日，住所，電話番号，メールアドレスなどの個人情報をお尋ねすることがあります。\nまた、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む情報を，\n当社の提携先（情報提供元，広告主，広告配信先などを含みます。）などから収集することがあります。" },
  { title: "第3条（収集・利用する目的）", body: "情報を収集・利用する目的は、以下のとおりです。\n・当社サービスの提供、運営のため\n・お問合せに回答するため（本人確認を含む）\n・サービスに関する案内メールを送付するため\n・重要なお知らせなど必要に応じたご連絡のため\n・利用規約違反や不当な目的の利用を断るため\n・ご自身の登録情報閲覧や変更等を行って頂くため\n・有料サービスにおいて、利用料金を請求するため\n・上記の利用目的に付随する目的" },
  { title: "第4条（利用目的の変更）", body: "当社は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。\n利用目的の変更を行った場合には、変更後の目的について、本ウェブサイト上に公表するものとします。" },
  { title: "第5条（個人情報第三者提供）", body: "当社は、以下の場合を除いて同意を得る事なく、第三者に個人情報を提供することはございません。\n（※個人情報保護法等で認められる場合を除く）\n・生命や身体、財産の保護のために必要があって、本人の同意を得る事が困難なとき\n公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難なとき\n国や地方公共団体等が法令の定める事務を遂行するに対し、協力する必要がある場合であり、\n本人の同意を得ることにより当該事務の遂行に支障を及ぼす恐れがあるとき\n予め次の1~5の事項を告知あるいは公表し、かつ当社が個人情報保護委員会に届出をしたとき\n1.利用目的に第三者への提供を含むこと\n2.第三者に提供されるデータ項目\n3.第三者への提供の手段または方法\n4.本人の求めに応じ情報の第三者への提供を停止する事\n5.本人の求めを受け付ける方法\n前項の定めにかかわらず、以下の場合には、当該情報の提供先は第三者に該当しないものとします。\n当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合\n合併その他の事由による事業の承継に伴って個人情報が提供される場合\n情報を特定の者との間で共同利用する場合であって、その旨並びに共同して利用される個人情報の項目，\n共同して利用する者の範囲， 利用する者の利用目的及び当該情報の管理における責任者の氏名または名称について、\n予め本人に通知し，または本人が容易に知り得る状態に置いた場合" },
  { title: "第6条（個人情報の開示）", body: "当社は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。\nただし，開示する事により以下に該当する場合は，その全部または一部を開示しないこともあり、\n開示しない決定の場合には，その旨を遅滞なく通知します。\n情報の開示には、1件あたり1,000円の手数料を頂戴します。\n本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合\n業務の適正な実施に支障を及ぼすおそれがある場合\nその他法令に違反することとなる場合\n前項の定めに関わらず、履歴情報および特性情報などの個人情報以外の情報は、原則として開示いたしません。" },
  { title: "第7条（情報の訂正及び削除）", body: "ユーザーは，保有する情報が誤った情報である場合には，当社が定める手続きにより，\n当社に対して訂正，追加または削除を請求することができます。\n当社は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，\n遅滞なく，当該個人情報の訂正等を行うものとします。\n当社は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，\nこれをユーザーに通知します。" },
  { title: "第8条（情報の利用停止等）", body: "当社は，本人から、個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正手段により得られたものであるという理由で、その利用の停止または消去（以下，「利用停止等」）を求められた場合には，遅滞なく必要な調査を行います。\n前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。\n当社は、前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，\n遅滞なく、これをユーザーに通知します。\n前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、\nユーザーの権利利益保護の為に必要な措置をとれる場合は，この代替策を講じるものとします。" },
  { title: "第9条（本ポリシーの変更）", body: "本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて、\nユーザーに通知することなく，変更することができるものとします。\n当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。" },
  { title: "第10条（お問合せ窓口）", body: "本ポリシーの問合わせは下記窓口までお願い致します。\n事業者名：NEXT BRINO｜ネクストブライノ\n運営責任者名：黒木雄太\nメールアドレス：support@nextbrino.com" },
];

const articlesSP = [
  { title: "第1条（個人情報）", body: "「個人情報」とは、個人情報保護法にいう「個人情報」\nを指すものとし，生存する個人に関する情報であって、\n当該情報に含まれる氏名，生年月日，住所，連絡先\nその他の記述等により特定の個人を識別できる情報及び \n容貌、指紋， 声紋にかかるデータ、\n及び健康保険証の保険者番号などの当該情報単体から\n特定の個人を識別できる情報（個人識別情報）を指します。" },
  { title: "第2条（個人情報の収集方法）", body: "当社は，ユーザー登録やお問合せの際に\n氏名，生年月日，住所，電話番号，メールアドレスなどの\n個人情報をお尋ねすることがあります。\n また、ユーザーと提携先などとの間でなされた\nユーザーの個人情報を含む情報を，\n 当社の提携先（情報提供元，広告主，などを含みます。）\nなどから収集することがあります。" },
  { title: "第3条（収集・利用する目的）", body: "情報を収集・利用する目的は、以下のとおりです。 \n・当社サービスの提供、運営のため \n・お問合せに回答するため（本人確認を含む） \n・サービスに関する案内メールを送付するため \n・重要なお知らせなど必要に応じたご連絡のため \n・利用規約違反や不当な目的の利用を断るため\n ・ご自身の登録情報閲覧や変更等を行って頂くため\n ・有料サービスにおいて、利用料金を請求するため\n ・上記の利用目的に付随する目的" },
  { title: "第4条（利用目的の変更）", body: "当社は，利用目的が変更前と関連性を有すると\n合理的に認められる場合に限り、\n個人情報の利用目的を変更するものとします。\n 利用目的の変更を行った場合には、変更後の目的について、\n本ウェブサイト上に公表するものとします。" },
  { title: "第5条（個人情報第三者提供）", body: "当社は、以下の場合を除いて同意を得る事なく、\n第三者に個人情報を提供することはございません。\n （※個人情報保護法等で認められる場合を除く）\n 生命や身体、財産の保護のために必要があって、\n本人の同意を得る事が困難なとき\n 公衆衛生の向上または児童の健全な育成の推進のために\n特に必要がある場合であって、\n本人の同意を得ることが困難なとき\n 国や地方公共団体等が法令の定める事務を遂行するに対し、\n協力する必要がある場合であり、 本人の同意を得ることにより\n当該事務の遂行に支障を及ぼす恐れがあるとき\n 予め次の1~5の事項を告知あるいは公表し、\nかつ当社が個人情報保護委員会に届出をしたとき\n 1.利用目的に第三者への提供を含むこと\n 2.第三者に提供されるデータ項目\n 3.第三者への提供の手段または方法\n 4.本人の求めに応じ情報の第三者への提供を停止する事\n 5.本人の求めを受け付ける方法\n 前項の定めにかかわらず、以下の場合には、\n当該情報の提供先は第三者に該当しないものとします。\n 当社が利用目的の達成に必要な範囲内において\n個人情報の取扱いの全部または一部を委託する場合\n 合併等による事業承継に伴い、個人情報が提供される場合\n 情報を特定の者との間で共同利用する場合であって、\nその旨並びに共同して利用される個人情報の項目，\n 共同して利用する者の範囲， 利用する者の利用目的\n及び当該情報の管理における責任者の氏名等について、\n 予め通知し，または本人が容易に知り得る状態に置いた場合" },
  { title: "第6条（個人情報の開示）", body: "当社は，本人から個人情報の開示を求められたときは，\n本人に対し，遅滞なくこれを開示します。 \nただし，開示する事により以下に該当する場合は，\nその全部または一部を開示しないこともあり、\n 開示しない決定の場合には，その旨を遅滞なく通知します。\n 情報の開示には、1件あたり1,000円の手数料を頂戴します。\n 本人または第三者の生命，身体，財産その他の権利利益を\n害するおそれがある場合\n 業務の適正な実施に支障を及ぼすおそれがある場合\n その他法令に違反することとなる場合\n 前項の定めに関わらず、履歴情報および特性情報などの\n個人情報以外の情報は、原則として開示いたしません。" },
  { title: "第7条（情報の訂正及び削除）", body: "ユーザーは，保有する情報が誤った情報である場合には，\n当社が定める手続きにより， 当社に対して訂正，\n追加または削除を請求することができます。\n 当社は、ユーザーから前項の請求を受けてその請求に\n応じる必要があると判断した場合には， \n遅滞なく，当該個人情報の訂正等を行うものとします。 \n当社は，前項の規定に基づき訂正等を行った場合，\nまたは訂正等を行わない旨の決定をしたときは遅滞なく， \nこれをユーザーに通知します。" },
  { title: "第8条（情報の利用停止等）", body: "目的の範囲を超えて取り扱われているという理由，\nまたは不正手段により得られたものであるという理由で、\nその利用の停止または消去（以下，「利用停止等」）\nを求められた場合には，遅滞なく必要な調査を行います。\n 調査結果に基づき，請求に応じる必要がある場合には，\n遅滞なく，当該個人情報の利用停止等を行います。\n 当社は、前項の規定に基づき利用停止等を行った場合，\nまたは利用停止等を行わない旨の決定をしたときは，\n 遅滞なく、これをユーザーに通知します。 \n前2項にかかわらず，利用停止等に多額の費用を有する場合\nその他利用停止等を行うことが困難な場合であって、 \nユーザーの権利利益保護の為に必要な措置をとれる場合は，\nこの代替策を講じるものとします。" },
  { title: "第9条（本ポリシーの変更）", body: "本ポリシーは，法令その他等に定めのある事項を除いて、\n 通知することなく，変更することができるものとします。\n 変更後のプライバシーポリシーは、本ウェブサイトに\n掲載したときから効力を生じるものとします。" },
  { title: "第10条（お問合せ窓口）", body: "本ポリシーの問合わせは下記窓口までお願い致します。\n 事業者名：NEXT BRINO｜ネクストブライノ\n 運営責任者名 ：黒木雄太 \nメールアドレス：support@nextbrino.com" },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <PageHero image="/images/privacy-policy-hero.webp" en="PRIVACY POLICY" ja="個人情報保護方針" />

      <Ticker text="PRIVACY POLICY NEXT BRINO" overlapBottom={200} />

      <div className="pp-section-header">
        <p className="section-label">個人情報保護方針</p>
        <SplitTitle text="PRIVACY POLICY" className="section-title-en" tag="h1" />
        <div className="section-divider" />
      </div>

      {/* PC */}
      <div className="pc">
        <p className="pp-intro">NEXT BRINO（以下「当社」）は，提供するサービス（以下「本サービス」）における，ユーザーの個人情報の取扱いについて<br />以下のとおりプライバシーポリシー（以下「本ポリシー」という。）を定めます。</p>
        <div className="pp-articles">
          {articles.map(({ title, body }) => (
            <div key={title} className="pp-article">
              <h2 className="pp-article-title">{title}</h2>
              <p className="pp-article-body">{body}</p>
            </div>
          ))}
        </div>
        <p className="pp-date">制定日：2026年4月10日</p>
      </div>

      {/* SP */}
      <div className="sp">
        <p className="pp-intro">NEXT BRINO（以下「当社」）は，<br />提供するサービス（以下「本サービス」）における，<br />ユーザーの個人情報の取扱いについて<br />以下のとおりプライバシーポリシーを定めます。</p>
        <div className="pp-articles">
          {articlesSP.map(({ title, body }) => (
            <div key={title} className="pp-article">
              <h2 className="pp-article-title">{title}</h2>
              <p className="pp-article-body">{body}</p>
            </div>
          ))}
        </div>
        <p className="pp-date">制定日：2026年4月10日</p>
      </div>

      {/* バナーセクション */}
      <div className="pp-banners">
        <FadeIn delay={0} direction="up" className="pp-banner-fadein">
          <Link href="/contact-policy/" className="pp-banner-link">
            <Image src="/images/contact-policy-banner.webp" alt="お問合せ対応基本方針" width={1800} height={826} sizes="100vw" className="pp-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={150} direction="up" className="pp-banner-fadein">
          <Link href="/anti-social-forces-policy/" className="pp-banner-link">
            <Image src="/images/antisocial-policy-banner.webp" alt="反社会的勢力に対する基本方針" width={1800} height={826} sizes="100vw" className="pp-banner-img" />
          </Link>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="pp-banner-fadein">
          <Link href="/" className="pp-banner-link">
            <Image src="/images/home-banner.webp" alt="HOME" width={1800} height={826} sizes="100vw" className="pp-banner-img" />
          </Link>
        </FadeIn>
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
        .pp-section-header {
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
        .pc { width: 88%; max-width: 900px; margin: 0 auto; padding: 72px 0 24px; }
        .sp { display: none; }

        .pp-intro { font-size: .95rem; line-height: 2; color: #444; margin: 0 0 52px; }
        .pp-articles { display: flex; flex-direction: column; gap: 36px; }
        .pp-article { border-top: 1px solid rgba(21,38,59,.1); padding-top: 28px; }
        .pp-article-title { font-size: 1rem; font-weight: 700; color: #15263b; margin: 0 0 12px; letter-spacing: .04em; }
        .pp-article-body { font-size: .9rem; line-height: 2; color: #555; margin: 0; white-space: pre-line; }
        .pp-date { margin: 20px 0 0; font-size: .85rem; color: rgba(21,38,59,.5); letter-spacing: .06em; }

        /* バナーセクション */
        .pp-banner-fadein { flex: 1; overflow: hidden; }
        .pp-banners {
          display: flex;
          flex-direction: row;
          gap: 0;
          margin-top: 16px;
          margin-bottom: 96px;
          overflow: hidden;
        }
        .pp-banner-link {
          display: block;
          flex: 1;
          overflow: hidden;
          border-radius: 0;
        }
        .pp-banner-img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }

        @media (max-width: 640px) {
          .ph2-en { font-size: clamp(34px, 9.5vw, 52px); }
          .pp-section-header { padding-top: 90px; padding-bottom: 16px; }
          .pp-section-header .section-title-en { font-size: clamp(32px, 9vw, 44px); }
          .pc { display: none; }
          .sp { display: block; width: 88%; margin: 0 auto; padding: 20px 0 16px; }
          .pp-intro { font-size: .78125rem; }
          .pp-article-title { font-size: .84375rem; }
          .pp-article-body { font-size: .78125rem; }
          .pp-date { font-size: .71875rem; margin-top: 14px; }
          .pp-banners {
            flex-direction: column;
            gap: 12px;
            padding: 0 28px;
            margin-top: 16px;
            margin-bottom: 80px;
            overflow: visible;
          }
          .pp-banner-link {
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

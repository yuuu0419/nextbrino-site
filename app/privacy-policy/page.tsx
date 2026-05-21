import type { Metadata } from "next";
export const metadata: Metadata = { title: "個人情報保護方針 | NEXT BRINO" };

const articles = [
  { title: "第1条（個人情報）", body: "「個人情報」とは、個人情報保護法にいう「個人情報」を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報、及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。" },
  { title: "第2条（個人情報の収集方法）", body: "当社はユーザーが利用登録をする際、お問い合わせをする際などに氏名、生年月日、住所、電話番号、メールアドレス等の個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を当社の提携先（情報提供元、広告主、広告配信先などを含みます。以下「提携先」といいます。）などから収集することがあります。" },
  { title: "第3条（個人情報を収集・利用する目的）", body: "当社が個人情報を収集・利用する目的は以下のとおりです。\n①当社サービスの提供・運営のため\n②ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）\n③ユーザーが利用中のサービスに関するメール配信\n④メンテナンス、重要なお知らせなど必要に応じたご連絡のため\n⑤利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため\n⑥ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため\n⑦有料サービスにおいて、ユーザーに利用料金を請求するため\n⑧上記の利用目的に付随する目的" },
  { title: "第4条（利用目的の変更）", body: "当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。利用目的の変更を行った場合には、変更後の目的について当社所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。" },
  { title: "第5条（個人情報の第三者提供）", body: "当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。\n①人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき\n②公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき\n③国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき\n④予め次の事項を告知あるいは公表し、かつ当社が個人情報保護委員会に届出をしたとき" },
  { title: "第6条（個人情報の開示）", body: "当社は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。なお、個人情報の開示に際しては、1件あたり1,000円の手数料を申し受けます。\n①本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合\n②当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合\n③その他法令に違反することとなる場合" },
  { title: "第7条（個人情報の訂正および削除）", body: "ユーザーは、当社の保有する自己の個人情報が誤った情報である場合には、当社が定める手続きにより、当社に対して個人情報の訂正、追加または削除（以下「訂正等」といいます。）を請求することができます。当社は、ユーザーから前項の請求を受け、その請求に応じる必要があると判断した場合には、遅滞なく当該個人情報の訂正等を行うものとします。" },
  { title: "第8条（個人情報の利用停止等）", body: "当社は、本人から、個人情報が利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行います。その結果、請求に応じる必要があると判断した場合には、遅滞なく当該個人情報の利用停止等を行います。" },
  { title: "第9条（プライバシーポリシーの変更）", body: "本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく変更することができるものとします。当社が別途定める場合を除いて、変更後のプライバシーポリシーは本ウェブサイトに掲載したときから効力を生じるものとします。" },
  { title: "第10条（お問い合わせ窓口）", body: "本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。\n\n社名：NEXT BRINO\n担当者名：黒木 雄太\nメールアドレス：support@nextbrino.com" },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">PRIVACY POLICY</h1>
        <div className="ph-line" />
        <p className="ph-ja">個人情報保護方針</p>
      </div></div>
      <div className="pc">
        <p className="pp-intro">NEXT BRINOは、当社のサービスにおけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。</p>
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

        .pp-intro { font-size: .95rem; line-height: 2; color: #444; margin: 0 0 52px; }
        .pp-articles { display: flex; flex-direction: column; gap: 36px; }
        .pp-article { border-top: 1px solid rgba(21,38,59,.1); padding-top: 28px; }
        .pp-article-title { font-size: 1rem; font-weight: 700; color: #15263b; margin: 0 0 12px; letter-spacing: .04em; }
        .pp-article-body { font-size: .9rem; line-height: 2; color: #555; margin: 0; white-space: pre-line; }
        .pp-date { margin: 52px 0 0; font-size: .85rem; color: rgba(21,38,59,.5); letter-spacing: .06em; }
      `}</style>
    </main>
  );
}

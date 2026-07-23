export type QuestionType = "text" | "textarea" | "radio" | "checkbox" | "date";

export type Question = {
  no: number;
  q: string;
  type: QuestionType;
  placeholder?: string;
  options?: string[];
};

export type Section = {
  title: string;
  questions: Question[];
};

export const SECTIONS: Section[] = [
  {
    title: "1. 基本情報",
    questions: [
      { no: 1, q: "会社名・屋号を教えてください。", type: "text", placeholder: "例）〇〇株式会社／屋号：カフェ〇〇" },
      { no: 2, q: "ご担当者のお名前・連絡先を教えてください。", type: "text", placeholder: "例）山田太郎、090-1234-5678" },
      { no: 3, q: "所在地・電話番号・営業時間・定休日・対応エリアを教えてください。", type: "textarea", placeholder: "例）東京都渋谷区〇〇1-2-3／9:00〜18:00／土日休" },
      { no: 4, q: "主な事業内容を教えてください。", type: "textarea", placeholder: "例）注文住宅の設計・施工" },
      { no: 5, q: "今回作るサイトの名称を教えてください。", type: "text", placeholder: "例）〇〇株式会社 公式サイト" },
    ],
  },
  {
    title: "2. サイト制作の背景・目的",
    questions: [
      { no: 6, q: "新規制作・リニューアルのどちらですか？またその理由は？", type: "textarea", placeholder: "例）リニューアル／デザインが古くなったため" },
      { no: 7, q: "今のサイトや現状で困っていることはありますか？", type: "textarea", placeholder: "例）スマホで見づらい、問い合わせが少ない" },
      { no: 8, q: "このサイトで一番実現したいことは何ですか？", type: "textarea", placeholder: "例）見積もり依頼を増やしたい" },
      { no: 9, q: "サイトを見た人に、最終的にどんな行動をしてほしいですか？", type: "textarea", placeholder: "例）お問い合わせフォームから相談してほしい" },
      { no: 10, q: "公開後、目指す成果があれば教えてください。", type: "textarea", placeholder: "例）月5件の見積もり依頼" },
    ],
  },
  {
    title: "3. ターゲット",
    questions: [
      { no: 11, q: "どんな方に見てもらいたいですか？", type: "textarea", placeholder: "例）30〜50代でマイホーム購入を検討している方" },
      { no: 12, q: "その方の年齢層・属性を教えてください。", type: "textarea", placeholder: "例）30代夫婦、共働き" },
      { no: 13, q: "その方が抱えている悩みや、サイトを訪れる目的は何だと思いますか？", type: "textarea", placeholder: "例）どこに頼めばよいか分からない、費用相場を知りたい" },
    ],
  },
  {
    title: "4. 商品・サービス",
    questions: [
      { no: 14, q: "主な商品・サービスを教えてください。", type: "textarea", placeholder: "例）注文住宅の設計・施工" },
      { no: 15, q: "特に紹介したい商品・サービスはありますか？", type: "textarea", placeholder: "例）自然素材を使った健康住宅シリーズ" },
      { no: 16, q: "料金はサイトに掲載しますか？", type: "radio", options: ["具体的な金額を掲載", "目安価格のみ掲載", "要見積もりと表示", "掲載しない", "相談したい"] },
      { no: 17, q: "お問い合わせから提供までの流れを教えてください。", type: "textarea", placeholder: "例）問い合わせ→現地調査→見積もり→契約→着工" },
      { no: 18, q: "対応できない条件があれば教えてください。", type: "textarea", placeholder: "例）施工エリア外は対応不可" },
    ],
  },
  {
    title: "5. 自社の強み",
    questions: [
      { no: 19, q: "お客様に選ばれている理由・他社との違いは何ですか？", type: "textarea", placeholder: "例）地域密着で対応が早い、自社職人による施工" },
      { no: 20, q: "アピールできる実績・資格・受賞歴はありますか？", type: "textarea", placeholder: "例）一級建築士在籍、施工実績500件以上" },
    ],
  },
  {
    title: "6. デザインの印象",
    questions: [
      { no: 21, q: "サイトにどんな印象を持たせたいですか？（複数選択可）", type: "checkbox", options: ["信頼感", "親しみやすさ", "高級感", "清潔感", "シンプル", "スタイリッシュ", "専門性", "活気", "その他"] },
      { no: 22, q: "サイトを見た人にどう感じてほしいですか？", type: "textarea", placeholder: "例）「安心して任せられそう」" },
      { no: 23, q: "使いたい色・避けたい色はありますか？", type: "text", placeholder: "例）ブラウン系を使いたい、原色は避けたい" },
      { no: 24, q: "参考にしたいサイト（URL）があれば教えてください。", type: "text", placeholder: "例）https://example.com／シンプルなレイアウトが良い" },
      { no: 25, q: "避けたいデザインはありますか？", type: "textarea", placeholder: "例）文字が小さくて読みにくいサイトは避けたい" },
      { no: 26, q: "ロゴデータはお持ちですか？", type: "radio", options: ["ある（データあり）", "ない", "新しく作りたい", "相談したい"] },
    ],
  },
  {
    title: "7. 必要なページ",
    questions: [
      { no: 27, q: "掲載したいページを教えてください。（複数選択可）", type: "checkbox", options: ["トップ", "会社案内", "サービス紹介", "料金", "実績・事例", "お客様の声", "よくある質問", "お知らせ", "採用情報", "アクセス", "お問い合わせ", "その他"] },
      { no: 28, q: "特に目立たせたいページはありますか？", type: "text", placeholder: "例）施工事例ページ" },
      { no: 29, q: "掲載したくない情報はありますか？", type: "textarea", placeholder: "例）代表の個人的な経歴は不要" },
    ],
  },
  {
    title: "8. 掲載内容の詳細",
    questions: [
      { no: 30, q: "会社概要に載せたい情報を教えてください。", type: "textarea", placeholder: "例）設立年、代表者名、資本金" },
      { no: 31, q: "代表あいさつ・スタッフ紹介は掲載しますか？", type: "textarea", placeholder: "例）代表あいさつは掲載、スタッフは写真付きで3名" },
      { no: 32, q: "実績・お客様の声は掲載できますか？", type: "textarea", placeholder: "例）過去10件の事例を写真付きで掲載可能" },
      { no: 33, q: "お客様からよく聞かれる質問を教えてください。", type: "textarea", placeholder: "例）「工期はどのくらいですか」" },
    ],
  },
  {
    title: "9. 写真・文章・資料",
    questions: [
      { no: 34, q: "使える写真はありますか？（複数選択可）", type: "checkbox", options: ["外観", "店内・社内", "商品", "作業風景", "施工事例", "代表者", "スタッフ", "お客様", "使用できる写真はない"] },
      { no: 35, q: "新しく写真撮影は必要ですか？", type: "radio", options: ["希望する", "希望しない", "相談したい"] },
      { no: 36, q: "使える資料はありますか？（複数選択可）", type: "checkbox", options: ["会社案内", "パンフレット", "チラシ", "カタログ", "料金表", "既存サイト", "SNS投稿", "その他"] },
      { no: 37, q: "文章はどなたが準備しますか？", type: "radio", options: ["自社で準備する", "制作会社に依頼したい", "相談しながら決めたい"] },
      { no: 38, q: "使ってほしくない表現や写真はありますか？", type: "textarea", placeholder: "例）過度に安さを強調する表現は避けたい" },
      { no: 39, q: "掲載する写真・文章は使用許可が取れていますか？", type: "radio", options: ["はい（許可済み）", "いいえ", "確認中"] },
    ],
  },
  {
    title: "10. 必要な機能",
    questions: [
      { no: 40, q: "お問い合わせ方法は何を希望しますか？（複数選択可）", type: "checkbox", options: ["フォーム", "電話", "メール", "LINE", "予約システム", "SNS", "その他"] },
      { no: 41, q: "お問い合わせフォームに必要な入力項目は？（複数選択可）", type: "checkbox", options: ["お名前", "会社名", "電話番号", "メールアドレス", "希望内容", "希望日時", "ファイル添付", "その他"] },
      { no: 42, q: "通知先メールアドレス、自動返信の要否を教えてください。", type: "textarea", placeholder: "例）info@example.co.jp、自動返信あり" },
      { no: 43, q: "その他必要な機能はありますか？（複数選択可）", type: "checkbox", options: ["予約機能", "ネット販売", "会員機能", "地図表示", "SNS表示", "動画掲載", "多言語対応", "その他"] },
      { no: 44, q: "現在使っている外部サービスはありますか？", type: "textarea", placeholder: "例）Instagram、LINE公式アカウント、予約システム" },
    ],
  },
  {
    title: "11. 今のサイト・システムについて",
    questions: [
      { no: 45, q: "今公開しているサイトはありますか？URLを教えてください。", type: "text", placeholder: "例）https://example-old.com" },
      { no: 46, q: "今のサイトの作成方法が分かれば教えてください。", type: "text", placeholder: "例）WordPressで作られていると思う／分からない" },
      { no: 47, q: "今のサイトから残したいもの・改善したいことを教えてください。", type: "textarea", placeholder: "例）施工事例ページはそのまま使いたい、スマホ表示を直したい" },
      { no: 48, q: "今のサイトはいつ頃停止する予定ですか？", type: "text", placeholder: "例）新サイト公開と同時" },
      { no: 49, q: "ドメインは今お持ちですか？そのまま使いますか、新しく取得しますか？", type: "textarea", placeholder: "例）example-house.com を継続利用したい" },
      { no: 50, q: "サーバーは今どなたが契約していますか？そのまま使いますか、変更しますか？", type: "textarea", placeholder: "例）前の制作会社が契約、変更を検討中" },
      { no: 51, q: "独自ドメインのメールアドレスは使っていますか？継続しますか？", type: "textarea", placeholder: "例）info@example-house.com を継続利用" },
      { no: 52, q: "現在サイトを管理している会社や担当者はいますか？今後の契約はどうしますか？", type: "textarea", placeholder: "例）〇〇制作、サイト公開と同時に契約終了予定" },
      { no: 53, q: "サイトデータ・写真や文章の元データは受け取れますか？", type: "textarea", placeholder: "例）写真の元データは自社で保管している" },
      { no: 54, q: "Google・SNS関連アカウントの利用状況と管理者を教えてください。", type: "textarea", placeholder: "例）Googleビジネスプロフィールは自社管理" },
    ],
  },
  {
    title: "12. 集客・検索対策",
    questions: [
      { no: 55, q: "お客様にはどんな方法でサイトを見つけてほしいですか？（複数選択可）", type: "checkbox", options: ["検索（Google/Yahoo!）", "Googleマップ", "SNS", "Web広告", "チラシ", "紹介・口コミ", "その他"] },
      { no: 56, q: "検索されたい言葉はありますか？", type: "text", placeholder: "例）「渋谷区 注文住宅」" },
      { no: 57, q: "対応エリアを教えてください。", type: "text", placeholder: "例）東京都・神奈川県" },
      { no: 58, q: "Web広告は実施していますか、今後の予定はありますか？", type: "textarea", placeholder: "例）未実施だが公開後に検討したい" },
      { no: 59, q: "SNSの更新はどなたが行いますか？", type: "text", placeholder: "例）自社スタッフが更新予定" },
    ],
  },
  {
    title: "13. 公開後の更新・運用",
    questions: [
      { no: 60, q: "公開後、自社で更新したい内容はありますか？（複数選択可）", type: "checkbox", options: ["お知らせ", "ブログ", "商品・サービス", "料金", "実績・事例", "お客様の声", "特に更新しない"] },
      { no: 61, q: "どのくらいの頻度で更新する予定ですか？", type: "radio", options: ["毎週", "月に数回", "月1回程度", "必要なときだけ", "更新予定はない"] },
      { no: 62, q: "更新担当者は決まっていますか？", type: "text", placeholder: "例）広報担当の鈴木" },
      { no: 63, q: "操作説明はどんな形式が良いですか？", type: "radio", options: ["マニュアルがほしい", "オンラインで説明", "対面で説明", "不要"] },
      { no: 64, q: "公開後の保守はどこまで依頼したいですか？", type: "textarea", placeholder: "例）不具合対応のみお願いしたい" },
      { no: 65, q: "アクセス状況の確認・レポートは必要ですか？", type: "radio", options: ["自社で確認したい", "定期レポートがほしい", "特に必要ない", "相談したい"] },
    ],
  },
  {
    title: "14. スケジュール",
    questions: [
      { no: 66, q: "サイトの公開希望日はありますか？", type: "date", placeholder: "例）2026年10月1日" },
      { no: 67, q: "公開日に関係する予定はありますか？", type: "textarea", placeholder: "例）秋のキャンペーン開始に合わせたい" },
      { no: 68, q: "原稿・写真・ロゴなどはいつ頃準備できそうですか？", type: "textarea", placeholder: "例）写真は9月上旬までに準備可能" },
      { no: 69, q: "内容の確認・最終決定はどなたが行いますか？", type: "text", placeholder: "例）確認は鈴木、最終決定は代表の山田" },
      { no: 70, q: "打ち合わせや連絡はどの方法が良いですか？（複数選択可）", type: "checkbox", options: ["対面", "オンライン", "電話", "メール", "LINE", "チャットツール"] },
    ],
  },
  {
    title: "15. その他",
    questions: [
      { no: 71, q: "サイト制作で最も大切にしたいことは何ですか？", type: "textarea", placeholder: "例）お客様に信頼してもらえるデザインにしたい" },
      { no: 72, q: "制作にあたって不安に感じていることはありますか？", type: "textarea", placeholder: "例）予算内に収まるか不安" },
      { no: 73, q: "制作会社に提案してほしいことはありますか？", type: "textarea", placeholder: "例）同業他社の成功事例があれば教えてほしい" },
      { no: 74, q: "参考にしたい資料やURLがあれば教えてください。", type: "textarea", placeholder: "例）競合の〇〇工務店のサイト" },
      { no: 75, q: "その他、伝えておきたいことがあればご記入ください。", type: "textarea", placeholder: "例）担当者が変わる可能性があります" },
    ],
  },
];

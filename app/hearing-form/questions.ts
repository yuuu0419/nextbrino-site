export type QuestionOption = {
  label: string;
  // このオプションが選択/チェックされたときだけ表示される自由記述欄
  subPlaceholder?: string;
};

export type QuestionType = "text" | "radio" | "checkbox" | "two-text" | "business-hours";

export type Question = {
  label: string;
  required: boolean;
  type: QuestionType;
  placeholder?: string;
  options?: QuestionOption[];
  subLabels?: [string, string];
  subPlaceholders?: [string, string];
};

export type Section = {
  title: string;
  questions: Question[];
};

export const SECTIONS: Section[] = [
  {
    title: "基本情報",
    questions: [
      { label: "会社名・屋号名", required: true, type: "text", placeholder: "例）株式会社〇〇 / カフェ〇〇" },
      { label: "担当者名", required: true, type: "text", placeholder: "例）山田太郎" },
      { label: "連絡先", required: true, type: "text", placeholder: "例）080-1234-5678" },
      { label: "所在地", required: false, type: "text", placeholder: "例）東京都渋谷区〇〇1-2-3" },
      { label: "営業時間・定休日", required: false, type: "business-hours" },
      { label: "事業内容", required: true, type: "text", placeholder: "例）〇〇事業、〇〇事業（全て記入）" },
      { label: "今回制作するサイトの名称", required: false, type: "text", placeholder: "例）〇〇株式会社　公式サイト" },
    ],
  },
  {
    title: "サイト制作の背景・目的",
    questions: [
      { label: "新規作成・リニューアル", required: true, type: "radio", options: [{ label: "新規作成" }, { label: "リニューアル" }] },
      { label: "制作の理由", required: true, type: "text", placeholder: "例）デザインが古くなっていた、新規事業で必要になった" },
      { label: "現在のサイトで困っていること", required: false, type: "text", placeholder: "例）スマホページが見づらい" },
      { label: "一番実現したいこと・目標", required: true, type: "text", placeholder: "例）問い合わせ数を増やしたい" },
    ],
  },
  {
    title: "ターゲット",
    questions: [
      { label: "どんな人に見てもらいたいか", required: true, type: "text", placeholder: "例）マイホーム購入を検討している方" },
      { label: "ターゲット年齢層・属性", required: true, type: "text", placeholder: "例）30代夫婦、共働き" },
      { label: "その方が抱えている悩みや、サイトを訪れる目的", required: true, type: "text", placeholder: "例）どこに頼めば良いかわからない、費用を知りたい" },
    ],
  },
  {
    title: "商品・サービス",
    questions: [
      { label: "主な商品やサービス", required: true, type: "text", placeholder: "例）注文住宅の設計・施工" },
      { label: "特に紹介したい商品・サービス", required: false, type: "text", placeholder: "例）自然素材を使った住宅シリーズ" },
      {
        label: "料金はサイトに掲載するか",
        required: true,
        type: "radio",
        options: [{ label: "具体的な金額を掲載" }, { label: "目安価格のみ掲載" }, { label: "要見積もり" }, { label: "掲載しない" }],
      },
      { label: "お問合せ・注文から提供までの流れ（掲載する場合）", required: false, type: "text", placeholder: "例）問い合わせ→現地調査→見積もり→契約→着工" },
      { label: "対応できない条件・エリア", required: false, type: "text", placeholder: "例）関東エリアのみ対応" },
    ],
  },
  {
    title: "自社の強み",
    questions: [
      { label: "お客様に選ばれている理由・他社との違い", required: true, type: "text", placeholder: "例）地域密着で対応が早い" },
      { label: "実績・資格・受賞歴など（掲載する場合）", required: false, type: "text", placeholder: "例）一級建築士在籍、施工実績500件以上" },
    ],
  },
  {
    title: "サイトデザイン",
    questions: [
      {
        label: "どんな印象を持たせたいか（複数選択可）",
        required: true,
        type: "checkbox",
        options: [
          { label: "信頼感" }, { label: "親しみやすさ" }, { label: "高級感" }, { label: "清潔感" },
          { label: "シンプル" }, { label: "スタイリッシュ" }, { label: "専門性" },
          { label: "その他", subPlaceholder: "その他の内容があればご記入ください" },
        ],
      },
      {
        label: "サイトカラー",
        required: true,
        type: "radio",
        options: [
          { label: "ブルー系" }, { label: "ネイビー系" }, { label: "グリーン系" }, { label: "レッド系" },
          { label: "オレンジ系" }, { label: "イエロー系" }, { label: "ピンク系" }, { label: "パープル系" },
          { label: "ブラウン系" }, { label: "ベージュ・アイボリー系" }, { label: "グレー系" },
          { label: "ブラック・モノトーン系" }, { label: "ゴールド・シルバー系" }, { label: "カラフル・多色" },
          { label: "特に希望なし・おまかせ" },
        ],
      },
      { label: "避けたいカラー", required: false, type: "text", placeholder: "例）原色は避けたい" },
      { label: "サイトを見た人にどう感じて欲しいか", required: false, type: "text", placeholder: "例）安心して任せられる" },
      { label: "参考にしたいサイト(URL)", required: false, type: "text", placeholder: "例）https://example.com" },
      {
        label: "ロゴデータ",
        required: true,
        type: "radio",
        options: [{ label: "あり" }, { label: "なし" }, { label: "新しく作りたい(追加費用)" }],
      },
      {
        label: "必要ページ・掲載内容",
        required: true,
        type: "checkbox",
        options: [
          { label: "トップ", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "会社概要", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "サービス紹介", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "理念・行動指針", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "代表挨拶", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "スタッフ紹介", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "料金ページ", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "メニューページ", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "実績・実例", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "お客様の声", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "よくある質問", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "お知らせ", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "採用情報", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "アクセス", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "お問い合わせ", subPlaceholder: "掲載する内容をご記入ください" },
          { label: "その他", subPlaceholder: "他に希望ページがあればご記入ください" },
        ],
      },
    ],
  },
  {
    title: "画像・文章・資料",
    questions: [
      {
        label: "使いたい画像(複数選択可)",
        required: true,
        type: "checkbox",
        options: [
          { label: "外観" }, { label: "店内・社内" }, { label: "商品" }, { label: "実績・実例" },
          { label: "代表者" }, { label: "スタッフ" }, { label: "お客様" }, { label: "使用できる画像がない" },
          { label: "その他", subPlaceholder: "他に使いたい画像がある場合はご記入ください" },
        ],
      },
      {
        label: "新たに写真撮影は必要か",
        required: true,
        type: "radio",
        options: [{ label: "希望する（別途料金がかかります）" }, { label: "希望しない" }, { label: "相談したい" }],
      },
      {
        label: "使える資料(複数選択可)",
        required: true,
        type: "checkbox",
        options: [
          { label: "会社案内" }, { label: "パンフレット" }, { label: "チラシ" }, { label: "カタログ" },
          { label: "メニュー" }, { label: "料金表" }, { label: "既存サイト" }, { label: "SNS投稿" },
          { label: "その他", subPlaceholder: "他に使える資料がある場合はご記入ください" },
        ],
      },
      {
        label: "文章について",
        required: true,
        type: "radio",
        options: [{ label: "自分で用意する" }, { label: "依頼する（プランによっては別途料金がかかります）" }],
      },
      {
        label: "使用する写真や文章の許可",
        required: true,
        type: "radio",
        options: [{ label: "許可取得済み" }, { label: "許可未取得（使用できません）" }, { label: "確認・進行中" }],
      },
    ],
  },
  {
    title: "必要な機能",
    questions: [
      {
        label: "お問合せ方法の希望(複数選択可)",
        required: true,
        type: "checkbox",
        options: [
          { label: "問い合わせフォーム" }, { label: "電話" }, { label: "メール" }, { label: "LINE" },
          { label: "予約システム" }, { label: "SNS" },
          { label: "その他", subPlaceholder: "他にご希望の問い合わせ方法がある場合はご記入ください" },
        ],
      },
      {
        label: "問い合わせフォーム内容（複数選択可）",
        required: true,
        type: "checkbox",
        options: [
          { label: "問い合わせカテゴリー" }, { label: "会社名・屋号" }, { label: "担当者名" }, { label: "部署名" },
          { label: "電話番号" }, { label: "メールアドレス" }, { label: "住所" }, { label: "サイトURL" }, { label: "予算" }, { label: "問い合わせ内容" },
          { label: "その他", subPlaceholder: "他に必要な内容がある場合はご記入ください" },
        ],
      },
      {
        label: "問い合わせが来た際に内容を受信するメールアドレス",
        required: true,
        type: "radio",
        options: [
          { label: "今回新しく取得するアドレス" },
          { label: "希望のアドレス", subPlaceholder: "例）info@example.com" },
        ],
      },
      {
        label: "その他必要な機能",
        required: false,
        type: "checkbox",
        options: [
          { label: "予約機能（追加料金）" }, { label: "ネット販売（追加料金）" }, { label: "地図表示" },
          { label: "SNS表示" }, { label: "動画掲載" }, { label: "多言語対応（追加料金）" },
          { label: "その他", subPlaceholder: "他に必要な機能があればご記入ください" },
        ],
      },
      { label: "現在使用している外部サービス", required: false, type: "text", placeholder: "例）Instagram、LINE公式アカウント、予約システム" },
    ],
  },
  {
    title: "現在のサイト・システムについて",
    questions: [
      { label: "現在公開しているサイト", required: false, type: "text", placeholder: "例）https://example-old.com" },
      { label: "現在のサイトの作成方法・制作会社", required: false, type: "text", placeholder: "例）WordPressで作成、自分で or 〇〇株式会社に依頼" },
      { label: "残したいもの・改善したいこと", required: false, type: "text", placeholder: "例）施工実例ページはそのまま、スマホ表示を直したい" },
      { label: "現在のサイトの停止予定", required: false, type: "text", placeholder: "例）新サイト公開と同時に停止" },
      {
        label: "ドメインについて",
        required: false,
        type: "radio",
        options: [
          { label: "現在のものをそのまま使う", subPlaceholder: "例）example.com" },
          { label: "新しく取得する" },
        ],
      },
      {
        label: "サーバー契約",
        required: false,
        type: "radio",
        options: [
          { label: "現在のものをそのまま使う", subPlaceholder: "例）〇〇サーバー契約、前の制作会社が契約している" },
          { label: "新しく契約する" },
        ],
      },
      {
        label: "独自ドメインのメールアドレス",
        required: false,
        type: "checkbox",
        options: [
          { label: "現在のものを継続利用", subPlaceholder: "例）info@example.com" },
          { label: "新しく取得する", subPlaceholder: "例）info@example.com（複数可）" },
        ],
      },
      {
        label: "現在のサイト管理者",
        required: false,
        type: "two-text",
        subLabels: ["制作会社", "担当者"],
        subPlaceholders: ["制作会社名（分かる範囲で）", "担当者名（分かる範囲で）"],
      },
      {
        label: "サイトデータ・画像等の元データ",
        required: false,
        type: "radio",
        options: [{ label: "受け取れる" }, { label: "受け取れない" }],
      },
    ],
  },
  {
    title: "集客・検索対策",
    questions: [
      {
        label: "お客様にどんな方法でサイトを見つけて欲しいか（複数選択可）",
        required: true,
        type: "checkbox",
        options: [
          { label: "検索（Googleなど）" }, { label: "Googleマップ" }, { label: "SNS" }, { label: "Web広告" },
          { label: "チラシ" }, { label: "紹介・口コミ" },
          { label: "その他", subPlaceholder: "その他希望がある場合はご記入ください" },
        ],
      },
      { label: "検索されたい言葉", required: false, type: "text", placeholder: "例）渋谷区 注文住宅、渋谷区 カフェ" },
    ],
  },
  {
    title: "スケジュール",
    questions: [
      { label: "サイト公開希望日", required: false, type: "text", placeholder: "例）2026年10月1日" },
      { label: "公開日に関係する予定", required: false, type: "text", placeholder: "例）秋のキャンペーン開始に合わせて公開したい" },
      { label: "原稿・画像・ロゴの準備", required: false, type: "text", placeholder: "例）○月までに準備可能" },
      { label: "進捗の確認・最終決定担当者", required: true, type: "text", placeholder: "例）確認は鈴木、最終決定は代表の山田" },
      {
        label: "打ち合わせや連絡の手段",
        required: true,
        type: "radio",
        options: [
          { label: "対面（対応エリア：東京・神奈川）" }, { label: "LINE（最もスムーズです）" },
          { label: "電話" }, { label: "メール" },
        ],
      },
    ],
  },
  {
    title: "その他",
    questions: [
      { label: "制作にあたって不安なこと", required: false, type: "text", placeholder: "例）予算内に収まるか不安" },
      { label: "その他、伝えておきたいこと", required: false, type: "text", placeholder: "例）担当者が変わる可能性がある" },
    ],
  },
];

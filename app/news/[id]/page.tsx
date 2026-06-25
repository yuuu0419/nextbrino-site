"use client";

import { useEffect, useState } from "react";
import ScrollLineIndicator from "../../components/ScrollLineIndicator";
import { useParams } from "next/navigation";
import Link from "next/link";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
}

function renderBlock(block: any, i: number): React.ReactNode {
  const getText = (richText: any[]) =>
    richText?.map((t: any, j: number) => {
      let text: React.ReactNode = t.plain_text;
      if (t.annotations?.bold) text = <strong key={j}>{text}</strong>;
      if (t.annotations?.italic) text = <em key={j}>{text}</em>;
      if (t.annotations?.underline) text = <u key={j}>{text}</u>;
      if (t.annotations?.strikethrough) text = <s key={j}>{text}</s>;
      if (t.href) text = <a key={j} href={t.href} target="_blank" rel="noopener noreferrer" className="nd-link">{text}</a>;
      return <span key={j}>{text}</span>;
    }) ?? null;

  switch (block.type) {
    case "paragraph":
      return <p key={i} className="nd-p">{getText(block.paragraph.rich_text)}</p>;
    case "heading_1":
      return <h1 key={i} className="nd-h1">{getText(block.heading_1.rich_text)}</h1>;
    case "heading_2":
      return <h2 key={i} className="nd-h2">{getText(block.heading_2.rich_text)}</h2>;
    case "heading_3":
      return <h3 key={i} className="nd-h3">{getText(block.heading_3.rich_text)}</h3>;
    case "bulleted_list_item":
      return <li key={i} className="nd-li">{getText(block.bulleted_list_item.rich_text)}</li>;
    case "numbered_list_item":
      return <li key={i} className="nd-li nd-li--num">{getText(block.numbered_list_item.rich_text)}</li>;
    case "quote":
      return <blockquote key={i} className="nd-quote">{getText(block.quote.rich_text)}</blockquote>;
    case "divider":
      return <hr key={i} className="nd-hr" />;
    case "image": {
      const url = block.image?.file?.url ?? block.image?.external?.url;
      return url ? <img key={i} src={url} alt="" className="nd-img" /> : null;
    }
    default:
      return null;
  }
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ title: string; date: string; blocks: any[] } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/notion-page/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true));
  }, [id]);

  return (
    <main className="nd-main">
      <div className="nd-back-wrap">
        <Link href="/news" className="nd-back">← お知らせ一覧に戻る</Link>
      </div>

      {error ? (
        <p className="nd-error">記事を取得できませんでした。</p>
      ) : !data ? (
        <p className="nd-loading">L O A D I N G ...</p>
      ) : (
        <article className="nd-article">
          <header className="nd-header">
            <p className="nd-date">{formatDate(data.date)}</p>
            <h1 className="nd-title">{data.title}</h1>
            <div className="nd-divider" />
          </header>
          <div className="nd-body">
            {data.blocks.map((block, i) => renderBlock(block, i))}
          </div>
        </article>
      )}

      <style>{`
        .nd-main {
          width: 88%;
          max-width: 800px;
          margin: 0 auto;
          padding: 120px 0 100px;
          min-height: 60vh;
        }
        .nd-back-wrap { margin-bottom: 48px; }
        .nd-back {
          font-size: .82rem;
          letter-spacing: .1em;
          color: #9d8c56;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity .2s;
        }
        .nd-back:hover { opacity: .7; }

        .nd-loading, .nd-error {
          text-align: center;
          color: #999;
          padding: 80px 0;
          letter-spacing: .18em;
          font-size: .85rem;
        }

        .nd-header { margin-bottom: 48px; }
        .nd-date {
          font-size: .78rem;
          letter-spacing: .12em;
          color: #9d8c56;
          margin: 0 0 16px;
        }
        .nd-title {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 700;
          color: #15263b;
          letter-spacing: .04em;
          line-height: 1.5;
          margin: 0 0 20px;
        }
        .nd-divider {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #9d8c56, rgba(157,140,86,.2));
        }

        .nd-body { color: #444; }
        .nd-p {
          font-size: .95rem;
          line-height: 2;
          margin: 0 0 20px;
          letter-spacing: .04em;
        }
        .nd-h1 { font-size: 1.6rem; font-weight: 700; color: #15263b; margin: 40px 0 16px; letter-spacing: .04em; }
        .nd-h2 { font-size: 1.3rem; font-weight: 700; color: #15263b; margin: 36px 0 14px; letter-spacing: .04em; border-left: 3px solid #9d8c56; padding-left: 12px; }
        .nd-h3 { font-size: 1.1rem; font-weight: 600; color: #15263b; margin: 28px 0 10px; letter-spacing: .04em; }
        .nd-li {
          font-size: .95rem;
          line-height: 1.9;
          margin: 4px 0 4px 20px;
          letter-spacing: .04em;
        }
        .nd-quote {
          border-left: 3px solid rgba(21,38,59,.15);
          padding: 8px 20px;
          margin: 20px 0;
          color: #777;
          font-size: .92rem;
          line-height: 1.9;
        }
        .nd-hr {
          border: none;
          border-top: 1px solid rgba(21,38,59,.08);
          margin: 32px 0;
        }
        .nd-img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 24px 0;
        }
        .nd-link {
          color: #9d8c56;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 768px) {
          .nd-main { padding: 100px 0 60px; }
        }
      `}</style>
      <ScrollLineIndicator />
    </main>
  );
}

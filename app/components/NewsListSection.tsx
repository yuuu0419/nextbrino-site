"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  notionId: string;
  title: { rendered: string };
  link: string;
  date: string;
  thumbnail: string | null;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return (
    d.getFullYear() +
    "." +
    String(d.getMonth() + 1).padStart(2, "0") +
    "." +
    String(d.getDate()).padStart(2, "0")
  );
}

export default function NewsListSection() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: Post[]) => setPosts(data))
      .catch(() => setError(true));
  }, []);

  const count = posts ? String(posts.length).padStart(2, "0") + " TOPICS" : "LOADING";

  return (
    <section className="nb-wrap">
      <div className="nb-dots" />

      <div className="nb-inner">
        {/* TOPICSカウンター */}
        <div className="nb-head">
          <div className="nb-head-meta">
            <span className="nb-head-count">{count}</span>
          </div>
        </div>

        {/* カードグリッド */}
        <div>
          {error ? (
            <p className="nb-empty">お知らせを取得できませんでした。</p>
          ) : posts === null ? (
            <p className="nb-loading">L O A D I N G ...</p>
          ) : posts.length === 0 ? (
            <p className="nb-empty">現在お知らせはありません。</p>
          ) : (
            <ul className="nb-grid">
              {posts.map((post, i) => (
                <li key={post.id} className="nb-card" style={{ animationDelay: `${(i + 1) * 0.08}s` }}>
                  <a href={`/news/${post.notionId}`}>
                    {/* サムネイル */}
                    <div className="nb-card-thumb">
                      {post.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.thumbnail} alt="" />
                      ) : (
                        <div className="nb-card-thumb-placeholder">
                          <span>NO IMAGE</span>
                        </div>
                      )}
                      <div className="nb-card-thumb-overlay" />
                    </div>

                    {/* テキスト */}
                    <div className="nb-card-body">
                      <p className="nb-card-date">{formatDate(post.date)}</p>
                      <p className="nb-card-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <span className="nb-card-arrow">READ MORE →</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style>{`
        .nb-wrap {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          padding: 60px 0 120px;
          background: #15263b;
          color: #fff;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .nb-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(157,140,86,0.14) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        .nb-inner {
          width: 88%;
          max-width: 1200px;
          margin: auto;
          position: relative;
          z-index: 1;
        }

        /* TOPICSカウンター */
        .nb-head { margin-bottom: 40px; }
        .nb-head-meta {
          display: flex;
          align-items: center;
        }
        .nb-head-meta::before {
          content: "";
          display: block;
          width: 36px;
          height: 1px;
          background: #9D8C56;
          margin-right: 14px;
          flex-shrink: 0;
        }
        .nb-head-count {
          font-size: 11px;
          letter-spacing: .18em;
          color: #9D8C56;
          text-transform: uppercase;
        }
        .nb-head-meta::after {
          content: "";
          display: block;
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,.1);
          margin-left: 14px;
        }

        /* カードグリッド */
        .nb-grid {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .nb-card {
          opacity: 0;
          transform: translateY(24px);
          animation: nb-in .6s ease forwards;
        }
        @keyframes nb-in { to { opacity: 1; transform: translateY(0); } }

        .nb-card a {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
          color: #fff;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color .3s ease, background .3s ease, transform .35s cubic-bezier(.22,1,.36,1);
        }
        .nb-card a:hover {
          border-color: rgba(157,140,86,.4);
          background: rgba(255,255,255,.06);
          transform: translateY(-4px);
        }

        /* サムネイル */
        .nb-card-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: rgba(255,255,255,.04);
        }
        .nb-card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s cubic-bezier(.22,1,.36,1);
        }
        .nb-card a:hover .nb-card-thumb img { transform: scale(1.04); }

        .nb-card-thumb-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nb-card-thumb-placeholder span {
          font-size: .6rem;
          letter-spacing: .2em;
          color: rgba(255,255,255,.15);
        }

        .nb-card-thumb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(13,30,51,.6) 100%);
          pointer-events: none;
        }

        /* テキストエリア */
        .nb-card-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px 22px 22px;
          flex: 1;
        }

        .nb-card-date {
          font-size: .68rem;
          letter-spacing: .14em;
          color: #9D8C56;
          margin: 0;
        }

        .nb-card-title {
          font-size: .95rem;
          line-height: 1.7;
          letter-spacing: .04em;
          color: rgba(255,255,255,.85);
          margin: 0;
          flex: 1;
          transition: color .3s ease;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .nb-card a:hover .nb-card-title { color: #fff; }

        .nb-card-arrow {
          display: inline-block;
          font-size: .62rem;
          letter-spacing: .2em;
          color: rgba(157,140,86,.6);
          margin-top: 4px;
          transition: color .3s ease, transform .3s ease;
        }
        .nb-card a:hover .nb-card-arrow {
          color: #9D8C56;
          transform: translateX(4px);
        }

        .nb-loading, .nb-empty {
          text-align: center;
          color: rgba(255,255,255,.22);
          padding: 80px 0;
          font-size: .85rem;
          letter-spacing: .18em;
        }

        /* タブレット */
        @media (max-width: 1024px) {
          .nb-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }

        /* スマホ */
        @media (max-width: 600px) {
          .nb-wrap { padding: 40px 0 100px; }
          .nb-grid { grid-template-columns: 1fr; gap: 0; }

          /* カードを横並びリストに切り替え */
          .nb-card a {
            flex-direction: row;
            align-items: center;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,.07);
            background: transparent;
            gap: 0;
          }
          .nb-card:first-child a { border-top: 1px solid rgba(255,255,255,.07); }
          .nb-card a:hover { transform: none; background: rgba(255,255,255,.04); }

          /* サムネイル：右側に固定サイズ */
          .nb-card-thumb {
            width: 120px;
            min-width: 120px;
            height: unset;
            aspect-ratio: 1200 / 630;
            border-radius: 6px;
            margin: 14px 0 14px 16px;
            flex-shrink: 0;
            order: 2;
          }

          /* テキスト */
          .nb-card-body {
            flex: 1;
            padding: 14px 0;
            gap: 6px;
            min-width: 0;
            order: 1;
          }
          .nb-card-title {
            font-size: .88rem;
            -webkit-line-clamp: 2;
          }
          .nb-card-arrow { margin-top: 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nb-card { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface Post {
  id: number;
  title: { rendered: string };
  link: string;
  date: string;
}

export default function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: Post[]) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll(".nb-news-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <section
      style={{
        width: "100%",
        background: "transparent",
        padding: "60px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
<div style={{ width: "90%", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <p className="section-label">ニュース</p>
          <h2 className="section-title-en">NEWS</h2>
          <div className="section-divider" />
          {!loading && (
            <div style={{ display: "flex", alignItems: "center", marginTop: 14 }}>
              <span style={{ display: "block", width: 36, height: 1, background: "#9d8c56", marginRight: 14, flexShrink: 0 }} />
              <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#9d8c56", textTransform: "uppercase" }}>
                {String(posts.length).padStart(2, "0")} TOPICS
              </span>
              <span style={{ flex: 1, height: 1, background: "rgba(21,38,59,0.1)", marginLeft: 14 }} />
            </div>
          )}
        </div>

        {/* List */}
        {loading ? (
          <p style={{ textAlign: "center", color: "rgba(21,38,59,0.4)", padding: "80px 0", fontSize: "0.85rem", letterSpacing: "0.18em" }}>
            L O A D I N G ...
          </p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "rgba(21,38,59,0.4)", padding: "80px 0", fontSize: "0.85rem", letterSpacing: "0.18em" }}>
            現在お知らせはありません。
          </p>
        ) : (
          <ul className="nb-news-list nb-news-list-light" ref={listRef}>
            {posts.map((post, i) => (
              <li className="nb-news-item" key={post.id}>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <span className="nb-num">{String(posts.length - i).padStart(2, "0")}</span>
                  <span className="nb-content">
                    <span className="nb-date">{formatDate(post.date)}</span>
                    <span className="nb-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </span>
                  <span className="nb-arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* View more */}
        <div style={{ marginTop: 60, display: "flex", justifyContent: "center" }}>
          <a href="https://nextbrino.com/news/" className="btn-view-more">
            VIEW MORE <span style={{ fontSize: "0.9em" }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

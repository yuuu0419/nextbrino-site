"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SplitTitle from "./SplitTitle";

export default function NewsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const mobile = window.innerWidth < 768;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      mobile ? { threshold: 0.75 } : { threshold: 0.55 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        width: "100%",
        background: "transparent",
        position: "relative",
        zIndex: 20,
        padding: isMobile ? "160px 20px 44px" : "140px 40px 88px",
      }}
    >
      {/* Heading */}
      <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto 48px", position: "relative", zIndex: 1 }}>
        <p className="section-label">ニュース</p>
        <SplitTitle text="NEWS" className="section-title-en" />
        <div className="section-divider" />
      </div>

      {/* HUDブラケット付きラッパー */}
      <div ref={boxRef} style={{
        position: "relative", width: "90%", maxWidth: 1100, margin: "0 auto",
        transform: visible ? "scale(1)" : "scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1), opacity 1.1s ease",
      }}>

        {/* HUD四隅ブラケット */}
        <div style={{ position:"absolute", top:-7, left:-7, width:20, height:20, borderTop:"1.5px solid rgba(157,140,86,0.7)", borderLeft:"1.5px solid rgba(157,140,86,0.7)", pointerEvents:"none", zIndex:4 }} />
        <div style={{ position:"absolute", top:-7, right:-7, width:20, height:20, borderTop:"1.5px solid rgba(157,140,86,0.7)", borderRight:"1.5px solid rgba(157,140,86,0.7)", pointerEvents:"none", zIndex:4 }} />
        <div style={{ position:"absolute", bottom:-7, left:-7, width:20, height:20, borderBottom:"1.5px solid rgba(157,140,86,0.7)", borderLeft:"1.5px solid rgba(157,140,86,0.7)", pointerEvents:"none", zIndex:4 }} />
        <div style={{ position:"absolute", bottom:-7, right:-7, width:20, height:20, borderBottom:"1.5px solid rgba(157,140,86,0.7)", borderRight:"1.5px solid rgba(157,140,86,0.7)", pointerEvents:"none", zIndex:4 }} />

        {/* カード本体：上下分割 */}
        <div style={{
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 10px 0 8px rgba(21,38,59,0.12), 0 10px 8px rgba(21,38,59,0.15)",
          border: "1px solid rgba(21,38,59,0.07)",
        }}>

          {/* ══ 上段：ネイビー ══ */}
          <div style={{
            background: "linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%)",
            padding: isMobile ? "32px 28px 28px" : "48px 64px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}>
            {/* ドットグリッド */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(rgba(157,140,86,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              pointerEvents: "none",
            }} />

            {/* 同心円アーク（右中央起点） */}
            {[140, 220, 310, 400].map((size, i) => (
              <div key={i} style={{
                position: "absolute",
                top: "50%",
                right: -size * 0.5,
                transform: "translateY(-50%)",
                width: size,
                height: size,
                borderRadius: "50%",
                border: `1px solid rgba(157,140,86,${(0.16 - i * 0.03).toFixed(2)})`,
                pointerEvents: "none",
              }} />
            ))}

            {/* 右グロー */}
            <div style={{
              position: "absolute", top: 0, right: 0, bottom: 0,
              width: "45%",
              background: "radial-gradient(ellipse at 90% 50%, rgba(157,140,86,0.15) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />

            {/* スキャンライン */}
            <div className="contact-scan-line" />

            {/* 左：ラベル + 見出し */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                display: "flex", alignItems: "center", gap: 8,
                fontSize: ".6rem", letterSpacing: ".28em",
                color: "rgba(157,140,86,0.85)", textTransform: "uppercase",
                margin: "0 0 14px",
                fontFamily: "var(--font-noto-sans-jp),sans-serif",
              }}>
                <span className="contact-blink" />
                Latest News
              </p>
              <h2 style={{
                fontSize: isMobile ? "clamp(28px,8vw,36px)" : "clamp(28px,3vw,44px)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.88)",
                letterSpacing: ".08em",
                lineHeight: 1,
                margin: "0 0 16px",
                fontFamily: "var(--font-noto-sans-jp),sans-serif",
                textShadow: "0 0 40px rgba(157,140,86,0.3)",
              }}>NEWS</h2>
              <div style={{
                width: 44, height: 2,
                background: "linear-gradient(90deg, rgba(157,140,86,1), rgba(157,140,86,0.1))",
              }} />
              {/* URL（SPのみ） */}
              {isMobile && (
                <p style={{
                  fontSize: ".6rem", letterSpacing: ".06em",
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "var(--font-noto-sans-jp),sans-serif",
                  margin: "12px 0 0",
                }}>
                  › nextbrino.com/news
                </p>
              )}
            </div>

            {/* 右：ステータス（PCのみ） */}
            {!isMobile && (
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 7, flexShrink: 0 }}>
                <p style={{
                  fontSize: ".6rem", letterSpacing: ".12em",
                  color: "rgba(157,140,86,0.6)",
                  fontFamily: "var(--font-noto-sans-jp),sans-serif",
                  margin: 0, display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ display:"inline-block", width:4, height:4, borderRadius:"50%", background:"rgba(157,140,86,0.75)", flexShrink:0 }} />
                  ONLINE
                </p>
                <p style={{
                  fontSize: ".6rem", letterSpacing: ".06em",
                  color: "rgba(255,255,255,0.18)",
                  fontFamily: "var(--font-noto-sans-jp),sans-serif",
                  margin: 0,
                }}>
                  › nextbrino.com/news
                </p>
              </div>
            )}
          </div>

          {/* 仕切りライン */}
          <div style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(157,140,86,0.5) 15%, rgba(157,140,86,0.5) 85%, transparent)",
            position: "relative",
            zIndex: 1,
          }} />

          {/* ══ 下段：白 ══ */}
          <div style={{
            background: "#fafafa",
            padding: isMobile ? "28px 28px 36px" : "44px 64px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? 24 : 48,
            position: "relative",
          }}>
            {/* 斜めストライプ（薄） */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "repeating-linear-gradient(120deg, transparent, transparent 28px, rgba(21,38,59,0.015) 28px, rgba(21,38,59,0.015) 29px)",
              pointerEvents: "none",
            }} />

            {/* 背景ロゴ（SPのみ） */}
            {isMobile && (
              <div style={{
                position: "absolute",
                right: "-32%",
                bottom: "-3%",
                width: "101%",
                aspectRatio: "1 / 0.64",
                overflow: "hidden",
                opacity: 0.08,
                pointerEvents: "none",
                filter: "grayscale(1)",
              }}>
                <Image
                  src="/images/contact-box-logo.webp"
                  alt=""
                  fill
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
            )}

            {/* 説明テキスト */}
            <div style={{ position: "relative", flex: 1, textAlign: isMobile ? "center" : "left" }}>
              {!isMobile && (
                <p style={{
                  fontSize: ".58rem", letterSpacing: ".22em",
                  color: "rgba(21,38,59,0.3)", textTransform: "uppercase",
                  fontFamily: "var(--font-noto-sans-jp),sans-serif",
                  margin: "0 0 12px",
                }}>
                  News &amp; Topics
                </p>
              )}
              <p style={{
                fontSize: isMobile ? ".9rem" : "1rem",
                color: "rgba(21,38,59,0.65)",
                letterSpacing: ".04em",
                lineHeight: 2,
                margin: 0,
                fontFamily: "var(--font-noto-sans-jp),sans-serif",
                textAlign: isMobile ? "center" : "left",
              }}>
                {isMobile ? (
                  <>NEXT BRINO からのお知らせや<br />最新情報をご覧いただけます。<br />また、グループに関する情報を<br />掲載する場合もございます。</>
                ) : (
                  <>NEXT BRINO からのお知らせや最新情報をご覧いただけます。<br />また、グループに関する情報を掲載する場合もございます。</>
                )}
              </p>
            </div>

            {/* 縦仕切り（PCのみ） */}
            {!isMobile && (
              <div style={{
                alignSelf: "stretch",
                width: 1,
                background: "linear-gradient(180deg, transparent, rgba(21,38,59,0.08) 20%, rgba(21,38,59,0.08) 80%, transparent)",
                flexShrink: 0,
              }} />
            )}

            {/* CTAボタン */}
            <div style={{ position: "relative", flexShrink: 0, width: isMobile ? "100%" : "auto", display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start" }}>
              <div style={{
                width: "100%", height: 1,
                background: "linear-gradient(90deg, rgba(21,38,59,0.09), transparent 80%)",
                margin: "0 0 16px",
              }} />
              <a
                href="/news/"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "space-between",
                  padding: "17px 24px",
                  minWidth: isMobile ? "80%" : 280,
                  background: hovered
                    ? "linear-gradient(135deg, #7a6a3a 0%, #9d8c56 55%, #b8a06a 100%)"
                    : "linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%)",
                  color: "#fff",
                  fontFamily: "var(--font-noto-sans-jp),sans-serif",
                  fontSize: ".78rem",
                  letterSpacing: ".18em",
                  textDecoration: "none",
                  borderRadius: "6px",
                  transition: "background 0.3s ease",
                  boxSizing: "border-box" as const,
                }}
              >
                <span>ニュースを見る</span>
                <span style={{
                  fontFamily: "'Courier New',monospace",
                  fontSize: "1.1rem",
                  transform: hovered ? "translateX(3px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                  display: "inline-block",
                }}>→</span>
              </a>
              <div style={{
                width: "100%", height: 1,
                background: "linear-gradient(90deg, rgba(21,38,59,0.09), transparent 80%)",
                margin: "16px 0 0",
              }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

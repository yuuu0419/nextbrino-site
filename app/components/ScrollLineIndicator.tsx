"use client";
import { useEffect, useState } from "react";

export default function ScrollLineIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setHidden(maxScroll > 0 && scrolled >= maxScroll - 40);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes scroll-dot-move {
          0%   { bottom: 55px; }
          100% { bottom: 0px; }
        }
        @keyframes scroll-dot-fade {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.9; }
          100% { opacity: 0; }
        }
        .scroll-line-dot-anim {
          animation: scroll-dot-move 2.4s ease-in-out infinite, scroll-dot-fade 2.4s ease-out infinite;
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 28,
          left: "auto",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <span
          style={{
            display: "inline-block",
            color: "#9d8c56",
            fontSize: 11,
            fontFamily: "var(--font-noto-sans-jp), 'Noto Sans JP', sans-serif",
            letterSpacing: "0.22em",
            writingMode: "vertical-lr",
            textTransform: "uppercase",
            paddingBottom: 20,
            lineHeight: 1,
          }}
        >
          scroll
        </span>
        <div
          style={{
            position: "relative",
            width: 1,
            height: 60,
            background: "#9d8c56",
          }}
        >
          <div
            className="scroll-line-dot-anim"
            style={{
              position: "absolute",
              bottom: 55,
              left: -4,
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#9d8c56",
            }}
          />
        </div>
      </div>
    </>
  );
}

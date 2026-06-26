"use client";
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  fallDuration: number;
  swayDuration: number;
  delay: number;
  hue: number;
}

export default function CherryBlossoms() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) { setMounted(true); return; }
    const list: Petal[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 8,
      fallDuration: 15 + Math.random() * 12,
      swayDuration: 4 + Math.random() * 5,
      delay: -(Math.random() * 24),
      hue: Math.random() * 22 - 11,
    }));
    setPetals(list);
    setMounted(true);
  }, []);

  if (!mounted || petals.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9997,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {petals.map((p) => (
        // 外側div: 縦に落ちるアニメーション
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: 0,
            animationName: "petal-fall",
            animationDuration: `${p.fallDuration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {/* 内側div: 左右に揺れ＋回転 */}
          <div
            style={{
              animationName: "petal-sway",
              animationDuration: `${p.swayDuration}s`,
              animationDelay: `${p.delay * 0.7}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          >
            <svg
              width={p.size}
              height={p.size * 1.45}
              viewBox="0 0 20 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id={`rg${p.id}`} cx="42%" cy="28%" r="68%">
                  <stop offset="0%"   stopColor={`hsla(${345 + p.hue},100%,90%,0.62)`} />
                  <stop offset="60%"  stopColor={`hsla(${340 + p.hue},85%,78%,0.40)`} />
                  <stop offset="100%" stopColor={`hsla(${338 + p.hue},70%,68%,0.18)`} />
                </radialGradient>
              </defs>
              {/* 花びら本体（先端が丸く、根元が少しすぼまった形） */}
              <path
                d="M10 0.5 C6.5 2.5, 1 8, 0 14.5 C-0.8 20.5, 3 27, 8.5 28.5 C9 28.7, 9.5 29, 10 29 C10.5 29, 11 28.7, 11.5 28.5 C17 27, 20.8 20.5, 20 14.5 C19 8, 13.5 2.5, 10 0.5 Z"
                fill={`url(#rg${p.id})`}
              />
              {/* 中心の葉脈 */}
              <path
                d="M10 3 C10 11, 10 20, 10 27.5"
                stroke={`hsla(${340 + p.hue},60%,72%,0.22)`}
                strokeWidth="0.7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

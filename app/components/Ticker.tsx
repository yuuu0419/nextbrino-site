"use client";

interface TickerProps {
  text: string;
  overlapBottom?: number;
}

export default function Ticker({ text, overlapBottom = 0 }: TickerProps) {
  const item = text + " ";
  const half = Array(20).fill(item).join("");

  return (
    <div
      className="ticker-wrap"
      style={{
        padding: "0",
        background: "transparent",
        border: "none",
        position: "relative",
        zIndex: 0,
        marginBottom: overlapBottom ? -overlapBottom : 0,
        pointerEvents: "none",
      }}
    >
      <div className="ticker-track">
        <span
          style={{
            fontFamily: "var(--font-noto-sans-jp), sans-serif",
            fontSize: "clamp(160px, 24vw, 380px)",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1,
            whiteSpace: "nowrap",
            display: "block",
            background: "linear-gradient(180deg, rgba(21,38,59,0.22) 0%, rgba(21,38,59,0.08) 60%, rgba(21,38,59,0.0) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {half}{half}
        </span>
      </div>
    </div>
  );
}

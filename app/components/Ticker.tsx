"use client";

interface TickerProps {
  text: string;
}

export default function Ticker({ text }: TickerProps) {
  // text + 半角スペース1個 を20回繰り返してhalfを作り、{half}{half}で-50%アニメーションのシームレスループ
  const item = text + " ";
  const half = Array(20).fill(item).join("");

  return (
    <div
      className="ticker-wrap"
      style={{
        padding: "14px 0",
        background: "rgba(255,255,255,0.04)",
        borderTop: "1px solid rgba(21,38,59,0.03)",
        borderBottom: "1px solid rgba(21,38,59,0.03)",
      }}
    >
      <div className="ticker-track">
        <span
          style={{
            fontFamily: "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
            fontSize: "clamp(80px, 11vw, 160px)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1,
            whiteSpace: "nowrap",
            display: "block",
            background: "linear-gradient(180deg, rgba(21,38,59,0.03) 0%, rgba(21,38,59,0.14) 38%, rgba(21,38,59,0.14) 62%, rgba(21,38,59,0.03) 100%)",
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

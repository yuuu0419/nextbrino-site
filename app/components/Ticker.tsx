"use client";

interface TickerProps {
  text: string;
  overlapBottom?: number;
}

export default function Ticker({ text, overlapBottom = 0 }: TickerProps) {
  const item = text + " ";
  /* トラックの移動量は translateX(-50%) = 親要素(画面幅)基準の半分なので、
     複製は「画面幅 + 移動量 ≒ 画面1.5枚分」を覆えれば見た目は同一。
     1コピーは最小構成でも約2,000px(モバイル160px時)あり、3コピー×2セットで
     5K級の超横長画面まで安全に覆える。10コピーでは描画領域が
     33,000〜49,000pxに達し、モバイルのスクロールがかくつく主因だった。 */
  const half = Array(3).fill(item).join("");

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

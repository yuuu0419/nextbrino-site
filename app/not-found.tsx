import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      padding: "40px 24px",
      fontFamily: "var(--font-noto-sans-jp), sans-serif",
    }}>
      {/* ゴールドライン */}
      <div style={{
        width: 1,
        height: 60,
        background: "linear-gradient(180deg, transparent, #9d8c56)",
        marginBottom: 32,
      }} />

      {/* 404 */}
      <p style={{
        fontFamily: "var(--font-barlow-condensed), sans-serif",
        fontSize: "clamp(80px, 18vw, 140px)",
        fontWeight: 700,
        color: "transparent",
        WebkitTextStroke: "1px rgba(21,38,59,0.15)",
        lineHeight: 1,
        margin: "0 0 8px",
        letterSpacing: "0.06em",
      }}>404</p>

      <p style={{
        fontSize: "0.6rem",
        letterSpacing: "0.3em",
        color: "#9d8c56",
        textTransform: "uppercase",
        margin: "0 0 32px",
      }}>Page Not Found</p>

      <div style={{
        width: 40,
        height: 1,
        background: "linear-gradient(90deg, transparent, #9d8c56, transparent)",
        marginBottom: 32,
      }} />

      <p style={{
        fontSize: "0.88rem",
        color: "rgba(21,38,59,0.55)",
        letterSpacing: "0.06em",
        lineHeight: 2,
        textAlign: "center",
        margin: "0 0 48px",
      }}>
        お探しのページは見つかりませんでした。<br />
        URLが間違っているか、ページが移動・削除された可能性があります。
      </p>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 32px",
          background: "linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%)",
          color: "#fff",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textDecoration: "none",
          borderRadius: 4,
        }}
      >
        HOME へ戻る
        <span style={{ fontFamily: "'Courier New', monospace" }}>→</span>
      </Link>

      {/* 下のゴールドライン */}
      <div style={{
        width: 1,
        height: 60,
        background: "linear-gradient(180deg, #9d8c56, transparent)",
        marginTop: 48,
      }} />
    </main>
  );
}

"use client";

export default function LpFixedCta() {
  const scrollToForm = () => {
    document.getElementById("lp-contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <button type="button" className="lpc-fixed-btn" onClick={scrollToForm}>
        <span className="lpc-fixed-dot" aria-hidden />
        無料相談する
      </button>

      <style>{`
        .lpc-fixed-btn {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 500;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 30px;
          background: #e8720c;
          color: #fff;
          border: none;
          border-radius: 999px;
          font-family: var(--font-main);
          font-size: .9rem;
          font-weight: 700;
          letter-spacing: .06em;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(232,114,12,0.42);
          transition: background .25s, transform .25s;
        }
        .lpc-fixed-btn:hover { background: #cc6109; transform: translateY(-2px); }
        .lpc-fixed-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #fff;
          animation: lpc-blink 2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes lpc-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 640px) {
          .lpc-fixed-btn {
            left: 16px;
            right: 16px;
            bottom: 16px;
            width: calc(100% - 32px);
            justify-content: center;
            padding: 15px 0;
            font-size: .85rem;
          }
        }
      `}</style>
    </>
  );
}

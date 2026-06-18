import type { ReactNode } from "react";

type Props = {
  image: string;
  en: ReactNode;
  ja: string;
  footer?: ReactNode;
};

export default function PageHero({ image, en, ja, footer }: Props) {
  return (
    <>
      <div className="ph2" data-header-dark>
        <div className="ph2-overlay" />
        <div className="ph2-content">
          <p className="ph2-en">{en}</p>
          <p className="ph2-ja">{ja}</p>
        </div>
        {footer && <div className="ph2-footer">{footer}</div>}
      </div>
      <style>{`
        .ph2 {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 560px;
          background: url('${image}') center center / cover no-repeat;
          display: flex;
          align-items: center;
          padding-top: 4vh;
        }
        .ph2-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.52);
        }
        .ph2-content {
          position: relative;
          z-index: 1;
          width: 88%;
          max-width: 1100px;
          margin: 0 auto 0 6%;
        }
        .ph2-en {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: clamp(54px, 7.8vw, 114px);
          font-weight: 600;
          letter-spacing: .08em;
          line-height: 1.1;
          color: #fff;
          margin: 0 0 16px;
        }
        .ph2-ja {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: clamp(17px, 1.7vw, 25px);
          font-weight: 500;
          letter-spacing: .12em;
          color: rgba(255,255,255,.82);
          margin: 24px 0 0;
          line-height: 1.8;
          white-space: pre-line;
        }
        .ph2-footer {
          position: absolute;
          bottom: 48px;
          right: 6%;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }
        @media (max-width: 640px) {
          .ph2 { height: 100vh; min-height: 560px; padding-bottom: 18vh; }
          .ph2-en { font-size: clamp(32px, 11vw, 52px); }
          .ph2-footer { bottom: 32px; right: 5%; }
        }
      `}</style>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface Service {
  num: string;
  en: string;
  ja: string;
  img: string;
  desc: string;
  descSp?: string;
  items: string[];
}

function ServiceRow({ s, i }: { s: Service; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isRtl = i % 2 !== 0;
  const ease = "cubic-bezier(0.22,1,0.36,1)";

  const imgX  = isRtl ? "32px"  : "-32px";
  const bodyX = isRtl ? "-32px" : "32px";

  const slideIn = (translateX: string, delay: number, duration = 0.6) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : `translateX(${translateX})`,
    transition: isMobile
      ? "none"
      : visible
      ? `opacity 0.5s ease ${delay}ms, transform ${duration}s ${ease} ${delay}ms`
      : "none",
  });

  const fadeUp = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(16px)",
    transition: isMobile
      ? "none"
      : visible
      ? `opacity 0.5s ease ${delay}ms, transform 0.55s ${ease} ${delay}ms`
      : "none",
  });

  return (
    <div
      ref={ref}
      className={`sv-row ${isRtl ? "sv-row--rtl" : "sv-row--ltr"}`}
    >
      {/* 画像エリア：ltrは左から、rtlは右からスライドイン */}
      <div className="sv-row-img-wrap" style={slideIn(imgX, 60)}>
        <div className="sv-row-img-clip">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.img}
            alt={s.ja}
            style={{ objectFit: "cover", width: "100%", height: "100%", position: "absolute", inset: 0 }}
          />
          <div className="sv-row-img-overlay" />
        </div>
      </div>

      {/* テキストエリア：ltrは右から、rtlは左からスライドイン */}
      <div className="sv-row-body" style={slideIn(bodyX, 60)}>
        <span className="sv-row-num">{s.num}</span>

        <p className="sv-row-en"   style={fadeUp(80)}>{s.en}</p>
        <h2 className="sv-row-ja" style={fadeUp(110)}>{s.ja}</h2>
        <div className="sv-row-line"  style={fadeUp(140)} />

        {/* PC desc */}
        <p className={`sv-row-desc${s.descSp ? " sv-row-desc--pc" : ""}`} style={fadeUp(170)}>
          {s.desc.split("\n").map((line, j, arr) => (
            <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
          ))}
        </p>

        {/* SP desc */}
        {s.descSp && (
          <p className="sv-row-desc sv-row-desc--sp" style={fadeUp(170)}>
            {s.descSp.split("\n").map((line, j, arr) => (
              <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
            ))}
          </p>
        )}

        <ul className="sv-row-items">
          {s.items.map((item, idx) => (
            <li key={item} style={fadeUp(200 + idx * 40)}>
              <span className="sv-item-num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="sv-item-text">{item}</span>
            </li>
          ))}
        </ul>

        <div className="sv-row-btn-wrap" style={fadeUp(520 + s.items.length * 80)}>
          {s.num === "04" ? (
            <a href="https://n-bright.jp" target="_blank" rel="noopener noreferrer" className="btn-view-more">
              VIEW MORE <span className="btn-arrow" />
            </a>
          ) : (
            <a href="/service" className="btn-view-more sv-btn-full">満枠対応中</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ServiceRows({ services }: { services: Service[] }) {
  return (
    <>
      {services.map((s, i) => (
        <ServiceRow key={s.num} s={s} i={i} />
      ))}
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "HOME",           href: "/" },
  { label: "事業内容",        href: "/service/" },
  { label: "代表挨拶",        href: "/message-kuroki-yuta/" },
  { label: "理念・行動指針",   href: "/philosophy/" },
  { label: "概要・沿革",      href: "/overview/" },
  { label: "お知らせ",        href: "/news/" },
  { label: "採用情報",        href: "/recruit/" },
  { label: "インターンシップ",  href: "/internship/" },
];

const PC_NAV_LINKS = [
  { label: "事業内容",    href: "/service/" },
  { label: "代表挨拶",    href: "/message-kuroki-yuta/" },
  { label: "理念・行動指針", href: "/philosophy/" },
  { label: "お知らせ",    href: "/news/" },
  { label: "お問い合わせ", href: "/contact/" },
];

const POLICY_LINKS = [
  { label: "個人情報保護方針",           href: "/privacy-policy/" },
  { label: "お問合せ対応基本方針",        href: "/contact-policy/" },
  { label: "反社会的勢力に対する基本方針", href: "/anti-social-forces-policy/" },
  { label: "特定商取引法に基づく表記",    href: "/legal-notice/" },
];

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const openMenu = () => { setMenuClosing(false); setMenuOpen(true); };
  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 840);
  };
  const toggleMenu = () => menuOpen ? closeMenu() : openMenu();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    let rafId: number | null = null;
    const checkScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setScrolled(window.scrollY > 40);
        const headerBottom = 80;
        const darkSections = document.querySelectorAll("[data-header-dark]");
        let isDark = false;
        darkSections.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerBottom && rect.bottom > 0) isDark = true;
        });
        setOnDark(isDark);
      });
    };
    checkMobile();
    checkScroll();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", checkScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // メニューを開いたときbodyスクロール禁止
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);


  return (
    <>
      <style>{`
        /* ── PC ナビ ── */
        .hd-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          padding: 6px 18px;
          color: rgba(255,255,255,0.82);
          font-size: 0.85rem;
          letter-spacing: 0.07em;
          font-family: var(--font-main);
          white-space: nowrap;
          transition: color 0.3s;
        }
        .hd-nav-num {
          font-size: 0.58rem;
          letter-spacing: 0.10em;
          color: rgba(255,255,255,0.55);
          font-family: 'Courier New', monospace;
          flex-shrink: 0;
          transition: color 0.3s;
          line-height: 1;
        }
        .hd-nav-line {
          display: inline-block;
          width: 8px;
          height: 1px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.28);
          transition: width 0.22s, background 0.3s;
        }
        .hd-nav-link:hover { color: rgba(255,255,255,1); }
        .hd-nav-link:hover .hd-nav-num { color: rgba(255,255,255,0.85); }
        .hd-nav-link:hover .hd-nav-line { width: 20px; background: rgba(255,255,255,0.55); }
        .hd-sep {
          width: 1px; height: 14px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent);
          flex-shrink: 0;
          transition: background 0.3s;
        }

        /* ── スクロール後 PC ── */
        .hd-scrolled .hd-nav-link { color: rgba(15,38,62,0.78); }
        .hd-scrolled .hd-nav-num  { color: rgba(15,38,62,0.55); }
        .hd-scrolled .hd-nav-line { background: rgba(15,38,62,0.35); height: 1.5px; }
        .hd-scrolled .hd-nav-link:hover { color: rgba(15,38,62,1); }
        .hd-scrolled .hd-nav-link:hover .hd-nav-num { color: rgba(15,38,62,0.85); }
        .hd-scrolled .hd-nav-link:hover .hd-nav-line { width: 20px; background: rgba(15,38,62,0.60); }
        .hd-scrolled .hd-sep { background: linear-gradient(to bottom, transparent, rgba(15,38,62,0.15), transparent); }

        /* ── 紺背景上（スクロール後も白に戻す） ── */
        .hd-on-dark.hd-scrolled .hd-nav-link { color: rgba(255,255,255,0.82); }
        .hd-on-dark.hd-scrolled .hd-nav-num  { color: rgba(255,255,255,0.55); }
        .hd-on-dark.hd-scrolled .hd-nav-line { background: rgba(255,255,255,0.28); height: 1px; }
        .hd-on-dark.hd-scrolled .hd-nav-link:hover { color: rgba(255,255,255,1); }
        .hd-on-dark.hd-scrolled .hd-nav-link:hover .hd-nav-num { color: rgba(255,255,255,0.85); }
        .hd-on-dark.hd-scrolled .hd-nav-link:hover .hd-nav-line { width: 20px; background: rgba(255,255,255,0.55); }
        .hd-on-dark.hd-scrolled .hd-sep { background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent); }
        .hd-on-dark.hd-scrolled .hd-burger-label { color: rgba(255,255,255,0.75); }
        .hd-on-dark.hd-scrolled .hd-burger-bar   { background: rgba(255,255,255,0.80); }

        /* ── MENU テキスト＋ラインボタン ── */
        .hd-burger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 4px;
          position: relative;
          z-index: 1100;
        }
        .hd-burger::before {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.13);
          box-shadow: 0 2px 20px rgba(0,0,0,0.10);
          right: -95px;
          top: -110px;
          transform: none;
          z-index: -1;
          transition: background 0.3s, border-color 0.3s, opacity 0.3s;
        }
        .hd-scrolled .hd-burger::before {
          opacity: 0;
        }
        .hd-burger.open::before {
          opacity: 0;
        }
        .hd-burger-label {
          font-size: 0.77rem;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.75);
          font-family: 'Courier New', monospace;
          line-height: 1;
          transition: color 0.3s, opacity 0.3s;
        }
        .hd-burger-lines {
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: gap 0.3s;
        }
        .hd-burger-bar {
          display: block;
          height: 1px;
          background: rgba(255,255,255,0.80);
          border-radius: 1px;
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1),
                      transform 0.35s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.25s,
                      background 0.3s;
          transform-origin: center;
        }
        .hd-burger-bar:nth-child(1) { width: 37px; }
        .hd-burger-bar:nth-child(2) { width: 24px; align-self: flex-end; }

        /* ホバー */
        .hd-burger:hover .hd-burger-bar:nth-child(1) { width: 37px; }
        .hd-burger:hover .hd-burger-bar:nth-child(2) { width: 37px; }
        .hd-burger:hover .hd-burger-label { color: rgba(196,171,110,0.9); }

        /* スクロール後（ガラス帯）: 金色に */
        .hd-scrolled .hd-burger-label {
          color: rgba(157,120,30,0.90);
        }
        .hd-scrolled .hd-burger-bar {
          background: rgba(157,120,30,0.85);
        }

        /* 開いたとき */
        .hd-burger.open .hd-burger-label {
          color: rgba(196,171,110,0.85);
          opacity: 0;
        }
        .hd-burger.open .hd-burger-bar {
          background: rgba(196,171,110,0.9);
        }
        .hd-burger.open .hd-burger-bar:nth-child(1) {
          width: 28px;
          transform: translateY(5px) rotate(45deg);
        }
        .hd-burger.open .hd-burger-bar:nth-child(2) {
          width: 28px;
          transform: translateY(0px) rotate(-45deg);
        }

        /* ── モーフィングサークル展開 ── */
        @keyframes hd-circle-in {
          from { clip-path: circle(0% at calc(100% - 42px) 30px); }
          to   { clip-path: circle(150% at calc(100% - 42px) 30px); }
        }
        @keyframes hd-circle-out {
          from { clip-path: circle(150% at calc(100% - 42px) 30px); }
          to   { clip-path: circle(0% at calc(100% - 42px) 30px); }
        }
        .hd-overlay {
          position: fixed;
          inset: 0;
          z-index: 1050;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: rgba(15,31,51,0.65);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          clip-path: circle(0% at calc(100% - 42px) 30px);
          pointer-events: none;
          animation: none;
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
          padding: 140px 0 32px;
        }
        .hd-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(255,255,255,0.06) 0%,
            rgba(196,171,110,0.03) 50%,
            rgba(15,31,51,0.08) 100%
          );
          pointer-events: none;
        }
        .hd-overlay.open {
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: auto;
          animation: hd-circle-in 1.0s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .hd-overlay.closing {
          pointer-events: none;
          animation: hd-circle-out 0.85s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        /* ── オーバーレイ内 ナビリンク ── */
        .hd-ol-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          width: 100%;
        }
        .hd-ol-nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 80%;
        }
        .hd-ol-grid-cell {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .hd-ol-item {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.35s, transform 0.35s;
        }
        .hd-overlay.open .hd-ol-item { opacity: 1; transform: translateY(0); }
        .hd-overlay.open .hd-ol-item:nth-child(1)  { transition-delay: 0.08s; }
        .hd-overlay.open .hd-ol-item:nth-child(2)  { transition-delay: 0.12s; }
        .hd-overlay.open .hd-ol-item:nth-child(3)  { transition-delay: 0.16s; }
        .hd-overlay.open .hd-ol-item:nth-child(4)  { transition-delay: 0.20s; }
        .hd-overlay.open .hd-ol-item:nth-child(5)  { transition-delay: 0.24s; }
        .hd-overlay.open .hd-ol-item:nth-child(6)  { transition-delay: 0.28s; }
        .hd-overlay.open .hd-ol-item:nth-child(7)  { transition-delay: 0.32s; }
        .hd-overlay.open .hd-ol-item:nth-child(8)  { transition-delay: 0.36s; }
        .hd-overlay.open .hd-ol-item:nth-child(9)  { transition-delay: 0.40s; }
        .hd-overlay.open .hd-ol-item:nth-child(10) { transition-delay: 0.44s; }
        .hd-overlay.open .hd-ol-item:nth-child(11) { transition-delay: 0.48s; }
        .hd-overlay.open .hd-ol-item:nth-child(12) { transition-delay: 0.52s; }
        .hd-overlay.open .hd-ol-item:nth-child(13) { transition-delay: 0.56s; }

        .hd-ol-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 6px;
          text-decoration: none;
          color: rgba(255,255,255,0.78);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          font-family: var(--font-main);
          transition: color 0.2s;
          white-space: nowrap;
        }
        .hd-ol-link:hover { color: rgba(255,255,255,1); }
        .hd-ol-num {
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          color: rgba(196,171,110,0.75);
          font-family: 'Courier New', monospace;
          line-height: 1;
        }
        .hd-ol-line {
          display: inline-block;
          width: 20px;
          height: 1px;
          background: rgba(196,171,110,0.35);
          transition: width 0.22s, background 0.2s;
        }
        .hd-ol-link:hover .hd-ol-line {
          width: 32px;
          background: rgba(196,171,110,0.70);
        }
        .hd-ol-sep {
          width: 40px;
          height: 1px;
          background: rgba(196,171,110,0.15);
        }
/* セクション見出し */
        .hd-ol-section-title {
          width: 80%;
          font-size: 0.54rem;
          letter-spacing: 0.28em;
          color: rgba(196,171,110,0.55);
          font-family: 'Courier New', monospace;
          margin: 0 0 0;
          padding: 6px 12px;
          border-top: 1px solid rgba(255,255,255,0.10);
          border-bottom: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.07);
        }

        /* ポリシーリンク */
        .hd-ol-link-policy {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.40);
          padding: 10px 6px;
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .hd-ol-link-policy:hover { color: rgba(255,255,255,0.70); }
        /* ポリシーリスト */
        .hd-ol-policy-list {
          width: 80%;
        }
        .hd-ol-policy-item {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.35s, transform 0.35s;
        }
        .hd-overlay.open .hd-ol-policy-item { opacity: 1; transform: translateY(0); }
        .hd-overlay.open .hd-ol-policy-item:nth-child(1) { transition-delay: 0.32s; }
        .hd-overlay.open .hd-ol-policy-item:nth-child(2) { transition-delay: 0.36s; }
        .hd-overlay.open .hd-ol-policy-item:nth-child(3) { transition-delay: 0.40s; }
        .hd-overlay.open .hd-ol-policy-item:nth-child(4) { transition-delay: 0.44s; }

        /* バナー */
        .hd-ol-banner {
          width: 80%;
          margin-top: 12px;
          margin-bottom: 8px;
        }

        /* ── 閉じるボタン ── */
        .hd-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1110;
          width: 72px;
          height: 72px;
        }
        .hd-close-btn::before {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.13);
          box-shadow: 0 2px 20px rgba(0,0,0,0.10);
          right: -75px;
          top: -90px;
          transform: none;
          z-index: -1;
        }
        .hd-close-lines {
          position: relative;
          width: 60px;
          height: 60px;
        }
        /* 真ん中くり抜きライン（rotate 45deg、2本の短い線で構成） */
        .hd-close-gap-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
          gap: 14px;
        }
        .hd-close-gap-seg {
          display: block;
          width: 18px;
          height: 1px;
          background: rgba(255,255,255,0.80);
          border-radius: 1px;
          transition: background 0.25s, width 0.25s;
        }
        /* CLOSEテキストを斜め（-45deg）に */
        .hd-close-text-line {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-45deg);
          font-size: 0.76rem;
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.85);
          font-family: 'Courier New', monospace;
          line-height: 1;
          white-space: nowrap;
          transition: color 0.25s;
        }
        .hd-close-btn:hover .hd-close-gap-seg {
          background: rgba(255,255,255,1);
          width: 20px;
        }
        .hd-close-btn:hover .hd-close-text-line {
          color: rgba(255,255,255,1);
        }

        /* オーバーレイ下部装飾 */
        .hd-ol-footer {
          width: 80%;
          text-align: center;
          opacity: 0;
          transition: opacity 0.4s 0.45s;
          padding: 16px 0 8px;
          border-top: 1px solid rgba(196,171,110,0.10);
          margin-top: 4px;
        }
        .hd-overlay.open .hd-ol-footer { opacity: 1; }
        .hd-ol-footer-cr {
          font-size: 0.58rem;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.22);
          font-family: var(--font-main);
          margin: 0 0 6px;
        }
        .hd-ol-footer-note {
          font-size: 0.50rem;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.12);
          font-family: var(--font-main);
          margin: 0;
        }
      `}</style>

      {/* フルスクリーンオーバーレイ（スマホのみ） */}
      {isMobile && (
        <div className={`hd-overlay${menuOpen && !menuClosing ? " open" : ""}${menuClosing ? " closing" : ""}`}>

          {/* オーバーレイ内ロゴ */}
          <Link
            href="/"
            onClick={() => closeMenu()}
            style={{
              position: "absolute",
              top: "8px",
              left: "5%",
              transform: "translate(2px, 7px)",
              display: "flex",
              flexShrink: 0,
              zIndex: 1120,
            }}
          >
            <Image
              src="/images/header-logo.webp"
              alt="NEXT BRINO"
              width={240}
              height={72}
              style={{ width: 150, height: "auto", filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* 閉じるボタン */}
          <button
            onClick={closeMenu}
            aria-label="メニューを閉じる"
            className="hd-close-btn"
          >
            <span className="hd-close-lines">
              {/* 真ん中をくり抜いたライン（2本の短い線） */}
              <span className="hd-close-gap-wrap">
                <span className="hd-close-gap-seg" />
                <span className="hd-close-gap-seg" />
              </span>
              {/* CLOSE テキストを斜めに */}
              <span className="hd-close-text-line">CLOSE</span>
            </span>
          </button>

<nav className="hd-ol-nav">

            {/* NAVIGATION */}
            <p className="hd-ol-section-title">NAVIGATION</p>
            <div className="hd-ol-nav-grid hd-ol-item">
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} className="hd-ol-grid-cell">
                  <Link href={link.href} className="hd-ol-link" onClick={() => closeMenu()}>
                    <span className="hd-ol-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="hd-ol-line" aria-hidden />
                    <span>{link.label}</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* POLICY */}
            <p className="hd-ol-section-title" style={{ marginTop: "14px" }}>POLICY</p>
            <div className="hd-ol-policy-list">
              {POLICY_LINKS.map((link, i) => (
                <div key={link.href} className="hd-ol-policy-item">
                  <Link href={link.href} className="hd-ol-link-policy" onClick={() => closeMenu()}>
                    <span className="hd-ol-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="hd-ol-line" aria-hidden />
                    <span>{link.label}</span>
                  </Link>
                </div>
              ))}
            </div>

          </nav>

          {/* バナーエリア */}
          <div style={{ width: "80%", display: "flex", flexDirection: "column", gap: 16, marginTop: 16, marginBottom: 20 }}>
            <Link href="/contact/" onClick={() => closeMenu()} style={{ display: "block", borderRadius: 10, overflow: "hidden" }}>
              <Image src="/images/contact.webp" alt="お問い合わせ" width={1500} height={500} style={{ width: "100%", height: "auto", display: "block" }} />
            </Link>
            <a href="https://n-bright.jp" target="_blank" rel="noopener noreferrer" style={{ display: "block", borderRadius: 10, overflow: "hidden" }}>
              <Image src="/images/n-bright.webp" alt="N-BRIGHT" width={1406} height={469} style={{ width: "100%", height: "auto", display: "block" }} />
            </a>
          </div>

          <div className="hd-ol-footer">
            <p className="hd-ol-footer-cr">©︎ 2026 NEXT BRINO｜ネクストブライノ</p>
            <p className="hd-ol-footer-note">当サイトに掲載されている全ての著作物において、無断で使用することを禁じます。</p>
          </div>
        </div>
      )}

      <header
        className={[scrolled ? "hd-scrolled" : "", onDark ? "hd-on-dark" : ""].filter(Boolean).join(" ")}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%",
          zIndex: 1000,
          padding: isMobile ? "8px 5%" : "8px 5%",
          background: scrolled
            ? "rgba(255,255,255,0.03)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px) saturate(150%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px) saturate(150%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 1px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {/* ロゴ */}
        <Link href="/" style={{ display: "flex", flexShrink: 0, transform: isMobile ? "translate(2px, 7px)" : "none" }} onClick={(e) => { closeMenu(); if (window.location.pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0 }); window.location.reload(); } }}>
          <Image
            src="/images/header-logo.webp"
            alt="NEXT BRINO"
            width={240}
            height={72}
            style={{ width: isMobile ? 150 : 220, height: "auto" }}
            priority
          />
        </Link>

        {/* PC ナビゲーション */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center" }}>
            {PC_NAV_LINKS.map((link, i) => (
              <div key={link.href} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <span className="hd-sep" />}
                <Link href={link.href} className="hd-nav-link">
                  <span className="hd-nav-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hd-nav-line" aria-hidden />
                  <span>{link.label}</span>
                </Link>
              </div>
            ))}
          </nav>
        )}

        {/* スマホ ハンバーガーボタン */}
        {isMobile && (
          <button
            className={`hd-burger${menuOpen && !menuClosing ? " open" : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            style={{ transform: "translate(-8px, 3px)" }}
          >
            <span className="hd-burger-label">MENU</span>
            <span className="hd-burger-lines">
              <span className="hd-burger-bar" />
              <span className="hd-burger-bar" />
            </span>
          </button>
        )}
      </header>
    </>
  );
}

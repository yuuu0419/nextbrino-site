"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import NewsSection from "./components/NewsSection";
import Ticker from "./components/Ticker";
import SplitTitle from "./components/SplitTitle";


const SLIDES = [
  { src: "/images/top-hero-01.webp", alt: "NEXT BRINO — IT技術を駆使して日常をデザインする" },
  { src: "/images/top-hero-02.webp", alt: "NEXT BRINO — ITソリューション・Web制作・システム開発" },
  { src: "/images/top-hero-03.webp", alt: "NEXT BRINO — 繊細に想像し、大胆に創造する" },
];

const lerp = (a: number, b: number, t: number) =>
  a + (b - a) * Math.min(Math.max(t, 0), 1);

const ease = (t: number) =>
  1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 1.7);

const lerpColor = (t: number) => {
  const r = Math.round(lerp(255, 21, t));
  const g = Math.round(lerp(255, 38, t));
  const b = Math.round(lerp(255, 59, t));
  return `rgb(${r},${g},${b})`;
};

export default function HomeClient() {
  const [scrollY, setScrollY]                 = useState(0);
  const [slide, setSlide]                     = useState(0);
  const [tick, setTick]                       = useState(0);
  const slideRef                              = useRef(0);
  const [isMobile, setIsMobile]               = useState(false);
  const [vh, setVh]                           = useState(800);
  const [slideshowActive, setSlideshowActive] = useState(true);
  const [atBottom, setAtBottom]               = useState(false);
  const [hoveredService, setHoveredService]   = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState(0);
  const [philoVisible, setPhiloVisible]       = useState(false);
  const philoGridRef                          = useRef<HTMLDivElement>(null);
  const [philoMoreVisible, setPhiloMoreVisible] = useState(false);
  const philoMoreRef                          = useRef<HTMLDivElement>(null);
  const [msgVisible, setMsgVisible]           = useState(false);
  const msgGridRef                            = useRef<HTMLDivElement>(null);
  const [msgTextVisible, setMsgTextVisible]   = useState(false);
  const msgTextRef                            = useRef<HTMLDivElement>(null);
  const [contactVisible, setContactVisible]   = useState(false);
  const contactBoxRef                         = useRef<HTMLDivElement>(null);
  const [svcVisible, setSvcVisible]           = useState(false);
  const svcGridRef                            = useRef<HTMLDivElement>(null);
  const [svcMoreVisible, setSvcMoreVisible]   = useState(false);
  const svcMoreRef                            = useRef<HTMLDivElement>(null);

  const scrollYRef         = useRef(0);
  const isMobileRef        = useRef(false);
  const slideshowActiveRef = useRef(true);
  const fvTextDivRef       = useRef<HTMLDivElement>(null);
  const fvMainPRef         = useRef<HTMLParagraphElement>(null);
  const fvSubPRef          = useRef<HTMLParagraphElement>(null);
  const darkOverlayRef     = useRef<HTMLDivElement>(null);
  const whiteOverlayRef    = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const applyMobileFv = useCallback((y: number) => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
    const viewH  = window.innerHeight;
    const prog   = ease(Math.min(y / (viewH * 1.2), 1));
    const scroll = Math.max(0, y - viewH) / viewH * 100;
    const col    = lerpColor(prog);
    const shadow = lerp(0.55, 0, prog);
    fvTextDivRef.current?.style.setProperty(
      "transform", `translateY(calc(${lerp(45, 65, prog) - scroll}vh - 50%))`
    );
    if (fvMainPRef.current) {
      fvMainPRef.current.style.color      = col;
      fvMainPRef.current.style.textShadow = `0 2px 32px rgba(0,0,0,${shadow})`;
      fvMainPRef.current.style.fontSize   = `${lerp(8, 10, prog)}vw`;
    }
    if (fvSubPRef.current) {
      fvSubPRef.current.style.color      = col;
      fvSubPRef.current.style.textShadow = `0 2px 32px rgba(0,0,0,${shadow})`;
      fvSubPRef.current.style.fontSize   = `${lerp(3.8, 4.5, prog)}vw`;
    }
    // 暗→白オーバーレイ（background の alpha を直接書き換え。opacity ではない点に注意）
    if (darkOverlayRef.current) {
      darkOverlayRef.current.style.background = `rgba(0,0,0,${lerp(0.30, 0, prog)})`;
    }
    if (whiteOverlayRef.current) {
      whiteOverlayRef.current.style.background = `rgba(255,255,255,${lerp(0, 0.92, prog)})`;
    }
    // スクロールインジケーター（最下部で非表示）
    if (scrollIndicatorRef.current) {
      const docH = document.documentElement.scrollHeight;
      scrollIndicatorRef.current.style.opacity = (y + viewH >= docH - 200) ? "0" : "1";
    }
  }, []);

  useLayoutEffect(() => {
    scrollYRef.current = window.scrollY;
    applyMobileFv(scrollYRef.current);
  }, [isMobile, applyMobileFv]);

  useEffect(() => {
    let rafId: number | null = null;

    const applyFrame = () => {
      rafId = null;
      const y = scrollYRef.current;

      if (isMobileRef.current) {
        // モバイル: setScrollY を呼ばず、DOM 直接操作のみ（毎フレームの全体再レンダリングを排除）
        applyMobileFv(y);
        // スライドショー切替は 80px 閾値の通過時だけ state 更新
        if (y > 80 && slideshowActiveRef.current) {
          slideshowActiveRef.current = false;
          setSlideshowActive(false);
        } else if (y <= 80 && !slideshowActiveRef.current) {
          slideshowActiveRef.current = true;
          setSlide(0);
          slideRef.current = 0;
          setTick(0);
          setSlideshowActive(true);
        }
      } else {
        // PC: 従来通り React state で管理
        applyMobileFv(y);
        setScrollY(y);
        const docH = document.documentElement.scrollHeight;
        const winH = window.innerHeight;
        setAtBottom(y + winH >= docH - 200);
      }
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyFrame);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [applyMobileFv]);


  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      isMobileRef.current = mobile;
      setIsMobile(mobile);
      setVh(window.innerHeight);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* スクロール開始時にスライドショー停止 → その時点の画像を背景に固定 */
  /* スクロールトップ復帰時にスライドショー再開 */
  /* ※モバイルは scrollY を更新しないため applyFrame 内で直接制御する */
  useEffect(() => {
    if (isMobileRef.current) return;
    if (scrollY > 80 && slideshowActive) {
      setSlideshowActive(false);
      // slide / slideRef はそのまま維持（スクロール時点の画像を背景に残す）
    } else if (scrollY <= 80 && !slideshowActive) {
      setSlide(0);
      slideRef.current = 0;
      setTick(0);
      setSlideshowActive(true);
    }
  }, [scrollY, slideshowActive]);

  /* スライドショー: slideshowActive のとき 4 秒ごとに切り替え */
  useEffect(() => {
    if (!slideshowActive) return;
    const t = setInterval(() => {
      const next = (slideRef.current + 1) % SLIDES.length;
      slideRef.current = next;
      setSlide(next);
      setTick((t) => t + 1);
    }, 6000);
    return () => clearInterval(t);
  }, [slideshowActive]);

  /* 2枚目・3枚目のスライド画像は初期表示から少し遅らせてマウントし、
     初回表示に必要な帯域幅（LCP用の1枚目画像・フォント・JS）を優先する */
  const [loadedSlides, setLoadedSlides] = useState<number[]>([0]);
  useEffect(() => {
    const t = setTimeout(() => setLoadedSlides([0, 1, 2]), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setPhiloVisible(true);
      setPhiloMoreVisible(true);
      setMsgVisible(true);
      setMsgTextVisible(true);
      setSvcVisible(true);
      setSvcMoreVisible(true);
      setContactVisible(true);
      return;
    }
    const opts = { threshold: 0.05, rootMargin: "0px 0px 40px 0px" };

    const makeObs = (ref: React.RefObject<HTMLDivElement | null>, setter: (v: boolean) => void) => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(true); obs.disconnect(); } },
        opts
      );
      obs.observe(el);
      return () => obs.disconnect();
    };

    const c0 = makeObs(philoGridRef, setPhiloVisible);
    const c0b = makeObs(philoMoreRef, setPhiloMoreVisible);
    const c1 = makeObs(msgGridRef, setMsgVisible);
    const c2 = makeObs(svcGridRef, setSvcVisible);
    const c2b = makeObs(svcMoreRef, setSvcMoreVisible);

    const msgTextEl = msgTextRef.current;
    let c3: (() => void) | undefined;
    if (msgTextEl) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setMsgTextVisible(true); obs.disconnect(); } },
        opts
      );
      obs.observe(msgTextEl);
      c3 = () => obs.disconnect();
    }
    const contactEl = contactBoxRef.current;
    let c4: (() => void) | undefined;
    if (contactEl) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setContactVisible(true); obs.disconnect(); } },
        opts
      );
      obs.observe(contactEl);
      c4 = () => obs.disconnect();
    }

    return () => { c0?.(); c0b?.(); c1?.(); c2?.(); c2b?.(); c3?.(); c4?.(); };
  }, []);

  const animEnd  = vh * 1.2;
  const rawProg  = Math.min(scrollY / animEnd, 1);
  const progress = ease(rawProg);

  /* 暗→白オーバーレイ */
  const darkOverlay  = lerp(0.30, 0, progress);
  const whiteOverlay = lerp(0, 0.92, progress);

  const textColor       = lerpColor(progress);
  const textFontSizeVw  = lerp(4.2, 5.5, progress);
  const textLeft        = lerp(55, 5, progress);

  /*
   * テキスト位置: i-ne.co.jp と同じ動き
   *   右中央(小) → 左下に大きく
   *   下に残るように bottom-anchored
   *   top: 50% → 84% (text bottom edge が画面下から余白を取った位置)
   *   translateY: -50% → -100% (要素の下端を anchor)
   */
  const textTop        = lerp(50, 84, progress);
  const textTranslateY = lerp(-50, -100, progress);
  const textMaxWidth   = lerp(44, 92, progress);

  const textShadow = lerp(0.55, 0, progress);
  const subOpacity = lerp(1, 0, Math.min(progress * 1.8, 1));

  /* PHILOSOPHYに差し掛かったらスクロールと同期して上に流れる（i-ne.co.jp と同じ動き） */
  const fadeStart   = isMobile ? vh * 1.0 : vh * 1.8;       // 「経営理念」が画面下端に見え始める地点
  const extraScroll = Math.max(0, scrollY - fadeStart);
  const scrollUpPct = (extraScroll / vh) * 100;             // 上に流れる量（vh%換算）
  const textTopFinal = textTop - scrollUpPct;               // 上に押し出していく
  const textOpacity  = 1;

  const philoItems = [
    {
      en: "MISSION", ja: "ミッション｜存在意義",
      title: "繊細に想像し、大胆に創造する",
      body: "私たちはIT・テクノロジーを、人々の想いに寄り添い日常をより豊かにする為の技術だと考えています。\n確かな技術と誠実さを土台に、暮らしに自然と溶け込む価値を届け、より良い未来の日常をデザインしていきます。",
    },
    {
      en: "VISION", ja: "ビジョン｜目指す未来",
      title: "人生に輝きと革新的なアイデアを",
      body: "私たちは、テクノロジーと創造力を通じて、人々の日常に新たな価値と感動を生み出していきます。\n一人ひとりが自分らしく輝き、希望を持って未来へ進める社会を目指しています。",
    },
    {
      en: "VALUES", ja: "バリュー｜行動指針",
      title: "理念を追求するための14つの約束",
      body: "人を大切にし、信頼でつながる。\n価値を生み出す創造と技術。\n学び、変化し、進化する。\n責任と持続可能性など、理念を追求するために14つの指針のもと行動します。",
    },
  ];

  const services = [
    { title: "ITソリューション事業", en: "IT SOLUTION",       en1: "IT",          en2: "SOLUTION",    desc: "WEBサイト制作・運用保守\nアプリ開発・システム開発" },
    { title: "WEB広告事業",       en: "WEB ADVERTISING",   en1: "WEB",         en2: "ADVERTISING", desc: "配信・販売コンテンツ運営、各種WEBメディア運営\n広告出稿、広告に関するデザインサポート" },
    { title: "企画販売事業",       en: "PLANNING & SALES",  en1: "PLANNING",    en2: "SALES",       desc: "アパレル・ジュエリー・グッズ等の制作販売\nブランド企画、FC展開、トータルサポート" },
    { title: "IPマネジメント事業",  en: "IP MANAGEMENT",     en1: "IP",          en2: "MANAGEMENT",  desc: "クリエイティブタレントマネジメント\nIP保護インフラの開発・運用保守" },
    { title: "教育学習支援事業",    en: "EDUCATION",         en1: "EDUCATION",   en2: undefined,     desc: "小中学生対象の学習支援\nPREP法による完全双方向で能動的な学習の確立" },
    { title: "健康増進事業",       en: "HEALTH PROMOTION",   en1: "HEALTH",      en2: "PROMOTION",   desc: "各スポーツにおける身体能力向上指導\nボディメイク(ピラティスを含む)、栄養指導" },
  ];
  const svcBarWidths = ["74%", "61%", "82%", "67%", "54%", "72%"];

  return (
    <div style={{ fontFamily: "var(--font-main)", background: "#fff" }}>
      {/* ── 固定 FV 画像 ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {SLIDES.map(({ src, alt }, i) => (
          <div
            key={src}
            className={`fv-slide${i === slide ? (tick % 2 === 0 ? " active-odd" : " active-even") : ""}`}
          >
            {loadedSlides.includes(i) && (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 767px) 100vw, 100vw"
                style={{ objectFit: "cover" }}
                priority={i === 0}
                quality={80}
              />
            )}
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)", zIndex: 2, pointerEvents: "none" }} />
      </div>

      {/* 暗オーバーレイ（モバイルは applyMobileFv が DOM 直接制御するため static 初期値） */}
      <div
        ref={darkOverlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          background: isMobile ? "rgba(0,0,0,0.30)" : `rgba(0,0,0,${darkOverlay})`,
          pointerEvents: "none",
        }}
      />

      {/* 白オーバーレイ（画像を漂白｜モバイルは DOM 直接制御） */}
      <div
        ref={whiteOverlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          background: isMobile ? "rgba(255,255,255,0)" : `rgba(255,255,255,${whiteOverlay})`,
          pointerEvents: "none",
        }}
      />



      {/* ── マウス スクロールインジケーター（画面固定・最下部で非表示） ── */}
      {(
        <div
          ref={scrollIndicatorRef}
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            opacity: atBottom ? 0 : 1,
            transition: "opacity 0.4s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div className="mouse-icon">
            <div className="mouse-wheel" />
          </div>
          <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "#9d8c56", textTransform: "uppercase", fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
            Scroll Down
          </span>
        </div>
      )}

      {/* ── FV テキスト（fixed）── スクロールで逃げずに残り、PHILOSOPHYへ接続 */}
      <div
        ref={fvTextDivRef}
        style={{
          position: "fixed",
          zIndex: 11,
          pointerEvents: "none",
          opacity: textOpacity,
          ...(isMobile
            ? {
                top: "0",
                left: "5%",
                right: "5%",
                willChange: "transform",
              }
            : {
                top: `${textTopFinal}%`,
                left: `${textLeft}%`,
                maxWidth: `${textMaxWidth}vw`,
                transform: `translateY(${textTranslateY}%)`,
              }),
        }}
      >
        <p
          ref={fvMainPRef}
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 700,
            lineHeight: isMobile ? 1.55 : 1.35,
            letterSpacing: "0.01em",
            margin: 0,
            transition: "none",
            ...(!isMobile ? {
              fontSize: `${textFontSizeVw}vw`,
              color: textColor,
              textShadow: `0 2px 32px rgba(0,0,0,${textShadow})`,
            } : {}),
          }}
        >
          We imagine carefully<br />
          and create boldly<br />
          to design everyday life<br />
          through technology
        </p>
        <p
          ref={fvSubPRef}
          style={{
            fontWeight: 700,
            letterSpacing: "0.10em",
            lineHeight: isMobile ? 2.3 : 2.5,
            margin: isMobile ? "2.4em 0 3em" : "2.4em 0 0",
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            ...(!isMobile ? {
              fontSize: `${lerp(1.45, 1.25, progress)}vw`,
              color: textColor,
              textShadow: `0 2px 32px rgba(0,0,0,${textShadow})`,
            } : {}),
          }}
        >
          {isMobile ? (
            <>IT技術を駆使して<br />日常をデザインするために<br />繊細に想像し、大胆に創造する。</>
          ) : (
            <>IT技術を駆使して日常をデザインするために、<br />繊細に想像し、大胆に創造する。</>
          )}
        </p>
      </div>

      {/* ── FV スクロールコンテナー (270vh) ── スクロール長確保のみ */}
      <div style={{ height: isMobile ? "192vh" : "270vh", position: "relative", zIndex: 10 }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", background: "transparent" }} />
      </div>

      {/* ── コンテンツ（全て透過。NEWS も透明） ── */}
      <div style={{ position: "relative", zIndex: 20 }}>

        {/* PHILOSOPHY */}
        <Ticker text="PHILOSOPHY NEXT BRINO" overlapBottom={isMobile ? 280 : 330} />
        <section style={{ padding: isMobile ? "160px 0 50px" : "140px 0 60px", position: "relative", zIndex: 23 }}>
          <div style={{ width: "92%", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 60 }}>
              <p className="section-label">経営理念</p>
              <SplitTitle text="PHILOSOPHY" className="section-title-en" />
              <div className="section-divider" />
            </div>

            <div ref={philoGridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 24, marginBottom: 60, alignItems: "stretch" }}>
              {philoItems.map((item, i) => (
                <div
                  key={item.en}
                  style={{
                    display: "flex",
                    background: "#fff",
                    border: "1px solid rgba(21,38,59,0.09)",
                    borderRadius: "8px",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 10px 0 8px rgba(21,38,59,0.12), 0 10px 8px rgba(21,38,59,0.15)",
                    transform: philoVisible ? "translateX(0)" : "translateX(-60px)",
                    opacity: philoVisible ? 1 : 0,
                    transition: isMobile ? "box-shadow 0.35s" : `transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, opacity 0.5s ease ${i * 80}ms, box-shadow 0.35s`,
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-5px)";
                    el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.8), 12px 0 10px rgba(21,38,59,0.18), 0 12px 10px rgba(21,38,59,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.7), 10px 0 8px rgba(21,38,59,0.12), 0 10px 8px rgba(21,38,59,0.15)";
                  }}
                >
                  {/* 左帯（紺） */}
                  <div style={{
                    width: 80,
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%)",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isMobile ? "14px 0" : "22px 0",
                  }}>
                    {/* 右端ゴールドライン */}
                    <div style={{
                      position: "absolute", top: 0, right: 0, bottom: 0, width: 2,
                      background: "linear-gradient(180deg, transparent 0%, #9d8c56 20%, #9d8c56 80%, transparent 100%)",
                      pointerEvents: "none",
                    }} />
                    {/* 左下グロー */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, width: "140%", height: "45%",
                      background: "radial-gradient(circle at 20% 95%, rgba(157,140,86,0.18) 0%, transparent 60%)",
                      pointerEvents: "none",
                    }} />
                    {/* 番号 */}
                    <p style={{
                      fontSize: isMobile ? "clamp(32px,8vw,44px)" : "clamp(36px,3.5vw,52px)",
                      letterSpacing: isMobile ? "0.05em" : "0.1em",
                      color: "transparent",
                      WebkitTextStroke: isMobile ? "1px rgba(157,140,86,0.35)" : "1px rgba(157,140,86,0.65)",
                      margin: 0,
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 900,
                      lineHeight: 1,
                      writingMode: isMobile ? undefined : ("vertical-rl" as const),
                      textOrientation: isMobile ? undefined : ("mixed" as const),
                      position: "relative",
                      zIndex: 1,
                    }}>{String(i + 1).padStart(2, "0")}</p>
                    {/* 縦書きEN */}
                    <p style={{
                      fontSize: isMobile ? "clamp(26px,6vw,34px)" : "clamp(26px,2.8vw,34px)", fontWeight: 700, margin: 0,
                      color: isMobile ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.09)",
                      letterSpacing: isMobile ? "0.28em" : "0.18em",
                      writingMode: "vertical-rl" as const,
                      textOrientation: "mixed" as const,
                      transform: "rotate(180deg)",
                      fontFamily: "var(--font-noto-sans-jp), sans-serif",
                      userSelect: "none",
                      ...(isMobile ? {
                        position: "absolute" as const,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%) rotate(180deg)",
                      } : {}),
                    }}>{item.en}</p>
                    {/* 下部ゴールドドット */}
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(157,140,86,0.65)" }} />
                  </div>

                  {/* 右コンテンツエリア */}
                  <div style={{
                    flex: 1,
                    padding: isMobile ? "18px 22px" : "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}>
                    {/* ゴールドラベル */}
                    <p style={{
                      fontSize: "0.58rem", letterSpacing: "0.28em", color: "#9d8c56",
                      marginBottom: 10, textTransform: "uppercase" as const,
                      fontFamily: "var(--font-noto-sans-jp), sans-serif",
                      whiteSpace: "nowrap" as const,
                    }}>{item.ja}</p>
                    {/* EN 見出し */}
                    <h3 style={{
                      fontSize: "clamp(19px,2.6vw,32px)", fontWeight: 900, lineHeight: 1,
                      color: "#15263b", letterSpacing: "0.06em", marginBottom: 14,
                      fontFamily: "var(--font-noto-sans-jp), sans-serif",
                    }}>{item.en}</h3>
                    {/* ゴールドセパレーター */}
                    <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, #9d8c56, transparent)", marginBottom: 16 }} />
                    {/* 日本語タイトル */}
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#15263b", marginBottom: 10, lineHeight: 1.55, whiteSpace: "nowrap" as const }}>{item.title}</p>
                    {/* 本文 */}
                    <p style={{ fontSize: "0.72rem", color: "rgba(21,38,59,0.62)", lineHeight: 1.9, letterSpacing: "0.02em", whiteSpace: "pre-line" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div ref={philoMoreRef} style={{ display: "flex", justifyContent: "center", opacity: philoMoreVisible ? 1 : 0, transition: isMobile ? "none" : "opacity 0.5s ease 160ms" }}>
              <a href="/philosophy/" className="btn-view-more">VIEW MORE <span className="btn-arrow"></span></a>
            </div>
          </div>
        </section>

        {/* MESSAGE */}
        <Ticker text="TOP MESSAGE KUROKI YUTA" overlapBottom={isMobile ? 280 : 330} />

        <section style={{ padding: isMobile ? "160px 0 60px" : "140px 0 60px", position: "relative", zIndex: 22 }}>
          <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 60, position: "relative", zIndex: 1 }}>
              <p className="section-label">代表挨拶</p>
              <SplitTitle text="TOP MESSAGE" className="section-title-en" />
              <div className="section-divider" />
            </div>

            <div ref={msgGridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px 80px", alignItems: "center" }}>
              <div style={{
                position: "relative", aspectRatio: "4/5", maxWidth: 420,
                transform: msgVisible ? "translateX(0)" : "translateX(-32px)",
                opacity: msgVisible ? 1 : 0,
                transition: isMobile ? "none" : "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0ms, opacity 0.5s ease 0ms",
              }}>
                <Image src="/images/kuroki-yuta.webp" alt="代表取締役 黒木雄太" fill sizes="(max-width: 768px) 100vw, 420px" style={{ objectFit: "cover", borderRadius: "8px" }} />
                <div style={{ position: "absolute", bottom: -16, right: -16, width: "70%", height: "70%", border: "1px solid rgba(21,38,59,0.15)", pointerEvents: "none", zIndex: -1 }} />
              </div>
              <div ref={msgTextRef} style={{
                opacity: msgTextVisible ? 1 : 0,
                transition: isMobile ? "none" : "opacity 0.55s ease 0ms",
              }}>
                {/* ラベル＋署名サイン */}
                <style>{`
                  @property --shimmer-angle {
                    syntax: '<angle>';
                    inherits: false;
                    initial-value: 0deg;
                  }
                  @keyframes shimmer-border-spin {
                    from { --shimmer-angle: 0deg; }
                    to   { --shimmer-angle: 360deg; }
                  }
                  .shimmer-border {
                    position: relative;
                    border-radius: 16px;
                  }
                  .shimmer-border::after {
                    content: '';
                    position: absolute;
                    inset: -1px;
                    border-radius: 16px;
                    padding: 1px;
                    background: conic-gradient(
                      from var(--shimmer-angle) at 50% 50%,
                      transparent 0deg,
                      transparent 338deg,
                      rgba(255, 220, 100, 0.5) 348deg,
                      rgba(255, 255, 255, 0.95) 354deg,
                      rgba(255, 220, 100, 0.5) 360deg
                    );
                    -webkit-mask:
                      linear-gradient(#fff 0 0) content-box,
                      linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    animation: shimmer-border-spin 5s linear infinite;
                    pointer-events: none;
                  }
                  @keyframes gold-slide {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(500%); }
                  }
                  .gold-highlight {
                    position: absolute;
                    top: 0; left: 0;
                    width: 22%;
                    height: 100%;
                    background: linear-gradient(90deg,
                      transparent 0%,
                      rgba(157,140,86,0.65) 38%,
                      rgba(210,180,90,0.9) 50%,
                      rgba(157,140,86,0.65) 62%,
                      transparent 100%
                    );
                    animation: gold-slide 3.2s cubic-bezier(0.4,0,0.6,1) infinite;
                  }
                  .service-fill::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #15263b 0%, #1e3a5f 100%);
                    transform: scaleY(0);
                    transform-origin: bottom;
                    transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
                    z-index: 0;
                  }
                  .service-fill:hover::before {
                    transform: scaleY(1);
                  }
                  .service-fill:hover .sf-en,
                  .service-fill:hover .sf-title,
                  .service-fill:hover .sf-desc {
                    color: inherit;
                  }
                  .sf-en { transition: color 0.3s 0.1s; }
                  .sf-title { transition: color 0.3s 0.15s; }
                  .sf-desc { transition: color 0.3s 0.2s;
                  }
                `}</style>
                <div style={{ display: "block", marginBottom: 24 }}>
                  <div style={{ display: "flex", width: "100%", alignItems: "flex-end", justifyContent: isMobile ? "center" : "space-between", gap: 16, marginBottom: 8 }}>
                    <p style={{ fontSize: isMobile ? "0.7rem" : "0.82rem", letterSpacing: "0.18em", color: "#9d8c56", margin: 0, marginBottom: 8, marginLeft: isMobile ? 0 : 10, fontWeight: 500, lineHeight: 1.7, whiteSpace: "nowrap" }}>NEXT BRINO 最高経営責任者</p>
                    <Image src="/images/ceo-sign.webp" alt="署名" width={isMobile ? 135 : 190} height={isMobile ? 59 : 83} style={{ objectFit: "contain", objectPosition: "right bottom", marginRight: isMobile ? 0 : 80, marginBottom: isMobile ? 0 : -4, filter: "brightness(0) saturate(100%) invert(13%) sepia(27%) saturate(1093%) hue-rotate(181deg) brightness(89%)" }} />
                  </div>
                  {/* ベースライン（常時表示・薄金） + スライドするゴールドハイライト */}
                  <div style={{ position: "relative", width: "100%", height: 1, overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(157,140,86,0.22) 0%, rgba(157,140,86,0.08) 100%)" }} />
                    <div className="gold-highlight" />
                  </div>
                </div>

                {isMobile ? (
                  <>
                    <div className="shimmer-border" style={{ background: "transparent", borderTop: "1px solid rgba(157,140,86,0.35)", borderLeft: "1px solid rgba(157,140,86,0.35)", borderBottom: "1px solid rgba(21,38,59,0.35)", borderRight: "1px solid rgba(21,38,59,0.35)", padding: "20px 8px 24px", marginBottom: 28 }}>
                      <div style={{ textAlign: "center" }}>
                        <Image
                          src="/images/top-message-title.webp"
                          alt="大切な人のために創る"
                          width={1920}
                          height={462}
                          style={{ width: "80%", height: "auto", display: "inline-block", marginBottom: -4, filter: "brightness(0) saturate(100%) invert(13%) sepia(27%) saturate(1093%) hue-rotate(181deg) brightness(89%)" }}
                          sizes="80vw"
                        />
                      </div>
                      <div style={{ width: "60%", margin: "4px auto 16px", height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(157,140,86,0.5) 30%, rgba(157,140,86,0.5) 70%, transparent 100%)" }} />
                      <p style={{ fontSize: "0.88rem", lineHeight: 2, color: "#444", letterSpacing: "0.03em", margin: 0, whiteSpace: "pre-line", textAlign: "center" }}>{`人は誰かを想う時、最も強く優しくなれる。\n家族や恋人、友人、働く仲間、お客様。\n誰かのためにより良くしたいと願う気持ちは、\nいつの時代も人を前へ進ませ、\n社会を少しずつ良くしてきました。\n私たちが目指すのは、便利さや効率の先にある、\n一人ひとりの豊かで誇れる暮らしです。\nその原点を見失うことなく、理念である\n「繊細に想像し、大胆に創造する」を追求します。`}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", opacity: msgTextVisible ? 1 : 0, transition: isMobile ? "none" : "opacity 0.5s ease 160ms" }}>
                      <a href="/message-kuroki-yuta/" className="btn-view-more">VIEW MORE <span className="btn-arrow"></span></a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="shimmer-border" style={{ background: "transparent", borderTop: "1px solid rgba(157,140,86,0.35)", borderLeft: "1px solid rgba(157,140,86,0.35)", borderBottom: "1px solid rgba(21,38,59,0.35)", borderRight: "1px solid rgba(21,38,59,0.35)", padding: "24px 28px 32px", marginBottom: 32 }}>
                      <div>
                        <Image
                          src="/images/top-message-title.webp"
                          alt="大切な人のために創る"
                          width={1920}
                          height={462}
                          style={{ width: "clamp(200px, 26vw, 320px)", height: "auto", display: "block", marginBottom: -4, filter: "brightness(0) saturate(100%) invert(13%) sepia(27%) saturate(1093%) hue-rotate(181deg) brightness(89%)" }}
                          sizes="430px"
                        />
                      </div>
                      <div style={{ width: "80%", margin: "4px 0 20px", height: 1, background: "linear-gradient(90deg, rgba(157,140,86,0.5) 0%, rgba(157,140,86,0.5) 60%, transparent 100%)" }} />
                      <p style={{ fontSize: "0.9rem", lineHeight: 2, color: "#444", letterSpacing: "0.04em", margin: 0, whiteSpace: "pre-line" }}>{`人は誰かを想う時、最も強く優しくなれる。\n家族や恋人、友人、働く仲間、お客様。\n誰かのためにより良くしたいと願う気持ちは、\n`}<span style={{ whiteSpace: "nowrap" }}>いつの時代も人を前へ進ませ、社会を少しずつ良くしてきました。</span>{`\n私たちが目指すのは、単なる便利さや効率の先にある、\n一人ひとりの豊かで誇れる暮らしです。\nその原点を見失うことなく、理念である\n「繊細に想像し、大胆に創造する」を体現し続けます。`}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", opacity: msgTextVisible ? 1 : 0, transition: isMobile ? "none" : "opacity 0.5s ease 160ms" }}>
                      <a href="/message-kuroki-yuta/" className="btn-view-more">VIEW MORE <span className="btn-arrow"></span></a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* SERVICE */}
        <style>{`
          @keyframes svc-v-in {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes svc-bar-grow {
            from { transform: scaleY(0); }
            to   { transform: scaleY(1); }
          }
          @keyframes svc-shine-h {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
          }

          .svc-vlist {
            width: 88%;
            max-width: 480px;
            margin: 0 auto 48px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .svc-vi {
            display: flex;
            background: #fff;
            border: 1px solid rgba(21,38,59,0.08);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 10px 0 8px rgba(21,38,59,0.12), 0 10px 8px rgba(21,38,59,0.15);
            overflow: hidden;
            opacity: 0;
            animation: svc-v-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
            position: relative;
          }

          /* 左：ネイビーの番号カラム */
          .svc-vi-num-col {
            width: 56px;
            flex-shrink: 0;
            background: linear-gradient(180deg, #0d1e33 0%, #15263b 60%, #1c3260 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px 0;
            position: relative;
            overflow: hidden;
          }
          /* ドットテクスチャ */
          .svc-vi-num-col::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: radial-gradient(rgba(157,140,86,0.12) 1px, transparent 1px);
            background-size: 14px 14px;
          }
          /* 縦書き番号 */
          .svc-vi-num {
            font-size: 1.3rem;
            font-weight: 900;
            letter-spacing: 0.04em;
            color: transparent;
            -webkit-text-stroke: 1px rgba(157,140,86,0.6);
            writing-mode: vertical-rl;
            text-orientation: mixed;
            position: relative; z-index: 1;
            line-height: 1;
          }
          /* ゴールドの細い縦ライン（右端） */
          .svc-vi-num-col::after {
            content: "";
            position: absolute;
            top: 0; right: 0; bottom: 0;
            width: 2px;
            background: linear-gradient(180deg, transparent, #9d8c56 30%, #c4aa6e 70%, transparent);
            transform-origin: top;
            animation: svc-bar-grow 0.8s ease forwards;
            animation-delay: inherit;
          }

          /* 右：白コンテンツ */
          .svc-vi-body {
            flex: 1;
            padding: 20px 18px 20px 18px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          /* 上部ゴールドライン */
          .svc-vi-body::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, #9d8c56, #c4aa6e 30%, rgba(157,140,86,0.08) 75%, transparent);
            overflow: hidden;
          }
          /* 光沢 */
          .svc-vi-body::after {
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 35%; height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent);
            animation: svc-shine-h 3s ease-in-out infinite;
            animation-delay: inherit;
          }

          .svc-vi-en {
            font-size: 0.5rem;
            letter-spacing: 0.3em;
            color: #9d8c56;
            margin: 0 0 7px;
            text-transform: uppercase;
          }
          .svc-vi-title {
            font-size: 1.0rem;
            font-weight: 700;
            color: #15263b;
            margin: 0 0 10px;
            letter-spacing: 0.04em;
            line-height: 1.4;
          }
          .svc-vi-desc {
            font-size: 0.7rem;
            color: rgba(21,38,59,0.48);
            line-height: 1.95;
            margin: 0;
            font-weight: 300;
            letter-spacing: 0.02em;
          }

          /* 右下コーナー */
          .svc-vi-corner {
            position: absolute;
            bottom: 8px; right: 8px;
            width: 14px; height: 14px;
            border-bottom: 1px solid rgba(157,140,86,0.4);
            border-right: 1px solid rgba(157,140,86,0.4);
          }
        `}</style>
        <Ticker text="SERVICE NEXT BRINO" overlapBottom={isMobile ? 280 : 330} />

        <section style={{ padding: isMobile ? "160px 0 60px" : "140px 0 60px", position: "relative", zIndex: 21 }}>
          <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 48, position: "relative", zIndex: 1 }}>
              <p className="section-label">事業内容</p>
              <SplitTitle text="SERVICE" className="section-title-en" />
              <div className="section-divider" />
            </div>
          </div>

          {/* ─── サービスカード ─── */}
          <div ref={svcGridRef} className="svc-brand-grid">
            {services.map((s, i) => (
              <div
                key={s.en}
                className="svc-brand-card"
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  transform: svcVisible ? "translateX(0)" : "translateX(-60px)",
                  opacity: svcVisible ? 1 : 0,
                  transition: isMobile ? "none" : `transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, opacity 0.5s ease ${i * 80}ms`,
                }}
              >
                <div className="svc-hover-bg" />
                <div className="svc-brand-top-dots" />
                <div className={`svc-brand-top${!s.en2 ? " svc-brand-top--single" : ""}`}>
                  <div>
                    <span className="svc-brand-num" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="svc-brand-en" style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
                      <span className="svc-brand-en--split">{s.en1}{s.en2 && <><br />{s.en2}</>}</span>
                      <span className="svc-brand-en--single">{s.en}</span>
                    </p>
                  </div>
                  <span className="svc-brand-dot" />
                  <span className="svc-brand-watermark" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="svc-brand-sep" />
                <div className="svc-brand-bottom" style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
                  <h3 className="svc-brand-title">{s.title}</h3>
                  <div className="svc-brand-title-line" />
                  <p className="svc-brand-desc">
                    {s.desc.split('\n').map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div ref={svcMoreRef} style={{ width: "90%", maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "center", opacity: svcMoreVisible ? 1 : 0, transition: isMobile ? "none" : "opacity 0.5s ease 160ms" }}>
            <a href="/service/" className="btn-view-more">VIEW MORE <span className="btn-arrow"></span></a>
          </div>
        </section>

        {/* NEWS（透過、dark プロパティ削除） */}
        <Ticker text="NEWS NEXT BRINO" overlapBottom={isMobile ? 280 : 330} />
        <NewsSection />

        {/* CONTACT */}
        <Ticker text="CONTACT NEXT BRINO" overlapBottom={isMobile ? 280 : 330} />

        <section style={{
          width: "100%",
          background: "transparent",
          position: "relative",
          zIndex: 20,
          padding: isMobile ? "160px 20px 140px" : "140px 40px 200px",
        }}>
          <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto 48px", position: "relative", zIndex: 1 }}>
            <p className="section-label">お問い合わせ</p>
            <SplitTitle text="CONTACT" className="section-title-en" />
            <div className="section-divider" />
          </div>

          {/* HUDブラケット付きラッパー */}
          <div ref={contactBoxRef} style={{
            position: "relative", width: "90%", maxWidth: 1100, margin: "0 auto",
            transform: contactVisible ? "scale(1)" : "scale(0.98)",
            opacity: contactVisible ? 1 : 0,
            transition: isMobile ? "none" : "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease",
          }}>

            {/* HUD四隅ブラケット */}
            <div style={{ position:"absolute", top:-7, left:-7, width:20, height:20, borderTop:"1.5px solid rgba(157,140,86,0.7)", borderLeft:"1.5px solid rgba(157,140,86,0.7)", pointerEvents:"none", zIndex:3 }} />
            <div style={{ position:"absolute", top:-7, right:-7, width:20, height:20, borderTop:"1.5px solid rgba(157,140,86,0.7)", borderRight:"1.5px solid rgba(157,140,86,0.7)", pointerEvents:"none", zIndex:3 }} />
            <div style={{ position:"absolute", bottom:-7, left:-7, width:20, height:20, borderBottom:"1.5px solid rgba(157,140,86,0.7)", borderLeft:"1.5px solid rgba(157,140,86,0.7)", pointerEvents:"none", zIndex:3 }} />
            <div style={{ position:"absolute", bottom:-7, right:-7, width:20, height:20, borderBottom:"1.5px solid rgba(157,140,86,0.7)", borderRight:"1.5px solid rgba(157,140,86,0.7)", pointerEvents:"none", zIndex:3 }} />

            {/* カード本体 */}
            <div style={{
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 10px 0 8px rgba(21,38,59,0.12), 0 10px 8px rgba(21,38,59,0.15)",
              display: isMobile ? "block" : "grid",
              gridTemplateColumns: "1fr 1.5fr",
              border: "1px solid rgba(21,38,59,0.07)",
              position: "relative",
            }}>
              {/* シマーライン */}
              <div className="contact-shimmer-line" />

              {/* ── 左: navy パネル ── */}
              <div style={{
                background: "linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%)",
                padding: isMobile ? "28px 24px 24px" : "56px 44px 48px 52px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}>
                {/* ドットグリッド */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "radial-gradient(rgba(157,140,86,0.12) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  pointerEvents: "none",
                }} />
                {/* 同心円アーク（右上コーナー起点のレーダー風） */}
                {[160, 240, 320, 400, 480].map((size, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    top: -size * 0.5,
                    right: -size * 0.5,
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    border: `1px solid rgba(157,140,86,${(0.18 - i * 0.03).toFixed(2)})`,
                    pointerEvents: "none",
                  }} />
                ))}

                {/* 右上グロー（アークの中心光源） */}
                <div style={{
                  position:"absolute", top:0, right:0,
                  width:"70%", height:"60%",
                  background:"radial-gradient(circle at 92% 6%, rgba(157,140,86,0.2) 0%, transparent 55%)",
                  pointerEvents:"none",
                }} />

                {/* スキャンライン */}
                <div className="contact-scan-line" />

                <div style={{ position:"relative" }}>
                  {/* 点滅ドット + ラベル */}
                  <p style={{
                    display:"flex", alignItems:"center", gap:"8px",
                    fontSize:".65rem", letterSpacing:".26em",
                    color:"rgba(157,140,86,0.85)", textTransform:"uppercase",
                    margin:"0 0 18px",
                    fontFamily:"var(--font-noto-sans-jp),sans-serif",
                  }}>
                    <span className="contact-blink" />
                    Always Available
                  </p>

                  {/* CONTACT 大見出し */}
                  <h2 style={{
                    fontSize: isMobile ? "clamp(28px,8vw,38px)" : "clamp(28px,3vw,42px)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.82)",
                    letterSpacing: ".06em",
                    lineHeight: 1,
                    margin: "0 0 14px",
                    fontFamily: "var(--font-noto-sans-jp),sans-serif",
                    textShadow: "0 0 48px rgba(157,140,86,0.25)",
                  }}>CONTACT</h2>

                  {/* ゴールドライン */}
                  <div style={{
                    width: "44px", height: "2px",
                    background: "linear-gradient(90deg, rgba(157,140,86,1), rgba(157,140,86,0.1))",
                    margin: "0 0 0",
                  }} />

                  {/* ステータス */}
                  <div style={{
                    marginTop: isMobile ? "20px" : "32px",
                    display: "flex",
                    flexDirection: isMobile ? "row" : "column",
                    alignItems: isMobile ? "center" : "flex-start",
                    gap: isMobile ? "12px" : "7px",
                  }}>
                    <p style={{
                      fontSize: ".6rem", letterSpacing: ".12em",
                      color: "rgba(157,140,86,0.6)",
                      fontFamily: "var(--font-noto-sans-jp),sans-serif",
                      margin: 0, display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      <span style={{ display:"inline-block", width:4, height:4, borderRadius:"50%", background:"rgba(157,140,86,0.75)", flexShrink:0 }} />
                      ONLINE
                    </p>
                    <p style={{
                      fontSize: ".6rem", letterSpacing: ".06em",
                      color: "rgba(255,255,255,0.18)",
                      fontFamily: "var(--font-noto-sans-jp),sans-serif",
                      margin: 0,
                    }}>
                      › nextbrino.com/contact
                    </p>
                  </div>
                </div>

                {/* 対応情報 */}
                <div style={{
                  marginTop: "auto",
                  paddingTop: isMobile ? "24px" : "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                  <p style={{
                    fontSize: ".6rem",
                    letterSpacing: ".04em",
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-noto-sans-jp),sans-serif",
                    margin: 0,
                  }}>対応時間：平日10:00〜17:00（土日祝を除く）</p>
                  <p style={{
                    fontSize: ".6rem",
                    letterSpacing: ".04em",
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-noto-sans-jp),sans-serif",
                    margin: 0,
                  }}>返信目安：2〜5営業日程度（内容によって異なります）</p>
                </div>
              </div>

              {/* ── 右: white パネル ── */}
              <div style={{
                background: "#fafafa",
                padding: isMobile ? "24px 24px 32px" : "56px 52px 48px 48px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderLeft: isMobile ? "none" : "1px solid rgba(21,38,59,0.05)",
                borderTop: isMobile ? "1px solid rgba(21,38,59,0.06)" : "none",
                position: "relative",
              }}>
                {/* 背景ロゴ（右下はみ出し・グレー・文字クリップ） */}
                <div style={{
                  position: "absolute",
                  right: isMobile ? "-32%" : "-30%",
                  bottom: isMobile ? "-10%" : "-8%",
                  width: isMobile ? "101%" : "94%",
                  aspectRatio: "1 / 0.64",
                  overflow: "hidden",
                  opacity: 0.08,
                  pointerEvents: "none",
                  filter: "grayscale(1)",
                }}>
                  <Image
                    src="/images/contact-box-logo.webp"
                    alt=""
                    fill
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
                <div style={{ position: "relative", textAlign: isMobile ? "center" : "left" }}>
                  {/* 本文 */}
                  <p style={{
                    fontSize: isMobile ? ".88rem" : "1rem",
                    color: "rgba(21,38,59,0.62)",
                    letterSpacing: ".04em",
                    lineHeight: isMobile ? 1.8 : 2.2,
                    margin: isMobile ? "0 0 16px" : "0 0 32px",
                  }}>
                    ご依頼等、お気軽にご連絡ください。<br />
                    担当者より順にご返信いたします。
                  </p>

                  {/* セパレーター */}
                  <div style={{
                    width: "100%", height: "1px",
                    background: "linear-gradient(90deg, rgba(21,38,59,0.09), transparent 80%)",
                    margin: "0 0 16px",
                  }} />
                  {/* CTAボタン */}
                  <a
                    href="/contact/"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: isMobile ? "center" : "space-between",
                      padding: "17px 24px",
                      background: "linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%)",
                      color: "#fff",
                      fontFamily: "var(--font-noto-sans-jp),sans-serif",
                      fontSize: ".78rem",
                      letterSpacing: ".18em",
                      textTransform: "uppercase" as const,
                      textDecoration: "none",
                      borderRadius: "6px",
                      transition: "background 0.3s ease",
                      alignSelf: isMobile ? "center" : "flex-start",
                      minWidth: isMobile ? "80%" : "280px",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #7a6a3a 0%, #9d8c56 55%, #b8a06a 100%)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #0d1e33 0%, #15263b 55%, #1d3560 100%)"; }}
                  >
                    <span>お問合せはこちら</span>
                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: "1.1rem" }}>→</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

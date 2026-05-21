"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CherryBlossoms from "./components/CherryBlossoms";
import NewsSection from "./components/NewsSection";
import Ticker from "./components/Ticker";
import IntroAnimation from "./components/IntroAnimation";

const SLIDES = ["/images/top-hero-01.jpg", "/images/top-hero-02.jpg", "/images/top-hero-03.jpg"];

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

export default function Home() {
  const [scrollY, setScrollY]                 = useState(0);
  const [slide, setSlide]                     = useState(0);
  const [tick, setTick]                       = useState(0);
  const slideRef                              = useRef(0);
  const [isMobile, setIsMobile]               = useState(false);
  const [vh, setVh]                           = useState(800);
  const [slideshowActive, setSlideshowActive] = useState(true);
  const [atBottom, setAtBottom]               = useState(false);


  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      // ページ最下部判定（残り200px以内）
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      setAtBottom(y + winH >= docH - 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setVh(window.innerHeight);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* スクロール開始時にスライドショー停止 → その時点の画像を背景に固定 */
  /* スクロールトップ復帰時にスライドショー再開 */
  useEffect(() => {
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

  const services = [
    { title: "EC事業",          en: "E-COMMERCE",       desc: "サービス業向けWEB決済システムの導入・各種ECサイト制作・ウェブサイト運営支援" },
    { title: "WEB広告事業",      en: "WEB ADVERTISING",  desc: "女性向け情報配信・販売コンテンツ運営・各種WEBメディア運営・広告枠販売" },
    { title: "企画・販売事業",    en: "PLANNING & SALES", desc: "アパレル・ジュエリー・グッズ等の制作販売・新規ブランド企画・フランチャイズ展開" },
    { title: "人材育成・戦略事業", en: "HR & STRATEGY",   desc: "クリエイティブタレントマネジメント・独立支援サポート・人材戦略コンサルティング" },
    { title: "教育・学習支援事業", en: "EDUCATION",        desc: "小中学生対象の学習支援・PREP法による完全双方向型学習・能動的学習確立" },
    { title: "健康増進事業",      en: "HEALTH & WELLNESS", desc: "各スポーツにおける身体能力向上指導・ボディメイク・科学的根拠に基づく栄養指導" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-main)", background: "#fff" }}>
      <IntroAnimation />
      <CherryBlossoms />

      {/* ── 固定 FV 画像 ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`fv-slide${i === slide ? (tick % 2 === 0 ? " active-odd" : " active-even") : ""}`}
          >
            <Image
              src={src}
              alt={`FV ${i + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)", zIndex: 2, pointerEvents: "none" }} />
      </div>

      {/* 暗オーバーレイ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          background: `rgba(0,0,0,${darkOverlay})`,
          pointerEvents: "none",
        }}
      />

      {/* 白オーバーレイ（画像を漂白） */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          background: `rgba(255,255,255,${whiteOverlay})`,
          pointerEvents: "none",
        }}
      />



      {/* ── マウス スクロールインジケーター（画面固定・最下部で非表示） ── */}
      {!isMobile && (
        <div
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
          <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "#9d8c56", textTransform: "uppercase", fontFamily: "var(--font-barlow-condensed), sans-serif" }}>
            Scroll Down
          </span>
        </div>
      )}

      {/* ── FV テキスト（fixed）── スクロールで逃げずに残り、PHILOSOPHYへ接続 */}
      <div
        style={{
          position: "fixed",
          zIndex: 11,
          pointerEvents: "none",
          opacity: textOpacity,
          ...(isMobile
            ? {
                top: `${lerp(50, 75, progress) - scrollUpPct}%`,
                left: "5%",
                right: "5%",
                transform: "translateY(-50%)",
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
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: isMobile ? `${lerp(8, 10, progress)}vw` : `${textFontSizeVw}vw`,
            fontWeight: 700,
            lineHeight: 1.10,
            letterSpacing: "0.01em",
            color: textColor,
            textShadow: `0 2px 32px rgba(0,0,0,${textShadow})`,
            margin: 0,
            transition: "none",
          }}
        >
          We imagine carefully<br />
          and create boldly<br />
          to design everyday life<br />
          through technology
        </p>
        <p
          style={{
            marginTop: "0.9em",
            fontSize: isMobile ? `${lerp(3.0, 3.7, progress)}vw` : `${lerp(1.15, 1.0, progress)}vw`,
            fontWeight: 400,
            letterSpacing: "0.10em",
            lineHeight: 1.9,
            color: textColor,
            textShadow: `0 1px 12px rgba(0,0,0,${textShadow * 0.6})`,
            margin: "0.9em 0 0",
            fontFamily: "var(--font-main)",
          }}
        >
          IT技術を駆使して日常をデザインするために、<br />繊細に想像し、大胆に創造する
        </p>
      </div>

      {/* ── FV スクロールコンテナー (270vh) ── スクロール長確保のみ */}
      <div style={{ height: isMobile ? "192vh" : "270vh", position: "relative", zIndex: 10 }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", background: "transparent" }} />
      </div>

      {/* ── コンテンツ（全て透過。NEWS も透明） ── */}
      <div style={{ position: "relative", zIndex: 20 }}>

        {/* PHILOSOPHY */}
        <section style={{ padding: isMobile ? "0px 0 50px" : "60px 0 60px" }}>
          <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 60 }}>
              <p className="section-label">経営理念</p>
              <h2 className="section-title-en">PHILOSOPHY</h2>
              <div className="section-divider" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, marginBottom: 60 }}>
              {[
                { en: "MISSION", ja: "ミッション", title: "確かな技術で日常をデザインする", body: "テクノロジーを通じて、人々の日常生活における小さな不便や課題に向き合い、より心地よく豊かな暮らしを実現します。" },
                { en: "VISION",  ja: "ビジョン",   title: "人生に輝きと革新的なアイデアを", body: "テクノロジーとアイデアによって、人々が自分らしい輝きを見つけられ、一人ひとりが新たな意味や喜びを発見できる社会を目指します。" },
                { en: "VALUES",  ja: "バリュー",   title: "14の行動指針", body: "人を大切に・素直に謙虚に誠実に・想像し創造する・技術力に磨きを・変化に順応する・持続可能な環境への配慮——14の指針で日々行動します。" },
              ].map((item) => (
                <div
                  key={item.en}
                  style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(4px)", border: "1px solid rgba(21,38,59,0.1)", padding: "48px 36px", position: "relative", overflow: "hidden", transition: "box-shadow 0.3s, transform 0.3s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 8px 40px rgba(21,38,59,0.12)"; el.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "#15263b" }} />
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.22em", color: "#9d8c56", marginBottom: 8 }}>{item.ja}</p>
                  <h3 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: "transparent", WebkitTextStroke: "1px rgba(21,38,59,0.25)", letterSpacing: "0.06em", marginBottom: 24, lineHeight: 1 }}>{item.en}</h3>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "#15263b", marginBottom: 16, lineHeight: 1.5 }}>{item.title}</p>
                  <p style={{ fontSize: "0.875rem", color: "#555", lineHeight: 1.9, letterSpacing: "0.03em" }}>{item.body}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <a href="https://nextbrino.com/philosophy/" className="btn-view-more">VIEW MORE <span style={{ fontSize: "0.9em" }}>→</span></a>
            </div>
          </div>
        </section>

        {/* MESSAGE */}
        <Ticker text="TOP MESSAGE KUROKI YUTA" />

        <section style={{ padding: "60px 0" }}>
          <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 60 }}>
              <p className="section-label">代表挨拶</p>
              <h2 className="section-title-en">MESSAGE</h2>
              <div className="section-divider" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px 80px", alignItems: "center" }}>
              <div style={{ position: "relative", aspectRatio: "4/5", maxWidth: 420 }}>
                <Image src="/images/kuroki-yuta.jpg" alt="代表取締役 黒木雄太" fill sizes="(max-width: 768px) 100vw, 420px" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: -16, right: -16, width: "70%", height: "70%", border: "1px solid rgba(21,38,59,0.15)", pointerEvents: "none", zIndex: -1 }} />
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#9d8c56", marginBottom: 20 }}>代表取締役　黒木 雄太</p>
                <h3 style={{ fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 700, color: "#15263b", lineHeight: 1.6, marginBottom: 28 }}>大切な人のために、創る。</h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 2, color: "#444", letterSpacing: "0.04em", marginBottom: 20 }}>人は、誰かを想う時に、最も強く優しくなれる——その信念のもと、NEXT BRINOは「確かな技術で日常をデザインする」ことを使命としています。</p>
                <p style={{ fontSize: "0.9rem", lineHeight: 2, color: "#444", letterSpacing: "0.04em", marginBottom: 32 }}>一人ひとりの暮らしや時間が、より豊かで誇れるものになるよう、技術を「日常をより良くするための力」として捉え、大切にしている言葉「繊細に想像し、大胆に創造する」を体現し続けます。</p>
                <a href="https://nextbrino.com/message-kuroki-yuta/" className="btn-view-more">VIEW MORE <span style={{ fontSize: "0.9em" }}>→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE */}
        <Ticker text="SERVICE NEXT BRINO" />

        <section style={{ padding: "60px 0" }}>
          <div style={{ width: "90%", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 60 }}>
              <p className="section-label">事業内容</p>
              <h2 className="section-title-en">SERVICE</h2>
              <div className="section-divider" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, border: "1px solid rgba(21,38,59,0.1)", marginBottom: 60 }}>
              {services.map((s, i) => (
                <div
                  key={s.en}
                  style={{ padding: "40px 32px", border: "1px solid rgba(21,38,59,0.07)", position: "relative", overflow: "hidden", transition: "background 0.3s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(21,38,59,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  <span style={{ position: "absolute", top: 20, right: 24, fontSize: "2.4rem", fontWeight: 900, color: "rgba(21,38,59,0.04)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#9d8c56", marginBottom: 10 }}>{s.en}</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#15263b", marginBottom: 16 }}>{s.title}</h3>
                  <p style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.9 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <a href="https://nextbrino.com/service/" className="btn-view-more">VIEW MORE <span style={{ fontSize: "0.9em" }}>→</span></a>
            </div>
          </div>
        </section>

        {/* NEWS（透過、dark プロパティ削除） */}
        <Ticker text="NEWS NEXT BRINO" />
        <NewsSection />

        {/* CONTACT */}
        <Ticker text="CONTACT NEXT BRINO" />

        <section style={{ width: "100%", position: "relative", overflow: "hidden" }}>
          <a href="https://nextbrino.com/contact/" style={{ display: "block", position: "relative" }}>
            <Image src="/images/contact.jpg" alt="CONTACT" width={1920} height={600}
              style={{
                width: "100%",
                height: isMobile ? "clamp(220px, 60vw, 300px)" : "clamp(380px, 32vw, 480px)",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }} />
            <div
              style={{ position: "absolute", inset: 0, background: "rgba(21,38,59,0.38)", transition: "background 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(21,38,59,0.52)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(21,38,59,0.38)"; }}
            />
          </a>
        </section>

      </div>
    </div>
  );
}

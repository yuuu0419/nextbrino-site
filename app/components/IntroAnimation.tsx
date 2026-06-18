'use client';
import { useEffect, useState } from 'react';

const PARTICLES = [
  { size: 4, x: '12%',  y: '22%', delay: '0s',    dur: '3.8s' },
  { size: 5, x: '82%',  y: '18%', delay: '0.9s',  dur: '4.2s' },
  { size: 3, x: '22%',  y: '72%', delay: '1.6s',  dur: '3.5s' },
  { size: 6, x: '74%',  y: '68%', delay: '0.4s',  dur: '4.6s' },
  { size: 3, x: '48%',  y: '12%', delay: '1.2s',  dur: '3.9s' },
  { size: 4, x: '62%',  y: '82%', delay: '0.7s',  dur: '4.1s' },
  { size: 5, x: '8%',   y: '52%', delay: '2.0s',  dur: '3.7s' },
  { size: 3, x: '90%',  y: '42%', delay: '0.2s',  dur: '4.4s' },
];

export default function IntroAnimation({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setPhase(1), 80);
    const t2 = setTimeout(() => setPhase(2), 2900);
    const t3 = setTimeout(() => {
      setPhase(3);
      document.body.style.overflow = '';
      onComplete?.();
    }, 3800);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      document.body.style.overflow = '';
      onComplete?.();
    };
  }, [onComplete]);

  if (phase === 3) return null;

  const visible = phase >= 1;
  const exiting = phase === 2;

  const line = (delay = '0s') => (
    <div style={{ width: 180, height: 1, overflow: 'hidden' }}>
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(157,140,86,0.7), transparent)',
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'center',
        transition: `transform 1s cubic-bezier(0.4,0,0.2,1) ${delay}`,
      }} />
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: exiting ? 0 : 1,
      transition: exiting ? 'opacity 1s ease' : 'none',
      overflow: 'hidden',
    }}>

      {/* FV画像（ブラー） — フェード後もサイトと地続きになる */}
      <div style={{
        position: 'absolute', inset: -24,
        backgroundImage: "url('/images/top-hero-01.webp')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(7px) brightness(0.38)',
      }} />

      {/* ネイビーオーバーレイ */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(10,18,32,0.52) 0%, rgba(21,38,59,0.44) 50%, rgba(10,18,32,0.56) 100%)',
      }} />

      {/* ドットマトリクス */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(157,140,86,0.30) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
        pointerEvents: 'none',
      }} />

      {/* 浮遊パーティクル */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="intro-particle" style={{
          position: 'absolute', left: p.x, top: p.y,
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: 'rgba(157,140,86,0.55)',
          filter: `blur(${p.size * 0.9}px)`,
          animationDelay: p.delay, animationDuration: p.dur,
        }} />
      ))}

      {/* コーナーブラケット */}
      <div style={{ position:'absolute', top:24, left:24,   width:30, height:30, borderTop:'1.5px solid rgba(157,140,86,0.52)', borderLeft:'1.5px solid rgba(157,140,86,0.52)',  opacity: visible?1:0, transition:'opacity 0.8s ease 0.2s' }} />
      <div style={{ position:'absolute', top:24, right:24,  width:30, height:30, borderTop:'1.5px solid rgba(157,140,86,0.52)', borderRight:'1.5px solid rgba(157,140,86,0.52)', opacity: visible?1:0, transition:'opacity 0.8s ease 0.2s' }} />
      <div style={{ position:'absolute', bottom:24, left:24,  width:30, height:30, borderBottom:'1.5px solid rgba(157,140,86,0.52)', borderLeft:'1.5px solid rgba(157,140,86,0.52)',  opacity: visible?1:0, transition:'opacity 0.8s ease 0.2s' }} />
      <div style={{ position:'absolute', bottom:24, right:24, width:30, height:30, borderBottom:'1.5px solid rgba(157,140,86,0.52)', borderRight:'1.5px solid rgba(157,140,86,0.52)', opacity: visible?1:0, transition:'opacity 0.8s ease 0.2s' }} />

      {/* メインコンテンツ */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', position:'relative', gap:0 }}>

        {/* 上ライン */}
        <div style={{ marginBottom: 38 }}>{line('0s')}</div>

        {/* ロゴ */}
        <div style={{
          transform: visible ? 'scale(1) translateY(0px)' : 'scale(0.94) translateY(10px)',
          opacity: visible ? 1 : 0,
          filter: visible ? 'drop-shadow(0 0 18px rgba(157,140,86,0.24))' : 'drop-shadow(0 0 44px rgba(157,140,86,0.58))',
          willChange: 'transform, opacity, filter',
          transition: 'transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 1.4s cubic-bezier(0.25,0.46,0.45,0.94), filter 1.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/header-logo.webp" alt="NEXT BRINO" style={{ width:240, height:'auto', display:'block', filter:'brightness(0) invert(1)' }} />
        </div>

        {/* 下ライン */}
        <div style={{ marginTop: 38 }}>{line('0.08s')}</div>

        {/* タグライン */}
        <p style={{
          margin: '22px 0 0',
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 10.5, fontWeight: 300, letterSpacing: '0.28em',
          color: 'rgba(157,140,86,0.72)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.9s ease 1.0s, transform 0.9s ease 1.0s',
          textAlign: 'center', maxWidth: '88vw',
        }}>
          繊細に想像し、大胆に創造する
        </p>

        {/* NOW LOADING */}
        <div style={{
          marginTop: 44, display:'flex', alignItems:'center', gap:1,
          opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 1.4s',
        }}>
          <span style={{ fontFamily:"'Courier New',Courier,monospace", fontSize:9, letterSpacing:'0.30em', color:'rgba(255,255,255,0.28)' }}>
            NOW LOADING
          </span>
          <span className="intro-dot" style={{ animationDelay:'0s'    }}>.</span>
          <span className="intro-dot" style={{ animationDelay:'0.28s' }}>.</span>
          <span className="intro-dot" style={{ animationDelay:'0.56s' }}>.</span>
        </div>

      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = { title: "代表挨拶 | NEXT BRINO" };

export default function MessagePage() {
  return (
    <main>
      <div className="ph"><div className="ph-inner">
        <p className="ph-label">NEXT BRINO</p>
        <h1 className="ph-en">TOP MESSAGE</h1>
        <div className="ph-line" />
        <p className="ph-ja">代表挨拶</p>
      </div></div>
      <div className="pc" style={{ maxWidth: 900 }}>
        <div className="msg-profile">
          <div className="msg-photo-wrap">
            <Image src="/images/kuroki-yuta.jpg" alt="黒木 雄太" width={280} height={360} className="msg-photo" />
          </div>
          <div className="msg-profile-text">
            <p className="msg-role">代表取締役</p>
            <p className="msg-name">黒木 雄太</p>
            <p className="msg-name-en">KUROKI YUTA</p>
          </div>
        </div>

        <div className="msg-body">
          <h2 className="msg-heading">大切な誰かのために、創ること。</h2>
          <p className="msg-text">人は、大切な誰かのことを想うとき、最も強く、最も優しくなれると私は思っています。</p>
          <p className="msg-text">私たちは、単なる利便性を追い求めるのではなく、人それぞれの生活と時間を豊かにすることを目指して、事業に取り組んでいます。</p>

          <h2 className="msg-heading">私たちが創りたい世界</h2>
          <p className="msg-text">社会の中で、自分らしくいられる瞬間を増やしていくこと。それが私たちの目指す姿です。</p>
          <p className="msg-text">テクノロジーは、ただの道具ではなく、日常をより豊かにし、余白と喜びを生み出し、時間の質を高めるための手段であると考えています。</p>

          <h2 className="msg-heading">繊細に想像し、大胆に創造する</h2>
          <p className="msg-text">私が最も大切にしている言葉です。創ることは、人の感情・生活・関係性を理解し、表面的な課題の奥にある本質的な欲求を見つけることから始まります。しかし、想像するだけでは世界は変わりません。ビジョンを完遂させる大胆な実行と覚悟が必要です。</p>

          <div className="msg-profile-box">
            <h3 className="msg-profile-box-title">プロフィール</h3>
            <p className="msg-text">2001年生まれ。サッカーに打ち込んだ後、健康・医療、情報、法律を学ぶ。余暇の時間に仕事の不満を語る大人の姿を見て、人々に感情的・時間的なゆとりを提供したいという想いからNEXT BRINOを設立。現在、6つの事業部門を運営しながら、そのビジョンを追求し続けている。</p>
          </div>
        </div>
      </div>
      <style>{`
        
        .ph { background: #15263b; padding: 120px 0 64px; }
        .ph-inner { width: 88%; max-width: 1100px; margin: 0 auto; }
        .ph-label { font-family: var(--font-barlow-condensed), sans-serif; font-size: 11px; letter-spacing: .28em; color: #9d8c56; text-transform: uppercase; margin: 0 0 12px; }
        .ph-en { font-family: var(--font-barlow-condensed), sans-serif; font-size: clamp(52px,8vw,110px); font-weight: 800; letter-spacing: .08em; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.35); margin: 0 0 20px; }
        .ph-line { width: 100%; height: 1px; background: rgba(255,255,255,.1); margin: 0 0 20px; }
        .ph-ja { font-size: clamp(18px,2.5vw,26px); font-weight: 300; letter-spacing: .1em; color: rgba(255,255,255,.72); margin: 0; }
        .pc { width: 88%; max-width: 1100px; margin: 0 auto; padding: 72px 0 100px; }

        .msg-profile { display: flex; align-items: flex-end; gap: 36px; margin: 0 0 56px; }
        .msg-photo-wrap { flex-shrink: 0; }
        .msg-photo { width: 200px; height: auto; display: block; }
        .msg-role { font-size: .78rem; letter-spacing: .18em; color: #9d8c56; margin: 0 0 8px; }
        .msg-name { font-size: 1.8rem; font-weight: 700; color: #15263b; margin: 0 0 4px; letter-spacing: .08em; }
        .msg-name-en { font-family: var(--font-barlow-condensed), sans-serif; font-size: .85rem; letter-spacing: .22em; color: rgba(21,38,59,.4); margin: 0; }
        .msg-body { display: flex; flex-direction: column; gap: 0; }
        .msg-heading { font-size: 1.25rem; font-weight: 700; color: #15263b; margin: 40px 0 16px; letter-spacing: .06em; border-left: 3px solid #9d8c56; padding-left: 16px; }
        .msg-heading:first-child { margin-top: 0; }
        .msg-text { font-size: .95rem; line-height: 2.1; color: #555; margin: 0 0 16px; }
        .msg-profile-box { margin-top: 48px; padding: 28px 32px; background: rgba(21,38,59,.03); border: 1px solid rgba(21,38,59,.08); }
        .msg-profile-box-title { font-size: .78rem; letter-spacing: .2em; color: #9d8c56; margin: 0 0 14px; text-transform: uppercase; }
        @media (max-width: 640px) {
          .msg-profile { flex-direction: column; align-items: flex-start; gap: 20px; }
          .msg-photo { width: 140px; }
        }
      `}</style>
    </main>
  );
}

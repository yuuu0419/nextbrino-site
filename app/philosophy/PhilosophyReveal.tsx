"use client";
import { useEffect } from "react";

export default function PhilosophyReveal() {
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".ph-reveal:not(.ph-reveal--visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.05) {
          el.classList.add("ph-reveal--visible");
        }
      });
    };

    // IntersectionObserver（メイン）
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ph-reveal--visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );
    document.querySelectorAll(".ph-reveal").forEach((el) => obs.observe(el));

    // セクション全体のアニメーション
    const secObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ph-sec-reveal--visible");
            secObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );
    document.querySelectorAll(".ph-sec-reveal").forEach((el) => secObs.observe(el));

    // スクロールフォールバック
    window.addEventListener("scroll", reveal, { passive: true });
    // 初回チェックを遅らせてアニメーションが見えるようにする
    setTimeout(reveal, 300);

    return () => {
      obs.disconnect();
      secObs.disconnect();
      window.removeEventListener("scroll", reveal);
    };
  }, []);
  return null;
}

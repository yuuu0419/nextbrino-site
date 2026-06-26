"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p";
  delay?: number; // base delay in ms
}

export default function SplitTitle({ text, className, tag: Tag = "h2", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      window.innerWidth < 768
        ? { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
        : { threshold: 0, rootMargin: "0px 0px 40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>} className={className} aria-label={text}
      style={{ overflow: "hidden" }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: visible ? "translateY(0)" : "translateY(-1.2em)",
            opacity: visible ? 1 : 0,
            transition: visible
              ? `transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${delay + i * 30}ms, opacity 0.5s ease ${delay + i * 30}ms`
              : "none",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}

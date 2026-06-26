"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  index?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export default function FlipInCard({ index = 0, children, style, className, onMouseEnter, onMouseLeave }: Props) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = index * 150;

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        ...style,
        transform: visible ? "translateX(0)" : "translateX(-36px)",
        opacity: visible ? 1 : 0,
        transition: visible
          ? `transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, opacity 0.55s ease ${delay}ms`
          : "none",
      }}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: "up" | "left" | "right";
  delay?: number;
  distance?: number;
}

export default function FadeIn({
  children,
  className,
  style,
  direction = "up",
  delay = 0,
  distance = 32,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const translate = {
    up: `translateY(${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : translate,
        transition: visible
          ? `opacity 0.9s ease ${delay}ms, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
          : "none",
      }}
    >
      {children}
    </div>
  );
}

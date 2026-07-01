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
  distance = 20,
}: Props) {
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
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
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
        transition: isMobile
          ? "none"
          : visible
          ? `opacity 0.5s ease ${delay}ms, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
          : "none",
      }}
    >
      {children}
    </div>
  );
}

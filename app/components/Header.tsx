"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        zIndex: 1000,
        padding: "16px 5%",
        background: "transparent",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link href="/" style={{ display: "flex" }}>
        <Image
          src="/images/header-logo.png"
          alt="NEXT BRINO"
          width={240}
          height={72}
          style={{ width: isMobile ? 160 : 240, height: "auto" }}
          priority
        />
      </Link>
    </header>
  );
}

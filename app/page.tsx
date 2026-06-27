import type { Metadata } from "next";
import { preload } from "react-dom";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://nextbrino.com",
  },
};

export default function Home() {
  preload("/images/top-hero-01.webp", { as: "image", fetchPriority: "high", type: "image/webp" });
  return <HomeClient />;
}

import type { Metadata } from "next";
import { Noto_Sans_JP, Barlow_Condensed, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "NEXT BRINO | IT技術を駆使して日常をデザインする",
  description:
    "NEXT BRINOの公式サイトです。ITシステム開発・Web制作を中心に6つの事業を提供しております。",
  openGraph: {
    title: "NEXT BRINO | IT技術を駆使して日常をデザインする",
    description:
      "NEXT BRINOの公式サイトです。ITシステム開発・Web制作を中心に6つの事業を提供しております。",
    url: "https://nextbrino.com",
    siteName: "NEXT BRINO",
    images: [
      {
        url: "https://nextbrino.com/images/site-logo.png",
        width: 1563,
        height: 1563,
        alt: "NEXT BRINO",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "NEXT BRINO | IT技術を駆使して日常をデザインする",
    description:
      "NEXT BRINOの公式サイトです。ITシステム開発・Web制作を中心に6つの事業を提供しております。",
    images: ["https://nextbrino.com/images/site-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${barlowCondensed.variable} ${cormorantGaramond.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
<Footer />
      </body>
    </html>
  );
}

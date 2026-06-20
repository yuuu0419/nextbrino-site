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
    "確かな技術で日常をデザインする。NEXT BRINOは、IT技術を通じて人々の日常をより豊かにするテクノロジー企業です。",
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

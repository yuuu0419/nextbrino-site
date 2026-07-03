import type { Metadata } from "next";
import { Noto_Sans_JP, Barlow_Condensed, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Script from "next/script";

const GA_ID = "G-BR75W4WJWC";

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
        url: "https://nextbrino.com/images/toppage-ogp.jpg",
        width: 1200,
        height: 630,
        alt: "NEXT BRINO | IT技術を駆使して日常をデザインする",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT BRINO | IT技術を駆使して日常をデザインする",
    description:
      "NEXT BRINOの公式サイトです。ITシステム開発・Web制作を中心に6つの事業を提供しております。",
    images: ["https://nextbrino.com/images/toppage-ogp.jpg"],
  },
  icons: {
    apple: "/images/add-logo.png",
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NEXT BRINO",
              alternateName: "ネクストブライノ",
              url: "https://nextbrino.com",
              logo: "https://nextbrino.com/images/header-logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "support@nextbrino.com",
                availableLanguage: "Japanese",
              },
              sameAs: [],
            }),
          }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NEXT BRINO",
              url: "https://nextbrino.com",
            }),
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

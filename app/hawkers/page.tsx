import type { Metadata } from "next";
import PdfViewer from "./PdfViewer";

export const metadata: Metadata = {
  title: "株式会社Hawker's様 限定のご案内｜NEXT BRINO",
  description: "NEXT BRINOより、株式会社Hawker's様 限定のご案内です。",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "株式会社Hawker's様 限定のご案内｜NEXT BRINO",
    description: "NEXT BRINOより、株式会社Hawker's様 限定のご案内です。",
    url: "https://nextbrino.com/hawkers",
    siteName: "NEXT BRINO",
    images: [{ url: "https://nextbrino.com/images/hawkers-ogp.jpg", width: 1200, height: 630, alt: "株式会社Hawker's様 限定のご案内｜NEXT BRINO" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社Hawker's様 限定のご案内｜NEXT BRINO",
    description: "NEXT BRINOより、株式会社Hawker's様 限定のご案内です。",
    images: ["https://nextbrino.com/images/hawkers-ogp.jpg"],
  },
};

export default function HawkersPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-5xl">
        <h1
          className="text-3xl md:text-4xl font-light tracking-widest mb-2"
          style={{ fontFamily: "var(--font-barlow-condensed)" }}
        >
          株式会社Hawker&apos;s様
        </h1>
        <p className="text-sm text-gray-400 mb-10 tracking-wider">限定のご案内</p>

        {/* PC: iframe */}
        <div className="hidden md:block w-full border border-white/10 rounded overflow-hidden bg-white/5 mb-6">
          <iframe
            src="/hawkers.pdf"
            className="w-full"
            style={{ height: "80vh", minHeight: 600 }}
            title="NEXT BRINO 営業資料"
          />
        </div>

        {/* スマホ: react-pdf で全ページ表示 */}
        <div className="md:hidden w-full border border-white/10 rounded overflow-hidden bg-white mb-6">
          <PdfViewer file="/hawkers.pdf" />
        </div>

        <div className="flex justify-center">
          <a
            href="/hawkers.pdf"
            download
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white/70 text-white text-sm tracking-widest px-8 py-3 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
            PDFをダウンロード
          </a>
        </div>
      </div>
    </main>
  );
}

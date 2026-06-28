"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => <p className="text-gray-400 text-sm py-10 text-center">読み込み中...</p>,
});

export default function PdfViewerWrapper({ file }: { file: string }) {
  return <PdfViewer file={file} />;
}

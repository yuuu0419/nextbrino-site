import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { HERO_BLUR } from "../heroBlurData";

/* 下層ページ hero 専用の画像コンポーネント。
   - unoptimized 方針は維持(画像最適化API経由の黒フラッシュ回避)しつつ、
     scripts/generate-hero-sp.mjs で事前生成した幅1200pxの "-sp.webp" を
     srcSet で出し分け、スマホへの転送量を約4〜7割削減する。
   - next/image の priority 相当の <link rel="preload"> は getImageProps では
     付与されないため、ReactDOM.preload で同等の imagesrcset preload を明示する。
   - placeholder="blur" の背景は getImageProps 経由ではロード後も残るが、
     hero は不透明写真のため画像に完全に隠れて見えない。 */

// navy(#15263b)単色のSVGをblurDataURLとして使用し、画像ロード前の黒フラッシュを防ぐ
const NAVY_BLUR_URL = `data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="#15263b"/></svg>'
).toString("base64")}`;

type Props = {
  src: string;
  alt?: string;
};

export default function HeroImage({ src, alt = "" }: Props) {
  const spSrc = src.replace(/\.webp$/, "-sp.webp");
  const srcSet = `${spSrc} 1200w, ${src} 1920w`;

  preload(src, {
    as: "image",
    imageSrcSet: srcSet,
    imageSizes: "100vw",
    fetchPriority: "high",
  });

  const { props } = getImageProps({
    src,
    alt,
    fill: true,
    priority: true,
    unoptimized: true,
    placeholder: "blur",
    blurDataURL: HERO_BLUR[src] ?? NAVY_BLUR_URL,
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      srcSet={srcSet}
      sizes="100vw"
      alt={alt}
      fetchPriority="high"
      style={{ ...props.style, objectFit: "cover", objectPosition: "center" }}
    />
  );
}

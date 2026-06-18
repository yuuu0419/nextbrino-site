import Image from "next/image";
import Link from "next/link";

const BANNERS = [
  {
    src: "/images/contact-policy.jpg",
    alt: "お問合せ対応基本方針",
    href: "/contact-policy/",
  },
  {
    src: "/images/privacy-policy.jpg",
    alt: "個人情報保護方針",
    href: "/privacy-policy/",
  },
  {
    src: "/images/antisocial-policy.jpg",
    alt: "反社会的勢力に対する基本方針",
    href: "/anti-social-forces-policy/",
  },
];

// 元画像サイズ: 1200 × 550px
const IMG_W = 1200;
const IMG_H = 550;

export default function PolicyBanners() {
  return (
    <section className="pb-banners">
      {BANNERS.map((banner) => (
        <Link key={banner.href} href={banner.href} className="pb-item">
          <Image
            src={banner.src}
            alt={banner.alt}
            width={IMG_W}
            height={IMG_H}
            sizes="(max-width: 640px) 100vw, 33vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Link>
      ))}
      <style>{`
        .pb-banners {
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 25;
        }
        .pb-item {
          display: block;
          width: 100%;
          overflow: hidden;
        }
        .pb-item img {
          transition: transform 0.4s ease;
        }
        .pb-item:hover img {
          transform: scale(1.03);
        }
        @media (min-width: 641px) {
          .pb-banners {
            flex-direction: row;
          }
          .pb-item {
            width: 33.333%;
          }
        }
      `}</style>
    </section>
  );
}

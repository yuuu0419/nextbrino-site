"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* 現在開いているページと同じページへの内部リンクをクリックした場合、
   next/link は同一URLへのクリックを完全な no-op として扱う(ナビゲーションも
   スクロール復元も一切発生しない)ため、何も起きていないように見える。
   このコンポーネントは layout.tsx に1つ置くだけで、ヘッダー・メニュー・
   フッター・バナー等の全リンクに対しページトップへのスクロールを追加する。
   next/link 自身の処理を妨げないようバブル段階のリスナーとして動作し、
   preventDefault は呼ばない(同一URLへのLinkクリックは何もしないため
   妨げる必要がない)。 */
export default function ScrollTopOnSamePageLink() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // 新規タブ等の修飾キー付きクリックはブラウザ標準に任せる
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      // 内部リンク(パス指定)のみ対象。外部URL・ハッシュは除外
      if (!href || !href.startsWith("/")) return;
      const target = href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
      const current = pathname.replace(/\/+$/, "") || "/";
      if (target !== current) return;

      const scrollToTop = () => window.scrollTo(0, 0);
      /* ハンバーガーメニューのリンクをタップした場合、closeMenu() が
         document.body.style.overflow = "hidden" をクローズアニメーション中
         (840ms)ずっと保持する。overflow:hidden の間は smooth スクロールの
         アニメーションが完全に無視される(黙って何も起きない)ため、
         ロック解除を待ってから実行する。ロックされていなければ即座に実行される。
         (requestAnimationFrame はバックグラウンドタブで停止するため使わず、
         setTimeout ポーリングにしている。scrollTo も smooth ではなく即時にして
         いるのは、smooth はコンポジタの描画フレームに依存するため、フレームが
         スキップされる状況下では見た目上まったく動かないことがあるため) */
      if (getComputedStyle(document.body).overflowY === "hidden") {
        let tries = 0;
        const waitForUnlock = () => {
          if (getComputedStyle(document.body).overflowY !== "hidden" || tries++ > 40) {
            scrollToTop();
          } else {
            setTimeout(waitForUnlock, 50);
          }
        };
        setTimeout(waitForUnlock, 50);
      } else {
        scrollToTop();
      }
    };
    // バブル段階(既定)。next/link 自身のクリック処理を妨げない。
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}

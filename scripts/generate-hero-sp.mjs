/* 下層ページの hero(unoptimized 配信)用に、スマホ向け縮小版を事前生成する。
   1920px のフル解像度をスマホに送ると 50〜151KB かかるため、
   DPR3 端末でも等倍を保てる幅1200pxの "-sp.webp" を用意し、
   HeroImage コンポーネントの srcSet で出し分ける。
   hero 画像を追加・差し替えたら `node scripts/generate-hero-sp.mjs` を再実行すること。 */
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, basename } from "path";

const IMAGES_DIR = "./public/images";
const WIDTH = 1200;
const QUALITY = 82;

const files = await readdir(IMAGES_DIR);
const targets = files.filter((f) => /-hero\.webp$/i.test(f));

console.log(`生成対象: ${targets.length}ファイル\n`);

for (const file of targets) {
  const input = join(IMAGES_DIR, file);
  const output = join(IMAGES_DIR, basename(file, ".webp") + "-sp.webp");

  const before = (await stat(input)).size;
  await sharp(input).resize({ width: WIDTH }).webp({ quality: QUALITY }).toFile(output);
  const after = (await stat(output)).size;

  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(`${file} → ${basename(output)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${saved}%)`);
}

console.log("\n完了");

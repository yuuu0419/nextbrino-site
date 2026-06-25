import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const IMAGES_DIR = "./public/images";
const QUALITY = 82;

const files = await readdir(IMAGES_DIR);
const targets = files.filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`変換対象: ${targets.length}ファイル\n`);

for (const file of targets) {
  const input = join(IMAGES_DIR, file);
  const output = join(IMAGES_DIR, basename(file, extname(file)) + ".webp");

  const before = (await stat(input)).size;
  await sharp(input).webp({ quality: QUALITY }).toFile(output);
  const after = (await stat(output)).size;

  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(`${file} → ${basename(output)}  ${(before/1024/1024).toFixed(1)}MB → ${(after/1024/1024).toFixed(1)}MB  (-${saved}%)`);
}

console.log("\n完了");

/**
 * Rasterises assets-src/og-image.svg → public/og-image.png (1200×630).
 * Runs automatically before `dev` and `build` (see package.json scripts).
 * Social scrapers (Facebook, LinkedIn, Slack, X) need a real PNG/JPG, not an SVG.
 *
 * If `sharp` can't be installed on your platform, drop your own 1200×630 PNG at
 * public/og-image.png and set OG_SKIP=1 — this script will leave it alone.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

if (process.env.OG_SKIP) process.exit(0);

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "assets-src/og-image.svg");
const out = resolve(root, "public/og-image.png");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn(
    "[og] sharp not available — keeping any existing public/og-image.png. " +
      "Install sharp or supply your own 1200x630 PNG."
  );
  process.exit(0);
}

const svg = await readFile(src);
const png = await sharp(svg, { density: 200 })
  .resize(1200, 630, { fit: "cover" })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(out, png);
console.log("[og] wrote public/og-image.png");

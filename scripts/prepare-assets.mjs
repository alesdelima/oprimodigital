// One-off asset extraction script: crops usable illustrations out of the
// AI-generated reference collages in img/ and writes optimized files to
// public/images/. Not part of the app build — run manually if assets change.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC_HERO = "img/ChatGPT Image 4 de jul. de 2026, 21_27_44.png";
const SRC_COLLAGE = "img/Gemini_Generated_Image_wuyeewwuyeewwuye.png";
const OUT_DIR = "public/images";

await mkdir(OUT_DIR, { recursive: true });

async function heroIllustration() {
  const W = 906;
  const H = 1024;
  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0a0a0a" stop-opacity="1"/>
          <stop offset="22%" stop-color="#0a0a0a" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="vig" cx="50%" cy="38%" r="75%">
          <stop offset="60%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
        </radialGradient>
      </defs>
      <rect x="0" y="765" width="430" height="210" fill="#050505"/>
      <rect width="${W}" height="${H}" fill="url(#vig)"/>
      <rect width="${W}" height="${H}" fill="url(#fade)"/>
    </svg>
  `);

  await sharp(SRC_HERO)
    .extract({ left: 630, top: 0, width: W, height: H })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 88 })
    .toFile(`${OUT_DIR}/hero-illustration.jpg`);
}

async function ogCover() {
  const resized = await sharp(SRC_HERO)
    .resize({ width: 1200 })
    .toBuffer();
  await sharp(resized)
    .extract({ left: 0, top: 85, width: 1200, height: 630 })
    .jpeg({ quality: 85 })
    .toFile(`${OUT_DIR}/og-cover.jpg`);
}

async function portfolioCovers() {
  const boxes = {
    "portfolio-truck": [28, 733, 184, 184],
    "portfolio-face": [230, 733, 184, 184],
    "portfolio-body": [432, 733, 184, 184],
    "portfolio-building": [634, 733, 184, 184],
  };
  for (const [name, [left, top, width, height]] of Object.entries(boxes)) {
    await sharp(SRC_COLLAGE)
      .extract({ left, top, width, height })
      .resize({ width: 760, height: 760, kernel: "lanczos3" })
      .sharpen({ sigma: 0.6 })
      .jpeg({ quality: 85 })
      .toFile(`${OUT_DIR}/${name}.jpg`);
  }
}

async function ctaAlley() {
  await sharp(SRC_COLLAGE)
    .extract({ left: 433, top: 451, width: 386, height: 224 })
    .resize({ width: 1680, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 82 })
    .toFile(`${OUT_DIR}/cta-alley.jpg`);
}

await heroIllustration();
await ogCover();
await portfolioCovers();
await ctaAlley();

console.log("Assets written to", OUT_DIR);

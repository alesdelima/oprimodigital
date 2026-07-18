// One-off script: composes a new og-cover.jpg from the current Hero frame +
// current copy, matching the warm café palette. Not part of the app build —
// run manually if the Hero scene or copy changes.
import sharp from "sharp";

const SRC = "public/frames/hero/frame-01.jpg";
const OUT = "public/images/og-cover.jpg";
const W = 1200;
const H = 630;

const BACKGROUND = "#14100c";
const FOREGROUND = "#f3ead9";
const PRIMARY = "#f0a437";

async function build() {
  const meta = await sharp(SRC).metadata();
  const srcW = meta.width;
  const srcH = meta.height;

  // Crop the 3:2 hero frame down to the OG 1200x630 (~1.905:1) ratio,
  // keeping the character centered the same way Hero.tsx does (55% horizontal).
  const cropH = Math.round(srcW / (W / H));
  const cropW = srcW;
  const top = Math.max(0, Math.round((srcH - cropH) / 2));
  const left = 0;

  const cropped = await sharp(SRC)
    .extract({ left, top, width: cropW, height: Math.min(cropH, srcH - top) })
    .resize({ width: W, height: H, fit: "cover", position: "right" })
    .toBuffer();

  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="veil" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${BACKGROUND}" stop-opacity="0.97"/>
          <stop offset="55%" stop-color="${BACKGROUND}" stop-opacity="0.72"/>
          <stop offset="100%" stop-color="${BACKGROUND}" stop-opacity="0.12"/>
        </linearGradient>
        <linearGradient id="fade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="${BACKGROUND}" stop-opacity="0.55"/>
          <stop offset="18%" stop-color="${BACKGROUND}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#veil)"/>
      <rect width="${W}" height="${H}" fill="url(#fade)"/>

      <text x="64" y="72" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="1">
        <tspan fill="${FOREGROUND}">O PRIMO </tspan><tspan fill="${PRIMARY}">DIGITAL</tspan>
      </text>

      <text x="64" y="190" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3" fill="${PRIMARY}">
        DESENVOLVIMENTO DE SITES &amp; SISTEMAS
      </text>

      <text x="62" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="700" fill="${FOREGROUND}">
        <tspan x="62" dy="0">Seu negócio merece</tspan>
        <tspan x="62" dy="62">mais do que um site.</tspan>
      </text>
      <text x="62" y="404" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="700" fill="${PRIMARY}">
        Merece resultados.
      </text>

      <text x="64" y="470" font-family="Arial, sans-serif" font-size="22" fill="${FOREGROUND}" opacity="0.85">
        <tspan x="64" dy="0">Criamos experiências digitais de alto impacto que</tspan>
        <tspan x="64" dy="30">transformam visitantes em clientes.</tspan>
      </text>
    </svg>
  `);

  await sharp(cropped)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toFile(OUT);
}

await build();
console.log("Written", OUT);

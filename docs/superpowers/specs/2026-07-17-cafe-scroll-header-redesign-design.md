# Redesign: header scroll-scrub do café + paleta escuro-aquecida

**Data:** 2026-07-17
**Decisões do usuário:** paleta "escuro aquecido"; scroll scrub **sem pin**.

## Contexto

O site (O Primo Digital, Next.js 15 com `output: "export"`, Tailwind v4, framer-motion 12)
usa hoje um tema dark noir frio (fundo `#0a0a0a`, accent laranja neon `#ff7a00`) e um hero
em duas colunas com ilustração estática.

O usuário adicionou 30 frames de um vídeo em `img/header site/ezgif-frame-001.jpg` …
`ezgif-frame-030.jpg` (JPEG, 1620×1080, ~3 MB no total). A cena: ilustração estilo HQ de um
profissional de blazer trabalhando num laptop em um café aconchegante — lâmpadas Edison
âmbar, estantes de madeira, tijolo aparente, plantas, chuva na janela. Entre os frames a
chuva cai e as luzes tremulam (cinemagraph).

Objetivo: usar os frames como header em scroll animation e harmonizar o restante da
landing page com o estilo da imagem.

## 1. Header scroll-scrub (sem pin)

Substituir o conteúdo visual do `Hero` por uma seção full-viewport com a cena do café:

- **Assets:** copiar os 30 frames para `public/frames/hero/frame-01.jpg` … `frame-30.jpg`.
  A pasta `img/` original permanece intocada (fonte).
- **Render:** `<canvas>` full-bleed com cover-fit manual (mesma matemática de
  `object-fit: cover`), desenhando o frame corrente. Canvas dimensionado por
  `devicePixelRatio` limitado a 2.
- **Scrub:** `useScroll` (framer-motion) sem target — progresso = `scrollY / alturaDoHero`,
  clampado em [0, 1], mapeado para o índice 0…29. O header **não** fica fixo: a animação
  acontece enquanto o hero sai naturalmente da tela. Atualização via
  `useMotionValueEvent` + `requestAnimationFrame` (desenha só quando o índice muda).
- **Carregamento:** `frame-01.jpg` também existe como `<img>` com `priority`/`fetchpriority`
  alto para LCP e como fallback `noscript`/reduced-motion. Os demais 29 são pré-carregados
  via `Image()` em background após o mount; enquanto um frame não carregou, permanece o
  último frame desenhado.
- **Reduced motion:** `prefers-reduced-motion: reduce` → sem canvas, apenas o frame 01
  estático.
- **Overlay de legibilidade:** gradiente de baixo para cima até `--background` (café
  escuro), mais um véu lateral esquerdo sutil. Copy do hero (eyebrow, título, subtexto,
  CTAs — conteúdo inalterado de `lib/content.ts`) sobreposta, alinhada à esquerda,
  com as animações de entrada framer-motion já existentes. Indicador de scroll (chevron)
  na base.
- **Mobile:** a cena é landscape (3:2); em telas portrait o cover-fit corta as laterais
  mantendo o personagem centralizado (foco ~55% horizontal). Texto continua legível pelo
  gradiente inferior.

## 2. Paleta escuro-aquecida (globals.css)

Somente troca de valores dos tokens em `:root, .dark` — os componentes já são 100%
token-based (nenhum hex hardcoded fora de `globals.css`):

| Token | De | Para |
|---|---|---|
| `--background` | `#0a0a0a` | `#14100c` (café escuro) |
| `--foreground` | `#f2f2f0` | `#f3ead9` (creme) |
| `--surface` | `#111111` | `#1a140e` |
| `--surface-2` | `#161616` | `#211a12` |
| `--card` / `--popover` | `#121212` | `#1c1610` |
| `--primary` / `--accent` / `--glow` / `--ring` | `#ff7a00` | `#f0a437` (âmbar Edison) |
| `--primary-foreground` / `--accent-foreground` | `#0a0a0a` | `#1a120a` |
| `--secondary` / `--muted` | `#1a1a1a` | `#241c13` |
| `--muted-foreground` | `#9c9c9a` | `#b3a48c` |
| `--border` / `--input` | `#262626` | `#31281c` |
| `--chart-2` | `#9c9c9a` | `#6f8f5e` (verde planta, cor de apoio) |
| `--sidebar*` | tons frios | equivalentes quentes dos de cima |

Utilities existentes (`glow-*`, `card-noir`, `grain-overlay`, `halftone`, `vignette`)
usam `var(--primary)`/`var(--foreground)` e aquecem automaticamente; todas permanecem —
grain e halftone reforçam o estilo ilustrado/HQ da cena.

## 3. Harmonização pontual

- **Navbar:** sem mudança estrutural (já é transparente sobre o hero e ganha
  `bg-background/80` ao rolar — os tokens novos resolvem).
- **FinalCTA (`cta-alley.jpg`):** adicionar um tint âmbar (overlay `--primary` em
  low-opacity/multiply) para aproximar a foto noir da nova paleta.
- **`hero-illustration.jpg`:** deixa de ser usada no Hero (arquivo permanece no repo).
- Demais seções: sem mudanças além do que os tokens propagam.

## 4. O que NÃO muda

- Copy/conteúdo (`lib/content.ts`), estrutura de seções, rotas, SEO, footer.
- Nenhuma dependência nova (framer-motion já cobre o scrub).
- `output: "export"` — tudo é estático; frames servidos de `public/`.

## 5. Riscos e mitigação

- **Peso (3 MB de frames):** carregamento em background pós-mount; LCP fica no frame 01
  (~150 KB). Aceitável para export estático.
- **Trabalho não commitado no working tree** (Navbar, Pricing, Hosting, sheet,
  content.ts): commits da feature devem fazer stage seletivo apenas dos arquivos tocados
  por este redesign, sem misturar as mudanças pré-existentes.

## 6. Verificação

- `npm run build` sem erros (export estático).
- No browser (chrome-devtools): frame avança ao rolar o hero; texto legível; layout ok em
  1440px e 390px; reduced-motion mostra frame estático; sem erros no console.

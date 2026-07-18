# Header Scroll-Scrub do Café + Paleta Aquecida — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o hero por um header full-viewport com 30 frames ilustrados do café avançando conforme o scroll (sem pin) e aquecer a paleta do site inteiro para harmonizar com a cena.

**Architecture:** Os frames vivem em `public/frames/hero/`. Um novo `Hero.tsx` desenha o frame corrente num `<canvas>` cover-fit, com índice derivado de `useScroll` do framer-motion (progresso de saída do hero). A paleta é trocada apenas nos tokens CSS de `app/globals.css` — os componentes são 100% token-based.

**Tech Stack:** Next.js 15 (`output: "export"`, images unoptimized), Tailwind v4 (tokens via `@theme`), framer-motion 12.

**Spec:** `docs/superpowers/specs/2026-07-17-cafe-scroll-header-redesign-design.md`

## Global Constraints

- Projeto é export estático (`output: "export"`): nada de APIs de servidor; assets em `public/`.
- Working tree tem mudanças pré-existentes NÃO relacionadas (Navbar.tsx, Hosting.tsx, Pricing.tsx, sheet.tsx, content.ts): **todo commit usa stage seletivo apenas dos arquivos da tarefa**. Nunca `git add -A`.
- Sem dependências novas.
- Copy/conteúdo de `lib/content.ts` inalterado.
- Projeto não tem infra de testes unitários; verificação = `npm run build` + inspeção no browser (dev server + chrome-devtools).
- Commits em português, terminados com `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Copiar frames para `public/frames/hero/`

**Files:**
- Create: `public/frames/hero/frame-01.jpg` … `frame-30.jpg` (copiados de `img/header site/ezgif-frame-0NN.jpg`)

**Interfaces:**
- Produces: URLs `/frames/hero/frame-NN.jpg` (NN = 01…30, zero-padded), 1620×1080 JPEG, consumidas pela Task 3.

- [ ] **Step 1: Copiar e renomear os 30 frames**

```bash
cd "/d/Projetos Claud/Landing Page Pro"
mkdir -p public/frames/hero
for i in $(seq -w 1 30); do
  cp "img/header site/ezgif-frame-0$i.jpg" "public/frames/hero/frame-$i.jpg"
done
ls public/frames/hero | wc -l   # esperado: 30
```

- [ ] **Step 2: Commit**

```bash
git add public/frames/hero
git commit -m "Adicionar frames do header do café em public/frames/hero

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Paleta escuro-aquecida em `app/globals.css`

**Files:**
- Modify: `app/globals.css:55-92` (bloco `:root, .dark`)

**Interfaces:**
- Produces: tokens CSS aquecidos consumidos por todo o site (nenhuma mudança de nome de token, só valores).

- [ ] **Step 1: Substituir o bloco de tokens**

Substituir o bloco `:root, .dark { … }` inteiro por:

```css
:root,
.dark {
  --background: #14100c;
  --foreground: #f3ead9;
  --surface: #1a140e;
  --surface-2: #211a12;
  --card: #1c1610;
  --card-foreground: #f3ead9;
  --popover: #1c1610;
  --popover-foreground: #f3ead9;
  --primary: #f0a437;
  --primary-foreground: #1a120a;
  --secondary: #241c13;
  --secondary-foreground: #f3ead9;
  --muted: #241c13;
  --muted-foreground: #b3a48c;
  --accent: #f0a437;
  --accent-foreground: #1a120a;
  --glow: #f0a437;
  --destructive: #e5484d;
  --border: #31281c;
  --input: #31281c;
  --ring: #f0a437;
  --chart-1: #f0a437;
  --chart-2: #6f8f5e;
  --chart-3: #b3a48c;
  --chart-4: #6b5c44;
  --chart-5: #31281c;
  --radius: 0.625rem;
  --sidebar: #171209;
  --sidebar-foreground: #f3ead9;
  --sidebar-primary: #f0a437;
  --sidebar-primary-foreground: #1a120a;
  --sidebar-accent: #241c13;
  --sidebar-accent-foreground: #f3ead9;
  --sidebar-border: #31281c;
  --sidebar-ring: #f0a437;
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build/export conclui sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "Aquecer paleta do site para harmonizar com a cena do café

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Reescrever `Hero.tsx` com canvas scroll-scrub

**Files:**
- Modify: `components/sections/Hero.tsx` (reescrita completa)

**Interfaces:**
- Consumes: `/frames/hero/frame-NN.jpg` (Task 1); tokens aquecidos (Task 2); `hero`, `whatsappHref` de `lib/content.ts`; `Button` de `components/ui/button`.
- Produces: export nomeado `Hero` (sem props), como hoje — `app/page.tsx` não muda.

- [ ] **Step 1: Reescrever o componente**

Conteúdo completo de `components/sections/Hero.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero, whatsappHref } from "@/lib/content";

const FRAME_COUNT = 30;

function frameSrc(index: number) {
  return `/frames/hero/frame-${String(index + 1).padStart(2, "0")}.jpg`;
}

/* Cover-fit com foco a 55% na horizontal para manter o personagem
   visível quando o corte portrait remove as laterais da cena. */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
  const drawWidth = img.naturalWidth * scale;
  const drawHeight = img.naturalHeight * scale;
  const dx = (width - drawWidth) * 0.55;
  const dy = (height - drawHeight) * 0.5;
  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
}

function useFrameScrub(sectionRef: React.RefObject<HTMLElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(0);
  const rafRef = useRef(0);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { clientWidth, clientHeight } = canvas;
    if (canvas.width !== clientWidth * dpr || canvas.height !== clientHeight * dpr) {
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawCover(ctx, img, clientWidth, clientHeight);
  }, []);

  // Pré-carrega todos os frames; desenha o corrente assim que carregar.
  useEffect(() => {
    framesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (i === currentIndexRef.current) draw(i);
      };
      return img;
    });
    const onResize = () => draw(currentIndexRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(progress * FRAME_COUNT))
    );
    if (index === currentIndexRef.current) return;
    currentIndexRef.current = index;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(index));
  });

  return canvasRef;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const canvasRef = useFrameScrub(sectionRef);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate flex min-h-dvh items-end overflow-hidden pt-24 pb-20 sm:pb-24"
    >
      <Image
        src={frameSrc(0)}
        alt="Ilustração em estilo HQ de um profissional trabalhando em um café aconchegante, com chuva na janela"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[55%_50%]"
      />
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 size-full"
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.p
            variants={item}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {hero.titleLine1}
            <br />
            <span className="glow-text text-primary">{hero.titleLine2}</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-md text-lg text-foreground/85"
          >
            {hero.subtext}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="glow-btn h-12 border-primary bg-background/40 px-6 text-base text-foreground backdrop-blur-sm hover:bg-primary/10"
              render={
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" />
              }
            >
              {hero.primaryCta}
              <ArrowRight className="ml-1 size-4 transition-transform group-hover/button:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              nativeButton={false}
              className="h-12 px-6 text-base text-foreground hover:text-primary"
              render={<a href="#projetos" />}
            >
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute inset-x-0 bottom-5 flex justify-center"
        aria-hidden="true"
      >
        <ChevronDown className="size-6 animate-bounce text-foreground/60" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build/export conclui sem erros de tipo ou lint.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "Reescrever hero como header scroll-scrub com frames do café

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Tint âmbar no FinalCTA

**Files:**
- Modify: `components/sections/FinalCTA.tsx:17`

**Interfaces:**
- Consumes: token `--primary` aquecido (Task 2).

- [ ] **Step 1: Adicionar overlay âmbar sobre a foto**

Logo após a linha `<div className="absolute inset-0 bg-black/70" aria-hidden="true" />`, inserir:

```tsx
      <div
        className="absolute inset-0 bg-primary/20 mix-blend-overlay"
        aria-hidden="true"
      />
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/FinalCTA.tsx
git commit -m "Aplicar tint âmbar na imagem do CTA final

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Verificação no browser

**Files:** nenhum (verificação).

- [ ] **Step 1: Subir dev server** — `npm run dev` em background.
- [ ] **Step 2: Chrome-devtools em `http://localhost:3000`:**
  - Screenshot do hero em 1440×900: cena do café visível, texto legível sobre o gradiente.
  - Rolar até ~metade do hero e screenshot: frame do canvas mudou (comparar chuva/luzes).
  - Screenshot em 390×844 (mobile): personagem enquadrado, texto legível.
  - Rolar a página inteira: seções (stats, serviços, planos, portfólio, CTA) com paleta aquecida coerente.
  - Console sem erros; network sem 404 de frames.
- [ ] **Step 3: Corrigir qualquer problema encontrado e commitar os ajustes (stage seletivo).**

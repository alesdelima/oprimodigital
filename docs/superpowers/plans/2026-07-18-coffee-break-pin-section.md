# Coffee Break Pin Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir a seção `Differentials` (grid estático de ícones) por uma nova seção `CoffeeBreak`: um momento de marca divertido com scroll pinado sobre 30 frames de uma xícara de café fumegando.

**Architecture:** Client component com um wrapper `<section>` alto (`h-[250vh]`) contendo um `<div className="sticky top-0 h-dvh">`. `useScroll` (framer-motion) com `offset: ["start start", "end end"]` mapeia o progresso do scroll dentro do wrapper para um índice de frame (0–29); o `src` de uma `<img>` é trocado imperativamente via ref a cada mudança de índice (sem re-render). A headline aparece via fade sincronizado ao scroll (`useTransform`). `useReducedMotion` trava num frame estático e mostra a headline sem depender do scroll.

**Tech Stack:** Next.js 15 (`output: "export"`), React, Tailwind v4, framer-motion 12 (já instalado, sem novas dependências).

## Global Constraints

- Sem CTA nesta seção — só eyebrow + xícara animada + headline (decisão do usuário no design).
- Eyebrow fixo: "Pausa para o café". Headline fixa: "Respira, toma um café. A gente cuida do resto do site." (escolhida pelo usuário).
- Pin dura ~2.5x a altura da viewport → `h-[250vh]` no wrapper.
- `Differentials.tsx` e o array `differentials` em `lib/content.ts` **não são apagados** (o `StatsBar` ainda os usa) — só deixam de ser renderizados como seção própria em `app/page.tsx`.
- Nenhuma dependência nova. `output: "export"` — assets estáticos servidos de `public/`.
- Projeto não tem test runner configurado (sem Jest/Vitest, `docs`/`node_modules` à parte) — verificação é via `npx tsc --noEmit`, `npm run build` e checagem manual no browser (chrome-devtools), seguindo o padrão já usado nas features anteriores desta sessão.

---

### Task 1: Mover os frames do cafe3d para `public/`

**Files:**
- Move: `img/cafe3d/frame-01.jpg` … `img/cafe3d/frame-30.jpg` → `public/frames/cafe3d/frame-01.jpg` … `public/frames/cafe3d/frame-30.jpg`

**Interfaces:**
- Produces: 30 arquivos estáticos acessíveis via `/frames/cafe3d/frame-01.jpg` … `/frames/cafe3d/frame-30.jpg` (mesma convenção de `public/frames/hero/`).

- [ ] **Step 1: Criar o diretório de destino e mover os arquivos**

```bash
mkdir -p "public/frames/cafe3d"
mv img/cafe3d/*.jpg "public/frames/cafe3d/"
rmdir img/cafe3d
```

- [ ] **Step 2: Verificar que os 30 arquivos estão no destino e a pasta de origem sumiu**

```bash
ls public/frames/cafe3d | wc -l
```

Expected: `30`

```bash
ls img/cafe3d 2>&1
```

Expected: erro "No such file or directory" (pasta removida; `img/` continua existindo com os outros arquivos que já estavam lá).

- [ ] **Step 3: Commit**

```bash
git add public/frames/cafe3d
git commit -m "$(cat <<'EOF'
Mover frames do cafe3d para public/frames

Prepara os 30 frames da xícara de café para serem servidos
estaticamente pela nova seção CoffeeBreak.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

Nota: `img/` está no `.gitignore`, então `git add public/frames/cafe3d` só inclui os arquivos novos — a remoção de `img/cafe3d` não aparece no `git status` (nunca foi rastreada).

---

### Task 2: Criar o componente `CoffeeBreak`

**Files:**
- Create: `components/sections/CoffeeBreak.tsx`

**Interfaces:**
- Consumes: nada de outros componentes do projeto (auto-contido); usa `motion`, `useMotionValueEvent`, `useReducedMotion`, `useScroll`, `useTransform` de `"framer-motion"` (mesma lib já usada em `components/sections/Hero.tsx`).
- Produces: `export function CoffeeBreak()` — um componente de seção sem props, para ser importado em `app/page.tsx` no Task 3.

- [ ] **Step 1: Escrever o componente completo**

```tsx
"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const FRAME_COUNT = 30;

function frameSrc(index: number) {
  return `/frames/cafe3d/frame-${String(index + 1).padStart(2, "0")}.jpg`;
}

export function CoffeeBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    framesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new window.Image();
      img.src = frameSrc(i);
      return img;
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reducedMotion || !imgRef.current) return;
    const index = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(progress * FRAME_COUNT))
    );
    const src = frameSrc(index);
    if (imgRef.current.src.endsWith(src)) return;
    imgRef.current.src = src;
  });

  const scrollHeadlineOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  useEffect(() => {
    if (reducedMotion && imgRef.current) {
      imgRef.current.src = frameSrc(FRAME_COUNT - 1);
    }
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center gap-6 overflow-hidden bg-background px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Pausa para o café
        </p>
        <div className="relative aspect-[880/587] w-full max-w-md">
          <img
            ref={imgRef}
            src={frameSrc(0)}
            alt="Xícara de café fumegante"
            className="h-full w-full object-contain"
          />
        </div>
        <motion.h2
          style={{ opacity: reducedMotion ? 1 : scrollHeadlineOpacity }}
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Respira, toma um café. A gente cuida do resto do site.
        </motion.h2>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Checar tipos**

```bash
npx tsc --noEmit -p tsconfig.json
```

Expected: sem output (sem erros).

- [ ] **Step 3: Commit**

```bash
git add components/sections/CoffeeBreak.tsx
git commit -m "$(cat <<'EOF'
Criar seção CoffeeBreak com pin-scroll da xícara de café

Componente auto-contido: wrapper alto + div sticky, troca de frame
via scroll (mesmo padrão do scrub do Hero, sem cover-crop) e headline
com fade sincronizado ao progresso do scroll.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Trocar `Differentials` por `CoffeeBreak` em `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CoffeeBreak` de `@/components/sections/CoffeeBreak` (produzido no Task 2).

- [ ] **Step 1: Atualizar o import e o uso no JSX**

Em `app/page.tsx`, trocar:

```tsx
import { Differentials } from "@/components/sections/Differentials";
```

por:

```tsx
import { CoffeeBreak } from "@/components/sections/CoffeeBreak";
```

E trocar:

```tsx
        <Services />
        <Differentials />
        <Pricing />
```

por:

```tsx
        <Services />
        <CoffeeBreak />
        <Pricing />
```

- [ ] **Step 2: Checar tipos e build estático**

```bash
npx tsc --noEmit -p tsconfig.json
```

Expected: sem output.

```bash
npm run build
```

Expected: build conclui sem erros (export estático gerado).

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "$(cat <<'EOF'
Substituir Differentials por CoffeeBreak na home

Differentials.tsx e o array differentials em lib/content.ts continuam
existindo (usados pelo StatsBar) — só a seção deixa de ser renderizada
aqui, dando lugar à pausa para o café.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Verificação end-to-end no browser

**Files:** nenhum (só verificação manual/chrome-devtools).

- [ ] **Step 1: Subir o dev server (ou reaproveitar um já rodando) e abrir a home**

```bash
npm run dev
```

Navegar até a home no navegador (chrome-devtools MCP `navigate_page`/`new_page`).

- [ ] **Step 2: Rolar até a seção e confirmar o pin**

Usar `evaluate_script` pra rolar progressivamente pela seção (entre o topo e o fim do wrapper de `250vh`) e tirar screenshots em 3–4 pontos. Confirmar:
- A seção fica "grudada" na tela por ~2.5 alturas de viewport antes de voltar a rolar para Planos.
- O frame da xícara avança (vapor subindo) conforme o scroll avança dentro do wrapper.
- A headline "Respira, toma um café..." só fica visível (opacity ~1) perto do fim do pin, não no início.

- [ ] **Step 3: Testar `prefers-reduced-motion: reduce`**

Via chrome-devtools (Emulation → `prefers-reduced-motion: reduce`), recarregar e confirmar:
- A xícara aparece direto no frame 30 (vapor already subindo), sem depender de scroll.
- A headline já está visível desde o início (opacity 1), sem depender de scroll.

- [ ] **Step 4: Conferir que nada mais quebrou**

- `list_console_messages` (chrome-devtools) sem erros/warnings.
- Rolar até o `StatsBar` (faixa logo abaixo do Hero) e confirmar que os itens de `differentials` ("Design Premium", "SEO", etc.) continuam aparecendo na faixa em movimento — prova de que remover a seção `Differentials` da página não afetou o `StatsBar`.

- [ ] **Step 5: Reportar resultado**

Nenhum commit neste passo — é só checagem. Se algo estiver errado, voltar ao Task correspondente, corrigir, e recommitar antes de seguir.

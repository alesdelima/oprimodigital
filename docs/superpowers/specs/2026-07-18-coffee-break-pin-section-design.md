# Seção "Pausa para o café" (pin-scroll) no lugar de Differentials

**Data:** 2026-07-18
**Decisões do usuário:** sem CTA, só frase + animação; copy escrita por mim, headline
escolhida pelo usuário; pin de ~2.5x a altura da viewport.

## Contexto

O site (O Primo Digital, Next.js 15 `output: "export"`, Tailwind v4, framer-motion 12) tem
hoje, entre `Services` e `Pricing`, a seção `Differentials` (`components/sections/Differentials.tsx`):
um grid estático 2x4 com ícone + label ("Design Premium", "SEO", "Performance", "Segurança",
"Escalabilidade", "Hospedagem", "Suporte", "Código Limpo"), vindos de `differentials` em
`lib/content.ts` (linhas 105–114).

Esse mesmo array `differentials` já foi mesclado na faixa (marquee) do `StatsBar`
(`components/sections/StatsBar.tsx`) numa mudança anterior desta sessão — os 8 itens já
aparecem lá, rolando horizontalmente logo abaixo do Hero. Portanto, substituir o grid
`Differentials` por outra coisa **não perde informação**: o conteúdo já vive no StatsBar.

O usuário forneceu 30 frames em `img/cafe3d/frame-01.jpg` … `frame-30.jpg` (880×587,
~30 KB cada, ~0.92 MB total, fundo preto puro): uma xícara de café em still-life, com vapor
subindo progressivamente entre os frames — um efeito de "a bebida esquentando" conforme a
sequência avança. `img/` está no `.gitignore` (fonte local, não versionada).

Objetivo: trocar `Differentials` por uma seção `CoffeeBreak` divertida — "pausa para o café"
— com scroll-scrub **pinado** (a seção gruda na tela enquanto os frames avançam, diferente
do scrub do Hero, que não é pinado).

## 1. Assets

Mover (não copiar) os 30 frames para `public/frames/cafe3d/frame-01.jpg` … `frame-30.jpg`,
seguindo a mesma convenção de nomes/local já usada em `public/frames/hero/`. A pasta
`img/cafe3d/` de origem é removida após a cópia (conteúdo já preservado em `public/`, e
`img/` nunca foi rastreado pelo git).

## 2. Componente `components/sections/CoffeeBreak.tsx`

Client component (`"use client"`), substituindo `Differentials` em `app/page.tsx`
(mesma posição: entre `Services` e `Pricing`). `Differentials.tsx` e o array `differentials`
em `lib/content.ts` continuam existindo (ainda usados pelo `StatsBar`) — só o `import`/uso
da seção `<Differentials />` em `page.tsx` é trocado por `<CoffeeBreak />`.

### Estrutura

```tsx
const FRAME_COUNT = 30;
function frameSrc(i: number) {
  return `/frames/cafe3d/frame-${String(i + 1).padStart(2, "0")}.jpg`;
}

<section ref={sectionRef} className="relative h-[250vh]">
  <div className="sticky top-0 flex h-dvh flex-col items-center justify-center gap-6 overflow-hidden bg-background px-4 text-center">
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
      Pausa para o café
    </p>
    <div className="relative aspect-[880/587] w-full max-w-md">
      <img ref={imgRef} src={frameSrc(0)} alt="" className="h-full w-full object-contain" />
    </div>
    <motion.h2
      style={{ opacity: headlineOpacity }}
      className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
    >
      Respira, toma um café. A gente cuida do resto do site.
    </motion.h2>
  </div>
</section>
```

### Mecânica de scroll (pin)

- Wrapper `<section>` alto (`h-[250vh]`, o "~2.5x" escolhido pelo usuário) — a trilha de
  scroll onde o pin acontece.
- `<div className="sticky top-0 h-dvh ...">` — fica grudada no topo da viewport enquanto o
  usuário rola dentro do wrapper; quando o wrapper termina, a página volta a rolar
  normalmente para `Pricing`.
- `useScroll({ target: sectionRef, offset: ["start start", "end end"] })` (framer-motion,
  já usado no Hero) — progresso 0 quando o topo do wrapper toca o topo da viewport (início
  do pin), progresso 1 quando o fim do wrapper toca o fim da viewport (fim do pin).
- `useMotionValueEvent(scrollYProgress, "change", ...)` calcula
  `index = clamp(floor(progress * FRAME_COUNT), 0, FRAME_COUNT - 1)` e atualiza
  `imgRef.current.src = frameSrc(index)` imperativamente (sem re-render por frame) —
  mais simples que o canvas do Hero, pois aqui não há crop/cover com viés: as imagens têm
  fundo preto e são exibidas com `object-contain`, centralizadas, sem cortar nada.
- **Fundo preto dos frames + `bg-background` da seção (`#14100c`, quase preto):** a xícara
  "flutua" sem borda visível de retângulo, sem precisar de qualquer tratamento de imagem.
- **Pré-carregamento:** todos os 30 frames carregados via `new window.Image()` num
  `useEffect` (mesmo padrão do Hero, `Hero.tsx` linhas 61–76), garantindo troca de `src`
  instantânea (cache hit) durante o scroll.
- **Headline com fade-in sincronizado:** `useTransform(scrollYProgress, [0.7, 1], [0, 1])`
  controla a opacidade do `<h2>` — a frase só aparece no último terço do pin, coincidindo
  com o vapor subindo nos frames finais (clímax visual + texto juntos).
- **`prefers-reduced-motion`:** `useReducedMotion()` → pula o listener de scroll e trava
  `imgRef` no último frame (30, vapor já subindo) desde o mount. O `style={{ opacity }}` do
  `<h2>` passa a usar `reducedMotion ? 1 : headlineOpacity` — ou seja, com movimento
  reduzido a frase já nasce visível, sem depender do scroll. O wrapper continua com a mesma
  altura (`h-[250vh]`) para não gerar layout shift entre preferências — mesma escolha já
  feita no Hero.

## 3. O que NÃO muda

- `Differentials.tsx` e `differentials` em `lib/content.ts` continuam existindo (usados
  pelo `StatsBar`); não são apagados, só deixam de ser renderizados como seção própria.
- Resto da ordem de seções em `app/page.tsx`, copy de outras seções, rotas, footer.
- Nenhuma dependência nova — framer-motion já cobre `useScroll`/`useMotionValueEvent`/
  `useTransform`/`useReducedMotion`.
- `output: "export"` — tudo estático; frames servidos de `public/frames/cafe3d/`.

## 4. Riscos e mitigação

- **Import não utilizado:** ao trocar `<Differentials />` por `<CoffeeBreak />` em
  `page.tsx`, remover o `import { Differentials } from "@/components/sections/Differentials"`
  não utilizado (ou manter comentado só se o usuário quiser reaproveitar a seção depois —
  por padrão, remove).
- **Altura do pin em telas muito baixas (mobile paisagem):** `h-dvh` já é a mesma unidade
  usada no Hero, então o comportamento é consistente com o que já existe no site.
- **1 MB de imagens adicionais:** carregamento em background pós-mount (mesmo padrão do
  Hero), sem bloquear LCP da página (a seção fica bem abaixo da dobra).

## 5. Verificação

- `npm run build` sem erros (export estático) e `npx tsc --noEmit` limpo.
- No browser (chrome-devtools): rolar até a seção, confirmar que ela "gruda" na tela por
  ~2.5 alturas de viewport, os frames avançam (vapor subindo) e a headline aparece só perto
  do fim do pin; depois disso a rolagem continua normal para Planos.
- Testar com `prefers-reduced-motion: reduce`: frame fixo (vapor já subindo), headline
  visível, sem esperar scroll.
- Conferir que `Differentials`/`differentials` seguem intactos e que o `StatsBar` continua
  mostrando os 8 itens na faixa.
- Sem erros no console.

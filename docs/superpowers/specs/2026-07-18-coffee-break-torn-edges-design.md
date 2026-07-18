# CoffeeBreak: palco preto + bordas rasgadas

**Data:** 2026-07-18
**Decisões do usuário:** seção inteira preta (não card polaroid); rasgo irregular orgânico
(não serrilhado de cupom, não ondulado).

## Contexto

Os 30 frames de `public/frames/cafe3d/` têm fundo `#000000` puro, mas a div sticky do
`CoffeeBreak` (`components/sections/CoffeeBreak.tsx`) usa `bg-background` (`#14100c`,
marrom-café escuro). A diferença sutil entre os tons cria um retângulo preto visível ao
redor da imagem — parece erro, não escolha.

Solução escolhida: assumir o preto. A seção vira um "palco escuro" em preto puro (o frame
se funde sem costura) e a mudança de cor é marcada de propósito com bordas rasgadas
orgânicas na transição topo/base, como uma página arrancada revelando o palco por baixo.

## Mudanças (só `components/sections/CoffeeBreak.tsx`)

1. **Fundo do palco:** a div sticky troca `bg-background` por `bg-black`.

2. **Rasgos SVG (topo e base):** dois SVGs inline, `absolute`, dentro da div sticky
   (`inset-x-0 top-0` / `inset-x-0 bottom-0`), ~48px de altura, `pointer-events-none`,
   `aria-hidden`, `preserveAspectRatio="none"`. Path de rasgo irregular orgânico (linha
   quebrada assimétrica com dentes de profundidades variadas), `fill: var(--background)`:
   - Topo: o marrom do site desce "rasgado" sobre o preto.
   - Base: espelhado (mesmo path com `scale(-1)` ou path próprio), o marrom sobe.
   - Ficam dentro do sticky, então acompanham o pin o tempo todo.

3. **Glow âmbar:** div `absolute` centrada atrás da xícara com
   `bg-[radial-gradient(...)]` usando `--primary` a ~8% de opacidade, ecoando as luzes
   Edison do Hero. `pointer-events-none`, `aria-hidden`.

4. **Sem outras mudanças:** mecânica do pin, copy, reduced-motion e preload intactos.
   `.grain-overlay` é global/fixed e já cobre a seção.

## Verificação

- Browser: sem retângulo visível ao redor da xícara (preto contínuo); rasgos aparecem
  no topo/base durante todo o pin; glow sutil atrás da xícara; transição para Services
  (acima) e Pricing (abaixo) sem linha reta dura.
- `npx tsc --noEmit` limpo.
- Reduced-motion: continua com frame fixo + headline visível.

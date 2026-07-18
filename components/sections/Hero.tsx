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
import { SplitText } from "@/components/motion/SplitText";
import { hero, whatsappHref } from "@/lib/content";

const FRAME_COUNT = 30;
const SCRUB_SPEED = 1.6; // >1 = passa os frames mais rápido por pixel rolado

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

function useFrameScrub(
  sectionRef: React.RefObject<HTMLElement | null>,
  disabled: boolean
) {
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
    if (disabled) return;
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
  }, [draw, disabled]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (disabled) return;
    const sped = Math.min(1, progress * SCRUB_SPEED);
    const index = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(sped * FRAME_COUNT))
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
  const canvasRef = useFrameScrub(sectionRef, !!reducedMotion);

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
      {/* Sempre no DOM (SSR e cliente rendem igual — evita mismatch de
          hidratação para quem usa prefers-reduced-motion); com movimento
          reduzido o scrub é desativado no hook e o canvas fica transparente,
          deixando visível só o frame estático acima. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 size-full"
      />

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
            <SplitText text={hero.titleLine1} />
            <br />
            <SplitText text={hero.titleLine2} className="glow-text text-primary" />
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

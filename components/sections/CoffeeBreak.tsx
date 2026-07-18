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

  // framesRef segura as instâncias de Image para elas não serem coletadas
  // antes de o browser cachear os frames — sem isso a troca de src no scroll
  // poderia disparar novas requisições.
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
      {/* Palco em preto puro: mesmo tom do fundo dos frames, para a xícara
          fundir sem costura. A troca de cor é assumida pelas bordas rasgadas. */}
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center gap-6 overflow-hidden bg-black px-4 text-center">
        <TornEdge position="top" />
        <TornEdge position="bottom" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 14%, transparent) 0%, transparent 70%)",
          }}
        />
        <p className="relative text-sm font-medium uppercase tracking-[0.2em] text-primary">
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
          className="relative font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Respira, toma um café. A gente cuida do resto do site.
        </motion.h2>
      </div>
    </section>
  );
}

/* Rasgo irregular orgânico na cor do site (--background), marcando de
   propósito a transição entre o marrom das seções vizinhas e o palco preto. */
function TornEdge({ position }: { position: "top" | "bottom" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={
        position === "top"
          ? "pointer-events-none absolute inset-x-0 top-0 h-10 w-full sm:h-12"
          : "pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full rotate-180 sm:h-12"
      }
    >
      <path
        fill="var(--background)"
        d="M0,0 H1440 V16 L1392,26 L1348,12 L1301,30 L1264,18 L1210,34 L1170,14 L1122,28 L1080,20 L1032,38 L988,16 L942,30 L897,22 L849,36 L806,12 L762,26 L718,18 L672,32 L630,14 L586,28 L540,20 L495,34 L452,16 L410,30 L368,22 L322,36 L280,12 L238,24 L196,18 L152,32 L110,16 L70,28 L34,20 L0,30 Z"
      />
    </svg>
  );
}

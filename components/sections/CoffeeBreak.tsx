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

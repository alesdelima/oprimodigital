"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero, whatsappHref } from "@/lib/content";

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
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:flex lg:min-h-dvh lg:items-center lg:pt-28 lg:pb-16"
    >
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
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
            className="mt-6 max-w-md text-lg text-muted-foreground"
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
              className="glow-btn h-12 border-primary bg-transparent px-6 text-base text-foreground hover:bg-primary/10"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[906/1024] w-full max-w-md lg:max-w-none"
        >
          <Image
            src="/images/hero-illustration.jpg"
            alt="Ilustração em estilo HQ noir de um desenvolvedor em sua estação de trabalho, com a cidade ao fundo"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

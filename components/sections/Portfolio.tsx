"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/lib/content";

export function Portfolio() {
  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Projetos recentes
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Histórias reais, resultados reais
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => {
            const hasLink = Boolean(project.href);
            const cardClassName =
              "group relative block aspect-square overflow-hidden rounded-2xl border border-border";
            const content = (
              <>
                <Image
                  src={project.image}
                  alt={`Capa do projeto ${project.name}`}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/90" />
                <div className="absolute inset-0 opacity-0 shadow-[inset_0_0_60px_rgba(255,122,0,0.35)] transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs uppercase tracking-wide text-primary">
                    {project.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    {project.name}
                  </h3>
                  {hasLink && (
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Ver Projeto
                      <ArrowUpRight className="size-4" />
                    </span>
                  )}
                </div>
              </>
            );
            return (
              <Reveal key={`${project.name}-${index}`} delay={(index % 4) * 0.08}>
                {hasLink ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    aria-disabled="true"
                    className={`${cardClassName} cursor-default`}
                  >
                    {content}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

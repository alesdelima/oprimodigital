import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { finalCta, whatsappHref } from "@/lib/content";

export function FinalCTA() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-28">
      <Image
        src="/images/cta-alley.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-primary/20 mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30"
        aria-hidden="true"
      />
      <div
        className="halftone absolute inset-0 opacity-20 mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {finalCta.title.split("procurando exatamente")[0]}
            <span className="text-primary">
              procurando exatamente
              {finalCta.title.split("procurando exatamente")[1]}
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            {finalCta.subtext}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10">
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="glow-btn h-16 border-primary bg-primary/10 px-8 text-lg font-medium text-white hover:bg-primary/20"
              render={
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" />
              }
            >
              🚀 {finalCta.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

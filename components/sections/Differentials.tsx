import { Reveal } from "@/components/motion/Reveal";
import { differentials } from "@/lib/content";

export function Differentials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Por que O Primo Digital
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Padrão de qualidade em cada detalhe
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {differentials.map((item, index) => (
            <Reveal key={item.label} delay={(index % 4) * 0.06}>
              <div className="group flex h-full flex-col items-center justify-center gap-3 bg-background px-4 py-10 text-center transition-colors duration-300 hover:bg-surface">
                <item.icon className="size-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                <p className="text-sm text-foreground">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

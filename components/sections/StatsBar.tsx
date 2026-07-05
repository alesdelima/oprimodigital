import { Reveal } from "@/components/motion/Reveal";
import { stats } from "@/lib/content";

export function StatsBar() {
  return (
    <section className="relative border-y border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <Reveal key={stat.sublabel} delay={index * 0.06}>
              <div className="group flex items-center gap-3">
                <stat.icon className="size-6 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                <div>
                  <p className="font-display text-lg font-semibold leading-none text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

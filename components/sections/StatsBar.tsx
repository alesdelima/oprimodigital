import { Reveal } from "@/components/motion/Reveal";
import { differentials, stats } from "@/lib/content";

const items = [
  ...stats.map((stat) => ({
    icon: stat.icon,
    label: stat.label,
    sublabel: stat.sublabel as string | undefined,
  })),
  ...differentials.map((item) => ({
    icon: item.icon,
    label: item.label,
    sublabel: undefined as string | undefined,
  })),
];

export function StatsBar() {
  const track = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/60 py-8">
      <Reveal className="marquee-fade">
        <div className="marquee-track flex w-max animate-marquee items-center gap-12 px-4">
          {track.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="group flex items-center gap-3"
            >
              <item.icon className="size-6 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
              <div>
                <p className="font-display text-lg font-semibold leading-none text-foreground">
                  {item.label}
                </p>
                {item.sublabel && (
                  <p className="text-xs text-muted-foreground">
                    {item.sublabel}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

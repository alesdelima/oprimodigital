import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { buildWhatsappHref, hostingPlans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Hosting() {
  return (
    <section id="hospedagem" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Hospedagem e manutenção
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Seu site sempre seguro, atualizado e funcionando
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {hostingPlans.map((plan, index) => {
            const message = `Olá! Quero assinar o "${plan.name}" (${plan.price}${plan.period}) de hospedagem com O Primo Digital.`;
            return (
              <Reveal key={plan.name} delay={index * 0.1}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border p-8",
                    plan.featured
                      ? "glow-border border-primary/70 bg-surface-2"
                      : "card-noir border-border"
                  )}
                >
                  {plan.badge && (
                    <span className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/60 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold">
                    {plan.name}
                  </h3>
                  <div className="mt-4">
                    <span className="font-display text-4xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      "mt-8 h-12 text-base",
                      plan.featured
                        ? "glow-btn border border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border bg-transparent text-foreground hover:border-primary/60 hover:bg-primary/10"
                    )}
                    variant="outline"
                    nativeButton={false}
                    render={
                      <a
                        href={buildWhatsappHref(message)}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

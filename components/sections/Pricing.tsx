"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { buildWhatsappHref, pricingPlans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="planos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Planos de desenvolvimento
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Um plano para cada estágio do seu negócio
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const message = `Olá! Quero solicitar o plano "${plan.name}" (${plan.price}) com O Primo Digital.`;
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
                  {plan.featured && (
                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      animate={{
                        boxShadow: [
                          "0 0 24px rgba(255,122,0,0.25)",
                          "0 0 44px rgba(255,122,0,0.45)",
                          "0 0 24px rgba(255,122,0,0.25)",
                        ],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {plan.badge && (
                    <span className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/60 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="font-display text-xl font-semibold">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                  <div className="mt-6">
                    {plan.priceLead && (
                      <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                        {plan.priceLead}
                      </span>
                    )}
                    <span className="font-display text-4xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.priceSuffix && (
                      <span className="text-sm text-muted-foreground">
                        {plan.priceSuffix}
                      </span>
                    )}
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

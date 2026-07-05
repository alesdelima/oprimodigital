import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Depoimentos
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Quem já trabalhou com a gente
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <figure className="card-noir flex h-full flex-col rounded-2xl p-8">
                <div className="flex gap-1" aria-label="Avaliação 5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full border border-border bg-surface font-display text-sm font-semibold text-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

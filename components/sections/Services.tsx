import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            O que fazemos
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Um time completo para a sua presença digital
          </h2>
          <p className="mt-4 text-muted-foreground">
            Do primeiro clique à operação diária: cobrimos cada etapa da sua
            jornada digital com um único padrão de qualidade.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 0.08}>
              <div className="card-noir group h-full rounded-2xl p-7">
                <service.icon className="size-8 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

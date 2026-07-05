import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/Reveal";
import { faq } from "@/lib/content";

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Perguntas frequentes
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tudo que você precisa saber
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 border-t border-border">
          <Accordion>
            {faq.map((item, index) => (
              <AccordionItem key={item.question} value={String(index)}>
                <AccordionTrigger className="py-5 text-base font-medium text-foreground hover:text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

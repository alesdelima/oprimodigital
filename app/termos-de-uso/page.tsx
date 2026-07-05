import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Condições de uso do site e dos serviços prestados pela O Primo Digital.",
};

export default function TermosDeUsoPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Legal
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Termos de Uso
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última atualização: julho de 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:mb-4">
            <section>
              <h2>1. Aceitação dos termos</h2>
              <p>
                Ao navegar neste site ou contratar os serviços da{" "}
                {site.name}, você concorda com os termos descritos nesta
                página. Caso não concorde, recomendamos não utilizar o site
                ou os serviços.
              </p>
            </section>

            <section>
              <h2>2. Serviços oferecidos</h2>
              <p>
                A {site.name} presta serviços de desenvolvimento de sites,
                landing pages, aplicações web, sistemas personalizados,
                automação de processos e consultoria digital, conforme escopo
                definido em proposta comercial específica para cada cliente.
              </p>
            </section>

            <section>
              <h2>3. Orçamentos e pagamentos</h2>
              <p>
                Valores, prazos e condições de pagamento são definidos em
                proposta individual antes do início de cada projeto. Os
                planos e preços exibidos neste site são referenciais e podem
                ser ajustados conforme o escopo real solicitado.
              </p>
            </section>

            <section>
              <h2>4. Propriedade intelectual</h2>
              <p>
                Após a quitação integral do projeto, o cliente recebe os
                direitos de uso sobre o material entregue. Componentes,
                metodologias e códigos internos reutilizáveis da{" "}
                {site.name} permanecem de sua propriedade.
              </p>
            </section>

            <section>
              <h2>5. Hospedagem e suporte</h2>
              <p>
                Os planos de hospedagem e suporte descritos neste site são
                contratados separadamente e renovados conforme a
                periodicidade escolhida, podendo ser cancelados a qualquer
                momento mediante aviso prévio.
              </p>
            </section>

            <section>
              <h2>6. Alterações destes termos</h2>
              <p>
                Estes termos podem ser atualizados periodicamente. A versão
                vigente é sempre a publicada nesta página.
              </p>
            </section>

            <section>
              <h2>7. Contato</h2>
              <p>
                Dúvidas sobre estes termos podem ser enviadas para{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

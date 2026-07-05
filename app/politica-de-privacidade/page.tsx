import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como O Primo Digital coleta, usa e protege as informações dos visitantes e clientes.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Legal
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última atualização: julho de 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:mb-4">
            <section>
              <h2>1. Quem somos</h2>
              <p>
                A {site.name}, com atuação em {site.location}, é responsável
                pelo tratamento dos dados coletados através deste site e dos
                canais de contato informados no rodapé.
              </p>
            </section>

            <section>
              <h2>2. Quais dados coletamos</h2>
              <p>
                Coletamos apenas os dados que você nos fornece voluntariamente
                ao entrar em contato, como nome, e-mail, telefone/WhatsApp e o
                conteúdo da sua mensagem, além de dados de navegação
                (como páginas visitadas) para fins de análise e melhoria do
                site.
              </p>
            </section>

            <section>
              <h2>3. Como usamos os dados</h2>
              <p>
                Usamos essas informações exclusivamente para responder às
                suas solicitações, elaborar orçamentos, prestar os serviços
                contratados e, quando autorizado, enviar comunicações sobre
                nossos serviços.
              </p>
            </section>

            <section>
              <h2>4. Compartilhamento</h2>
              <p>
                Não vendemos nem compartilhamos seus dados com terceiros para
                fins de marketing. Dados podem ser compartilhados apenas com
                prestadores de serviço essenciais à operação (como hospedagem
                e ferramentas de comunicação), sob obrigação de
                confidencialidade.
              </p>
            </section>

            <section>
              <h2>5. Seus direitos</h2>
              <p>
                Você pode solicitar, a qualquer momento, a confirmação, o
                acesso, a correção ou a exclusão dos seus dados pessoais,
                entrando em contato pelo e-mail{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  {site.email}
                </a>
                , em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </section>

            <section>
              <h2>6. Contato</h2>
              <p>
                Dúvidas sobre esta política podem ser enviadas para{" "}
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

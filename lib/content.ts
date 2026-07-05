import {
  Globe,
  Rocket,
  Code2,
  Cog,
  Workflow,
  LineChart,
  ShieldCheck,
  Gauge,
  Server,
  Headset,
  Sparkles,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "O Primo Digital",
  tagline: "Tecnologia. Estratégia. Resultados.",
  location: "Foz do Iguaçu - PR",
  email: "contato@oprimodigital.com",
  whatsappNumber: "5545999999999",
  whatsappMessage:
    "Olá! Vim pelo site e quero solicitar um orçamento com O Primo Digital.",
  instagram: "@oprimodigital",
};

export function buildWhatsappHref(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappHref = buildWhatsappHref(site.whatsappMessage);

export const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Planos", href: "#planos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export const hero = {
  eyebrow: "Desenvolvimento de sites & sistemas",
  titleLine1: "Seu negócio merece mais do que um site.",
  titleLine2: "Merece resultados.",
  subtext:
    "Criamos experiências digitais de alto impacto que transformam visitantes em clientes.",
  primaryCta: "Solicitar orçamento",
  secondaryCta: "Conhecer projetos",
};

export const stats: { label: string; sublabel: string; icon: LucideIcon }[] = [
  { label: "+50", sublabel: "Projetos entregues", icon: Rocket },
  { label: "100%", sublabel: "Responsivos", icon: Smartphone },
  { label: "SEO", sublabel: "Otimizado", icon: Search },
  { label: "Alta", sublabel: "Performance", icon: Gauge },
  { label: "Suporte", sublabel: "Especializado", icon: Headset },
];

export const services: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Globe,
    title: "Sites",
    description:
      "Presença institucional rápida, elegante e construída para converter visitas em contato qualificado.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "Páginas de alta conversão desenhadas em torno de uma única oferta e um único objetivo: a venda.",
  },
  {
    icon: Code2,
    title: "Aplicações Web",
    description:
      "Produtos web sob medida, com interface moderna e arquitetura pensada para crescer com o seu negócio.",
  },
  {
    icon: Cog,
    title: "Sistemas",
    description:
      "Plataformas internas que organizam operações, dados e equipes em um único painel de controle.",
  },
  {
    icon: Workflow,
    title: "Automações",
    description:
      "Fluxos automáticos que eliminam tarefas manuais e devolvem tempo para o que gera receita.",
  },
  {
    icon: LineChart,
    title: "Consultoria Digital",
    description:
      "Diagnóstico estratégico de presença online com plano de ação claro e prioridades de investimento.",
  },
];

export const differentials: { icon: LucideIcon; label: string }[] = [
  { icon: Sparkles, label: "Design Premium" },
  { icon: Search, label: "SEO" },
  { icon: Gauge, label: "Performance" },
  { icon: ShieldCheck, label: "Segurança" },
  { icon: LineChart, label: "Escalabilidade" },
  { icon: Server, label: "Hospedagem" },
  { icon: Headset, label: "Suporte" },
  { icon: Code2, label: "Código Limpo" },
];

export type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  priceLead?: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

export const pricingPlans: Plan[] = [
  {
    name: "Landing Page",
    price: "R$ 1.490",
    description: "Ideal para quem precisa vender um serviço.",
    features: [
      "Landing Page personalizada",
      "Responsiva",
      "SEO básico",
      "Formulário de contato",
      "Integração com WhatsApp",
      "Certificado SSL",
    ],
    cta: "Quero este plano",
  },
  {
    name: "Site Institucional",
    price: "R$ 2.490",
    description: "A escolha mais frequente para empresas em crescimento.",
    features: [
      "Até 5 páginas",
      "Design exclusivo",
      "SEO avançado",
      "Integração com WhatsApp",
      "Formulários inteligentes",
      "Google Maps",
      "Performance otimizada",
      "Publicação incluída",
    ],
    cta: "Começar agora",
    featured: true,
    badge: "Mais escolhido",
  },
  {
    name: "Site Premium",
    price: "R$ 3.990",
    priceLead: "A partir de",
    description: "Projeto sob medida para operações mais complexas.",
    features: [
      "Projeto sob medida",
      "Aplicações Web",
      "Blog integrado",
      "Área restrita",
      "Integrações personalizadas",
      "Arquitetura escalável",
    ],
    cta: "Solicitar orçamento",
  },
];

export type HostingPlan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

export const hostingPlans: HostingPlan[] = [
  {
    name: "Plano Digital",
    price: "R$ 99",
    period: "/mês",
    features: [
      "Hospedagem Premium",
      "Certificado SSL",
      "Backup diário",
      "Monitoramento contínuo",
      "Suporte técnico",
      "Pequenas alterações",
    ],
    cta: "Assinar",
  },
  {
    name: "Plano Profissional",
    price: "R$ 149",
    period: "/mês",
    features: [
      "Tudo do Plano Digital",
      "Atualizações mensais",
      "Até 1 hora de alterações",
      "Otimizações periódicas",
      "Atendimento prioritário",
    ],
    cta: "Quero tranquilidade",
    featured: true,
    badge: "Recomendado",
  },
];

export type Project = {
  name: string;
  category: string;
  image: string;
};

export const projects: Project[] = [
  {
    name: "Alpha Logística",
    category: "Site Institucional",
    image: "/images/portfolio-truck.jpg",
  },
  {
    name: "Next Solutions",
    category: "Landing Page",
    image: "/images/portfolio-face.jpg",
  },
  {
    name: "Urban Fit",
    category: "Site Institucional",
    image: "/images/portfolio-body.jpg",
  },
  {
    name: "Elevare",
    category: "Site Institucional",
    image: "/images/portfolio-building.jpg",
  },
];

export const testimonials: {
  name: string;
  role: string;
  quote: string;
}[] = [
  {
    name: "Marcos T.",
    role: "CEO, Alpha Transportes",
    quote:
      "O Primo Digital entregou mais que um site. Entregou resultado: nossos pedidos por WhatsApp triplicaram no primeiro mês.",
  },
  {
    name: "Juliana R.",
    role: "Marketing, Next Solutions",
    quote:
      "Processo rápido, comunicação clara e um design que finalmente parece da nossa marca. Recomendo sem hesitar.",
  },
];

export const faq: { question: string; answer: string }[] = [
  {
    question: "Quanto tempo leva para o site ficar pronto?",
    answer:
      "Landing pages ficam prontas em até 7 dias úteis. Sites institucionais levam de 10 a 20 dias, e projetos sob medida têm prazo definido após o diagnóstico inicial.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Trabalhamos com entrada para início do projeto e saldo na entrega. Aceitamos Pix, cartão e boleto, com condições especiais para planos maiores.",
  },
  {
    question: "Vocês registram o domínio?",
    answer:
      "Sim. Cuidamos do registro do domínio e deixamos tudo configurado e funcionando antes da publicação do site.",
  },
  {
    question: "Quem faz a hospedagem do site?",
    answer:
      "Nós. Nossos planos de hospedagem incluem servidor otimizado, SSL, backups automáticos e monitoramento contínuo, sem burocracia técnica para você.",
  },
  {
    question: "Posso solicitar alterações depois de pronto?",
    answer:
      "Sim. Todo plano de hospedagem inclui uma cota de alterações, e ajustes maiores podem ser orçados sob demanda a qualquer momento.",
  },
  {
    question: "Meu site vai aparecer no Google?",
    answer:
      "Todo projeto sai com fundamentos de SEO técnico aplicados desde o início. Para posicionamento competitivo em buscas, oferecemos consultoria de SEO contínua.",
  },
];

export const footerLinks = {
  quick: [
    { label: "Serviços", href: "#servicos" },
    { label: "Planos", href: "#planos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "FAQ", href: "#faq" },
  ],
  legal: [
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "Termos de Uso", href: "/termos-de-uso" },
  ],
};

export const finalCta = {
  title: "Seu próximo cliente está procurando exatamente pelo que você oferece.",
  subtext:
    "Vamos construir uma presença digital que inspire confiança e gere resultados para o seu negócio.",
  cta: "Solicitar orçamento pelo WhatsApp",
};

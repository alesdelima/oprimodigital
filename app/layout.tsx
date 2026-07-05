import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://oprimodigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "O Primo Digital — Sites, Landing Pages e Sistemas sob medida",
    template: "%s | O Primo Digital",
  },
  description:
    "Desenvolvimento de sites, landing pages, aplicações web e automações com foco absoluto em conversão. Tecnologia, estratégia e resultado para o seu negócio.",
  keywords: [
    "desenvolvimento de sites",
    "landing page",
    "criação de sites",
    "aplicações web",
    "automação de processos",
    "sistemas personalizados",
    "agência de tecnologia",
  ],
  authors: [{ name: "O Primo Digital" }],
  creator: "O Primo Digital",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "O Primo Digital",
    title: "O Primo Digital — Seu negócio merece mais do que um site.",
    description:
      "Criamos experiências digitais de alto impacto que transformam visitantes em clientes.",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "O Primo Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O Primo Digital — Seu negócio merece mais do que um site.",
    description:
      "Criamos experiências digitais de alto impacto que transformam visitantes em clientes.",
    images: ["/images/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "O Primo Digital",
  description:
    "Desenvolvimento de sites, landing pages, aplicações web, sistemas personalizados e automação de processos.",
  url: siteUrl,
  image: `${siteUrl}/images/og-cover.jpg`,
  areaServed: "BR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Foz do Iguaçu",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  sameAs: ["https://instagram.com/oprimodigital"],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sites" } },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Landing Pages" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Aplicações Web" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Automação de Processos" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

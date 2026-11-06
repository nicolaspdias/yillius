import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero.jpg";
import estetica from "@/assets/estetica.jpg";
import perfumaria from "@/assets/perfumaria.jpg";
const logo = { url: "/yillius-logo.png" };
const wordmark = { url: "/yillius-wordmark.png" };
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

const social = [
  { href: "https://www.instagram.com/yillius/", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/profile.php?id=100063657968550", label: "Facebook", Icon: Facebook },
];

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {social.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-current/30 transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
        >
          <Icon size={18} strokeWidth={1.25} />
        </a>
      ))}
    </div>
  );
}

const SITE_URL = "https://yillius.pt";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Yillius",
  description: "Centro de Estética e Perfumaria em Santo Tirso. Tratamentos de rosto, corpo, mãos & pés e perfumaria de autor.",
  url: SITE_URL,
  telephone: "+351917005978",
  email: "geral@yillius.pt",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua José Luís de Andrade, 22",
    addressLocality: "Santo Tirso",
    postalCode: "4780-407",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.3435,
    longitude: -8.4756,
  },
  image: `${SITE_URL}/yillius-logo.png`,
  sameAs: [
    "https://www.instagram.com/yillius/",
    "https://www.facebook.com/profile.php?id=100063657968550",
  ],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yillius — Centro de Estética & Perfumaria em Santo Tirso" },
      { name: "description", content: "Yillius: tratamentos de estética e perfumaria de autor num espaço refinado e intimista em Santo Tirso. Rosto, corpo, mãos & pés." },
      { property: "og:title", content: "Yillius — Centro de Estética & Perfumaria" },
      { property: "og:description", content: "Tratamentos de estética e perfumaria de autor num espaço refinado em Santo Tirso." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: "Yillius — Centro de Estética & Perfumaria em Santo Tirso" },
      { property: "og:locale", content: "pt_PT" },
      { property: "og:site_name", content: "Yillius" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yillius — Centro de Estética & Perfumaria" },
      { name: "twitter:description", content: "Tratamentos de estética e perfumaria de autor num espaço refinado em Santo Tirso." },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
    ],
  }),
  component: Index,
});

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Parallax({ src, speed = 0.15, className = "", alt }: { src: string; speed?: number; className?: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const y = useScrollY();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setOffset((r.top + r.height / 2 - window.innerHeight / 2) * -speed);
  }, [y, speed]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-[130%] w-full -top-[15%] object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      />
    </div>
  );
}

const servicos = [
  { n: "01", t: "Rosto", d: "Limpezas profundas, hidratação e tratamentos anti-idade com protocolos personalizados." },
  { n: "02", t: "Corpo", d: "Massagens, modelação e rituais de bem-estar para restaurar o equilíbrio." },
  { n: "03", t: "Mãos & Pés", d: "Manicure e pedicure com acabamento impecável e produtos de excelência." },
  { n: "04", t: "Perfumaria", d: "Fragrâncias selecionadas e aconselhamento olfativo para encontrar a sua assinatura." },
];

function Index() {
  const y = useScrollY();
  useReveal();

  return (
    <main className="overflow-x-hidden">
      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          y > 60 ? "bg-ink/90 py-3 backdrop-blur-md" : "py-6"
        } text-ink-foreground`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a href="#" aria-label="Yillius">
            <img src={wordmark.url} alt="Yillius" className={`w-auto transition-all duration-500 ${y > 60 ? "h-6" : "h-8"}`} />
          </a>
          <nav className="hidden gap-10 eyebrow md:flex">
            <a href="#sobre" className="hover:text-accent transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-accent transition-colors">Serviços</a>
            <a href="#perfumaria" className="hover:text-accent transition-colors">Perfumaria</a>
            <a href="#contacto" className="hover:text-accent transition-colors">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen min-h-[640px] overflow-hidden bg-ink text-ink-foreground">
        <img
          src={hero}
          alt="Frasco de perfume sobre pedra travertino"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ transform: `translate3d(0, ${y * 0.4}px, 0) scale(${1 + y * 0.0003})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10"
          style={{ transform: `translate3d(0, ${y * -0.15}px, 0)`, opacity: Math.max(0, 1 - y / 600) }}
        >
          <p className="eyebrow flex items-center gap-4 text-gold animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="h-px w-12 bg-gold" /> Desde sempre, para si
          </p>
          <h1 className="mt-6 max-w-3xl text-6xl leading-[0.95] md:text-8xl lg:text-9xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            A arte de <em className="text-gold">cuidar</em> de si.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ink-foreground/75 animate-in fade-in duration-1000 delay-300">
            Rituais de beleza e fragrâncias de autor, num espaço pensado para o seu tempo.
          </p>
          <div className="mt-12 flex gap-6 animate-in fade-in duration-1000 delay-500">
            <a href="#contacto" className="eyebrow border border-gold bg-gold px-8 py-4 text-ink transition-colors hover:bg-transparent hover:text-gold">
              Marcar visita
            </a>
            <a href="#servicos" className="eyebrow border border-ink-foreground/30 px-8 py-4 transition-colors hover:border-gold hover:text-gold">
              Descobrir
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 eyebrow text-ink-foreground/50">
          Scroll
          <span className="mx-auto mt-3 block h-12 w-px animate-pulse bg-gold" />
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-32 md:grid-cols-2 md:px-10 md:py-48">
        <div className="reveal">
          <p className="eyebrow text-accent">A Casa</p>
          <h2 className="mt-6 text-5xl leading-tight md:text-6xl">
            Beleza com <em>intenção</em>,<br /> detalhe e calma.
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            Na Yillius, cada visita é um momento seu. Unimos técnicas de estética avançada a uma
            seleção cuidada de perfumes, para que saia mais leve, mais confiante — e inesquecível.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t pt-8">
            {[["10+", "Anos"], ["30+", "Tratamentos"], ["100%", "Dedicação"]].map(([a, b]) => (
              <div key={b}>
                <div className="font-display text-4xl">{a}</div>
                <div className="eyebrow mt-2 text-muted-foreground">{b}</div>
              </div>
            ))}
          </div>
        </div>
        <Parallax src={estetica} alt="Tratamento facial" speed={0.12} className="reveal aspect-[4/5]" />
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-ink py-32 text-ink-foreground md:py-48">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-gold">Serviços</p>
              <h2 className="mt-6 text-5xl md:text-7xl">Rituais Yillius</h2>
            </div>
            <p className="max-w-sm text-ink-foreground/60">Cada tratamento começa com uma conversa — e termina com um resultado à sua medida.</p>
          </div>
          <div className="mt-20 grid border-t border-ink-foreground/15 md:grid-cols-2">
            {servicos.map((s, i) => (
              <div
                key={s.n}
                className="reveal group border-b border-ink-foreground/15 py-12 transition-colors md:px-10 md:odd:border-r hover:bg-ink-foreground/5"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="eyebrow text-gold">{s.n}</span>
                <h3 className="mt-4 text-4xl transition-transform duration-500 group-hover:translate-x-3">{s.t}</h3>
                <p className="mt-4 max-w-sm text-ink-foreground/60">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfumaria parallax band */}
      <section id="perfumaria" className="relative">
        <Parallax src={perfumaria} alt="Perfumes e cremes" speed={0.25} className="h-[90vh]" />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/40 px-6 text-center text-ink-foreground">
          <div className="reveal max-w-2xl">
            <p className="eyebrow text-gold">Perfumaria</p>
            <h2 className="mt-6 text-5xl leading-tight md:text-7xl">Encontre a fragrância que conta a sua história.</h2>
            <a href="#contacto" className="eyebrow mt-10 inline-block border-b border-gold pb-2 hover:text-gold transition-colors">
              Aconselhamento olfativo
            </a>
          </div>
        </div>
      </section>

      {/* Citação */}
      <section className="mx-auto max-w-4xl px-6 py-32 text-center md:py-48">
        <p className="reveal font-display text-4xl italic leading-snug md:text-5xl">
          “O perfume é a forma mais intensa de memória.”
        </p>
        <p className="reveal eyebrow mt-8 text-muted-foreground">— Jean-Paul Guerlain</p>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-secondary py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:px-10">
          <div className="reveal">
            <p className="eyebrow text-accent">Contacto</p>
            <h2 className="mt-6 text-5xl md:text-6xl">Reserve o seu momento.</h2>
          </div>
          <div className="reveal space-y-8">
            <ul className="space-y-5 text-lg">
              {[
                { Icon: MapPin, label: "Rua José Luís de Andrade, 22, 4780-407 Santo Tirso", href: "https://www.google.com/maps/search/?api=1&query=Rua+Jos%C3%A9+Lu%C3%ADs+de+Andrade+22+4780-407+Santo+Tirso" },
                { Icon: Phone, label: "917 005 978", href: "tel:+351917005978" },
                { Icon: Mail, label: "geral@yillius.pt", href: "mailto:geral@yillius.pt" },
              ].map(({ Icon, label, href }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-start gap-4 transition-colors hover:text-accent">
                    <Icon size={20} strokeWidth={1.25} className="mt-1 shrink-0 text-accent" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <p className="eyebrow text-muted-foreground">Siga-nos</p>
              <SocialIcons className="mt-4" />
            </div>
            <a href="tel:+351917005978" className="eyebrow inline-block bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Ligar para marcar
            </a>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center bg-ink py-20 text-center text-ink-foreground/60">
        <img src={logo.url} alt="Yillius — Perfumaria, Cosmética e Estética" loading="lazy" className="h-44 w-auto self-center" />
        <SocialIcons className="mt-10 text-ink-foreground" />
        <p className="eyebrow mt-10">© {new Date().getFullYear()} Yillius</p>
      </footer>
    </main>
  );
}

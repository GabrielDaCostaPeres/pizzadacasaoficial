import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/cart/CartContext";
import { Header } from "@/components/Header";
import { CartDrawerLazy } from "@/components/CartDrawer.lazy";

import { Menu, WhatsAppFAB } from "@/components/Menu";
import { Logo } from "@/components/Logo";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/data/menu";
import { brl } from "@/lib/format";
import { Clock, MapPin, Phone, Flame, Leaf, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pizza d'Casa — Pizzaria | Peça pelo WhatsApp" },
      { name: "description", content: "Pizzas, hambúrgueres, dogs prensados e porções. Tradicionais, especiais, premium e doces. Peça já pelo WhatsApp." },
      { property: "og:title", content: "Pizza d'Casa — Pizzaria" },
      { property: "og:description", content: "Sabores com a tradição da casa. Cardápio completo e pedido direto pelo WhatsApp." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <CartProvider>
      <div id="top" className="min-h-screen bg-deep text-cream">
        <Header />
        <Hero />
        <Highlights />
        <Menu />
        <About />
        <Contact />
        <Footer />
        <CartDrawerLazy />
        <WhatsAppFAB />
      </div>
    </CartProvider>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden gradient-deep">
      {/* decorative leaves — apenas em telas maiores p/ não custar GPU em mobile */}
      <div aria-hidden className="hidden sm:block absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.07] pointer-events-none">
        <Leaf className="w-full h-full text-gold" strokeWidth={0.5} />
      </div>
      <div aria-hidden className="hidden sm:block absolute -bottom-32 -left-32 w-[400px] h-[400px] opacity-[0.05] pointer-events-none rotate-180">
        <Leaf className="w-full h-full text-gold" strokeWidth={0.5} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-32 md:py-40 text-center">
        <p className="text-gold text-[10px] sm:text-sm uppercase tracking-[0.4em] mb-4 sm:mb-6 animate-in fade-in duration-700">
          Tradição da casa
        </p>
        <Logo priority className="mx-auto h-24 sm:h-40 md:h-48 w-auto animate-in fade-in zoom-in-95 duration-1000" />

        <p className="mt-5 sm:mt-8 max-w-2xl mx-auto text-sm sm:text-xl text-cream/75 leading-relaxed font-serif italic px-2">
          Massa fermentada, ingredientes selecionados e o sabor inconfundível da casa.
        </p>

        <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-sm mx-auto sm:max-w-none">
          <a
            href="#cardapio"
            className="inline-flex items-center justify-center rounded-full gradient-gold text-[var(--primary-foreground)] font-semibold px-7 py-3.5 text-sm shadow-gold active:scale-[0.98] sm:hover:scale-[1.02] transition"
          >
            Peça agora · entrega rápida
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-cream/75 hover:text-gold text-sm py-2 underline-offset-4 hover:underline transition"
          >
            ou fale no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { icon: Flame, title: "Sabor da casa" },
    { icon: Clock, title: "Pedido rápido" },
    { icon: MapPin, title: "Entrega grátis na cidade" },
  ];
  return (
    <section className="py-3 sm:py-6 border-y border-gold/10 bg-cream/[0.02]">
      <div className="mx-auto max-w-3xl px-3 sm:px-6 grid grid-cols-3 sm:flex sm:items-center sm:justify-around gap-2">
        {items.map(({ icon: Icon, title }) => (
          <div key={title} className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-cream/85 text-center">
            <Icon className="h-4 w-4 text-gold shrink-0" />
            <span className="text-[10px] leading-tight sm:text-sm font-medium tracking-wide">{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="py-14 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <p className="text-gold text-[11px] sm:text-sm uppercase tracking-[0.3em] mb-3">Nossa história</p>
        <h2 className="font-display text-3xl sm:text-5xl text-cream">
          Tradição que vem <span className="font-script text-gold italic">da casa</span>
        </h2>
        <p className="ornament inline-block my-5 sm:my-6 text-cream/70 text-sm">desde sempre</p>
        <p className="text-cream/75 text-base sm:text-lg leading-relaxed font-serif">
          Na Pizza d'Casa, cada pizza nasce do cuidado com a massa, da escolha dos ingredientes
          e do carinho com quem nos visita. Mais que uma pizzaria, somos um pedacinho de casa
          onde sabor, tempo e tradição se encontram em cada fatia.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="py-14 sm:py-20 bg-cream/[0.03] border-y border-gold/10 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
        <div className="rounded-2xl border border-gold/15 bg-cream/[0.02] sm:border-0 sm:bg-transparent py-5 sm:py-0">
          <Phone className="mx-auto h-6 w-6 text-gold mb-3" />
          <h3 className="font-display text-lg sm:text-xl text-cream mb-1">WhatsApp</h3>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener" className="text-cream/80 hover:text-gold text-sm sm:text-base">
            {WHATSAPP_DISPLAY}
          </a>
        </div>
        <div className="rounded-2xl border border-gold/15 bg-cream/[0.02] sm:border-0 sm:bg-transparent py-5 sm:py-0">
          <Clock className="mx-auto h-6 w-6 text-gold mb-3" />
          <h3 className="font-display text-lg sm:text-xl text-cream mb-1">Horário</h3>
          <p className="text-cream/80 text-sm">Ter — Dom<br/>19h às 23h</p>
        </div>
        <div className="rounded-2xl border border-gold/15 bg-cream/[0.02] sm:border-0 sm:bg-transparent py-5 sm:py-0">
          <MapPin className="mx-auto h-6 w-6 text-gold mb-3" />
          <h3 className="font-display text-lg sm:text-xl text-cream mb-1">Entrega</h3>
          <p className="text-cream/80 text-sm">Grátis em<br/>São Lourenço — PR</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const schedule = [
    { day: "Segunda-feira", hours: "Fechada", closed: true },
    { day: "Terça-feira", hours: "19h às 23h" },
    { day: "Quarta-feira", hours: "19h às 23h" },
    { day: "Quinta-feira", hours: "19h às 23h" },
    { day: "Sexta-feira", hours: "19h às 23h" },
    { day: "Sábado", hours: "19h às 23h" },
    { day: "Domingo", hours: "19h às 23h" },
  ];
  return (
    <footer className="border-t border-gold/10 bg-cream/[0.02]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 grid sm:grid-cols-2 gap-10 items-start">
        <div className="text-center sm:text-left">
          <Logo className="mx-auto sm:mx-0 h-14 w-auto opacity-90" />
          <p className="mt-4 text-cream/70 text-sm font-serif italic max-w-xs mx-auto sm:mx-0">
            Pizzas feitas com tempo e tradição da casa.
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
            <Clock className="h-4 w-4 text-gold" />
            <h3 className="font-display text-lg text-cream">Horário de funcionamento</h3>
          </div>
          <ul className="text-sm divide-y divide-gold/10 border-y border-gold/10">
            {schedule.map(s => (
              <li key={s.day} className="flex items-center justify-between py-2">
                <span className="text-cream/80">{s.day}</span>
                <span className={s.closed ? "text-cream/40" : "text-gold"}>{s.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-center pb-6 text-cream/50 text-xs">© {new Date().getFullYear()} Pizza d'Casa. Todos os direitos reservados.</p>
    </footer>
  );
}

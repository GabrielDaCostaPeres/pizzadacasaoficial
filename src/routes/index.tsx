import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/cart/CartContext";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { CartBottomBar } from "@/components/CartBottomBar";
import { Menu, WhatsAppFAB } from "@/components/Menu";
import { Logo } from "@/components/Logo";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, DELIVERY_FEE } from "@/data/menu";
import { brl } from "@/lib/format";
import { Clock, MapPin, Phone, Flame, Leaf, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pizza d'Casa — Pizzaria artesanal | Peça pelo WhatsApp" },
      { name: "description", content: "Pizzas artesanais, hambúrgueres, dogs prensados e porções. Tradicionais, especiais, premium e doces. Peça já pelo WhatsApp." },
      { property: "og:title", content: "Pizza d'Casa — Pizzaria Artesanal" },
      { property: "og:description", content: "Sabores artesanais com a tradição da casa. Cardápio completo e pedido direto pelo WhatsApp." },
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
        <CartDrawer />
        <CartBottomBar />
        <WhatsAppFAB />
      </div>
    </CartProvider>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden gradient-deep">
      {/* decorative leaves */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.07] pointer-events-none">
        <Leaf className="w-full h-full text-gold" strokeWidth={0.5} />
      </div>
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] opacity-[0.05] pointer-events-none rotate-180">
        <Leaf className="w-full h-full text-gold" strokeWidth={0.5} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32 md:py-40 text-center">
        <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.4em] mb-6 animate-in fade-in duration-700">
          Pizzaria artesanal
        </p>
        <Logo className="mx-auto h-28 sm:h-40 md:h-48 w-auto animate-in fade-in zoom-in-95 duration-1000" />

        <p className="mt-8 max-w-2xl mx-auto text-base sm:text-xl text-cream/75 leading-relaxed font-serif italic">
          Massa fermentada, ingredientes selecionados e o sabor inconfundível da casa.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#cardapio"
            className="inline-flex items-center justify-center rounded-full gradient-gold text-[var(--primary-foreground)] font-semibold px-8 py-3.5 shadow-gold hover:scale-[1.02] transition"
          >
            Ver cardápio completo
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank" rel="noopener"
            className="inline-flex items-center justify-center rounded-full border border-gold/50 text-cream font-medium px-8 py-3.5 hover:bg-gold/10 transition"
          >
            Pedir pelo WhatsApp
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-cream/60 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-gold" /> Massa artesanal</span>
          <span className="flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-gold" /> Forno tradicional</span>
          <span className="flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-gold" /> Ingredientes frescos</span>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { icon: Flame, title: "Sabor da casa", text: "Receitas tradicionais com toque artesanal em cada fatia." },
    { icon: Clock,  title: "Pedido rápido", text: "Monte seu pedido aqui e envie direto ao nosso WhatsApp." },
    { icon: MapPin, title: "Entrega ágil", text: `Entregamos com taxa única de ${brl(DELIVERY_FEE)}.` },
  ];
  return (
    <section className="py-16 border-y border-gold/10 bg-cream/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid sm:grid-cols-3 gap-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="grid place-items-center h-12 w-12 rounded-full border border-gold/40 text-gold shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-xl text-cream">{title}</h3>
              <p className="text-cream/65 text-sm mt-1">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3">Nossa história</p>
        <h2 className="font-display text-4xl sm:text-5xl text-cream">
          Tradição que vem <span className="font-script text-gold italic">da casa</span>
        </h2>
        <p className="ornament inline-block my-6 text-cream/70 text-sm">desde sempre</p>
        <p className="text-cream/75 text-lg leading-relaxed font-serif">
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
    <section id="contato" className="py-20 bg-cream/[0.03] border-y border-gold/10 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 grid sm:grid-cols-3 gap-8 text-center">
        <div>
          <Phone className="mx-auto h-6 w-6 text-gold mb-3" />
          <h3 className="font-display text-xl text-cream mb-1">WhatsApp</h3>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener" className="text-cream/75 hover:text-gold">
            {WHATSAPP_DISPLAY}
          </a>
        </div>
        <div>
          <Clock className="mx-auto h-6 w-6 text-gold mb-3" />
          <h3 className="font-display text-xl text-cream mb-1">Horário</h3>
          <p className="text-cream/75 text-sm">Ter — Dom<br/>18h às 23h30</p>
        </div>
        <div>
          <MapPin className="mx-auto h-6 w-6 text-gold mb-3" />
          <h3 className="font-display text-xl text-cream mb-1">Entrega</h3>
          <p className="text-cream/75 text-sm">Taxa única<br/>{brl(DELIVERY_FEE)}</p>
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
            Pizzas artesanais, feitas com tempo e tradição da casa.
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

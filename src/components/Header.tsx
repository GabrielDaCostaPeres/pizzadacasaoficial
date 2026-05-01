import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/cart/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";

const links = [
  { href: "#cardapio", label: "Cardápio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 transition-all ${scrolled ? "bg-deep/95 backdrop-blur-md border-b border-gold/15 shadow-elegant" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <a href="#top" className="flex items-center" aria-label="Pizza d'Casa">
          <Logo className="h-10 sm:h-12 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-cream/85 hover:text-gold text-sm tracking-wide uppercase font-medium transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream/5 px-4 py-2 text-sm text-cream hover:bg-gold hover:text-[var(--primary-foreground)] transition"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Pedido</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-gold text-[var(--primary-foreground)] text-[11px] font-bold grid place-items-center">{count}</span>
            )}
          </button>
          <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 text-cream" aria-label="Menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gold/15 bg-deep">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-cream/85 hover:text-gold py-1 uppercase tracking-wide text-sm font-medium">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

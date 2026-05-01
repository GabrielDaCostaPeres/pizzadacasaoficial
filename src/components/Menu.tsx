import { useState } from "react";
import { pizzaCategories, otherCategories, WHATSAPP_NUMBER } from "@/data/menu";
import { brl } from "@/lib/format";
import { useCart } from "@/cart/CartContext";
import { Plus, ChevronDown } from "lucide-react";

const allCategories = [
  ...pizzaCategories.map(c => ({ id: c.id, label: `${c.title.replace("Pizzas ", "")} ${c.subtitle === "Doces" ? "(Doces)" : ""}`.trim() })),
  ...otherCategories.map(c => ({ id: c.id, label: c.title })),
];

export function Menu() {
  const { add, setOpen } = useCart();
  const [active, setActive] = useState(allCategories[0].id);

  const onAdd = (line: { id: string; name: string; unitPrice: number; note?: string }) => {
    add(line);
    setOpen(true);
  };

  return (
    <section id="cardapio" className="relative py-16 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3">Nosso cardápio</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream">
            Sabores <span className="font-script text-gold italic">artesanais</span>
          </h2>
          <p className="ornament inline-block mt-5 text-cream/70 text-sm">cada fatia, uma experiência</p>
        </div>

        {/* Sticky tab nav */}
        <div className="sticky top-16 sm:top-20 z-20 -mx-4 sm:mx-0 mb-10 bg-deep/90 backdrop-blur-md border-y border-gold/10">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-2 py-3">
            {allCategories.map(c => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={() => setActive(c.id)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-xs sm:text-sm whitespace-nowrap transition ${
                  active === c.id
                    ? "bg-gold text-[var(--primary-foreground)] border-gold"
                    : "border-cream/20 text-cream/80 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>

        {/* Pizzas com tabela de tamanhos */}
        <div className="space-y-20">
          {pizzaCategories.map(cat => (
            <PizzaCategoryBlock key={cat.id} cat={cat} onAdd={onAdd} />
          ))}

          {otherCategories.map(cat => (
            <SimpleCategoryBlock key={cat.id} cat={cat} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PizzaCategoryBlock({ cat, onAdd }: { cat: typeof pizzaCategories[number]; onAdd: (l: { id: string; name: string; unitPrice: number; note?: string }) => void }) {
  return (
    <div id={cat.id} className="scroll-mt-32">
      <header className="text-center mb-8">
        <h3 className="font-display text-3xl sm:text-4xl text-cream">
          <span className="font-script text-gold italic">{cat.title.replace("Pizzas ", "Pizzas ")}</span>
        </h3>
        <p className="uppercase tracking-[0.25em] text-cream/70 text-xs mt-2">{cat.subtitle}</p>
      </header>

      {/* Tabela de tamanhos */}
      <div className="rounded-2xl border border-gold/25 bg-cream/[0.03] p-4 sm:p-6 mb-8 shadow-elegant">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {cat.prices.map((p) => (
            <div key={p.slices} className="text-center">
              <p className="font-display text-lg sm:text-xl text-cream">{p.slices}</p>
              <p className="text-cream/60 text-xs">({p.flavors})</p>
              <p className="text-gold font-semibold text-lg sm:text-xl mt-1">{brl(p.price)}</p>
            </div>
          ))}
        </div>
        {cat.borderNote && <p className="text-center text-xs text-cream/60 mt-4 italic">{cat.borderNote}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {cat.pizzas.map(p => (
          <PizzaRow key={p.name} pizza={p} cat={cat} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

function PizzaRow({ pizza, cat, onAdd }: { pizza: { name: string; description: string }; cat: typeof pizzaCategories[number]; onAdd: (l: { id: string; name: string; unitPrice: number; note?: string }) => void }) {
  const [size, setSize] = useState(cat.prices[2] ?? cat.prices[0]); // 8 fatias por padrão
  const [openSize, setOpenSize] = useState(false);

  return (
    <article className="group rounded-xl border border-cream/10 bg-cream/[0.02] p-4 sm:p-5 hover:border-gold/40 hover:bg-cream/[0.04] transition">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-lg sm:text-xl text-cream uppercase tracking-wide">{pizza.name}</h4>
          <p className="text-cream/65 text-sm mt-1 leading-relaxed">{pizza.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="relative">
          <button
            onClick={() => setOpenSize(v => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-deep px-3 py-1.5 text-xs text-cream hover:border-gold/50"
          >
            {size.slices} <ChevronDown className="h-3 w-3" />
          </button>
          {openSize && (
            <ul className="absolute left-0 top-full mt-1 z-10 w-44 rounded-lg border border-gold/30 bg-deep shadow-elegant overflow-hidden">
              {cat.prices.map(p => (
                <li key={p.slices}>
                  <button
                    onClick={() => { setSize(p); setOpenSize(false); }}
                    className="w-full text-left px-3 py-2 text-xs text-cream hover:bg-gold hover:text-[var(--primary-foreground)] flex justify-between"
                  >
                    <span>{p.slices}</span><span>{brl(p.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gold font-semibold">{brl(size.price)}</span>
          <button
            onClick={() => onAdd({
              id: `${cat.id}-${pizza.name}-${size.slices}`,
              name: `${pizza.name} (${size.slices})`,
              unitPrice: size.price,
              note: cat.subtitle,
            })}
            className="inline-flex items-center justify-center rounded-full gradient-gold text-[var(--primary-foreground)] h-9 w-9 shadow-gold hover:scale-105 transition"
            aria-label="Adicionar"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function SimpleCategoryBlock({ cat, onAdd }: { cat: typeof otherCategories[number]; onAdd: (l: { id: string; name: string; unitPrice: number; note?: string }) => void }) {
  return (
    <div id={cat.id} className="scroll-mt-32">
      <header className="text-center mb-8">
        <h3 className="font-display text-3xl sm:text-4xl text-cream">
          <span className="font-script text-gold italic">{cat.title}</span>
        </h3>
        {cat.subtitle && <p className="uppercase tracking-[0.25em] text-cream/70 text-xs mt-2">{cat.subtitle}</p>}
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {cat.items.map(item => {
          if (Array.isArray(item.price)) {
            return item.price.map(opt => (
              <SimpleItem
                key={item.name + opt.label}
                name={`${item.name} — ${opt.label}`}
                description={item.description}
                price={opt.value}
                onAdd={() => onAdd({ id: `${cat.id}-${item.name}-${opt.label}`, name: `${item.name} (${opt.label})`, unitPrice: opt.value, note: cat.title })}
              />
            ));
          }
          return (
            <SimpleItem
              key={item.name}
              name={item.name}
              description={item.description}
              price={item.price}
              onAdd={() => onAdd({ id: `${cat.id}-${item.name}`, name: item.name, unitPrice: item.price as number, note: cat.title })}
            />
          );
        })}
      </div>
      {cat.note && <p className="text-center text-xs text-cream/55 mt-6 italic">{cat.note}</p>}
    </div>
  );
}

function SimpleItem({ name, description, price, onAdd }: { name: string; description?: string; price: number; onAdd: () => void }) {
  return (
    <article className="rounded-xl border border-cream/10 bg-cream/[0.02] p-4 sm:p-5 hover:border-gold/40 hover:bg-cream/[0.04] transition">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-lg text-cream uppercase tracking-wide">{name}</h4>
          {description && <p className="text-cream/65 text-sm mt-1 leading-relaxed">{description}</p>}
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-gold font-semibold whitespace-nowrap">{price > 0 ? brl(price) : "Sob consulta"}</span>
          {price > 0 && (
            <button
              onClick={onAdd}
              className="inline-flex items-center justify-center rounded-full gradient-gold text-[var(--primary-foreground)] h-9 w-9 shadow-gold hover:scale-105 transition"
              aria-label="Adicionar"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// Floating WhatsApp
export function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 left-5 z-30 grid place-items-center h-12 w-12 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.5 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 005.74 1.46h.01c6.55 0 11.9-5.34 11.91-11.9a11.84 11.84 0 00-3.46-8.42zM12.07 21.8h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.75.98 1-3.65-.23-.37a9.86 9.86 0 01-1.51-5.27c0-5.46 4.45-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 012.9 7c0 5.47-4.45 9.9-9.91 9.9zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01a1.1 1.1 0 00-.8.37c-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.07 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>
    </a>
  );
}

import { useMemo, useState } from "react";
import { pizzaCategories, otherCategories, WHATSAPP_NUMBER } from "@/data/menu";
import { brl } from "@/lib/format";
import { useCart } from "@/cart/CartContext";
import { Plus, ChevronDown, Check } from "lucide-react";

type Group = "salgadas" | "doces" | "outros";

const groups: { id: Group; label: string }[] = [
  { id: "salgadas", label: "Pizzas Salgadas" },
  { id: "doces", label: "Pizzas Doces" },
  { id: "outros", label: "Lanches & Bebidas" },
];

const groupedPizzas = {
  salgadas: pizzaCategories.filter(c => c.subtitle === "Salgadas"),
  doces: pizzaCategories.filter(c => c.subtitle === "Doces"),
};

export function Menu() {
  const { add, setOpen } = useCart();
  const [group, setGroup] = useState<Group>("salgadas");

  const onAdd = (line: { id: string; name: string; unitPrice: number; note?: string }) => {
    add(line);
    setOpen(true);
  };

  // sub-categories for the current group
  const subCats = useMemo(() => {
    if (group === "salgadas") return groupedPizzas.salgadas.map(c => ({ id: c.id, label: c.title.replace("Pizzas ", "") }));
    if (group === "doces") return groupedPizzas.doces.map(c => ({ id: c.id, label: c.title.replace("Pizzas ", "") }));
    return otherCategories.map(c => ({ id: c.id, label: c.title }));
  }, [group]);

  return (
    <section id="cardapio" className="relative py-14 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-14">
          <p className="text-gold text-[11px] sm:text-sm uppercase tracking-[0.4em] mb-3">Nosso cardápio</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream">
            Sabores <span className="font-script text-gold italic">artesanais</span>
          </h2>
          <p className="ornament inline-block mt-5 text-cream/70 text-sm">cada fatia, uma experiência</p>
        </div>

        {/* Group tabs */}
        <div className="sticky top-16 sm:top-20 z-20 -mx-4 sm:mx-0 mb-2 bg-deep/95 backdrop-blur-md border-b border-gold/15">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <div className="grid grid-cols-3 gap-1 rounded-full border border-gold/25 bg-cream/[0.03] p-1">
              {groups.map(g => (
                <button
                  key={g.id}
                  onClick={() => setGroup(g.id)}
                  className={`rounded-full py-2 text-[11px] sm:text-xs font-medium uppercase tracking-wider transition ${
                    group === g.id
                      ? "bg-gold text-[var(--primary-foreground)] shadow-gold"
                      : "text-cream/75 hover:text-gold"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-category chips */}
        <div className="-mx-4 sm:mx-0 sticky top-[120px] sm:top-[136px] z-10 bg-deep/85 backdrop-blur-md mb-10">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-2 py-3">
            {subCats.map(c => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="shrink-0 rounded-full border border-cream/15 bg-cream/[0.03] px-4 py-1.5 text-xs whitespace-nowrap text-cream/80 hover:border-gold/50 hover:text-gold transition"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {group === "salgadas" && groupedPizzas.salgadas.map(cat => (
            <PizzaCategoryBlock key={cat.id} cat={cat} onAdd={onAdd} />
          ))}
          {group === "doces" && groupedPizzas.doces.map(cat => (
            <PizzaCategoryBlock key={cat.id} cat={cat} onAdd={onAdd} />
          ))}
          {group === "outros" && otherCategories.map(cat => (
            <SimpleCategoryBlock key={cat.id} cat={cat} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PizzaCategoryBlock({ cat, onAdd }: { cat: typeof pizzaCategories[number]; onAdd: (l: { id: string; name: string; unitPrice: number; note?: string }) => void }) {
  return (
    <div id={cat.id} className="scroll-mt-44">
      {/* Vintage-style menu card */}
      <div className="relative rounded-[28px] border border-gold/30 bg-gradient-to-b from-cream/[0.06] via-cream/[0.03] to-transparent px-4 sm:px-10 py-8 sm:py-12 shadow-elegant">
        {/* Ornamental header */}
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <span className="h-px w-10 sm:w-20 bg-gold/60" />
            <h3 className="font-script text-gold italic text-3xl sm:text-5xl leading-none">{cat.title.replace("Pizzas ", "Pizzas ")}</h3>
            <span className="h-px w-10 sm:w-20 bg-gold/60" />
          </div>
          <p className="mt-2 text-gold/90 uppercase tracking-[0.45em] text-[11px] sm:text-xs">{cat.subtitle}</p>
        </header>

        {/* Prices grid (4 columns like the print) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 pb-6 border-b border-gold/20">
          {cat.prices.map((p) => (
            <div key={p.slices} className="text-center">
              <p className="font-display text-cream text-sm sm:text-base">{p.slices}</p>
              <p className="text-cream/60 text-[10px] sm:text-xs italic">({p.flavors})</p>
              <p className="text-gold font-semibold text-base sm:text-lg mt-1 tabular-nums">{brl(p.price)}</p>
            </div>
          ))}
        </div>

        {/* Pizza list — text-style like the printed menu */}
        <ul className="divide-y divide-gold/10">
          {cat.pizzas.map(p => (
            <PizzaRow key={p.name} pizza={p} cat={cat} onAdd={onAdd} />
          ))}
        </ul>

        {/* Footer note */}
        <p className="text-center text-[10px] sm:text-xs text-cream/55 mt-6 italic uppercase tracking-wider">
          ✶ Todas as pizzas {cat.subtitle.toLowerCase()} contêm molho de tomate e orégano
        </p>
        {cat.borderNote && (
          <p className="text-center text-xs sm:text-sm text-gold mt-3 font-medium">
            <span className="uppercase tracking-wider">Bordas:</span> {cat.borderNote.replace(/^Bordas:\s*/i, "")}
          </p>
        )}
      </div>
    </div>
  );
}

function PizzaRow({ pizza, cat, onAdd }: { pizza: { name: string; description: string }; cat: typeof pizzaCategories[number]; onAdd: (l: { id: string; name: string; unitPrice: number; note?: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(cat.prices[2] ?? cat.prices[0]);
  const [border, setBorder] = useState<{ name: string; price: number } | null>(null);
  const [added, setAdded] = useState(false);

  const totalPrice = size.price + (border?.price ?? 0);

  function handleAdd() {
    const borderSuffix = border ? ` + Borda ${border.name}` : "";
    onAdd({
      id: `${cat.id}-${pizza.name}-${size.slices}${border ? `-${border.name}` : ""}`,
      name: `${pizza.name} (${size.slices})${borderSuffix}`,
      unitPrice: totalPrice,
      note: `${cat.title} · ${cat.subtitle}`,
    });
    setAdded(true);
    setOpen(false);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <li className="py-3 sm:py-4">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left group"
        aria-expanded={open}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-display text-cream uppercase tracking-wide text-sm sm:text-base group-hover:text-gold transition">
            {pizza.name}
          </h4>
          <ChevronDown className={`h-4 w-4 text-gold/70 shrink-0 transition ${open ? "rotate-180" : ""}`} />
        </div>
        <p className="text-cream/65 text-xs sm:text-sm leading-snug mt-0.5">{pizza.description}</p>
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-gold/25 bg-deep/60 p-3 sm:p-4 space-y-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-cream/60 mb-1.5">Tamanho</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.prices.map(p => (
                <button
                  key={p.slices}
                  onClick={() => setSize(p)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                    p.slices === size.slices
                      ? "border-gold bg-gold text-[var(--primary-foreground)] font-semibold"
                      : "border-cream/20 text-cream hover:border-gold/50"
                  }`}
                >
                  {p.slices} · {brl(p.price)}
                </button>
              ))}
            </div>
          </div>

          {cat.borders && cat.borders.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-cream/60 mb-1.5">Borda (opcional)</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setBorder(null)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                    !border ? "border-gold bg-gold text-[var(--primary-foreground)] font-semibold" : "border-cream/20 text-cream hover:border-gold/50"
                  }`}
                >
                  Sem borda
                </button>
                {cat.borders.map(b => (
                  <button
                    key={b.name}
                    onClick={() => setBorder(b)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                      border?.name === b.name ? "border-gold bg-gold text-[var(--primary-foreground)] font-semibold" : "border-cream/20 text-cream hover:border-gold/50"
                    }`}
                  >
                    {b.name} +{brl(b.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-gold font-semibold tabular-nums text-base">{brl(totalPrice)}</span>
            <button
              onClick={handleAdd}
              className={`inline-flex items-center gap-2 rounded-full px-4 h-9 text-xs font-semibold uppercase tracking-wider shadow-gold transition ${
                added ? "bg-emerald-500 text-white" : "gradient-gold text-[var(--primary-foreground)] hover:scale-105"
              }`}
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {added ? "Adicionado" : "Adicionar"}
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function SimpleCategoryBlock({ cat, onAdd }: { cat: typeof otherCategories[number]; onAdd: (l: { id: string; name: string; unitPrice: number; note?: string }) => void }) {
  return (
    <div id={cat.id} className="scroll-mt-44">
      <header className="text-center mb-8">
        {cat.subtitle && <p className="uppercase tracking-[0.3em] text-gold/80 text-[10px] mb-2">{cat.subtitle}</p>}
        <h3 className="font-display text-3xl sm:text-4xl text-cream">
          <span className="font-script text-gold italic">{cat.title}</span>
        </h3>
      </header>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
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
  const [added, setAdded] = useState(false);
  function handle() {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }
  return (
    <article className="rounded-xl border border-cream/10 bg-cream/[0.02] p-4 sm:p-5 hover:border-gold/40 hover:bg-cream/[0.04] transition">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-base sm:text-lg text-cream uppercase tracking-wide leading-tight">{name}</h4>
          {description && <p className="text-cream/65 text-sm mt-1.5 leading-relaxed">{description}</p>}
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-gold font-semibold whitespace-nowrap tabular-nums">{price > 0 ? brl(price) : "Sob consulta"}</span>
          {price > 0 && (
            <button
              onClick={handle}
              className={`inline-flex items-center justify-center rounded-full h-9 w-9 shadow-gold transition ${
                added ? "bg-emerald-500 text-white scale-110" : "gradient-gold text-[var(--primary-foreground)] hover:scale-105"
              }`}
              aria-label="Adicionar ao pedido"
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-24 sm:bottom-5 left-4 z-30 grid place-items-center h-12 w-12 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.5 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 005.74 1.46h.01c6.55 0 11.9-5.34 11.91-11.9a11.84 11.84 0 00-3.46-8.42zM12.07 21.8h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.75.98 1-3.65-.23-.37a9.86 9.86 0 01-1.51-5.27c0-5.46 4.45-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 012.9 7c0 5.47-4.45 9.9-9.91 9.9zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01a1.1 1.1 0 00-.8.37c-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.07 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>
    </a>
  );
}

import { useState } from "react";
import { useCart } from "@/cart/CartContext";
import { brl } from "@/lib/format";
import { WHATSAPP_NUMBER, DELIVERY_FEE } from "@/data/menu";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";

export function CartDrawer() {
  const { lines, open, setOpen, inc, dec, remove, total, clear } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mode, setMode] = useState<"entrega" | "retirada">("entrega");
  const [payment, setPayment] = useState("Pix");
  const [obs, setObs] = useState("");

  const fee = mode === "entrega" ? DELIVERY_FEE : 0;
  const grandTotal = total + fee;

  function sendWhatsApp() {
    if (lines.length === 0) return;
    const itensTxt = lines.map(l =>
      `• ${l.qty}x ${l.name}${l.note ? ` _(${l.note})_` : ""} — ${brl(l.unitPrice * l.qty)}`
    ).join("\n");

    const msg =
`*🍕 Novo Pedido — Pizza d'Casa*

*Cliente:* ${name || "—"}
*Modalidade:* ${mode === "entrega" ? "Entrega" : "Retirada no local"}
${mode === "entrega" ? `*Endereço:* ${address || "—"}\n` : ""}*Pagamento:* ${payment}
${obs ? `*Observações:* ${obs}\n` : ""}
*Itens:*
${itensTxt}

*Subtotal:* ${brl(total)}
${mode === "entrega" ? `*Taxa de entrega:* ${brl(fee)}\n` : ""}*Total:* ${brl(grandTotal)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  return (
    <>
      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      {/* drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-deep border-l border-gold/20 shadow-elegant transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between p-5 border-b border-gold/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-display text-2xl text-cream">Seu pedido</h2>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-cream/10 text-cream" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-cream/60 py-16">
              <ShoppingBag className="h-12 w-12 mb-4 opacity-40" />
              <p>Seu carrinho está vazio</p>
              <p className="text-sm mt-1">Escolha seus sabores no cardápio</p>
            </div>
          ) : lines.map(l => (
            <div key={l.id} className="rounded-lg border border-cream/10 bg-cream/[0.03] p-3">
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-cream truncate">{l.name}</p>
                  {l.note && <p className="text-xs text-cream/60 mt-0.5">{l.note}</p>}
                  <p className="text-sm text-gold mt-1">{brl(l.unitPrice)}</p>
                </div>
                <button onClick={() => remove(l.id)} className="text-cream/50 hover:text-destructive p-1" aria-label="Remover">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-deep px-1">
                  <button onClick={() => dec(l.id)} className="p-1.5 text-gold hover:text-cream" aria-label="Diminuir"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="min-w-6 text-center text-cream text-sm font-medium">{l.qty}</span>
                  <button onClick={() => inc(l.id)} className="p-1.5 text-gold hover:text-cream" aria-label="Aumentar"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <span className="font-medium text-cream">{brl(l.unitPrice * l.qty)}</span>
              </div>
            </div>
          ))}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-gold/20 p-5 space-y-3 max-h-[55vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode("entrega")}
                className={`rounded-md py-2 text-sm font-medium border transition ${mode==="entrega" ? "bg-gold text-[var(--primary-foreground)] border-gold" : "border-cream/20 text-cream hover:border-gold/50"}`}
              >Entrega</button>
              <button
                onClick={() => setMode("retirada")}
                className={`rounded-md py-2 text-sm font-medium border transition ${mode==="retirada" ? "bg-gold text-[var(--primary-foreground)] border-gold" : "border-cream/20 text-cream hover:border-gold/50"}`}
              >Retirada</button>
            </div>

            <input
              value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome"
              className="w-full rounded-md bg-cream/5 border border-cream/15 px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-gold outline-none"
            />
            {mode === "entrega" && (
              <input
                value={address} onChange={e => setAddress(e.target.value)} placeholder="Endereço completo (rua, nº, bairro)"
                className="w-full rounded-md bg-cream/5 border border-cream/15 px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-gold outline-none"
              />
            )}
            <select
              value={payment} onChange={e => setPayment(e.target.value)}
              className="w-full rounded-md bg-cream/5 border border-cream/15 px-3 py-2 text-sm text-cream focus:border-gold outline-none"
            >
              <option className="bg-deep">Pix</option>
              <option className="bg-deep">Dinheiro</option>
              <option className="bg-deep">Cartão de débito</option>
              <option className="bg-deep">Cartão de crédito</option>
            </select>
            <textarea
              value={obs} onChange={e => setObs(e.target.value)} placeholder="Observações (opcional)" rows={2}
              className="w-full rounded-md bg-cream/5 border border-cream/15 px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-gold outline-none resize-none"
            />

            <div className="space-y-1 pt-2 text-sm">
              <div className="flex justify-between text-cream/70"><span>Subtotal</span><span>{brl(total)}</span></div>
              {mode === "entrega" && <div className="flex justify-between text-cream/70"><span>Taxa de entrega</span><span>{brl(fee)}</span></div>}
              <div className="flex justify-between text-lg font-semibold text-cream pt-1 border-t border-cream/10 mt-1">
                <span>Total</span><span className="text-gold">{brl(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={sendWhatsApp}
              className="w-full rounded-md gradient-gold text-[var(--primary-foreground)] font-semibold py-3 shadow-gold hover:opacity-95 transition"
            >
              Enviar pedido pelo WhatsApp
            </button>
            <button onClick={clear} className="w-full text-xs text-cream/50 hover:text-cream/80 py-1">
              Limpar carrinho
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

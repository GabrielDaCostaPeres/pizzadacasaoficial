import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/cart/CartContext";
import { brl, buildWhatsAppUrl } from "@/lib/format";
import { WHATSAPP_NUMBER } from "@/data/menu";
import { X, Plus, Minus, ShoppingBag, Trash2, MapPin, Wallet, MessageCircle, Check, ArrowLeft, ArrowRight } from "lucide-react";

type Mode = "entrega" | "retirada";
type Step = "cart" | "checkout";

export function CartDrawer() {
  const { lines, open, setOpen, inc, dec, remove, total, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mode, setMode] = useState<Mode>("entrega");
  const [payment, setPayment] = useState("Pix");
  const [troco, setTroco] = useState("");
  const [obs, setObs] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const fee = 0;
  const grandTotal = total;

  // Sempre que o drawer abre, começa na etapa do carrinho
  useEffect(() => {
    if (open) setStep("cart");
  }, [open]);

  // Se o carrinho ficar vazio enquanto está no checkout, volta para a tela do carrinho
  useEffect(() => {
    if (lines.length === 0 && step === "checkout") setStep("cart");
  }, [lines.length, step]);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Informe seu nome";
    if (mode === "entrega" && address.trim().length < 6) e.address = "Endereço completo";
    return e;
  }, [name, address, mode]);

  const message = useMemo(() => {
    if (lines.length === 0) return "";

    const itensTxt = lines
      .map(l => {
        const sub = brl(l.unitPrice * l.qty);
        return `• ${l.qty}x  ${l.name}  —  ${sub}`;
      })
      .join("\n");

    const linhas: string[] = [];
    linhas.push("*PIZZA D'CASA — NOVO PEDIDO*");
    linhas.push("─────────────────────");
    linhas.push("");
    linhas.push("*DADOS DO CLIENTE*");
    linhas.push(`Nome: ${name || "—"}`);
    if (phone) linhas.push(`Telefone: ${phone}`);
    linhas.push("");
    linhas.push("*ENTREGA*");
    linhas.push(`Modalidade: ${mode === "entrega" ? "Entrega" : "Retirada no local"}`);
    if (mode === "entrega") linhas.push(`Endereço: ${address || "—"}`);
    linhas.push("");
    linhas.push("*PAGAMENTO*");
    linhas.push(
      `Forma: ${payment}${payment === "Dinheiro" && troco ? ` — troco para ${troco}` : ""}`
    );
    linhas.push("");
    linhas.push("*ITENS DO PEDIDO*");
    linhas.push(itensTxt);
    if (obs.trim()) {
      linhas.push("");
      linhas.push("*OBSERVAÇÕES*");
      linhas.push(obs.trim());
    }
    linhas.push("");
    linhas.push("─────────────────────");
    linhas.push(`Subtotal: ${brl(total)}`);
    if (mode === "entrega") linhas.push(`Taxa de entrega: Grátis`);
    linhas.push(`*TOTAL: ${brl(grandTotal)}*`);
    linhas.push("");
    linhas.push("_Pedido enviado pelo site._");

    return linhas.join("\n");
  }, [lines, name, phone, mode, address, payment, troco, obs, total, fee, grandTotal]);


  const waUrl = useMemo(() => buildWhatsAppUrl(WHATSAPP_NUMBER, message), [message]);

  function handleSendClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (lines.length === 0) { e.preventDefault(); return; }
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setShowErrors(true);
      return;
    }
    // Limpa o carrinho e fecha o drawer após enviar para o WhatsApp
    setTimeout(() => {
      clear();
      setOpen(false);
    }, 300);
  }

  function goToCheckout() {
    if (lines.length === 0) return;
    setStep("checkout");
  }

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden
      />
      <aside
        className={`fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto z-50 flex flex-col bg-deep border-gold/20 shadow-elegant transition-transform duration-300
          h-[100dvh] sm:h-full w-full sm:max-w-md
          sm:rounded-none sm:border-l
          ${open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"}`}
        aria-hidden={!open}
        aria-label="Carrinho de pedidos"
      >
        {/* spacer for safe area on mobile */}
        <div className="sm:hidden h-[env(safe-area-inset-top)]" />

        <header className="flex items-center justify-between px-5 pt-3 sm:pt-5 pb-4 border-b border-gold/15">
          <div className="flex items-center gap-2 min-w-0">
            {step === "checkout" && (
              <button
                onClick={() => setStep("cart")}
                className="rounded-full p-1.5 hover:bg-cream/10 text-cream/80 -ml-1"
                aria-label="Voltar ao carrinho"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <ShoppingBag className="h-5 w-5 text-gold shrink-0" />
            <h2 className="font-display text-2xl text-cream truncate">
              {step === "cart" ? "Seu pedido" : "Finalizar pedido"}
            </h2>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-cream/10 text-cream/80" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-3">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-cream/60 py-16">
              <ShoppingBag className="h-12 w-12 mb-4 opacity-40" />
              <p className="font-display text-xl text-cream">Seu carrinho está vazio</p>
              <p className="text-sm mt-1">Escolha seus sabores no cardápio</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full gradient-gold text-[var(--primary-foreground)] font-semibold px-6 py-2.5 text-sm shadow-gold"
              >
                Ver cardápio
              </button>
            </div>
          ) : step === "cart" ? (
            <>
              {lines.map(l => (
                <div key={l.id} className="rounded-xl border border-cream/10 bg-cream/[0.03] p-3.5">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-cream text-[15px] leading-snug">{l.name}</p>
                      {l.note && <p className="text-[11px] uppercase tracking-wider text-gold/80 mt-1">{l.note}</p>}
                      <p className="text-sm text-cream/60 mt-1">{brl(l.unitPrice)} un.</p>
                    </div>
                    <button onClick={() => remove(l.id)} className="text-cream/40 hover:text-destructive p-1 self-start" aria-label="Remover">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-gold/30 bg-deep">
                      <button onClick={() => dec(l.id)} className="p-2 text-gold hover:text-cream" aria-label="Diminuir"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="min-w-7 text-center text-cream text-sm font-semibold">{l.qty}</span>
                      <button onClick={() => inc(l.id)} className="p-2 text-gold hover:text-cream" aria-label="Aumentar"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="font-semibold text-gold">{brl(l.unitPrice * l.qty)}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Etapa: checkout (somente formulário)
            <div className="space-y-4">
              {/* Resumo compacto dos itens */}
              <div className="rounded-xl border border-cream/10 bg-cream/[0.03] p-3 text-sm text-cream/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-gold/80">Resumo</span>
                  <button
                    onClick={() => setStep("cart")}
                    className="text-[11px] uppercase tracking-wider text-cream/60 hover:text-gold"
                  >
                    editar
                  </button>
                </div>
                <ul className="space-y-0.5">
                  {lines.map(l => (
                    <li key={l.id} className="flex justify-between gap-3">
                      <span className="truncate">{l.qty}× {l.name}</span>
                      <span className="text-cream/70 tabular-nums shrink-0">{brl(l.unitPrice * l.qty)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <SectionTitle icon={<MapPin className="h-4 w-4" />}>Como deseja receber?</SectionTitle>
              <div className="grid grid-cols-2 gap-2">
                <ToggleBtn active={mode==="entrega"} onClick={() => setMode("entrega")}>Entrega</ToggleBtn>
                <ToggleBtn active={mode==="retirada"} onClick={() => setMode("retirada")}>Retirar no local</ToggleBtn>
              </div>

              <div className="space-y-2.5">
                <Field
                  label="Seu nome"
                  value={name} onChange={setName}
                  error={showErrors ? errors.name : undefined}
                  autoComplete="name"
                />
                <Field
                  label="Telefone (opcional)"
                  value={phone} onChange={setPhone}
                  inputMode="tel" autoComplete="tel"
                />
                {mode === "entrega" && (
                  <Field
                    label="Endereço completo (rua, nº, bairro)"
                    value={address} onChange={setAddress}
                    error={showErrors ? errors.address : undefined}
                    autoComplete="street-address"
                  />
                )}
              </div>

              <SectionTitle icon={<Wallet className="h-4 w-4" />}>Forma de pagamento</SectionTitle>
              <div className="grid grid-cols-2 gap-2">
                {["Pix", "Dinheiro", "Cartão de débito", "Cartão de crédito"].map(p => (
                  <ToggleBtn key={p} active={payment===p} onClick={() => setPayment(p)}>{p}</ToggleBtn>
                ))}
              </div>
              {payment === "Dinheiro" && (
                <Field
                  label="Troco para quanto? (opcional)"
                  value={troco} onChange={setTroco}
                  inputMode="decimal"
                />
              )}

              <textarea
                value={obs} onChange={e => setObs(e.target.value)} placeholder="Observações (opcional)" rows={2}
                className="w-full rounded-lg bg-cream/5 border border-cream/15 px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-gold outline-none resize-none"
              />
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-gold/20 px-4 sm:px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-5 bg-deep/95 backdrop-blur-sm">
            <div className="space-y-1 text-sm mb-3">
              <div className="flex justify-between text-cream/70"><span>Subtotal</span><span>{brl(total)}</span></div>
              {step === "checkout" && mode === "entrega" && (
                <div className="flex justify-between text-cream/70"><span>Taxa de entrega</span><span className="text-gold">Grátis</span></div>
              )}
              <div className="flex justify-between text-base font-semibold text-cream pt-2 border-t border-cream/10 mt-1">
                <span>Total</span><span className="text-gold text-lg">{brl(grandTotal)}</span>
              </div>
            </div>

            {step === "cart" ? (
              <>
                <button
                  onClick={goToCheckout}
                  className="flex items-center justify-center gap-2 w-full rounded-2xl gradient-gold text-[var(--primary-foreground)] font-semibold text-base py-4 sm:py-3.5 shadow-gold active:scale-[0.99] transition select-none"
                >
                  Finalizar pedido
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Tem certeza que deseja limpar todo o carrinho?")) clear();
                  }}
                  className="w-full text-xs text-cream/40 hover:text-cream/70 py-2 mt-1"
                >
                  Limpar carrinho
                </button>
              </>
            ) : (
              <>
                <a
                  ref={linkRef}
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSendClick}
                  className="flex items-center justify-center gap-2 w-full rounded-xl gradient-gold text-[var(--primary-foreground)] font-semibold py-3.5 shadow-gold active:scale-[0.99] transition select-none"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar pedido pelo WhatsApp
                </a>
                <p className="text-[11px] text-cream/45 text-center mt-2">
                  Você será redirecionado ao WhatsApp para confirmar o pedido.
                </p>
                <button
                  onClick={() => setStep("cart")}
                  className="w-full text-xs text-cream/50 hover:text-cream/80 py-2 mt-1"
                >
                  ← Voltar ao carrinho
                </button>
              </>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-gold text-[11px] uppercase tracking-[0.2em] font-medium pt-1">
      {icon}{children}
    </div>
  );
}

function ToggleBtn({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-lg py-2.5 text-sm font-medium border transition ${
        active
          ? "bg-gold text-[var(--primary-foreground)] border-gold shadow-gold"
          : "border-cream/15 text-cream/85 bg-cream/[0.03] hover:border-gold/50"
      }`}
    >
      {active && <Check className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5" />}
      {children}
    </button>
  );
}

function Field({
  label, value, onChange, error, ...rest
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={label}
        className={`w-full rounded-lg bg-cream/5 border px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold outline-none transition ${
          error ? "border-destructive/70" : "border-cream/15"
        }`}
        {...rest}
      />
      {error && <p className="text-[11px] text-destructive mt-1 ml-1">{error}</p>}
    </div>
  );
}

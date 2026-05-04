import { useCart } from "@/cart/CartContext";
import { brl } from "@/lib/format";
import { ShoppingBag } from "lucide-react";

export function CartBottomBar() {
  const { count, total, setOpen, open } = useCart();
  if (count === 0 || open) return null;
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 bg-gradient-to-t from-deep via-deep/95 to-transparent animate-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-full gradient-gold text-[var(--primary-foreground)] font-semibold py-3.5 px-4 shadow-gold flex items-center justify-between active:scale-[0.99] transition"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="grid place-items-center h-7 w-7 rounded-full bg-[var(--primary-foreground)]/15 shrink-0">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <span className="text-sm truncate">Ver pedido · {count} {count === 1 ? "item" : "itens"}</span>
        </span>
        <span className="font-bold tabular-nums text-sm shrink-0">{brl(total)}</span>
      </button>
    </div>
  );
}

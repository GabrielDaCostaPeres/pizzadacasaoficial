import { useCart } from "@/cart/CartContext";
import { brl } from "@/lib/format";
import { ShoppingBag } from "lucide-react";

export function CartBottomBar() {
  const { count, total, setOpen, open } = useCart();
  if (count === 0 || open) return null;
  return (
    <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30 animate-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-full gradient-gold text-[var(--primary-foreground)] font-semibold py-3.5 px-5 shadow-gold flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <span className="grid place-items-center h-7 w-7 rounded-full bg-[var(--primary-foreground)]/15">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <span className="text-sm">Ver pedido · {count} {count === 1 ? "item" : "itens"}</span>
        </span>
        <span className="font-bold tabular-nums">{brl(total)}</span>
      </button>
    </div>
  );
}

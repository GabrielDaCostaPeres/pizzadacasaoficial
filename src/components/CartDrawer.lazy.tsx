import { lazy, Suspense } from "react";
import { useCart } from "@/cart/CartContext";

const CartDrawerImpl = lazy(() =>
  import("./CartDrawer").then(m => ({ default: m.CartDrawer }))
);

/**
 * Só monta o CartDrawer (e baixa seu chunk) na primeira vez que o usuário
 * abre o carrinho — evita custo de render/efeitos no carregamento inicial.
 */
export function CartDrawerLazy() {
  const { open, count } = useCart();
  if (!open && count === 0) return null;
  return (
    <Suspense fallback={null}>
      <CartDrawerImpl />
    </Suspense>
  );
}

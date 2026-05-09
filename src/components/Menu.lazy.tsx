import { lazy, Suspense } from "react";

const MenuImpl = lazy(() => import("./Menu").then(m => ({ default: m.Menu })));
const WhatsAppFABImpl = lazy(() =>
  import("./Menu").then(m => ({ default: m.WhatsAppFAB }))
);

export function MenuLazy() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-3 sm:px-6 py-16 text-center text-cream/40 text-sm">
          Carregando cardápio…
        </div>
      }
    >
      <MenuImpl />
    </Suspense>
  );
}

export function WhatsAppFABLazy() {
  return (
    <Suspense fallback={null}>
      <WhatsAppFABImpl />
    </Suspense>
  );
}

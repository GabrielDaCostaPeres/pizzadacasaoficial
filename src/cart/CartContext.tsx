import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartLine = {
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
  note?: string;
};

type State = { lines: CartLine[]; open: boolean };
type Action =
  | { type: "add"; line: Omit<CartLine, "qty"> & { qty?: number } }
  | { type: "inc"; id: string }
  | { type: "dec"; id: string }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "open" }
  | { type: "close" }
  | { type: "toggle" }
  | { type: "hydrate"; lines: CartLine[] };

const initial: State = { lines: [], open: false };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "add": {
      const existing = s.lines.find(l => l.id === a.line.id);
      if (existing) {
        return { ...s, lines: s.lines.map(l => l.id === a.line.id ? { ...l, qty: l.qty + (a.line.qty ?? 1) } : l) };
      }
      return { ...s, lines: [...s.lines, { ...a.line, qty: a.line.qty ?? 1 }] };
    }
    case "inc": return { ...s, lines: s.lines.map(l => l.id === a.id ? { ...l, qty: l.qty + 1 } : l) };
    case "dec": return { ...s, lines: s.lines.flatMap(l => l.id === a.id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l]) };
    case "remove": return { ...s, lines: s.lines.filter(l => l.id !== a.id) };
    case "clear": return { ...s, lines: [] };
    case "open": return { ...s, open: true };
    case "close": return { ...s, open: false };
    case "toggle": return { ...s, open: !s.open };
    case "hydrate": return { ...s, lines: a.lines };
  }
}

type Ctx = {
  lines: CartLine[];
  open: boolean;
  add: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  toggle: () => void;
  total: number;
  count: number;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("pdc-cart");
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { localStorage.setItem("pdc-cart", JSON.stringify(state.lines)); } catch {}
  }, [state.lines]);

  const value = useMemo<Ctx>(() => ({
    lines: state.lines,
    open: state.open,
    add: (line) => dispatch({ type: "add", line }),
    inc: (id) => dispatch({ type: "inc", id }),
    dec: (id) => dispatch({ type: "dec", id }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
    setOpen: (v) => dispatch({ type: v ? "open" : "close" }),
    toggle: () => dispatch({ type: "toggle" }),
    total: state.lines.reduce((s, l) => s + l.unitPrice * l.qty, 0),
    count: state.lines.reduce((s, l) => s + l.qty, 0),
  }), [state]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

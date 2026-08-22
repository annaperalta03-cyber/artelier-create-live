import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  nombre: string;
  precio: number;
  variante?: string;
  tipo: "kit" | "material" | "fragancia" | "taller";
  cantidad: number;
};

type CartCtx = {
  items: CartItem[];
  subtotal: number;
  count: number;
  add: (item: Omit<CartItem, "cantidad">, cantidad?: number) => void;
  remove: (id: string, variante?: string) => void;
  setCantidad: (id: string, cantidad: number, variante?: string) => void;
  clear: () => void;
  hidratado: boolean;
};

const KEY = "artelier-carrito-v1";
const Ctx = createContext<CartCtx | null>(null);

const key = (id: string, variante?: string) => `${id}__${variante ?? ""}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* carrito vacío */
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    window.localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hidratado]);

  const add = useCallback((item: Omit<CartItem, "cantidad">, cantidad = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => key(p.id, p.variante) === key(item.id, item.variante));
      if (i === -1) return [...prev, { ...item, cantidad }];
      const copia = [...prev];
      copia[i] = { ...copia[i], cantidad: copia[i].cantidad + cantidad };
      return copia;
    });
  }, []);

  const remove = useCallback((id: string, variante?: string) => {
    setItems((prev) => prev.filter((p) => key(p.id, p.variante) !== key(id, variante)));
  }, []);

  const setCantidad = useCallback((id: string, cantidad: number, variante?: string) => {
    setItems((prev) =>
      prev
        .map((p) =>
          key(p.id, p.variante) === key(id, variante) ? { ...p, cantidad } : p,
        )
        .filter((p) => p.cantidad > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const subtotal = items.reduce((t, i) => t + i.precio * i.cantidad, 0);
    const count = items.reduce((t, i) => t + i.cantidad, 0);
    return { items, subtotal, count, add, remove, setCantidad, clear, hidratado };
  }, [items, add, remove, setCantidad, clear, hidratado]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

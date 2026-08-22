import type { CartItem } from "@/lib/cart";

export type EstadoPedido =
  | "NUEVO"
  | "CONTACTADO"
  | "CONFIRMADO"
  | "PREPARANDO"
  | "LISTO"
  | "ENTREGADO"
  | "CANCELADO";

export type Pedido = {
  numero: string;
  creado: string;
  cliente: string;
  whatsapp: string;
  email?: string;
  entrega: "Delivery" | "Retiro";
  direccion?: string;
  sector?: string;
  ciudad?: string;
  notas?: string;
  items: CartItem[];
  subtotal: number;
  estado: EstadoPedido;
};

const KEY = "artelier-pedidos-v1";
const SEQ = "artelier-secuencia-v1";

export function leerPedidos(): Pedido[] {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Pedido[];
  } catch {
    return [];
  }
}

function siguienteNumero() {
  const actual = Number(window.localStorage.getItem(SEQ) ?? "123") + 1;
  window.localStorage.setItem(SEQ, String(actual));
  return `ART-${String(actual).padStart(5, "0")}`;
}

/** Guarda el pedido primero. WhatsApp viene después: el pedido existe igual. */
export function guardarPedido(datos: Omit<Pedido, "numero" | "creado" | "estado">): Pedido {
  const pedido: Pedido = {
    ...datos,
    numero: siguienteNumero(),
    creado: new Date().toISOString(),
    estado: "NUEVO",
  };
  const todos = [pedido, ...leerPedidos()];
  window.localStorage.setItem(KEY, JSON.stringify(todos));
  window.dispatchEvent(new CustomEvent("new_order", { detail: pedido }));
  return pedido;
}

export function buscarPedido(numero: string) {
  return leerPedidos().find((p) => p.numero === numero);
}

export function mensajeWhatsApp(p: Pedido) {
  const lineas = p.items.map(
    (i) => `• ${i.nombre}${i.variante ? ` (${i.variante})` : ""} — ${i.cantidad} ud.`,
  );
  return [
    "Hola Artelier 👋",
    "",
    `Acabo de realizar el pedido #${p.numero}.`,
    "",
    "Mi pedido:",
    ...lineas,
    "",
    `Subtotal: RD$${p.subtotal.toLocaleString("es-DO")}`,
    `Nombre: ${p.cliente}`,
    `Entrega: ${p.entrega}`,
    `Sector: ${p.sector ?? "—"}`,
    "",
    "Quedo pendiente para confirmar disponibilidad y forma de pago.",
  ].join("\n");
}

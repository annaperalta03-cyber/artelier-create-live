import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { rd } from "@/lib/site";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Mi carrito — ARTELIER" },
      {
        name: "description",
        content: "Revisa tus kits, materiales y fragancias antes de realizar tu pedido.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Mi carrito — ARTELIER" },
      { property: "og:description", content: "Kits, materiales y fragancias en una sola orden." },
    ],
  }),
  component: CarritoPage,
});

function CarritoPage() {
  const { items, subtotal, setCantidad, remove, hidratado } = useCart();

  return (
    <section className="px-4 py-14 lg:px-8 lg:py-20">
      <h1 className="display-lg">Tu carrito.</h1>

      {hidratado && items.length === 0 && (
        <div className="mt-10 border border-ink bg-chartreuse p-8 lg:p-12">
          <p className="display-md max-w-[22ch]">Aquí no hay nada todavía.</p>
          <p className="mt-4 max-w-md text-lg">
            Ningún proyecto empieza vacío. Elige un kit, unas ceras o un aroma raro.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/kits" className="label-xs bg-ink px-6 py-4 text-paper">
              Ver kits
            </Link>
            <Link to="/materiales" className="label-xs border border-ink px-6 py-4">
              Ver materiales
            </Link>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-ink/20 border-y border-ink">
            {items.map((i) => (
              <li key={i.id + (i.variante ?? "")} className="flex flex-wrap items-center gap-4 py-5">
                <div className="min-w-48 flex-1">
                  <p className="font-display text-xl font-bold uppercase leading-none">{i.nombre}</p>
                  <p className="label-xs mt-2 opacity-60">
                    {i.tipo}
                    {i.variante ? ` · ${i.variante}` : ""}
                  </p>
                </div>
                <div className="flex items-center border border-ink">
                  <button
                    type="button"
                    aria-label="Quitar uno"
                    onClick={() => setCantidad(i.id, i.cantidad - 1, i.variante)}
                    className="flex size-11 items-center justify-center hover:bg-chartreuse/40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center font-display font-bold">{i.cantidad}</span>
                  <button
                    type="button"
                    aria-label="Agregar uno"
                    onClick={() => setCantidad(i.id, i.cantidad + 1, i.variante)}
                    className="flex size-11 items-center justify-center hover:bg-chartreuse/40"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <span className="w-24 text-right font-display text-lg font-bold">
                  {rd(i.precio * i.cantidad)}
                </span>
                <button
                  type="button"
                  aria-label="Eliminar del carrito"
                  onClick={() => remove(i.id, i.variante)}
                  className="flex size-11 shrink-0 items-center justify-center text-ink/70 hover:text-tomate"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-ink bg-ink p-7 text-paper">
            <p className="label-xs opacity-60">Subtotal</p>
            <p className="mt-2 font-display text-5xl font-black">{rd(subtotal)}</p>
            <p className="mt-4 text-sm text-paper/70">
              El delivery y la disponibilidad se confirman por WhatsApp. Aquí no se paga nada
              todavía.
            </p>
            <Link
              to="/checkout"
              className="label-xs mt-7 block bg-chartreuse px-6 py-5 text-center text-ink"
            >
              Continuar con mi pedido
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { rd } from "@/lib/site";
import carritoVacio from "@/assets/shop/carrito-vacio.jpg";

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
        <div className="mt-10 grid border border-ink lg:grid-cols-[1.05fr_1fr]">
          <div className="relative bg-chartreuse p-8 lg:p-12">
            <span className="paper-texture pointer-events-none absolute inset-0 opacity-30" />
            <span className="etiqueta relative -rotate-[2deg] border border-ink bg-paper px-3 py-1 text-ink">
              Carrito vacío
            </span>
            <p className="display-md relative mt-6 max-w-[18ch]">Aquí no hay nada todavía.</p>
            <p className="relative mt-5 max-w-[40ch] text-lg">
              Ningún proyecto empieza lleno: empieza con un frasco vacío, una idea y ganas de
              ensuciarte las manos. Elige un kit, unas ceras o un aroma raro.
            </p>
            <Link
              to="/materiales"
              className="label-xs relative mt-8 inline-block bg-ink px-7 py-5 text-paper"
            >
              Buscar algo para crear
            </Link>
            <div className="relative mt-4 flex flex-wrap gap-3">
              <Link to="/kits" className="label-xs border border-ink px-5 py-3">
                Ver kits
              </Link>
              <Link to="/olfactory" className="label-xs border border-ink px-5 py-3">
                Ver fragancias
              </Link>
            </div>
          </div>
          <div className="relative border-t border-ink lg:border-l lg:border-t-0">
            <img
              src={carritoVacio}
              alt="Frasco vacío sobre una mesa de estudio con una nota dibujada a mano"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
            <span className="etiqueta absolute bottom-4 right-4 rotate-[3deg] border border-ink bg-paper px-3 py-1 text-ink">
              Empieza por aquí
            </span>
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

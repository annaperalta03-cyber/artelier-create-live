import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { rd } from "@/lib/site";
import { guardarPedido } from "@/lib/pedidos";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Realizar pedido — ARTELIER" },
      {
        name: "description",
        content:
          "Deja tus datos, registramos tu pedido y luego lo confirmas por WhatsApp. Sin pagos en línea.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Realizar pedido — ARTELIER" },
      {
        property: "og:description",
        content: "Registramos tu pedido y coordinamos entrega y forma de pago por WhatsApp.",
      },
    ],
  }),
  component: CheckoutPage,
});

const campo = "w-full border border-ink bg-card px-4 py-3 focus:border-cobalto";

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [entrega, setEntrega] = useState<"Delivery" | "Retiro">("Delivery");

  if (items.length === 0) {
    return (
      <section className="px-4 py-20 lg:px-8">
        <h1 className="display-lg max-w-[20ch]">Primero elige algo que crear.</h1>
        <Link to="/kits" className="label-xs mt-8 inline-block bg-ink px-6 py-4 text-paper">
          Ver kits
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 py-14 lg:px-8 lg:py-20">
      <h1 className="display-lg">Casi listo.</h1>
      <p className="mt-4 max-w-xl text-lg">
        Registramos tu pedido ahora mismo. Después lo confirmas por WhatsApp para coordinar
        disponibilidad, entrega y forma de pago.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const d = new FormData(e.currentTarget);
            const pedido = guardarPedido({
              cliente: String(d.get("nombre")),
              whatsapp: String(d.get("whatsapp")),
              email: String(d.get("email") || ""),
              entrega,
              direccion: String(d.get("direccion") || ""),
              sector: String(d.get("sector") || ""),
              ciudad: String(d.get("ciudad") || ""),
              notas: String(d.get("notas") || ""),
              items,
              subtotal,
            });
            clear();
            toast.success(`Pedido ${pedido.numero} registrado`);
            navigate({ to: "/pedido/$numero", params: { numero: pedido.numero } });
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <label className="block">
            <span className="label-xs">Nombre</span>
            <input name="nombre" required className={`${campo} mt-2`} />
          </label>
          <label className="block">
            <span className="label-xs">WhatsApp</span>
            <input name="whatsapp" required className={`${campo} mt-2`} />
          </label>
          <label className="block sm:col-span-2">
            <span className="label-xs">Email (opcional)</span>
            <input name="email" type="email" className={`${campo} mt-2`} />
          </label>

          <fieldset className="sm:col-span-2">
            <legend className="label-xs">Método de entrega</legend>
            <div className="mt-2 flex gap-2">
              {(["Delivery", "Retiro"] as const).map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => setEntrega(op)}
                  className={`label-xs border border-ink px-6 py-3 ${
                    entrega === op ? "bg-ink text-paper" : ""
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </fieldset>

          {entrega === "Delivery" && (
            <label className="block sm:col-span-2">
              <span className="label-xs">Dirección</span>
              <input name="direccion" required className={`${campo} mt-2`} />
            </label>
          )}
          <label className="block">
            <span className="label-xs">Sector</span>
            <input name="sector" className={`${campo} mt-2`} />
          </label>
          <label className="block">
            <span className="label-xs">Ciudad</span>
            <input name="ciudad" defaultValue="Santo Domingo" className={`${campo} mt-2`} />
          </label>
          <label className="block sm:col-span-2">
            <span className="label-xs">Notas</span>
            <textarea name="notas" rows={3} className={`${campo} mt-2`} />
          </label>

          <button type="submit" className="label-xs bg-tomate px-7 py-5 text-paper sm:col-span-2">
            Realizar pedido
          </button>
        </form>

        <aside className="h-fit border border-ink bg-secondary p-7">
          <p className="label-xs opacity-60">Tu pedido</p>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={i.id + (i.variante ?? "")} className="flex justify-between gap-4 text-sm">
                <span>
                  {i.nombre}
                  {i.variante ? ` · ${i.variante}` : ""} × {i.cantidad}
                </span>
                <span className="font-display font-bold">{rd(i.precio * i.cantidad)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-ink pt-4 font-display text-3xl font-black">
            {rd(subtotal)}
          </p>
        </aside>
      </div>
    </section>
  );
}

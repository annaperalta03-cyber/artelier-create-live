import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { buscarPedido, mensajeWhatsApp, type Pedido } from "@/lib/pedidos";
import { rd, waLink } from "@/lib/site";

export const Route = createFileRoute("/pedido/$numero")({
  head: () => ({
    meta: [
      { title: "Pedido recibido — ARTELIER" },
      { name: "description", content: "Tu pedido quedó registrado. Confírmalo por WhatsApp." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Pedido recibido — ARTELIER" },
      { property: "og:description", content: "Tu pedido quedó registrado en Artelier." },
    ],
  }),
  component: PedidoPage,
});

function PedidoPage() {
  const { numero } = Route.useParams();
  const [pedido, setPedido] = useState<Pedido | undefined>(undefined);

  useEffect(() => {
    setPedido(buscarPedido(numero));
  }, [numero]);

  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24">
      <h1 className="display-xl">¡Listo!</h1>
      <p className="display-md mt-6">Recibimos tu pedido #{numero}</p>
      <p className="mt-6 max-w-xl text-lg">
        Tu pedido fue registrado correctamente. Ahora confírmalo por WhatsApp para coordinar
        disponibilidad, entrega y forma de pago.
      </p>

      {pedido && (
        <div className="mt-10 max-w-xl border border-ink bg-secondary p-7">
          <p className="label-xs opacity-60">Resumen</p>
          <ul className="mt-4 space-y-2">
            {pedido.items.map((i) => (
              <li key={i.id + (i.variante ?? "")} className="flex justify-between gap-4 text-sm">
                <span>
                  {i.nombre}
                  {i.variante ? ` · ${i.variante}` : ""} × {i.cantidad}
                </span>
                <span className="font-display font-bold">{rd(i.precio * i.cantidad)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-ink pt-4 font-display text-2xl font-black">
            Subtotal {rd(pedido.subtotal)}
          </p>
          <p className="label-xs mt-3 opacity-60">
            Entrega: {pedido.entrega}
            {pedido.sector ? ` · ${pedido.sector}` : ""} · Estado: {pedido.estado}
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={waLink(
            pedido
              ? mensajeWhatsApp(pedido)
              : `Hola Artelier 👋 acabo de realizar el pedido #${numero}.`,
          )}
          target="_blank"
          rel="noreferrer"
          className="label-xs bg-chartreuse px-8 py-6 text-ink"
        >
          Confirmar por WhatsApp
        </a>
        <Link to="/kits" className="label-xs border border-ink px-8 py-6">
          Seguir explorando
        </Link>
      </div>
    </section>
  );
}

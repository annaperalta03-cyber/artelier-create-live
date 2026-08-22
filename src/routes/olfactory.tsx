import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import uOlfactory from "@/assets/universo-olfactory.jpg";
import { coleccionesOlfativas, fragancias, type Fragancia } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { rd, site } from "@/lib/site";

export const Route = createFileRoute("/olfactory")({
  head: () => ({
    meta: [
      { title: "Artelier Olfactory — The Olfactory Library" },
      {
        name: "description",
        content:
          "Biblioteca de fragancias para velas, jabones y home fragrance. Desde RD$100 por onza, en Santo Domingo.",
      },
      { property: "og:title", content: "Artelier Olfactory — The Olfactory Library" },
      {
        property: "og:description",
        content: "Una biblioteca de aromas para quienes disfrutan crear.",
      },
    ],
  }),
  component: OlfactoryPage,
});

function FraganciaCard({ f }: { f: Fragancia }) {
  const { add } = useCart();
  const [tamano, setTamano] = useState(f.tamanos[0]);
  const precio = tamano.onzas * site.precioOnzaFragancia;

  return (
    <article className="flex flex-col border border-paper/20 bg-white/5 p-6">
      <p className="label-xs text-chartreuse">{f.familia}</p>
      <h3 className="mt-3 font-display text-3xl font-black uppercase leading-none">{f.nombre}</h3>
      <p className="mt-4 text-paper/70">{f.descripcion}</p>

      <dl className="mt-5 space-y-1 text-sm text-paper/60">
        <div className="flex gap-2">
          <dt className="label-xs w-20 shrink-0 pt-1">Salida</dt>
          <dd>{f.salida}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="label-xs w-20 shrink-0 pt-1">Corazón</dt>
          <dd>{f.corazon}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="label-xs w-20 shrink-0 pt-1">Fondo</dt>
          <dd>{f.fondo}</dd>
        </div>
      </dl>

      <p className="label-xs mt-5 border border-paper/30 px-2 py-1 w-fit">Ideal para: {f.usos}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {f.tamanos.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setTamano(t)}
            className={`label-xs border border-paper/40 px-3 py-2 ${
              tamano.label === t.label ? "bg-chartreuse text-ink" : "text-paper"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="font-display text-2xl font-bold">{rd(precio)}</span>
        <button
          type="button"
          onClick={() => {
            add({
              id: f.id,
              nombre: f.nombre,
              precio,
              variante: tamano.label,
              tipo: "fragancia",
            });
            toast.success("Aroma reservado", { description: `${f.nombre} · ${tamano.label}` });
          }}
          className="label-xs bg-paper px-5 py-3 text-ink"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

function OlfactoryPage() {
  const [coleccion, setColeccion] = useState<string>("todas");
  const lista =
    coleccion === "todas" ? fragancias : fragancias.filter((f) => f.coleccion === coleccion);

  return (
    <div className="bg-noche text-paper">
      <header className="grid items-end border-b border-paper/20 lg:grid-cols-[1.2fr_1fr]">
        <div className="px-4 py-16 lg:px-8 lg:py-24">
          <p className="label-xs text-chartreuse">04 · Artelier Olfactory</p>
          <h1 className="display-xl mt-5">The Olfactory Library</h1>
          <p className="mt-6 max-w-xl text-lg text-paper/70">
            Una biblioteca de aromas para quienes disfrutan crear. Huele, prueba, combina y
            equivócate: aquí eso es parte del proceso.
          </p>
          <p className="label-xs mt-8 inline-block bg-chartreuse px-3 py-2 text-ink">
            Desde {rd(site.precioOnzaFragancia)} por onza
          </p>
        </div>
        <img
          src={uOlfactory}
          alt="Frascos ámbar de fragancia con etiquetas escritas a mano y blotters"
          loading="lazy"
          width={1200}
          height={900}
          className="h-full min-h-72 w-full border-t border-paper/20 object-cover lg:border-l lg:border-t-0"
        />
      </header>

      <section className="border-b border-paper/20 px-4 py-14 lg:px-8">
        <h2 className="display-lg">Descubrimiento olfativo.</h2>
        <div className="mt-8 grid gap-px bg-paper/20 sm:grid-cols-2 lg:grid-cols-3">
          {coleccionesOlfativas.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setColeccion(coleccion === c.id ? "todas" : c.id)}
              className={`flex flex-col gap-3 p-8 text-left transition ${
                coleccion === c.id ? "bg-chartreuse text-ink" : "bg-noche hover:bg-white/5"
              }`}
            >
              <span className="font-display text-2xl font-black uppercase">{c.nombre}</span>
              <span className="text-sm opacity-70">{c.texto}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="display-md">
            {coleccion === "todas"
              ? "Todas las fragancias"
              : coleccionesOlfativas.find((c) => c.id === coleccion)?.nombre}
          </h2>
          <button
            type="button"
            onClick={() => setColeccion("todas")}
            className="label-xs underline decoration-2 underline-offset-4"
          >
            Ver todas
          </button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lista.map((f) => (
            <FraganciaCard key={f.id} f={f} />
          ))}
        </div>
      </section>

      <section className="border-t border-paper/20 px-4 py-14 lg:px-8">
        <h2 className="display-md">Si te gusta una, prueba estas.</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {fragancias.slice(0, 6).map((f) => (
            <span key={f.id} className="label-xs border border-paper/30 px-4 py-3">
              {f.nombre}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

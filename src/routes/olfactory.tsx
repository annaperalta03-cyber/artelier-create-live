import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import olfactoryGaleria from "@/assets/olfactory-galeria-clara.png.asset.json";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: olfactoryGaleria.url },
      { name: "twitter:image", content: olfactoryGaleria.url },
    ],
  }),
  component: OlfactoryPage,
});

const acentos: Record<Fragancia["acento"], string> = {
  cobalto: "bg-cobalto text-paper",
  tomate: "bg-tomate text-paper",
  chartreuse: "bg-chartreuse text-ink",
  rosa: "bg-rosa text-paper",
  ink: "bg-ink text-paper",
};

function FraganciaCard({ f, indice }: { f: Fragancia; indice: number }) {
  const { add } = useCart();
  const [tamano, setTamano] = useState(f.tamanos[0]);
  if (!tamano) return null;
  const precio = tamano.onzas * site.precioOnzaFragancia;

  return (
    <article className="group grid border-t border-ink/20 lg:grid-cols-[minmax(0,1.18fr)_minmax(22rem,0.82fr)]">
      <div className="relative overflow-hidden bg-secondary lg:min-h-[44rem]">
        <img
          src={f.imagen}
          alt={`Artwork de la fragancia ${f.nombre}`}
          loading="lazy"
          width={1080}
          height={1440}
          className="aspect-3/4 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="etiqueta absolute left-4 top-5 -rotate-2 lg:left-6">
          Archivo {String(indice + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col justify-between gap-10 bg-paper p-6 sm:p-8 lg:p-12">
        <div>
          <p className={`label-xs inline-block px-3 py-2 ${acentos[f.acento]}`}>
            {f.familia}
          </p>
          <h2 className="display-md mt-6 max-w-[14ch]">{f.nombre}</h2>
          <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-ink/70">{f.descripcion}</p>

          <dl className="mt-8 border-y border-ink/20 py-5">
            {[
              ["Salida", f.salida],
              ["Corazón", f.corazon],
              ["Fondo", f.fondo],
            ].map(([titulo, detalle]) => (
              <div key={titulo} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-ink/10 py-3 last:border-0">
                <dt className="label-xs">{titulo}</dt>
                <dd className="text-sm text-ink/70">{detalle}</dd>
              </div>
            ))}
          </dl>
          <p className="font-mano mt-5 text-xl text-cobalto">Funciona en: {f.usos}</p>
        </div>

        <div>
          <fieldset>
            <legend className="label-xs mb-3">Elige el tamaño</legend>
            <div className="flex flex-wrap gap-2">
              {f.tamanos.map((t) => {
                const activo = tamano.label === t.label;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setTamano(t)}
                    aria-pressed={activo}
                    className={`label-xs min-h-11 border px-4 py-3 transition-colors ${
                      activo
                        ? "border-cobalto bg-cobalto text-paper"
                        : "border-ink/30 hover:border-ink hover:bg-secondary"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-5">
            <div>
              <span className="label-xs block opacity-60">Precio</span>
              <span className="font-display text-4xl font-black">{rd(precio)}</span>
            </div>
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
              className="label-xs group/boton inline-flex min-h-12 items-center gap-3 bg-ink px-6 py-4 text-paper transition-colors hover:bg-cobalto"
            >
              Agregar al carrito
              <Plus className="size-4 transition-transform group-hover/boton:rotate-90" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function OlfactoryPage() {
  const [coleccion, setColeccion] = useState("todas");
  const lista =
    coleccion === "todas" ? fragancias : fragancias.filter((f) => f.coleccion === coleccion);

  return (
    <div className="bg-paper text-ink">
      <header className="relative border-b border-ink/20">
        <div className="relative min-h-[72vh] overflow-hidden lg:min-h-[78vh]">
          <img
            src={olfactoryGaleria.url}
            alt="Galería Artelier Olfactory con afiches de fragancias, frascos ámbar y pintura de colores"
            loading="eager"
            fetchPriority="high"
            width={1200}
            height={900}
            className="olfactory-gallery-drift absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-paper/95 px-4 py-6 sm:max-w-[42rem] lg:px-8 lg:py-8">
            <p className="label-xs text-cobalto">Artelier Olfactory</p>
            <h1 className="display-lg mt-3">The Olfactory Library</h1>
            <p className="mt-4 max-w-xl text-base text-ink/75 sm:text-lg">
              La biblioteca olfativa de Artelier: huele, prueba, combina y encuentra el aroma de tu próximo proyecto.
            </p>
          </div>
          <span className="etiqueta absolute right-4 top-5 rotate-2 lg:right-8 lg:top-8">
            Galería 04
          </span>
        </div>
      </header>

      <section className="border-b border-ink/20 px-4 py-12 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-xs text-rosa">Colecciones olfativas</p>
            <h2 className="display-md mt-3">Elige por sensación.</h2>
          </div>
          <p className="font-mano max-w-[20ch] rotate-1 text-2xl text-cobalto">
            no hay respuestas incorrectas
          </p>
        </div>
        <div className="-mx-4 mt-8 flex snap-x gap-3 overflow-x-auto px-4 pb-3 lg:-mx-8 lg:px-8">
          <button
            type="button"
            onClick={() => setColeccion("todas")}
            aria-pressed={coleccion === "todas"}
            className={`label-xs min-h-12 shrink-0 snap-start border px-5 py-3 transition-colors ${
              coleccion === "todas" ? "border-ink bg-ink text-paper" : "border-ink/30 hover:bg-secondary"
            }`}
          >
            Todas · {fragancias.length}
          </button>
          {coleccionesOlfativas.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setColeccion(c.id)}
              aria-pressed={coleccion === c.id}
              title={c.texto}
              className={`label-xs min-h-12 shrink-0 snap-start border px-5 py-3 transition-colors ${
                coleccion === c.id
                  ? "border-cobalto bg-cobalto text-paper"
                  : "border-ink/30 hover:border-ink hover:bg-chartreuse"
              }`}
            >
              {c.nombre}
            </button>
          ))}
        </div>
      </section>

      <section aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-4 px-4 py-10 lg:px-8 lg:py-14">
          <h2 className="display-md">
            {coleccion === "todas"
              ? "Todas las fragancias"
              : coleccionesOlfativas.find((c) => c.id === coleccion)?.nombre}
          </h2>
          <p className="label-xs opacity-60">{lista.length} aromas en archivo</p>
        </div>
        {lista.map((f, indice) => (
          <FraganciaCard key={f.id} f={f} indice={fragancias.indexOf(f)} />
        ))}
      </section>

      <section className="flex flex-col items-start gap-6 border-t border-ink bg-chartreuse px-4 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-16">
        <div>
          <p className="label-xs">¿No sabes cuánto necesitas?</p>
          <h2 className="display-md mt-3 max-w-[18ch]">Pasa del aroma a la fórmula.</h2>
        </div>
        <a
          href="/calculadoras"
          className="label-xs group inline-flex min-h-12 items-center gap-3 border border-ink bg-paper px-6 py-4"
        >
          Abrir calculadoras
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
      </section>
    </div>
  );
}
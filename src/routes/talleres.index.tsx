import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { filtrosTalleres, talleres } from "@/data/catalog";
import { bgAcento } from "@/components/ProductCard";
import { rd } from "@/lib/site";

export const Route = createFileRoute("/talleres/")({
  head: () => ({
    meta: [
      { title: "Talleres creativos en Santo Domingo — ARTELIER" },
      {
        name: "description",
        content:
          "Perfume Lab, Candle Lab, Glow Lab, talleres para niños y experiencias sensoriales para grupos y marcas en Santo Domingo.",
      },
      { property: "og:title", content: "Talleres ARTELIER — Ven a crear con nosotros" },
      {
        property: "og:description",
        content: "Experiencias creativas para adultos, niños, grupos, eventos y marcas.",
      },
    ],
  }),
  component: TalleresPage,
});

function TalleresPage() {
  const [filtro, setFiltro] = useState("Todos");
  const lista = filtro === "Todos" ? talleres : talleres.filter((t) => t.tags.includes(filtro));

  return (
    <>
      <header className="border-b border-ink px-4 py-14 lg:px-8 lg:py-20">
        <p className="label-xs">01 · Talleres</p>
        <h1 className="display-xl mt-4">Ven a crear<br />con nosotros.</h1>
        <p className="mt-6 max-w-xl text-lg">
          Dos horas sin celular, con las manos sucias y algo hecho por ti para llevar a casa.
        </p>
      </header>

      <div className="sticky top-0 z-30 flex flex-wrap gap-2 border-b border-ink bg-paper px-4 py-4 lg:px-8">
        {filtrosTalleres.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            aria-pressed={filtro === f}
            className={`label-xs min-h-11 border border-ink px-4 py-2 ${
              filtro === f ? "bg-ink text-paper" : "hover:bg-chartreuse"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <section className="grid gap-px bg-ink/20 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((t) => (
          <Link
            key={t.id}
            to="/talleres/$slug"
            params={{ slug: t.slug }}
            className="group flex flex-col bg-paper"
          >
            <div className={`relative flex min-h-56 flex-1 items-end p-6 ${bgAcento[t.acento]}`}>
              <span className="paper-texture pointer-events-none absolute inset-0 opacity-40" />
              <h2 className="display-md relative max-w-[14ch]">{t.nombre}</h2>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <p className="text-sm">{t.resumen}</p>
              <p className="label-xs opacity-60">
                {t.duracion} · {t.edad} · {t.personas}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-display text-xl font-bold">
                  {t.precio ? rd(t.precio) : "Cotizar"}
                </span>
                <span className="label-xs underline decoration-2 underline-offset-4 group-hover:text-tomate">
                  Ver taller
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

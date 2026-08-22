import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categoriasKits, kits } from "@/data/catalog";

export const Route = createFileRoute("/kits")({
  head: () => ({
    meta: [
      { title: "Kits DIY para crear en casa — ARTELIER" },
      {
        name: "description",
        content:
          "Kits creativos con todo incluido: velas, perfume, jelly soap, glow y kits para niños. Entrega en Santo Domingo.",
      },
      { property: "og:title", content: "Kits ARTELIER — Artelier, pero en casa" },
      {
        property: "og:description",
        content: "Kits creativos con todo lo necesario para desconectarte y hacer algo con tus manos.",
      },
    ],
  }),
  component: KitsPage,
});

const pasos = [
  { n: "Abre", texto: "Todo viene medido, etiquetado y listo.", bg: "bg-tomate text-paper" },
  { n: "Crea", texto: "Sigue la tarjeta de fórmula a tu ritmo.", bg: "bg-chartreuse text-ink" },
  { n: "Experimenta", texto: "Cambia el aroma, el color, la cantidad.", bg: "bg-cobalto text-paper" },
  { n: "Disfruta", texto: "Y presume que lo hiciste tú.", bg: "bg-rosa text-paper" },
];

function KitsPage() {
  const [cat, setCat] = useState("Todos");
  const lista = cat === "Todos" ? kits : kits.filter((k) => k.categoria === cat);

  return (
    <>
      <header className="border-b border-ink px-4 py-14 lg:px-8 lg:py-20">
        <p className="label-xs">02 · Kits</p>
        <h1 className="display-xl mt-4">Artelier,<br />pero en casa.</h1>
        <p className="mt-6 max-w-xl text-lg">
          Todo medido, todo incluido. Tú solo pon la mesa y las ganas.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-ink px-4 py-4 lg:px-8">
        {categoriasKits.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`label-xs border border-ink px-4 py-2 ${
              cat === c ? "bg-ink text-paper" : "hover:bg-chartreuse"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="grid auto-rows-min gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {lista.map((k) => (
          <ProductCard key={k.id} producto={k} tipo="kit" />
        ))}
      </section>

      <section className="border-y border-ink">
        <h2 className="display-lg px-4 py-10 lg:px-8">Abre → Crea → Experimenta → Disfruta</h2>
        <div className="grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p, i) => (
            <div key={p.n} className={`border-ink p-8 sm:border-l ${i === 0 ? "sm:border-l-0" : ""} ${p.bg}`}>
              <p className="font-display text-6xl font-black">0{i + 1}</p>
              <p className="display-md mt-4">{p.n}</p>
              <p className="mt-3 text-base opacity-90">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 px-4 py-14 sm:grid-cols-2 lg:px-8">
        <div className="border border-ink bg-cobalto p-8 text-paper">
          <p className="display-md">¿Ya sabes hacerlo?</p>
          <p className="mt-3 max-w-sm">Compra los materiales por separado y hazlo a tu escala.</p>
          <Link to="/materiales" className="label-xs mt-6 inline-block border border-current px-6 py-4">
            Ver materiales
          </Link>
        </div>
        <div className="border border-ink bg-ink p-8 text-paper">
          <p className="display-md">¿Prefieres compañía?</p>
          <p className="mt-3 max-w-sm">Ven al estudio y hazlo con nosotros, en vivo y con música.</p>
          <Link to="/talleres" className="label-xs mt-6 inline-block border border-current px-6 py-4">
            Ver talleres
          </Link>
        </div>
      </section>
    </>
  );
}

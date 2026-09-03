import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { filtrosTalleres, talleres } from "@/data/catalog";
import { bgAcento } from "@/components/ProductCard";
import { rd } from "@/lib/site";
import docMesa from "@/assets/taller/mesa-larga.jpg";
import docManos from "@/assets/taller/manos.jpg";
import docFacilitador from "@/assets/taller/facilitador.jpg";

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

const pasos = [
  {
    n: "01",
    t: "Eliges tu taller y reservas",
    p: "Escoges el taller que te llama, nos escribes por WhatsApp y te confirmamos fecha, hora y cupo. No necesitas experiencia previa ni traer nada: mesa, materiales, delantal y herramientas ya están listos cuando llegas.",
  },
  {
    n: "02",
    t: "Creas con tus manos, acompañado",
    p: "Te sientas en la mesa larga con el grupo. Un facilitador te explica los ingredientes, te enseña las proporciones y se queda contigo mientras mezclas, hueles, corriges y vuelves a probar. Aquí equivocarse es parte del proceso.",
  },
  {
    n: "03",
    t: "Te llevas tu proyecto y tu fórmula",
    p: "Sales con lo que hiciste, etiquetado a tu manera, y con la tarjeta de fórmula para poder repetirlo en casa. Si te quedaste con ganas, te decimos exactamente qué materiales necesitas para seguir por tu cuenta.",
  },
];

const narrativa = [
  {
    k: "Ingredientes",
    t: "Materia prima real",
    p: "Ceras, aceites esenciales, absolutos, pigmentos, botánicos secos, bases y envases de calidad profesional. Todo pesado, abierto y disponible sobre la mesa para que puedas olerlo y tocarlo antes de decidir.",
    bg: "bg-chartreuse text-ink",
  },
  {
    k: "Proceso",
    t: "Mezclar, oler, corregir",
    p: "Aprendes las proporciones, pruebas combinaciones en blotters, ajustas, derrites, vacías y esperas. Con guía en cada paso y espacio para cambiar de idea a mitad de camino.",
    bg: "bg-cobalto text-paper",
  },
  {
    k: "Resultado",
    t: "Algo hecho por ti",
    p: "Tu perfume, tu vela, tu jabón o tu pieza terminada, con tu nombre y tu fórmula anotada. Algo que usas, regalas y puedes volver a hacer.",
    bg: "bg-tomate text-paper",
  },
];

function TalleresPage() {
  const [filtro, setFiltro] = useState("Todos");
  const lista = filtro === "Todos" ? talleres : talleres.filter((t) => t.tags.includes(filtro));

  return (
    <>
      {/* HERO documental */}
      <header className="grid border-b border-ink lg:grid-cols-[1.1fr_1fr]">
        <div className="paper-texture relative px-4 py-14 lg:px-8 lg:py-20">
          <p className="label-xs">01 · Talleres</p>
          <h1 className="display-xl mt-4">Ven a crear<br />con nosotros.</h1>
          <p className="mt-6 max-w-xl text-lg">
            Dos horas sin celular, con las manos sucias y algo hecho por ti para llevar a casa. Una
            mesa larga, gente a los dos lados, materiales abiertos y alguien guiándote de cerca.
          </p>
          <span className="etiqueta mt-8 inline-block -rotate-2">Sin experiencia previa</span>
        </div>
        <div className="relative border-t border-ink lg:border-l lg:border-t-0">
          <img
            src={docMesa}
            alt="Grupo trabajando a ambos lados de la mesa larga en un taller de Artelier"
            width={1600}
            height={1104}
            className="h-full min-h-72 w-full object-cover"
          />
          <img
            src={docFacilitador}
            alt="Facilitadora de Artelier explicando una fórmula a una participante"
            loading="lazy"
            width={1200}
            height={1504}
            className="absolute -bottom-6 left-4 hidden w-40 border border-ink object-cover lg:block"
          />
          <span className="etiqueta absolute bottom-3 right-3 rotate-2">Foto: taller real</span>
        </div>
      </header>

      {/* Filtros / chips */}
      <div className="sticky top-[var(--header-h)] z-30 border-b border-ink bg-paper px-4 py-5 lg:px-8">
        <p className="label-xs mb-3 opacity-60">Filtrar por</p>
        <div className="flex flex-wrap gap-3">
          {filtrosTalleres.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltro(f)}
              aria-pressed={filtro === f}
              className={`label-xs min-h-12 border-2 border-ink px-6 py-3 transition-transform active:translate-y-px ${
                filtro === f
                  ? "-rotate-1 bg-ink text-paper"
                  : "bg-paper hover:-rotate-1 hover:bg-chartreuse"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
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
        {lista.length === 0 && (
          <p className="col-span-full bg-paper p-8 text-lg">
            No hay talleres con ese filtro ahora mismo. Prueba con otra categoría o escríbenos.
          </p>
        )}
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="border-y border-ink px-4 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg">Cómo funciona.</h2>
          <p className="max-w-md text-base opacity-70">
            Tres pasos, cero complicaciones. Así es un taller de Artelier de principio a fin.
          </p>
        </div>
        <ol className="mt-10 grid gap-px bg-ink/20 lg:grid-cols-3">
          {pasos.map((p) => (
            <li key={p.n} className="relative bg-paper p-8 lg:p-10">
              <span className="pointer-events-none absolute right-4 top-2 font-display text-7xl font-black text-ink/10">
                {p.n}
              </span>
              <p className="label-xs text-tomate">Paso {p.n}</p>
              <h3 className="mt-3 max-w-[20ch] font-display text-2xl font-bold uppercase leading-tight">
                {p.t}
              </h3>
              <p className="mt-4 max-w-prose text-base">{p.p}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* INGREDIENTES → PROCESO → RESULTADO */}
      <section className="border-b border-ink">
        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          <div className="px-4 py-12 lg:px-8 lg:py-16">
            <p className="label-xs">Ingredientes → Proceso → Resultado</p>
            <h2 className="display-lg mt-4">De la materia prima<br />a algo tuyo.</h2>
            <p className="mt-6 max-w-prose text-lg">
              No armamos manualidades: trabajamos con fórmulas, balanzas y materia prima real. Cada
              taller sigue el mismo recorrido.
            </p>
          </div>
          <img
            src={docManos}
            alt="Manos mezclando cera, etiquetando frascos y probando aromas sobre la mesa de trabajo"
            loading="lazy"
            width={1408}
            height={1008}
            className="h-full min-h-64 w-full border-t border-ink object-cover lg:border-l lg:border-t-0"
          />
        </div>
        <div className="grid gap-px border-t border-ink bg-ink/20 lg:grid-cols-3">
          {narrativa.map((n, i) => (
            <div key={n.k} className={`relative p-8 lg:p-10 ${n.bg}`}>
              <span className="paper-texture pointer-events-none absolute inset-0 opacity-30" />
              <p className="label-xs relative border border-current px-3 py-1">
                {`0${i + 1}`} · {n.k}
              </p>
              <h3 className="display-md relative mt-5 max-w-[16ch]">{n.t}</h3>
              <p className="relative mt-4 max-w-prose text-base">{n.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

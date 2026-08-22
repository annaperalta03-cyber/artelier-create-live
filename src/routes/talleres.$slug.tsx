import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { bgAcento } from "@/components/ProductCard";
import { proximasFechas, talleres } from "@/data/catalog";
import { rd, waLink } from "@/lib/site";

export const Route = createFileRoute("/talleres/$slug")({
  loader: ({ params }) => {
    const taller = talleres.find((t) => t.slug === params.slug);
    if (!taller) throw notFound();
    return { taller };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Taller no encontrado — ARTELIER" }, { name: "robots", content: "noindex" }] };
    }
    const { taller } = loaderData;
    return {
      meta: [
        { title: `${taller.nombre} — Taller ARTELIER` },
        { name: "description", content: taller.resumen },
        { property: "og:title", content: `${taller.nombre} — Taller ARTELIER` },
        { property: "og:description", content: taller.resumen },
      ],
    };
  },
  component: TallerDetalle,
});

function TallerDetalle() {
  const { taller } = Route.useLoaderData();
  const fechas = proximasFechas.filter((f) => f.tallerSlug === taller.slug);

  const mensaje = `Hola Artelier 👋 quiero hacer el taller ${taller.nombre}. ¿Cuáles son las próximas fechas?`;
  const mensajeGrupo = `Hola Artelier 👋 quiero el taller ${taller.nombre} para mi grupo. Somos aproximadamente ___ personas.`;

  return (
    <>
      <header className={`border-b border-ink px-4 py-14 lg:px-8 lg:py-20 ${bgAcento[taller.acento]}`}>
        <Link to="/talleres" className="label-xs underline decoration-2 underline-offset-4">
          ← Todos los talleres
        </Link>
        <h1 className="display-xl mt-6 max-w-[18ch]">{taller.nombre}</h1>
        <p className="mt-6 max-w-2xl text-lg lg:text-xl">{taller.resumen}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {taller.tags.map((t) => (
            <span key={t} className="label-xs border border-current px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </header>

      <section className="grid gap-px border-b border-ink bg-ink/20 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Duración", taller.duracion],
          ["Edad recomendada", taller.edad],
          ["Personas", taller.personas],
          ["Precio", taller.precio ? `${rd(taller.precio)} por persona` : "Cotizar"],
        ].map(([k, v]) => (
          <div key={k} className="bg-paper p-6">
            <p className="label-xs opacity-50">{k}</p>
            <p className="mt-2 font-display text-2xl font-bold uppercase leading-none">{v}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-12 px-4 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <h2 className="display-md">Qué vas a crear</h2>
          <ul className="mt-6 space-y-3">
            {taller.crearas.map((c) => (
              <li key={c} className="flex gap-3 border-b border-ink/15 pb-3 text-lg">
                <span className="text-tomate">→</span> {c}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="display-md">Qué incluye</h2>
          <ul className="mt-6 space-y-3">
            {taller.incluye.map((c) => (
              <li key={c} className="flex gap-3 border-b border-ink/15 pb-3 text-lg">
                <span className="text-cobalto">✳</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {fechas.length > 0 && (
        <section className="border-y border-ink bg-secondary px-4 py-12 lg:px-8">
          <h2 className="display-md">Fechas abiertas</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fechas.map((f) => (
              <div key={f.fecha} className="border border-ink bg-card p-5">
                <p className="font-display text-xl font-black uppercase">{f.fecha}</p>
                <p className="label-xs mt-2 opacity-60">
                  {f.hora} · {f.lugar}
                </p>
                <p className="mt-3 font-display text-lg font-bold">
                  {rd(f.precio)} · {f.cupos} cupos
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-wrap gap-3 px-4 py-14 lg:px-8">
        <a
          href={waLink(mensaje)}
          target="_blank"
          rel="noreferrer"
          className="label-xs bg-ink px-7 py-5 text-paper"
        >
          Quiero hacer este taller
        </a>
        <a
          href={waLink(mensajeGrupo)}
          target="_blank"
          rel="noreferrer"
          className="label-xs border border-ink px-7 py-5"
        >
          Quiero este taller para mi grupo
        </a>
      </section>
    </>
  );
}

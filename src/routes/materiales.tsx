import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { categoriasMateriales, materiales } from "@/data/catalog";

const searchSchema = z.object({
  cat: z.string().optional(),
});

export const Route = createFileRoute("/materiales")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Materiales para velas, jabones y beauty — ARTELIER" },
      {
        name: "description",
        content:
          "Ceras, mechas, bases, micas, envases y herramientas para tus proyectos creativos en Santo Domingo.",
      },
      { property: "og:title", content: "Materiales ARTELIER — Materiales para crear" },
      {
        property: "og:description",
        content: "Tú tienes la idea. Nosotros tenemos las cosas: ceras, bases, envases y herramientas.",
      },
    ],
  }),
  component: MaterialesPage,
});

function MaterialesPage() {
  const { cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const activa = cat && categoriasMateriales.includes(cat) ? cat : "TODOS";
  const lista = activa === "TODOS" ? materiales : materiales.filter((m) => m.categoria === activa);

  return (
    <>
      <header className="border-b border-ink px-4 py-14 lg:px-8 lg:py-20">
        <p className="label-xs">03 · Materiales</p>
        <h1 className="display-xl mt-4">Materiales<br />para crear.</h1>
        <p className="mt-6 max-w-xl text-lg">Tú tienes la idea. Nosotros tenemos las cosas.</p>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-ink px-4 py-4 lg:px-8">
        {["TODOS", ...categoriasMateriales].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() =>
              navigate({ search: c === "TODOS" ? {} : { cat: c }, resetScroll: false })
            }
            aria-pressed={activa === c}
            className={`label-xs min-h-11 border border-ink px-4 py-2 ${
              activa === c ? "bg-ink text-paper" : "hover:bg-chartreuse"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="grid auto-rows-min gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {lista.map((m) => (
          <ProductCard key={m.id} producto={m} tipo="material" />
        ))}
        {lista.length === 0 && (
          <p className="col-span-full border border-ink bg-secondary p-8 text-lg">
            No hay resultados en esta categoría por ahora. Prueba con otra o escríbenos y lo
            buscamos por ti.
          </p>
        )}
      </section>

      <section className="mx-4 mb-14 border border-ink bg-chartreuse p-8 lg:mx-8 lg:p-12">
        <p className="display-md max-w-[24ch]">¿Primera vez haciendo velas?</p>
        <p className="mt-4 max-w-lg text-lg">
          Empieza por el Candle Kit: viene todo medido y con instrucciones que sí se entienden.
        </p>
        <Link to="/kits" className="label-xs mt-6 inline-block bg-ink px-6 py-4 text-paper">
          Conocer el Candle Kit
        </Link>
      </section>
    </>
  );
}

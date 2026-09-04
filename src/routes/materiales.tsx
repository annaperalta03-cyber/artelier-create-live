import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categoriasMateriales, materiales } from "@/data/catalog";
import stillLife from "@/assets/shop/still-life-materiales.jpg";

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

type Orden = "destacados" | "precio-asc" | "precio-desc" | "az";

const ordenes: { valor: Orden; label: string }[] = [
  { valor: "destacados", label: "Recomendados" },
  { valor: "precio-asc", label: "Precio: menor a mayor" },
  { valor: "precio-desc", label: "Precio: mayor a menor" },
  { valor: "az", label: "Nombre A–Z" },
];

function MaterialesPage() {
  const { cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<Orden>("destacados");
  const activa = cat && categoriasMateriales.includes(cat) ? cat : "TODOS";

  const lista = useMemo(() => {
    const texto = q.trim().toLowerCase();
    const base = materiales.filter((m) => {
      const okCat = activa === "TODOS" || m.categoria === activa;
      const okTexto =
        !texto ||
        `${m.nombre} ${m.descripcion} ${m.idealPara ?? ""} ${m.categoria}`
          .toLowerCase()
          .includes(texto);
      return okCat && okTexto;
    });
    const copia = [...base];
    if (orden === "precio-asc") copia.sort((a, b) => a.precio - b.precio);
    if (orden === "precio-desc") copia.sort((a, b) => b.precio - a.precio);
    if (orden === "az") copia.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    if (orden === "destacados")
      copia.sort((a, b) => Number(Boolean(b.destacado)) - Number(Boolean(a.destacado)));
    return copia;
  }, [activa, q, orden]);

  return (
    <>
      <header className="border-b border-ink">
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="px-4 py-14 lg:px-8 lg:py-20">
            <p className="label-xs">03 · Materiales</p>
            <h1 className="display-xl mt-4">
              Materiales
              <br />
              para crear.
            </h1>
            <p className="mt-6 max-w-[38ch] text-lg">
              Tú tienes la idea. Nosotros tenemos las cosas: cera, aroma, pigmento, molde, frasco,
              mecha, base de jabón y las herramientas que hacen la diferencia.
            </p>
          </div>
          <div className="relative border-t border-ink lg:border-l lg:border-t-0">
            <img
              src={stillLife}
              alt="Mesa de trabajo con cera, fragancias, pigmentos, moldes, frascos, mechas, jabón y herramientas"
              width={1920}
              height={1088}
              className="h-full min-h-72 w-full object-cover lg:min-h-full"
            />
            <span className="paper-texture pointer-events-none absolute inset-0 opacity-20" />
            <span className="etiqueta absolute bottom-4 left-4 -rotate-[2deg] border border-ink bg-paper px-3 py-1 text-ink">
              Todo esto cabe en una tarde
            </span>
          </div>
        </div>
      </header>

      <div className="border-b border-ink px-4 py-6 lg:px-8">
        <label className="block">
          <span className="label-xs">Buscar material</span>
          <span className="mt-2 flex items-center border border-ink bg-card">
            <Search className="mx-4 size-5 shrink-0 opacity-60" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="cera, mecha, mica, frasco…"
              className="w-full bg-transparent py-4 pr-4 text-base outline-none"
            />
          </span>
        </label>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label-xs">Categoría</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {["TODOS", ...categoriasMateriales].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() =>
                    navigate({ search: c === "TODOS" ? {} : { cat: c }, resetScroll: false })
                  }
                  aria-pressed={activa === c}
                  className={`label-xs min-h-13 border-2 border-ink px-6 py-3 transition-colors ${
                    activa === c
                      ? "bg-ink text-paper"
                      : "bg-paper hover:bg-chartreuse active:bg-chartreuse"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <label className="block lg:w-72">
            <span className="label-xs">Ordenar por</span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as Orden)}
              className="label-xs mt-3 min-h-13 w-full border-2 border-ink bg-card px-4 py-3"
            >
              {ordenes.map((o) => (
                <option key={o.valor} value={o.valor}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <section className="grid auto-rows-min gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:px-8 lg:py-16 xl:grid-cols-4">
        {lista.map((m) => (
          <ProductCard key={m.id} producto={m} tipo="material" />
        ))}
        {lista.length === 0 && (
          <p className="col-span-full max-w-[60ch] border border-ink bg-secondary p-8 text-lg">
            No encontramos nada con esa búsqueda. Prueba con otra palabra o escríbenos y lo
            buscamos por ti.
          </p>
        )}
      </section>

      <section className="mx-4 mb-16 border border-ink bg-chartreuse p-8 lg:mx-8 lg:p-12">
        <p className="display-md max-w-[24ch]">¿Primera vez haciendo velas?</p>
        <p className="mt-4 max-w-[48ch] text-lg">
          Empieza por el Candle Kit: viene todo medido y con instrucciones que sí se entienden.
        </p>
        <Link to="/kits" className="label-xs mt-6 inline-block bg-ink px-6 py-4 text-paper">
          Conocer el Candle Kit
        </Link>
      </section>
    </>
  );
}

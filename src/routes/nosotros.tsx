import { createFileRoute, Link } from "@tanstack/react-router";
import bw1 from "@/assets/bw-1.jpg";
import bw2 from "@/assets/bw-2.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — ARTELIER by Apothecare" },
      {
        name: "description",
        content:
          "Artelier nació como una extensión de Apothecare para crear experiencias donde las personas vuelven a usar sus manos.",
      },
      { property: "og:title", content: "Nosotros — Hacer cosas se siente bien" },
      {
        property: "og:description",
        content: "Un estudio de experiencias creativas, laboratorio y tienda para makers en Santo Domingo.",
      },
    ],
  }),
  component: NosotrosPage,
});

function NosotrosPage() {
  return (
    <>
      <header className="border-b border-ink px-4 py-16 lg:px-8 lg:py-24">
        <p className="label-xs">Nosotros</p>
        <h1 className="display-xl mt-5">Hacer cosas<br />se siente bien.</h1>
      </header>

      <section className="grid gap-10 border-b border-ink px-4 py-14 lg:grid-cols-2 lg:px-8">
        <div className="max-w-prose space-y-5 text-lg leading-relaxed">
          <p>
            Artelier nació como una extensión de Apothecare, después de ver algo muy simple: cuando
            una persona hace algo con sus manos, cambia de humor.
          </p>
          <p>
            Así que armamos un lugar con mesas grandes, ceras, pigmentos, frascos, pipetas y
            cientos de aromas para que la gente venga a experimentar. Sin pretensiones, sin
            perfección, sin miedo a equivocarse.
          </p>
          <p>
            No somos una tienda de manualidades. No somos solo una marca de velas. No somos un spa.
            Somos un estudio de experiencias creativas, un laboratorio y una tienda para makers.
          </p>
          <p className="font-display text-3xl font-black uppercase leading-none">
            Menos scroll. Más crear.
          </p>
          <Link to="/talleres" className="label-xs inline-block bg-ink px-7 py-5 text-paper">
            Ven a probarlo
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <img src={bw1} alt="Manos trabajando la cera" loading="lazy" width={900} height={1100} className="aspect-3/4 w-full object-cover grayscale" />
          <img src={bw2} alt="Pigmento cayendo en un vaso" loading="lazy" width={900} height={1100} className="aspect-3/4 w-full object-cover grayscale" />
        </div>
      </section>

      <section className="grid gap-px border-b border-ink bg-ink/20 sm:grid-cols-3">
        {[
          ["Somos", "Un estudio + laboratorio + tienda"],
          ["Creemos", "Que equivocarse es parte de la fórmula"],
          ["Queremos", "Que salgas con algo hecho por ti"],
        ].map(([k, v]) => (
          <div key={k} className="bg-paper p-8">
            <p className="label-xs text-muted-foreground">{k}</p>
            <p className="mt-3 font-display text-2xl font-black uppercase leading-tight">{v}</p>
          </div>
        ))}
      </section>
    </>
  );
}

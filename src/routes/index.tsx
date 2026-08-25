import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-artelier.jpg";
import bw1 from "@/assets/bw-1.jpg";
import bw2 from "@/assets/bw-2.jpg";
import bw3 from "@/assets/bw-3.jpg";
import uTalleres from "@/assets/universo-talleres.jpg";
import uKits from "@/assets/universo-kits.jpg";
import uMateriales from "@/assets/universo-materiales.jpg";
import uOlfactory from "@/assets/universo-olfactory.jpg";
import cutVela from "@/assets/cut-vela.png";
import cutPigmento from "@/assets/cut-pigmento.png";
import cutBlotters from "@/assets/cut-blotters.png";

import { ProductCard } from "@/components/ProductCard";
import { kits, materiales, proximasFechas, talleres, testimonios } from "@/data/catalog";
import { rd, site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARTELIER by Apothecare — Menos scroll. Más crear." },
      {
        name: "description",
        content:
          "Talleres, kits DIY, materiales y fragancias en Santo Domingo. Un estudio de experiencias creativas para hacer cosas con tus manos.",
      },
      { property: "og:title", content: "ARTELIER — Menos scroll. Más crear." },
      {
        property: "og:description",
        content:
          "Estudio creativo, laboratorio y tienda para makers en Santo Domingo. Talleres, kits, materiales y fragancias.",
      },
    ],
  }),
  component: Home,
});

const universos = [
  {
    n: "01",
    kicker: "Talleres",
    titulo: "Ven a crear con nosotros.",
    texto: "Experiencias creativas para adultos, niños, grupos, eventos y marcas.",
    cta: "Ver talleres",
    to: "/talleres" as const,
    img: uTalleres,
    bg: "bg-tomate text-paper",
  },
  {
    n: "02",
    kicker: "Kits",
    titulo: "Artelier, pero en casa.",
    texto:
      "Kits creativos con todo lo necesario para desconectarte y hacer algo con tus propias manos.",
    cta: "Ver kits",
    to: "/kits" as const,
    img: uKits,
    bg: "bg-chartreuse text-ink",
  },
  {
    n: "03",
    kicker: "Materiales",
    titulo: "Tú tienes la idea. Nosotros tenemos las cosas.",
    texto:
      "Compra ceras, envases, bases, herramientas, colorantes y todo lo necesario para tus proyectos.",
    cta: "Ver materiales",
    to: "/materiales" as const,
    img: uMateriales,
    bg: "bg-cobalto text-paper",
  },
  {
    n: "04",
    kicker: "Artelier Olfactory",
    titulo: "Para quienes crean con aromas.",
    texto:
      "Nuestra biblioteca especializada de fragancias para velas, jabones, home fragrance y otros proyectos.",
    cta: "Explorar fragancias",
    to: "/olfactory" as const,
    img: uOlfactory,
    bg: "bg-cobalto text-paper",
  },
];

const caminos = [
  { label: "Quiero aprender", destino: "Talleres", to: "/talleres" as const, bg: "bg-tomate text-paper" },
  { label: "Quiero hacerlo en casa", destino: "Kits", to: "/kits" as const, bg: "bg-chartreuse text-ink" },
  { label: "Ya sé hacerlo", destino: "Materiales", to: "/materiales" as const, bg: "bg-cobalto text-paper" },
  { label: "Necesito fragancias", destino: "Artelier Olfactory", to: "/olfactory" as const, bg: "bg-rosa text-paper" },
];

function Home() {
  const destacados = [...kits.filter((k) => k.destacado), ...materiales.filter((m) => m.destacado)];

  return (
    <>
      {/* HERO: el titular manda */}
      <section className="paper-texture relative overflow-hidden border-b border-ink px-4 pb-10 pt-8 lg:px-8 lg:pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="label-xs">Estudio creativo · Laboratorio · Tienda para makers</p>
          <span className="etiqueta -rotate-2">Santo Domingo, RD</span>
        </div>

        <div className="relative mt-6">
          <h1 className="display-xl relative z-20">
            Menos<br />
            scroll.<br />
            <span className="text-tomate">Más crear.</span>
          </h1>

          {/* recortes que rompen el bloque de tipografía */}
          <img
            src={cutPigmento}
            alt=""
            aria-hidden
            width={900}
            height={900}
            className="pointer-events-none absolute -top-4 right-[2%] z-30 w-32 rotate-[9deg] object-contain sm:w-44 lg:w-64"
          />
          <img
            src={cutVela}
            alt=""
            aria-hidden
            width={900}
            height={900}
            className="pointer-events-none absolute bottom-0 right-[26%] z-10 hidden w-28 -rotate-6 object-contain sm:block lg:w-40"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="nota-mano mb-5 max-w-[20ch] -rotate-2">
              aquí se ensucian las manos
            </p>
            <p className="text-lg leading-snug lg:text-xl">
              Talleres, kits, materiales y experiencias diseñadas para descubrir cosas nuevas,
              crear con tus manos y compartir momentos que sí se quedan contigo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/talleres" className="label-xs bg-ink px-7 py-4 text-paper">
                Ver talleres
              </Link>
              <Link
                to="/nosotros"
                className="label-xs inline-flex items-center gap-2 border border-ink px-7 py-4"
              >
                Descubrir Artelier <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="relative lg:-mb-16 lg:translate-x-6">
            <img
              src={heroImg}
              alt="Manos vertiendo cera en un frasco rodeado de pipetas, pigmentos y frascos de fragancia"
              width={1408}
              height={1600}
              className="aspect-4/3 w-full border border-ink object-cover"
            />
            <span className="etiqueta absolute -left-3 top-6 rotate-[-4deg]">Lab 01 · Cera</span>
          </div>
        </div>
      </section>

      {/* TIRA EDITORIAL B&N con etiquetas tipo cinta */}
      <section aria-label="Dentro del estudio" className="grid grid-cols-3 border-b border-ink">
        {[
          { src: bw1, alt: "Manos amasando cera suave, primer plano en blanco y negro", tag: "Antes" },
          { src: bw2, alt: "Pigmento cayendo dentro de un vaso de precipitados", tag: "Durante" },
          { src: bw3, alt: "Gotero soltando una gota de aceite de fragancia", tag: "Después" },
        ].map((f, i) => (
          <figure key={f.alt} className="trama relative overflow-hidden">
            <img
              src={f.src}
              alt={f.alt}
              loading="lazy"
              width={900}
              height={1100}
              className="aspect-3/4 w-full object-cover grayscale contrast-125"
            />
            <figcaption
              className={`etiqueta absolute bottom-4 z-10 ${
                i === 1 ? "right-4 rotate-2" : "left-4 -rotate-2"
              }`}
            >
              {f.tag}
            </figcaption>
          </figure>
        ))}
      </section>


      {/* CUATRO UNIVERSOS */}
      <section className="border-b border-ink">
        <div className="flex flex-wrap items-end justify-between gap-4 px-4 py-10 lg:px-8">
          <h2 className="display-lg">Cuatro universos.</h2>
          <p className="label-xs max-w-xs opacity-70">
            Cuatro puertas distintas hacia lo mismo: usar las manos.
          </p>
        </div>
        {universos.map((u, i) => (
          <div
            key={u.n}
            className={`grid items-stretch border-t border-ink lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div
              className={`relative flex flex-col justify-between gap-8 overflow-hidden p-6 lg:p-12 ${u.bg}`}
            >
              <span
                aria-hidden
                className={`numero-gigante pointer-events-none absolute -bottom-8 opacity-15 ${
                  i % 2 === 1 ? "left-2" : "right-2"
                }`}
              >
                {u.n}
              </span>
              <span className="label-xs relative w-fit rotate-[-1.5deg] border border-current px-3 py-2">
                {u.kicker}
              </span>
              <h3 className="display-md relative max-w-[18ch]">{u.titulo}</h3>
              <p className="relative max-w-md text-base opacity-90 lg:text-lg">{u.texto}</p>
              <Link
                to={u.to}
                className="label-xs relative inline-flex w-fit items-center gap-2 border border-current px-6 py-4"
              >
                {u.cta} <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={u.img}
                alt={u.kicker}
                loading="lazy"
                width={1200}
                height={900}
                className="h-full min-h-64 w-full object-cover contrast-110 saturate-125"
              />
              <span
                className={`etiqueta absolute top-6 z-10 ${
                  i % 2 === 1 ? "right-0 translate-x-2 rotate-2" : "left-0 -translate-x-2 -rotate-2"
                }`}
              >
                {u.n} / 04
              </span>
            </div>
          </div>
        ))}

      </section>

      {/* ¿QUÉ QUIERES HACER? */}
      <section className="border-b border-ink px-4 py-14 lg:px-8 lg:py-20">
        <h2 className="display-lg max-w-[16ch]">¿Qué quieres hacer?</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {caminos.map((c, i) => (
            <Link
              key={c.label}
              to={c.to}
              className={`group flex items-center justify-between gap-6 border border-ink p-6 lg:p-10 ${c.bg} ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <span className="display-md max-w-[16ch]">{c.label}</span>
              <span className="label-xs flex shrink-0 items-center gap-2">
                {c.destino}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* COLECCIÓN DESTACADA */}
      <section className="border-b border-ink px-4 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg max-w-[22ch]">{site.coleccionDestacada}</h2>
          <p className="label-xs opacity-60">Desliza →</p>
        </div>
        <div className="-mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-4 lg:-mx-8 lg:px-8">
          {destacados.map((p) => (
            <div key={p.id} className="w-64 shrink-0 snap-start sm:w-72">
              <ProductCard producto={{ ...p, span: "normal" }} tipo={kits.includes(p) ? "kit" : "material"} />
            </div>
          ))}
        </div>
      </section>

      {/* PRÓXIMAS EXPERIENCIAS */}
      {proximasFechas.length > 0 && (
        <section className="border-b border-ink bg-secondary px-4 py-14 lg:px-8 lg:py-20">
          <h2 className="display-lg">Próximas experiencias.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {proximasFechas.map((f) => {
              const taller = talleres.find((t) => t.slug === f.tallerSlug)!;
              return (
                <article key={f.tallerSlug + f.fecha} className="flex flex-col border border-ink bg-card">
                  <div className="flex items-center justify-between gap-3 border-b border-ink bg-ink px-4 py-3 text-paper">
                    <span className="label-xs">{f.fecha}</span>
                    <span className="label-xs">{f.hora}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-display text-2xl font-black uppercase leading-none">
                      {taller.nombre}
                    </h3>
                    <p className="text-sm text-muted-foreground">{f.lugar}</p>
                    <p className="text-sm">{taller.resumen}</p>
                    <div className="mt-auto flex items-baseline justify-between pt-4">
                      <span className="font-display text-xl font-bold">{rd(f.precio)}</span>
                      <span className="label-xs bg-chartreuse px-2 py-1">{f.cupos} cupos</span>
                    </div>
                    <Link
                      to="/talleres/$slug"
                      params={{ slug: taller.slug }}
                      className="label-xs bg-tomate px-4 py-4 text-center text-paper"
                    >
                      Reservar mi cupo
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ARTEFACTOS DEL TALLER (testimonios) */}
      <section className="relative overflow-hidden border-b border-ink px-4 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg">Lo que dicen<br />los que ya crearon.</h2>
          <p className="nota-mano max-w-[18ch] rotate-2">recogido de la mesa del taller</p>
        </div>

        <div className="-mx-4 mt-14 flex snap-x items-start gap-10 overflow-x-auto px-8 pb-10 pt-6 lg:-mx-8 lg:px-12">
          {testimonios.map((t, i) => {
            const tipo = i % 3;
            const giro = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-2"][i % 4] ?? "";
            const acento =
              t.acento === "cobalto"
                ? "bg-cobalto text-paper"
                : t.acento === "tomate"
                  ? "bg-tomate text-paper"
                  : t.acento === "rosa"
                    ? "bg-rosa text-paper"
                    : "bg-chartreuse text-ink";

            if (tipo === 0) {
              // Ficha de fórmula del laboratorio
              return (
                <figure
                  key={t.texto}
                  className={`ficha-formula relative w-80 shrink-0 snap-start border border-ink p-6 shadow-[6px_8px_0_0_oklch(0.19_0_0)] sm:w-96 ${giro}`}
                >
                  <div className="flex items-baseline justify-between border-b border-ink pb-3">
                    <span className="label-xs">Fórmula Nº {String(i + 1).padStart(3, "0")}</span>
                    <span className="label-xs opacity-60">Artelier Lab</span>
                  </div>
                  <blockquote className="nota-mano mt-6 text-ink">“{t.texto}”</blockquote>
                  <div className="mt-8 flex items-end justify-between gap-4">
                    <figcaption className="label-xs">— {t.autor}</figcaption>
                    <span className="font-mano text-2xl text-cobalto">★★★★★</span>
                  </div>
                  <span className="etiqueta absolute -right-3 -top-4 rotate-[6deg]">Aprobado</span>
                </figure>
              );
            }

            if (tipo === 1) {
              // Nota manuscrita sobre papel de color, rasgado
              return (
                <figure
                  key={t.texto}
                  className={`papel-rasgado relative w-72 shrink-0 snap-start px-7 py-9 sm:w-80 ${acento} ${giro}`}
                >
                  <span className="label-xs opacity-70">Nota del taller</span>
                  <blockquote className="nota-mano mt-5 text-current">{t.texto}</blockquote>
                  <figcaption className="font-mano mt-6 text-xl text-current opacity-80">
                    {t.autor}
                  </figcaption>
                </figure>
              );
            }

            // Fotografía del taller con cita en cinta
            return (
              <figure
                key={t.texto}
                className={`relative w-80 shrink-0 snap-start border border-ink sm:w-96 ${giro}`}
              >
                <div className={`trama relative ${acento}`}>
                  <img
                    src={[bw1, bw2, bw3, cutBlotters][i % 4] ?? bw1}
                    alt="Detalle del taller Artelier"
                    loading="lazy"
                    width={900}
                    height={1100}
                    className="aspect-4/5 w-full object-cover grayscale contrast-125 mix-blend-screen"
                  />
                </div>

                <blockquote className="absolute inset-x-4 bottom-10 border border-ink bg-paper p-4 font-display text-xl font-black uppercase leading-none text-ink shadow-[4px_5px_0_0_oklch(0.19_0_0)]">
                  {t.texto}
                </blockquote>
                <figcaption className="etiqueta absolute -bottom-3 left-6 rotate-[-3deg]">
                  {t.autor}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>


      {/* INSTAGRAM */}
      <section className="border-b border-ink px-4 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg max-w-[20ch]">Mira lo que estamos haciendo.</h2>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="label-xs bg-ink px-6 py-4 text-paper"
          >
            Síguenos en Instagram
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4">
          {[
            { src: uTalleres, alt: "Taller lleno de gente creando" },
            { src: bw1, alt: "Manos trabajando la cera" },
            { src: uMateriales, alt: "Estantes de materiales" },
            { src: bw3, alt: "Gota de fragancia cayendo" },
          ].map((f) => (
            <img
              key={f.alt}
              src={f.src}
              alt={f.alt}
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>
      </section>
    </>
  );
}

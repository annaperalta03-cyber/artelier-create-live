import { createFileRoute, Link } from "@tanstack/react-router";
import uTalleres from "@/assets/taller/mesa-larga.jpg";
import fotoAromas from "@/assets/taller/aromas-dominicanos.jpg";
import fotoSensorial from "@/assets/taller/experiencias-sensoriales.jpg";
import fotoInfantil from "@/assets/taller/actividades-infantiles.jpg";
import fotoTeam from "@/assets/taller/team-building.jpg";


export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos & Marcas — Experiencias creativas ARTELIER" },
      {
        name: "description",
        content:
          "Activaciones y experiencias sensoriales para restaurantes, hoteles, spas, empresas y marcas en República Dominicana.",
      },
      { property: "og:title", content: "Eventos & Marcas — ¿Y si creamos algo juntos?" },
      {
        property: "og:description",
        content: "Diseñamos experiencias creativas para marcas, equipos y eventos privados.",
      },
    ],
  }),
  component: EventosPage,
});

const para = [
  "Restaurantes",
  "Cafés",
  "Bares",
  "Hoteles",
  "Spas",
  "Pilates",
  "Wellness",
  "Empresas",
  "Marcas",
  "Centros comerciales",
  "Escuelas",
  "Convenciones",
  "Pop-ups",
];

const experiencias = [
  {
    t: "Aromas dominicanos",
    img: fotoAromas,
    alt: "Grupo oliendo blotters sobre una mesa con cacao, café y botánicos dominicanos",
    p: "Cacao, café, vetiver, tabaco, cítricos y flores de aquí traducidos en fragancias que la gente reconoce al primer olfato.",
    bg: "bg-chartreuse text-ink",
  },
  {
    t: "Experiencias sensoriales",
    img: fotoSensorial,
    alt: "Invitados con los ojos cerrados oliendo pequeños recipientes en una mesa con velas",
    p: "Recorridos guiados donde se huele, se toca y se prueba. Pensadas para spas, hoteles, restaurantes y lanzamientos.",
    bg: "bg-cobalto text-paper",
  },
  {
    t: "Actividades infantiles",
    img: fotoInfantil,
    alt: "Niños con delantales mezclando colores y jabones en una mesa larga",
    p: "Talleres con las manos llenas de color para cumpleaños, escuelas y centros comerciales. Nosotros llevamos el desorden y lo recogemos.",
    bg: "bg-rosa text-paper",
  },
  {
    t: "Team building creativo",
    img: fotoTeam,
    alt: "Equipo de trabajo haciendo velas juntos a ambos lados de una mesa larga",
    p: "Equipos que se sientan a los dos lados de la mesa larga y salen con algo hecho entre todos. Sin dinámicas forzadas.",
    bg: "bg-tomate text-paper",
  },
];

const otros = ["Cerveza + aromas", "Café + velas", "Glow Lab rooftop", "Pop-ups de marca"];

const proceso = [
  {
    n: "01",
    t: "Cuéntanos tu idea",
    p: "Nos escribes por WhatsApp con lo básico: qué celebran, cuántas personas, fecha aproximada y presupuesto. Si no tienes nada claro todavía, también sirve: te hacemos las preguntas.",
  },
  {
    n: "02",
    t: "Diseñamos la experiencia",
    p: "Conocemos tu marca y armamos el concepto: qué se va a crear, qué aromas o materiales usamos, cuánto dura, cómo se ve la mesa y qué se lleva cada invitado. Te lo presentamos con precio cerrado antes de confirmar.",
  },
  {
    n: "03",
    t: "Nosotros montamos, ustedes crean",
    p: "Llegamos con todos los materiales, montamos la mesa, facilitamos la actividad de principio a fin y desmontamos. Ustedes solo tienen que aparecer y crear.",
  },
];


const privados = [
  "Cumpleaños",
  "Cumpleaños infantiles",
  "Girls Night",
  "Bridal",
  "Bodas",
  "Team Building",
  "Familias",
  "Grupos privados",
];

function EventosPage() {
  return (
    <>
      <header className="grid border-b border-ink lg:grid-cols-[1.2fr_1fr]">
        <div className="px-4 py-16 lg:px-8 lg:py-24">
          <p className="label-xs">Eventos & Marcas</p>
          <h1 className="display-xl mt-5">¿Y si creamos<br />algo juntos?</h1>
          <p className="mt-6 max-w-xl text-lg">
            Diseñamos experiencias creativas que la gente recuerda, publica y quiere repetir. Con
            tu marca en el centro y todo el desorden de nuestro lado.
          </p>
          <Link to="/contacto" className="label-xs mt-8 inline-block bg-tomate px-7 py-5 text-paper">
            Creemos algo juntos
          </Link>
        </div>
        <img
          src={uTalleres}
          alt="Grupo creando velas en un taller de Artelier"
          loading="lazy"
          width={1200}
          height={900}
          className="h-full min-h-64 w-full border-t border-ink object-cover lg:border-l lg:border-t-0"
        />
      </header>

      <section className="border-b border-ink px-4 py-14 lg:px-8">
        <h2 className="display-md">Trabajamos con</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {para.map((p) => (
            <span key={p} className="label-xs border border-ink px-4 py-3">
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="border-b border-ink">
        <h2 className="display-lg px-4 py-10 lg:px-8">Cosas que ya hemos hecho.</h2>
        <div className="grid gap-px border-t border-ink bg-ink/20 sm:grid-cols-2 lg:grid-cols-3">
          {ejemplos.map((e) => (
            <div key={e.t} className={`p-10 ${e.bg}`}>
              <p className="display-md max-w-[14ch]">{e.t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-ink px-4 py-14 lg:px-8">
        <h2 className="display-lg">Cómo funciona.</h2>
        <ol className="mt-8 grid gap-px bg-ink/20 sm:grid-cols-2 lg:grid-cols-3">
          {proceso.map((p, i) => (
            <li key={p} className="bg-paper p-8">
              <span className="font-display text-5xl font-black text-tomate">0{i + 1}</span>
              <p className="mt-3 font-display text-xl font-bold uppercase leading-tight">{p}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-ink px-4 py-16 text-paper lg:px-8 lg:py-24">
        <h2 className="display-lg">Tu evento,<br />pero más interesante.</h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {privados.map((p) => (
            <span key={p} className="label-xs border border-paper/40 px-4 py-3">
              {p}
            </span>
          ))}
        </div>
        <p className="mt-8 max-w-xl text-lg text-paper/70">
          Puedes pedir un taller de nuestro catálogo o inventar una experiencia que no exista
          todavía. Las dos opciones nos gustan.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contacto" className="label-xs bg-chartreuse px-7 py-5 text-ink">
            Cuéntanos tu idea
          </Link>
          <Link to="/talleres" className="label-xs border border-paper/40 px-7 py-5">
            Ver talleres
          </Link>
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — ¿Qué quieres crear? · ARTELIER" },
      {
        name: "description",
        content:
          "Cuéntanos tu idea: talleres privados, actividades infantiles, experiencias para marcas, kits o materiales.",
      },
      { property: "og:title", content: "Contacto ARTELIER — ¿Qué quieres crear?" },
      {
        property: "og:description",
        content: "Escríbenos y diseñamos la experiencia creativa que tienes en mente.",
      },
    ],
  }),
  component: ContactoPage,
});

const tipos = [
  "Participar en un taller",
  "Taller privado",
  "Actividad infantil",
  "Experiencia para marca",
  "Actividad corporativa",
  "Información sobre kits",
  "Comprar materiales",
  "Artelier Olfactory",
  "Otro",
];

const campo =
  "w-full border border-ink bg-card px-4 py-3 focus:border-cobalto";

function ContactoPage() {
  return (
    <>
      <header className="border-b border-ink px-4 py-16 lg:px-8 lg:py-24">
        <p className="label-xs">Contacto</p>
        <h1 className="display-xl mt-5">¿Qué quieres<br />crear?</h1>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const mensaje = [
            "Hola Artelier 👋 quiero contarles una idea.",
            "",
            `Nombre: ${data.get("nombre")}`,
            `WhatsApp: ${data.get("whatsapp")}`,
            `Email: ${data.get("email") || "—"}`,
            `Empresa: ${data.get("empresa") || "—"}`,
            `Personas: ${data.get("personas") || "—"}`,
            `Fecha: ${data.get("fecha") || "—"}`,
            `Lugar: ${data.get("lugar") || "—"}`,
            `Tipo de actividad: ${data.get("tipo")}`,
            "",
            `${data.get("mensaje")}`,
          ].join("\n");
          const url = waLink(mensaje);
          const ventana = window.open(url, "_blank", "noopener");
          if (!ventana) {
            window.location.href = url;
            return;
          }
          toast.success("Vamos por WhatsApp", {
            description: "Abrimos la conversación con tu idea ya escrita.",
          });
        }}
        className="grid gap-4 px-4 py-14 sm:grid-cols-2 lg:px-8"
      >
        <label className="block">
          <span className="label-xs">Nombre</span>
          <input name="nombre" required className={`${campo} mt-2`} />
        </label>
        <label className="block">
          <span className="label-xs">WhatsApp</span>
          <input name="whatsapp" required className={`${campo} mt-2`} />
        </label>
        <label className="block">
          <span className="label-xs">Email (opcional)</span>
          <input name="email" type="email" className={`${campo} mt-2`} />
        </label>
        <label className="block">
          <span className="label-xs">Empresa (opcional)</span>
          <input name="empresa" className={`${campo} mt-2`} />
        </label>
        <label className="block">
          <span className="label-xs">Cantidad de personas</span>
          <input name="personas" type="number" min={1} className={`${campo} mt-2`} />
        </label>
        <label className="block">
          <span className="label-xs">Fecha</span>
          <input name="fecha" type="date" className={`${campo} mt-2`} />
        </label>
        <label className="block">
          <span className="label-xs">Lugar</span>
          <input name="lugar" className={`${campo} mt-2`} />
        </label>
        <label className="block">
          <span className="label-xs">Tipo de actividad</span>
          <select name="tipo" className={`${campo} mt-2`}>
            {tipos.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="label-xs">Mensaje</span>
          <textarea name="mensaje" rows={5} required className={`${campo} mt-2`} />
        </label>
        <button type="submit" className="label-xs bg-ink px-7 py-5 text-paper sm:col-span-2">
          Cuéntanos tu idea
        </button>
      </form>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Marquee } from "@/components/Marquee";
import { site, waLink } from "@/lib/site";

export function BadgesMarquee() {
  return (
    <div className="border-y border-ink bg-chartreuse text-ink">
      <Marquee items={site.marqueeBadges} duration={50} className="py-4 text-sm" />
    </div>
  );
}

export function Newsletter() {
  return (
    <section className="border-b border-ink bg-ink px-4 py-16 text-paper lg:px-8 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <h2 className="display-lg">
            Entra al club<br />de los que sí crean.
          </h2>
          <p className="mt-5 max-w-lg text-lg text-paper/70">
            Talleres nuevos, kits limitados y excusas para desconectarte del celular, directo a
            tu correo.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
            toast.success("Ya estás dentro", {
              description: "Te escribiremos solo cuando valga la pena.",
            });
            input.value = "";
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            name="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="w-full border border-paper/40 bg-transparent px-4 py-4 text-paper placeholder:text-paper/40 focus:border-chartreuse focus:outline-none"
          />
          <button type="submit" className="label-xs bg-chartreuse px-6 py-4 text-ink">
            Quiero entrar
          </button>
        </form>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <>
      <BadgesMarquee />
      <Newsletter />
      <footer className="bg-paper px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-3xl font-black uppercase leading-none">Artelier</p>
            <p className="label-xs mt-2 opacity-60">by Apothecare · {site.ciudad}</p>
          </div>
          <div className="space-y-2">
            <p className="label-xs mb-3 opacity-50">Explorar</p>
            {[
              { to: "/talleres", label: "Talleres" },
              { to: "/kits", label: "Kits" },
              { to: "/materiales", label: "Materiales" },
              { to: "/olfactory", label: "Artelier Olfactory" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm hover:text-tomate">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <p className="label-xs mb-3 opacity-50">Artelier</p>
            {[
              { to: "/eventos", label: "Eventos & Marcas" },
              { to: "/nosotros", label: "Nosotros" },
              { to: "/contacto", label: "Contacto" },
              { to: "/carrito", label: "Mi carrito" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm hover:text-tomate">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="space-y-3">
            <p className="label-xs mb-3 opacity-50">La comunidad</p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="block text-sm hover:text-tomate">
              Síguenos en Instagram
            </a>
            <a href={site.comunidad} target="_blank" rel="noreferrer" className="block text-sm hover:text-tomate">
              Entra al grupo de WhatsApp de la comunidad Artelier — ahí avisamos primero.
            </a>
            <a
              href={waLink("Hola Artelier 👋")}
              target="_blank"
              rel="noreferrer"
              className="label-xs inline-block border border-ink px-4 py-3"
            >
              Escríbenos
            </a>
          </div>
        </div>

        <p className="display-lg mt-14 border-t border-ink pt-8">Tu estudio creativo favorito.</p>
        <p className="label-xs mt-6 opacity-50">
          © {new Date().getFullYear()} Artelier by Apothecare · Todos los derechos reservados
        </p>
      </footer>
    </>
  );
}

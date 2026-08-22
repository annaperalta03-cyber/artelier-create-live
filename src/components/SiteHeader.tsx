import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Marquee } from "@/components/Marquee";
import { useCart } from "@/lib/cart";
import { site, waLink } from "@/lib/site";
import { categoriasMateriales } from "@/data/catalog";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/talleres", label: "Talleres" },
  { to: "/kits", label: "Kits" },
  { to: "/materiales", label: "Materiales", submenu: categoriasMateriales },
  { to: "/olfactory", label: "Artelier Olfactory" },
  { to: "/eventos", label: "Eventos & Marcas" },
  { to: "/nosotros", label: "Nosotros" },
] as const;

export function SiteHeader() {
  const [abierto, setAbierto] = useState(false);
  const { count, hidratado } = useCart();

  return (
    <header className="sticky top-0 z-50">
      <Link to={site.marqueeTopLink} className="block bg-ink text-paper">
        <Marquee items={[site.marqueeTop]} duration={34} className="py-2" />
      </Link>

      <div className="flex items-center justify-between gap-4 border-b border-ink bg-paper px-4 py-3 lg:px-8">
        <Link to="/" className="shrink-0 leading-none">
          <span className="font-display text-2xl font-black uppercase tracking-tight lg:text-3xl">
            Artelier
          </span>
          <span className="label-xs ml-2 hidden opacity-60 lg:inline">by Apothecare</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((item) => (
            <div key={item.to} className="group relative">
              <Link
                to={item.to}
                className="label-xs py-2 hover:text-tomate"
                activeProps={{ className: "label-xs py-2 text-tomate underline decoration-2 underline-offset-4" }}
              >
                {item.label}
              </Link>
              {"submenu" in item && item.submenu && (
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 border border-ink bg-paper p-3 opacity-0 shadow-[8px_8px_0_0_var(--ink)] transition group-hover:visible group-hover:opacity-100">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub}
                      to="/materiales"
                      search={{ cat: sub }}
                      className="flex items-center gap-3 px-2 py-2 hover:bg-chartreuse"
                    >
                      <span className="h-8 w-8 shrink-0 bg-ink" />
                      <span className="label-xs">{sub}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/materiales" aria-label="Buscar materiales" className="p-2 hover:text-tomate">
            <Search className="size-5" />
          </Link>
          <a
            href={waLink("Hola Artelier 👋 tengo una pregunta.")}
            target="_blank"
            rel="noreferrer"
            aria-label="Escríbenos por WhatsApp"
            className="p-2 hover:text-tomate"
          >
            <MessageCircle className="size-5" />
          </a>
          <Link to="/carrito" aria-label="Ver carrito" className="relative p-2 hover:text-tomate">
            <ShoppingBag className="size-5" />
            {hidratado && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center bg-tomate text-[10px] font-bold text-paper">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-label="Abrir menú"
            className="p-2 xl:hidden"
          >
            {abierto ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {abierto && (
        <div className="border-b border-ink bg-paper px-4 pb-6 pt-2 xl:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setAbierto(false)}
              className="block border-b border-ink/15 py-4 font-display text-2xl font-black uppercase"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contacto"
            onClick={() => setAbierto(false)}
            className="label-xs mt-5 block bg-tomate px-4 py-4 text-center text-paper"
          >
            Cuéntanos tu idea
          </Link>
        </div>
      )}
    </header>
  );
}

import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { rd } from "@/lib/site";
import { cn } from "@/lib/utils";
import { fotoProducto } from "@/lib/shop-images";
import type { Acento, Producto } from "@/data/catalog";

export const bgAcento: Record<Acento, string> = {
  cobalto: "bg-cobalto text-paper",
  tomate: "bg-tomate text-paper",
  chartreuse: "bg-chartreuse text-ink",
  rosa: "bg-rosa text-paper",
  ink: "bg-ink text-paper",
};

export const textAcento: Record<Acento, string> = {
  cobalto: "text-cobalto",
  tomate: "text-tomate",
  chartreuse: "text-chartreuse",
  rosa: "text-rosa",
  ink: "text-ink",
};

type Props = {
  producto: Producto;
  tipo: "kit" | "material";
};

export function ProductCard({ producto, tipo }: Props) {
  const { add } = useCart();
  const variante = producto.variantes?.[0];
  const foto = fotoProducto(producto.categoria, tipo);

  const agregar = () => {
    add({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      variante,
      tipo,
    });
    toast.success("Va en el carrito", {
      description: `${producto.nombre} — ahora sí empieza lo bueno.`,
    });
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col border border-ink bg-paper",
        producto.span === "ancho" && "sm:col-span-2",
        producto.span === "alto" && "sm:row-span-2",
      )}
    >
      <div className="relative overflow-hidden border-b border-ink">
        <img
          src={foto}
          alt={`${producto.nombre} — materiales Artelier`}
          loading="lazy"
          width={1024}
          height={1024}
          className={cn(
            "w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
            producto.span === "alto" ? "aspect-[3/4]" : "aspect-square",
            producto.span === "ancho" && "sm:aspect-[16/9]",
          )}
        />
        <span className="paper-texture pointer-events-none absolute inset-0 opacity-25" />
        <span
          className={cn(
            "etiqueta absolute left-0 top-5 -rotate-[3deg] px-3 py-1",
            bgAcento[producto.acento],
          )}
        >
          {producto.categoria}
        </span>
        <span className="etiqueta absolute right-3 top-3 rotate-[4deg] border border-ink bg-paper px-2 py-1 text-ink">
          {rd(producto.precio)}
        </span>
        {producto.destacado && (
          <span className="etiqueta absolute bottom-3 left-3 -rotate-[2deg] border border-ink bg-chartreuse px-2 py-1 text-ink">
            Favorito del estudio
          </span>
        )}
        <button
          type="button"
          onClick={agregar}
          className="label-xs absolute inset-x-0 bottom-0 hidden bg-ink py-4 text-paper transition-transform duration-200 sm:block sm:translate-y-full group-hover:sm:translate-y-0 focus-visible:sm:translate-y-0"
        >
          Agregar al carrito
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-bold uppercase leading-[0.95]">
            {producto.nombre}
          </h3>
          <span className="font-display text-lg font-bold">{rd(producto.precio)}</span>
        </div>
        <p className="max-w-[42ch] text-sm text-muted-foreground">{producto.descripcion}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {producto.medida && <span className="label-xs opacity-70">{producto.medida}</span>}
          {producto.idealPara && (
            <span className="label-xs border border-ink px-2 py-1">
              Ideal para: {producto.idealPara}
            </span>
          )}
        </div>
        {producto.variantes && (
          <p className="text-sm text-muted-foreground">
            Variantes: {producto.variantes.join(" · ")}
          </p>
        )}
        <button
          type="button"
          onClick={agregar}
          className="label-xs mt-2 border border-ink bg-ink px-4 py-3 text-paper sm:hidden"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

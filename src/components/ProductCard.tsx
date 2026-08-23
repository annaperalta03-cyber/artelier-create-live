import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { rd } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Acento, Producto } from "@/data/catalog";
import cutVela from "@/assets/cut-vela.png";
import cutFrasco from "@/assets/cut-frasco.png";
import cutPigmento from "@/assets/cut-pigmento.png";
import cutBlotters from "@/assets/cut-blotters.png";

const recortes = [cutVela, cutPigmento, cutFrasco, cutBlotters];


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
  const recorte =
    recortes[
      [...producto.id].reduce((a, c) => a + c.charCodeAt(0), 0) % recortes.length
    ];


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
        "group relative flex flex-col border border-ink/20 bg-card",
        producto.span === "ancho" && "sm:col-span-2",
        producto.span === "alto" && "sm:row-span-2",
      )}
    >
      <div
        className={cn(
          "relative flex min-h-52 flex-1 items-end overflow-hidden p-5",
          bgAcento[producto.acento],
          producto.span === "alto" && "min-h-80",
        )}
      >
        <span className="paper-texture pointer-events-none absolute inset-0 opacity-40" />
        <img
          src={recorte}
          alt=""
          aria-hidden
          loading="lazy"
          width={900}
          height={900}
          className="pointer-events-none absolute -right-6 top-1/2 w-[62%] -translate-y-1/2 rotate-[-6deg] object-contain drop-shadow-[6px_8px_0_oklch(0.19_0_0_/_35%)] transition-transform duration-300 group-hover:rotate-[-2deg] group-hover:scale-105"
        />
        <span className="display-md relative max-w-[9ch] break-words leading-[0.82] mix-blend-normal">
          {producto.nombre}
        </span>
        <span className="etiqueta absolute right-3 top-3 rotate-[4deg]">{rd(producto.precio)}</span>
        <button
          type="button"
          onClick={agregar}
          className="label-xs absolute inset-x-0 bottom-0 hidden bg-ink py-4 text-paper transition-transform duration-200 sm:block sm:translate-y-full group-hover:sm:translate-y-0"
        >
          Agregar al carrito
        </button>
      </div>


      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-bold uppercase leading-none">
            {producto.nombre}
          </h3>
          <span className="font-display text-lg font-bold">{rd(producto.precio)}</span>
        </div>
        <p className="text-sm text-muted-foreground">{producto.descripcion}</p>
        {producto.medida && <p className="label-xs opacity-70">{producto.medida}</p>}
        {producto.idealPara && (
          <p className="label-xs inline-flex w-fit border border-ink px-2 py-1">
            Ideal para: {producto.idealPara}
          </p>
        )}
        {producto.variantes && (
          <p className="text-xs text-muted-foreground">
            Variantes: {producto.variantes.join(" · ")}
          </p>
        )}
        <button
          type="button"
          onClick={agregar}
          className="label-xs mt-1 border border-ink bg-ink px-4 py-3 text-paper sm:hidden"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

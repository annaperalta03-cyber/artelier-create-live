import catVelas from "@/assets/shop/cat-velas.jpg";
import catJabones from "@/assets/shop/cat-jabones.jpg";
import catBeauty from "@/assets/shop/cat-beauty.jpg";
import catEnvases from "@/assets/shop/cat-envases.jpg";
import catHerramientas from "@/assets/shop/cat-herramientas.jpg";
import catColor from "@/assets/shop/cat-color.jpg";
import catAromas from "@/assets/shop/cat-aromas.jpg";
import catNinos from "@/assets/shop/cat-ninos.jpg";
import catAdultos from "@/assets/shop/cat-adultos.jpg";
import catTemporada from "@/assets/shop/cat-temporada.jpg";

/** Fotografía editorial por categoría de producto. */
const porCategoria: Record<string, string> = {
  VELAS: catVelas,
  JABONES: catJabones,
  "BODY & BEAUTY": catBeauty,
  ENVASES: catEnvases,
  HERRAMIENTAS: catHerramientas,
  COLOR: catColor,
  Velas: catVelas,
  Aromas: catAromas,
  Beauty: catBeauty,
  Niños: catNinos,
  Adultos: catAdultos,
  Temporada: catTemporada,
};

export function fotoProducto(categoria: string, fallback: "kit" | "material") {
  return porCategoria[categoria] ?? (fallback === "kit" ? catAdultos : catHerramientas);
}

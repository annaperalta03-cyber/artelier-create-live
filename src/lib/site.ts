export const site = {
  nombre: "ARTELIER",
  submarca: "by Apothecare",
  ciudad: "Santo Domingo, República Dominicana",
  whatsapp: "18090000000",
  instagram: "https://instagram.com",
  comunidad: "https://chat.whatsapp.com",
  marqueeTop: "ENVÍO GRATIS EN SANTO DOMINGO DESDE RD$3,000",
  marqueeTopLink: "/kits",
  marqueeBadges: [
    "HECHO A MANO",
    "MATERIALES DE CALIDAD",
    "ENTREGA RÁPIDA",
    "SOPORTE REAL POR WHATSAPP",
    "CRUELTY FREE",
    "FÓRMULAS PROBADAS",
    "SIN LOTES LIMITADOS",
    "100% CREATIVO",
  ],
  coleccionDestacada: "LO NUEVO PARA CREAR ESTA TEMPORADA",
  precioOnzaFragancia: 100,
};

export const rd = (n: number) =>
  "RD$" + n.toLocaleString("es-DO", { maximumFractionDigits: 0 });

export const waLink = (mensaje: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;

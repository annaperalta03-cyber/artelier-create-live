import imgUnderCypress from "@/assets/fragancias/under-the-cypress.png.asset.json";
import imgWinterWoods from "@/assets/fragancias/winter-woods.png.asset.json";
import imgWildflower from "@/assets/fragancias/wildflower-season.png.asset.json";
import imgSundayOctober from "@/assets/fragancias/sunday-in-october.png.asset.json";
import imgCleanSlate from "@/assets/fragancias/clean-slate.png.asset.json";
import imgDesertWater from "@/assets/fragancias/desert-water.png.asset.json";
import imgRoseGlasses from "@/assets/fragancias/rose-colored-glasses.webp.asset.json";
import imgCapri from "@/assets/fragancias/breakfast-in-capri.webp.asset.json";
import imgMakeAWish from "@/assets/fragancias/make-a-wish.webp.asset.json";
import imgCabana from "@/assets/fragancias/cabana-no-5.webp.asset.json";

export type Acento = "cobalto" | "tomate" | "chartreuse" | "rosa" | "ink";


export type Producto = {
  id: string;
  slug: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  idealPara?: string;
  variantes?: string[];
  medida?: string;
  acento: Acento;
  destacado?: boolean;
  span?: "alto" | "ancho" | "normal";
};

export type Taller = {
  id: string;
  slug: string;
  nombre: string;
  tags: string[];
  resumen: string;
  crearas: string[];
  incluye: string[];
  duracion: string;
  edad: string;
  personas: string;
  precio: number | null;
  acento: Acento;
};

export const talleres: Taller[] = [
  {
    id: "t-perfume-lab",
    slug: "perfume-lab",
    nombre: "Perfume Lab",
    tags: ["Adultos", "Fragancias", "Sensorial"],
    resumen:
      "Huele, mezcla, equivócate y vuelve a empezar hasta que salga tu propia firma olfativa.",
    crearas: ["Tu perfume personalizado de 30 ml", "Tu tarjeta de fórmula para repetirlo"],
    incluye: ["Todos los materiales", "Blotters y pipetas", "Guía olfativa", "Envase de vidrio"],
    duracion: "2 horas",
    edad: "16+",
    personas: "4 a 14 personas",
    precio: 3500,
    acento: "cobalto",
  },
  {
    id: "t-candle-lab",
    slug: "candle-lab",
    nombre: "Candle Lab",
    tags: ["Adultos", "Velas"],
    resumen: "El clásico de la casa: cera, aroma, mecha y una vela que huele a ti.",
    crearas: ["Dos velas de soya de 8 oz", "Tu combinación de aromas"],
    incluye: ["Cera de soya", "Fragancias", "Envases", "Etiquetas hechas a mano"],
    duracion: "2 horas",
    edad: "14+",
    personas: "4 a 20 personas",
    precio: 2900,
    acento: "tomate",
  },
  {
    id: "t-massage-candle",
    slug: "massage-candle",
    nombre: "Massage Candle",
    tags: ["Adultos", "Velas", "Wellness"],
    resumen: "Una vela que se derrite en aceite tibio. Sí, se usa en la piel.",
    crearas: ["Vela de masaje de 4 oz", "Mezcla de aceites"],
    incluye: ["Bases y mantecas", "Fragancia", "Envase", "Instrucciones de uso"],
    duracion: "1.5 horas",
    edad: "18+",
    personas: "4 a 12 personas",
    precio: 3200,
    acento: "rosa",
  },
  {
    id: "t-glow-lab",
    slug: "glow-lab",
    nombre: "Glow Lab",
    tags: ["Adultos", "Beauty Lab"],
    resumen: "Shimmer, brillo y fórmulas que se sienten caras sin ser caras.",
    crearas: ["Aceite shimmer", "Bruma corporal"],
    incluye: ["Bases cosméticas", "Micas", "Envases con pump", "Etiquetas"],
    duracion: "2 horas",
    edad: "14+",
    personas: "4 a 16 personas",
    precio: 3100,
    acento: "chartreuse",
  },
  {
    id: "t-shimmer-oil",
    slug: "shimmer-oil",
    nombre: "Shimmer Oil",
    tags: ["Adultos", "Beauty Lab"],
    resumen: "Aceite corporal con destellos, hecho por ti en menos de una hora.",
    crearas: ["Aceite shimmer de 60 ml"],
    incluye: ["Aceites base", "Micas cosméticas", "Botella con dropper"],
    duracion: "1 hora",
    edad: "12+",
    personas: "4 a 20 personas",
    precio: 2200,
    acento: "rosa",
  },
  {
    id: "t-body-lotion",
    slug: "body-lotion",
    nombre: "Body Lotion",
    tags: ["Adultos", "Beauty Lab", "Wellness"],
    resumen: "Formular tu propia crema es más fácil (y más rico) de lo que crees.",
    crearas: ["Loción corporal de 8 oz"],
    incluye: ["Base de loción", "Fragancia", "Envase con pump"],
    duracion: "1.5 horas",
    edad: "14+",
    personas: "4 a 16 personas",
    precio: 2600,
    acento: "cobalto",
  },
  {
    id: "t-jelly-soap",
    slug: "jelly-soap",
    nombre: "Jelly Soap",
    tags: ["Niños", "Sensorial"],
    resumen: "Jabón que tiembla, brilla y hace que bañarse sea un evento.",
    crearas: ["Tres jabones jelly en moldes divertidos"],
    incluye: ["Jelly soap base", "Colorantes", "Moldes", "Envases"],
    duracion: "1 hora",
    edad: "5+",
    personas: "6 a 25 niños",
    precio: 1800,
    acento: "chartreuse",
  },
  {
    id: "t-squishy-canvas",
    slug: "squishy-canvas",
    nombre: "Squishy Canvas",
    tags: ["Niños", "Sensorial"],
    resumen: "Pintar, apretar, volver a apretar. Arte que también es juguete.",
    crearas: ["Tu canvas sensorial"],
    incluye: ["Canvas", "Pinturas", "Relleno sensorial", "Delantal"],
    duracion: "1 hora",
    edad: "4+",
    personas: "6 a 25 niños",
    precio: 1600,
    acento: "tomate",
  },
  {
    id: "t-play-dough",
    slug: "play-dough",
    nombre: "Play Dough",
    tags: ["Niños", "Sensorial"],
    resumen: "Masa suave, con aroma y colores que nadie más tiene.",
    crearas: ["Tres potes de masa aromática"],
    incluye: ["Ingredientes", "Colorantes", "Aromas", "Potes"],
    duracion: "45 minutos",
    edad: "3+",
    personas: "6 a 25 niños",
    precio: 1400,
    acento: "rosa",
  },
  {
    id: "t-kids-creative-lab",
    slug: "kids-creative-lab",
    nombre: "Kids Creative Lab",
    tags: ["Niños"],
    resumen: "Tres estaciones, mucho desorden controlado y niños orgullosos.",
    crearas: ["Tres proyectos distintos para llevar a casa"],
    incluye: ["Todos los materiales", "Facilitadores", "Delantales", "Merienda"],
    duracion: "2 horas",
    edad: "5 a 12 años",
    personas: "8 a 30 niños",
    precio: 2400,
    acento: "cobalto",
  },
  {
    id: "t-room-fragrance",
    slug: "room-fragrance-lab",
    nombre: "Room Fragrance Lab",
    tags: ["Adultos", "Fragancias"],
    resumen: "Diseña el olor de tu casa, tu oficina o tu negocio.",
    crearas: ["Room spray de 100 ml", "Difusor de varillas"],
    incluye: ["Bases", "Fragancias", "Envases", "Varillas"],
    duracion: "2 horas",
    edad: "16+",
    personas: "4 a 16 personas",
    precio: 3000,
    acento: "chartreuse",
  },
  {
    id: "t-cafe-aromas",
    slug: "cafe-y-aromas",
    nombre: "Café + Aromas",
    tags: ["Sensorial", "Adultos"],
    resumen: "Catamos café, encontramos sus notas y las llevamos a una vela.",
    crearas: ["Vela inspirada en tu taza favorita"],
    incluye: ["Cata guiada", "Materiales", "Vela de 8 oz"],
    duracion: "2.5 horas",
    edad: "18+",
    personas: "8 a 30 personas",
    precio: null,
    acento: "ink",
  },
  {
    id: "t-cerveza-aromas",
    slug: "cerveza-y-aromas",
    nombre: "Cerveza + Aromas",
    tags: ["Sensorial", "Adultos"],
    resumen: "Lúpulo, malta y pigmentos. Una experiencia para grupos que quieren otra cosa.",
    crearas: ["Vela o room spray inspirado en la cata"],
    incluye: ["Cata guiada", "Materiales", "Facilitación"],
    duracion: "2.5 horas",
    edad: "18+",
    personas: "10 a 40 personas",
    precio: null,
    acento: "tomate",
  },
  {
    id: "t-wellness",
    slug: "experiencias-wellness",
    nombre: "Experiencias Wellness",
    tags: ["Wellness", "Sensorial"],
    resumen: "Respirar, mezclar y salir con algo hecho por ti. Para spas, pilates y retiros.",
    crearas: ["Ritual aromático personalizado"],
    incluye: ["Diseño de la experiencia", "Materiales", "Facilitación"],
    duracion: "A medida",
    edad: "16+",
    personas: "Desde 8 personas",
    precio: null,
    acento: "cobalto",
  },
  {
    id: "t-personalizada",
    slug: "experiencia-personalizada",
    nombre: "Experiencia Personalizada",
    tags: ["Adultos", "Sensorial"],
    resumen: "Nos cuentas tu idea y la convertimos en una experiencia que nadie ha vivido.",
    crearas: ["Lo que inventemos juntos"],
    incluye: ["Concepto", "Materiales", "Montaje", "Facilitación"],
    duracion: "A medida",
    edad: "A medida",
    personas: "A medida",
    precio: null,
    acento: "rosa",
  },
];

export const filtrosTalleres = [
  "Todos",
  "Adultos",
  "Niños",
  "Fragancias",
  "Velas",
  "Beauty Lab",
  "Wellness",
  "Sensorial",
];

export type Fecha = {
  tallerSlug: string;
  fecha: string;
  hora: string;
  lugar: string;
  precio: number;
  cupos: number;
};

export const proximasFechas: Fecha[] = [
  {
    tallerSlug: "perfume-lab",
    fecha: "Sábado 12 de septiembre",
    hora: "4:00 PM",
    lugar: "Estudio Artelier, Piantini",
    precio: 3500,
    cupos: 6,
  },
  {
    tallerSlug: "candle-lab",
    fecha: "Domingo 20 de septiembre",
    hora: "11:00 AM",
    lugar: "Estudio Artelier, Piantini",
    precio: 2900,
    cupos: 9,
  },
  {
    tallerSlug: "glow-lab",
    fecha: "Viernes 26 de septiembre",
    hora: "6:30 PM",
    lugar: "Rooftop invitado, Naco",
    precio: 3100,
    cupos: 4,
  },
];

export const kits: Producto[] = [
  {
    id: "k-candle",
    slug: "candle-kit",
    nombre: "Candle Kit",
    precio: 2450,
    categoria: "Velas",
    descripcion:
      "Todo para hacer dos velas de soya en tu mesa de comedor. Dificultad: se puede con vino.",
    idealPara: "Velas · Regalos",
    medida: "Rinde 2 velas de 8 oz · 45 min · 14+",
    acento: "tomate",
    destacado: true,
    span: "ancho",
  },
  {
    id: "k-perfume",
    slug: "perfume-kit",
    nombre: "Perfume Kit",
    precio: 2950,
    categoria: "Aromas",
    descripcion: "Ocho fragancias, blotters, pipetas y una tarjeta de fórmula para tu firma.",
    idealPara: "Perfume · Room spray",
    medida: "Rinde 1 perfume de 30 ml · 1 h · 16+",
    acento: "cobalto",
    destacado: true,
    span: "alto",
  },
  {
    id: "k-jelly",
    slug: "jelly-soap-kit",
    nombre: "Jelly Soap Kit",
    precio: 1650,
    categoria: "Niños",
    descripcion: "Jabones que tiemblan. Para tardes de lluvia sin pantallas.",
    idealPara: "Niños · Cumpleaños",
    medida: "Rinde 6 jabones · 40 min · 5+",
    acento: "chartreuse",
    destacado: true,
  },
  {
    id: "k-glow",
    slug: "glow-kit",
    nombre: "Glow Kit",
    precio: 2100,
    categoria: "Beauty",
    descripcion: "Aceite shimmer y bruma corporal. Brillo nivel foto con flash.",
    idealPara: "Beauty · Girls night",
    medida: "Rinde 2 productos · 30 min · 12+",
    acento: "rosa",
    destacado: true,
  },
  {
    id: "k-playdough",
    slug: "play-dough-kit",
    nombre: "Play Dough Kit",
    precio: 1250,
    categoria: "Niños",
    descripcion: "Masa aromática en tres colores. Se hace en la cocina, se juega en el piso.",
    idealPara: "Niños · Sensorial",
    medida: "Rinde 3 potes · 30 min · 3+",
    acento: "tomate",
  },
  {
    id: "k-waxmelts",
    slug: "wax-melts-kit",
    nombre: "Wax Melts Kit",
    precio: 1750,
    categoria: "Velas",
    descripcion: "Para quien quiere que la casa huela rico sin prender nada.",
    idealPara: "Wax melts · Regalos",
    medida: "Rinde 12 melts · 30 min · 12+",
    acento: "chartreuse",
  },
  {
    id: "k-temporada",
    slug: "kit-temporada",
    nombre: "Kit de Temporada",
    precio: 3400,
    categoria: "Temporada",
    descripcion: "Cambia cada mes. Este mes: cítricos raros y cera de coco.",
    idealPara: "Regalos · Coleccionistas",
    medida: "Sorpresa · 1 h · 14+",
    acento: "cobalto",
    destacado: true,
    span: "ancho",
  },
  {
    id: "k-bridal",
    slug: "kit-bridal",
    nombre: "Kit Bridal Party",
    precio: 6900,
    categoria: "Adultos",
    descripcion: "Seis estaciones pequeñas para la despedida más linda del grupo.",
    idealPara: "Bridal · Grupos",
    medida: "Para 6 personas · 1.5 h · 16+",
    acento: "rosa",
  },
];

export const categoriasKits = ["Todos", "Niños", "Adultos", "Beauty", "Velas", "Aromas", "Temporada"];

export const materiales: Producto[] = [
  { id: "m-1", slug: "cera-de-soya", nombre: "Cera de soya", precio: 320, categoria: "VELAS", descripcion: "Cera limpia, cremosa y perdonadora. La favorita para empezar.", idealPara: "Velas · Wax melts", variantes: ["1 lb", "5 lb", "10 lb"], medida: "1 lb", acento: "chartreuse", destacado: true, span: "alto" },
  { id: "m-2", slug: "cera-de-coco", nombre: "Cera de coco", precio: 420, categoria: "VELAS", descripcion: "Quema lenta y aroma potente. La opción premium.", idealPara: "Velas de autor", variantes: ["1 lb", "5 lb"], medida: "1 lb", acento: "ink" },
  { id: "m-3", slug: "parafina", nombre: "Parafina", precio: 260, categoria: "VELAS", descripcion: "Clásica, económica y con excelente throw.", idealPara: "Velas · Moldes", variantes: ["1 lb", "5 lb"], medida: "1 lb", acento: "cobalto" },
  { id: "m-4", slug: "mechas-algodon", nombre: "Mechas de algodón", precio: 180, categoria: "VELAS", descripcion: "Paquete de 25 mechas con base metálica.", idealPara: "Velas en frasco", variantes: ["#6", "#8", "#10"], medida: "25 uds", acento: "tomate" },
  { id: "m-5", slug: "mechas-madera", nombre: "Mechas de madera", precio: 340, categoria: "VELAS", descripcion: "Crepitan como chimenea pequeña. Muy adictivas.", idealPara: "Velas premium", variantes: ["Fina", "Media", "Ancha"], medida: "10 uds", acento: "rosa" },
  { id: "m-6", slug: "candle-jars", nombre: "Candle jars", precio: 145, categoria: "VELAS", descripcion: "Vidrio grueso, boca ancha, con tapa.", idealPara: "Velas · Regalos", variantes: ["4 oz", "8 oz", "12 oz"], medida: "1 ud", acento: "cobalto", span: "ancho" },
  { id: "m-7", slug: "latas", nombre: "Latas", precio: 110, categoria: "ENVASES", descripcion: "Para velas de viaje y wax melts.", idealPara: "Velas · Viaje", variantes: ["2 oz", "4 oz", "8 oz"], medida: "1 ud", acento: "ink" },
  { id: "m-8", slug: "colorantes-vela", nombre: "Colorantes para vela", precio: 220, categoria: "COLOR", descripcion: "Bloques concentrados. Un pedacito rinde muchísimo.", idealPara: "Velas", variantes: ["Rojo", "Azul", "Verde", "Rosa"], medida: "10 g", acento: "tomate", destacado: true },
  { id: "m-9", slug: "base-glicerina", nombre: "Base de glicerina", precio: 380, categoria: "JABONES", descripcion: "Melt and pour transparente. Lista en minutos.", idealPara: "Jabones", variantes: ["1 lb", "5 lb"], medida: "1 lb", acento: "chartreuse" },
  { id: "m-10", slug: "jelly-soap-base", nombre: "Jelly Soap Base", precio: 460, categoria: "JABONES", descripcion: "La base que hace jabones temblorosos. Los niños enloquecen.", idealPara: "Jelly soap · Niños", variantes: ["1 lb", "3 lb"], medida: "1 lb", acento: "rosa", destacado: true, span: "alto" },
  { id: "m-11", slug: "micas", nombre: "Micas", precio: 240, categoria: "COLOR", descripcion: "Pigmentos con destello. Cosméticamente seguras.", idealPara: "Jabones · Beauty", variantes: ["Oro", "Cobalto", "Coral", "Perla"], medida: "10 g", acento: "cobalto" },
  { id: "m-12", slug: "moldes-silicona", nombre: "Moldes de silicona", precio: 290, categoria: "JABONES", descripcion: "Formas raras y bonitas para que tu jabón no parezca de supermercado.", idealPara: "Jabones · Velas", variantes: ["Corazón", "Concha", "Cubo"], medida: "1 ud", acento: "tomate" },
  { id: "m-13", slug: "base-locion", nombre: "Base de loción", precio: 520, categoria: "BODY & BEAUTY", descripcion: "Base neutra lista para que le pongas aroma y activos.", idealPara: "Body lotion", variantes: ["8 oz", "16 oz"], medida: "8 oz", acento: "ink" },
  { id: "m-14", slug: "aceites-portadores", nombre: "Aceites portadores", precio: 350, categoria: "BODY & BEAUTY", descripcion: "Almendras, jojoba o fraccionado de coco.", idealPara: "Aceites · Shimmer", variantes: ["Almendras", "Jojoba", "Coco"], medida: "8 oz", acento: "chartreuse" },
  { id: "m-15", slug: "mantecas", nombre: "Mantecas", precio: 430, categoria: "BODY & BEAUTY", descripcion: "Karité o cacao, sin refinar, olor a cosa real.", idealPara: "Body butter", variantes: ["Karité", "Cacao"], medida: "8 oz", acento: "tomate" },
  { id: "m-16", slug: "shimmer-cosmetico", nombre: "Shimmer cosmético", precio: 280, categoria: "COLOR", descripcion: "Brillo fino para aceites y brumas.", idealPara: "Glow · Beauty", variantes: ["Oro", "Rosa", "Plata"], medida: "10 g", acento: "rosa" },
  { id: "m-17", slug: "atomizadores", nombre: "Atomizadores", precio: 160, categoria: "ENVASES", descripcion: "Vidrio ámbar o transparente con spray fino.", idealPara: "Perfume · Room spray", variantes: ["30 ml", "50 ml", "100 ml"], medida: "1 ud", acento: "cobalto", destacado: true },
  { id: "m-18", slug: "droppers", nombre: "Droppers", precio: 130, categoria: "ENVASES", descripcion: "Botella con gotero para aceites y sueros.", idealPara: "Aceites · Sueros", variantes: ["30 ml", "60 ml"], medida: "1 ud", acento: "ink" },
  { id: "m-19", slug: "pumps", nombre: "Pumps", precio: 150, categoria: "ENVASES", descripcion: "Envases con dosificador para lociones.", idealPara: "Loción · Gel", variantes: ["8 oz", "16 oz"], medida: "1 ud", acento: "chartreuse" },
  { id: "m-20", slug: "pipetas", nombre: "Pipetas", precio: 90, categoria: "HERRAMIENTAS", descripcion: "Paquete de 20. Nunca son suficientes.", idealPara: "Todo", medida: "20 uds", acento: "tomate" },
  { id: "m-21", slug: "jarra-vertido", nombre: "Jarra de vertido", precio: 620, categoria: "HERRAMIENTAS", descripcion: "Aluminio con pico. La diferencia entre verter y derramar.", idealPara: "Velas", medida: "1 L", acento: "ink", span: "ancho" },
  { id: "m-22", slug: "termometro", nombre: "Termómetro digital", precio: 540, categoria: "HERRAMIENTAS", descripcion: "Porque \"más o menos caliente\" no es una temperatura.", idealPara: "Velas · Jabones", medida: "1 ud", acento: "cobalto" },
  { id: "m-23", slug: "bascula", nombre: "Báscula de precisión", precio: 890, categoria: "HERRAMIENTAS", descripcion: "0.01 g. Tu fórmula te lo va a agradecer.", idealPara: "Fragancias · Beauty", medida: "1 ud", acento: "rosa" },
  { id: "m-24", slug: "blotters", nombre: "Blotters", precio: 120, categoria: "HERRAMIENTAS", descripcion: "Tiras de papel para oler sin arruinarte la nariz.", idealPara: "Fragancias", medida: "50 uds", acento: "chartreuse", destacado: true },
];

export const categoriasMateriales = [
  "VELAS",
  "JABONES",
  "BODY & BEAUTY",
  "ENVASES",
  "HERRAMIENTAS",
  "COLOR",
];

export type Fragancia = {
  id: string;
  slug: string;
  nombre: string;
  familia: string;
  coleccion: string;
  descripcion: string;
  salida: string;
  corazon: string;
  fondo: string;
  usos: string;
  tamanos: { label: string; onzas: number }[];
  acento: Acento;
  imagen: string;
};

export const coleccionesOlfativas = [
  { id: "garden", nombre: "THE GARDEN", texto: "Verdes, flores, hojas y botánicos.", acento: "chartreuse" as Acento },
  { id: "orchard", nombre: "THE ORCHARD", texto: "Frutas, cítricos y berries.", acento: "tomate" as Acento },
  { id: "pantry", nombre: "THE PANTRY", texto: "Vainilla, café, caramelo y gourmand.", acento: "rosa" as Acento },
  { id: "woods", nombre: "THE WOODS", texto: "Cedro, musgo, humo y maderas.", acento: "ink" as Acento },
  { id: "coast", nombre: "THE COAST", texto: "Marino, mineral, fresco y limpio.", acento: "cobalto" as Acento },
  { id: "strange", nombre: "THE STRANGE ONES", texto: "Fragancias inesperadas.", acento: "rosa" as Acento },
];

const tamanosBase = [
  { label: "1 oz", onzas: 1 },
  { label: "4 oz", onzas: 4 },
  { label: "8 oz", onzas: 8 },
  { label: "16 oz", onzas: 16 },
];

export const fragancias: Fragancia[] = [
  { id: "f-1", slug: "under-the-cypress", nombre: "Under the Cypress", familia: "Verde maderoso", coleccion: "woods", descripcion: "Cipreses altos, piedra tibia y aire mediterráneo al atardecer.", salida: "Bergamota, hoja de higuera", corazon: "Ciprés, salvia", fondo: "Cedro, musgo seco", usos: "Velas · Difusores · Room spray", tamanos: tamanosBase, acento: "ink", imagen: imgUnderCypress.url },
  { id: "f-2", slug: "winter-woods", nombre: "Winter Woods", familia: "Conífera fresca", coleccion: "woods", descripcion: "Bosque nevado: abeto, corteza de abedul y aire limpio y frío.", salida: "Pino, eucalipto", corazon: "Abeto, enebro", fondo: "Bálsamo, ámbar", usos: "Velas · Temporada · Wax melts", tamanos: tamanosBase, acento: "chartreuse", imagen: imgWinterWoods.url },
  { id: "f-3", slug: "wildflower-season", nombre: "Wildflower Season", familia: "Floral silvestre", coleccion: "garden", descripcion: "Un campo entero en flor: margaritas, lavanda y hierba tibia.", salida: "Hierba verde, cítrico", corazon: "Margarita, lavanda, jazmín", fondo: "Almizcle blanco", usos: "Velas · Jabones · Body", tamanos: tamanosBase, acento: "chartreuse", imagen: imgWildflower.url },
  { id: "f-4", slug: "sunday-in-october", nombre: "Sunday in October", familia: "Gourmand especiado", coleccion: "pantry", descripcion: "Hojas secas, canela y ese otoño que en el Caribe solo existe en velas.", salida: "Manzana, canela", corazon: "Calabaza, nuez moscada", fondo: "Azúcar morena, maple", usos: "Velas · Wax melts", tamanos: tamanosBase, acento: "tomate", imagen: imgSundayOctober.url },
  { id: "f-5", slug: "clean-slate", nombre: "Clean Slate", familia: "Fresco mineral", coleccion: "coast", descripcion: "Bambú, agua y piedra: empezar de nuevo, pero con estilo.", salida: "Bambú, limón", corazon: "Té verde, loto", fondo: "Musgo blanco, mineral", usos: "Velas · Room spray · Jabones", tamanos: tamanosBase, acento: "cobalto", imagen: imgCleanSlate.url },
  { id: "f-6", slug: "desert-water", nombre: "Desert Water", familia: "Verde acuático", coleccion: "coast", descripcion: "Agave, agua de alberca y sol seco sobre arcilla.", salida: "Aloe, pepino", corazon: "Agave, cactus", fondo: "Ámbar suave, cedro", usos: "Velas · Body · Jabones", tamanos: tamanosBase, acento: "turquesa" as Acento, imagen: imgDesertWater.url },
  { id: "f-7", slug: "rose-colored-glasses", nombre: "Rose Colored Glasses", familia: "Floral rosado", coleccion: "garden", descripcion: "Peonía y rosa vistas con optimismo descarado.", salida: "Pera, lichi", corazon: "Peonía, rosa", fondo: "Almizcle, madera clara", usos: "Velas · Perfume · Body", tamanos: tamanosBase, acento: "rosa", imagen: imgRoseGlasses.url },
  { id: "f-8", slug: "breakfast-in-capri", nombre: "Breakfast in Capri", familia: "Cítrico solar", coleccion: "orchard", descripcion: "Limones amalfitanos, café recién colado y brisa de mar.", salida: "Limón, bergamota", corazon: "Azahar, café", fondo: "Almizcle, vainilla suave", usos: "Velas · Room spray · Jabones", tamanos: tamanosBase, acento: "cobalto", imagen: imgCapri.url },
  { id: "f-9", slug: "make-a-wish", nombre: "Make a Wish", familia: "Gourmand cremoso", coleccion: "pantry", descripcion: "Bizcocho de vainilla, buttercream y una vela recién apagada.", salida: "Azúcar, coco", corazon: "Buttercream, bizcocho", fondo: "Vainilla, tonka", usos: "Velas · Wax melts · Jabones", tamanos: tamanosBase, acento: "rosa", imagen: imgMakeAWish.url },
  { id: "f-10", slug: "cabana-no-5", nombre: "Cabana No. 5", familia: "Tropical fresco", coleccion: "coast", descripcion: "Coco, lima y toalla limpia junto a la piscina.", salida: "Lima, hoja de palma", corazon: "Coco, flor blanca", fondo: "Sándalo, almizcle", usos: "Velas · Body · Aceites", tamanos: tamanosBase, acento: "chartreuse", imagen: imgCabana.url },
];


export const testimonios = [
  { texto: "SALÍ DEL TALLER OLIENDO A LAVANDA Y SINTIÉNDOME UNA GENIA.", autor: "UNA CREADORA EN PROGRESO", acento: "chartreuse" as Acento },
  { texto: "MI VELA QUEDÓ TORCIDA PERO LA AMO IGUAL.", autor: "UNA PRINCIPIANTE ORGULLOSA", acento: "tomate" as Acento },
  { texto: "VINE POR UN CUMPLEAÑOS Y ME QUEDÉ ENGANCHADA A LOS KITS.", autor: "UNA CLIENTA RECURRENTE", acento: "cobalto" as Acento },
  { texto: "COMPRÉ CERA PARA UN PROYECTO Y AHORA TENGO UN NEGOCIO.", autor: "UNA MAKER SIN FRENO", acento: "rosa" as Acento },
  { texto: "LOS NIÑOS NO PIDIERON TABLET EN DOS HORAS. DOS. HORAS.", autor: "UNA MADRE EN SHOCK", acento: "chartreuse" as Acento },
];

export const todosLosProductos = [...kits, ...materiales];

import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Plus, Trash2 } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

export const Route = createFileRoute("/calculadoras")({
  head: () => ({
    meta: [
      { title: "Calculadoras de velas y jabón — Artelier" },
      {
        name: "description",
        content:
          "Calculadora de velas y jabón en frío para makers: cera, fragancia, sosa y agua al gramo.",
      },
      { property: "og:title", content: "Calculadoras de velas y jabón — Artelier" },
      {
        property: "og:description",
        content: "Cera, fragancia, sosa y agua al gramo. Herramientas claras para tu próximo lote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalculadorasPage,
});

const g = (n: number) => `${n.toFixed(1)} g`;
const OZ_A_ML = 29.5735;
const inputCls =
  "min-h-12 min-w-0 w-full border border-ink bg-paper px-4 py-3 text-base text-ink transition-colors focus:bg-chartreuse/20";

const ceras = [
  { id: "soya", nombre: "Soya — recomendada para empezar", densidad: 0.9 },
  { id: "coco-soya", nombre: "Coco–soya", densidad: 0.92 },
  { id: "parafina", nombre: "Parafina", densidad: 0.9 },
  { id: "abeja", nombre: "Cera de abeja", densidad: 0.96 },
] as const;

function Campo({ label, ayuda, children }: { label: string; ayuda?: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-2">
      <span className="label-xs">{label}</span>
      {children}
      {ayuda && <span className="max-w-[44ch] text-sm leading-snug text-muted-foreground">{ayuda}</span>}
    </label>
  );
}

function Resultado({ titulo, valor, pie, acento }: { titulo: string; valor: string; pie: string; acento: string }) {
  return (
    <div className={`flex min-h-40 flex-col justify-between gap-4 p-5 sm:p-6 ${acento}`}>
      <span className="label-xs opacity-75">{titulo}</span>
      <strong className="font-display text-4xl font-black leading-none sm:text-5xl">{valor}</strong>
      <span className="text-sm opacity-75">{pie}</span>
    </div>
  );
}

function CalcVelas() {
  const [unidades, setUnidades] = useState(1);
  const [capacidad, setCapacidad] = useState(8);
  const [unidad, setUnidad] = useState<"oz" | "ml">("oz");
  const [llenado, setLlenado] = useState(90);
  const [cera, setCera] = useState(ceras[0]?.id ?? "soya");
  const [carga, setCarga] = useState(8);

  const r = useMemo(() => {
    const ml = (unidad === "oz" ? capacidad * OZ_A_ML : capacidad) * (llenado / 100);
    const densidad = ceras.find((item) => item.id === cera)?.densidad ?? 0.9;
    const totalUno = ml * densidad;
    const fraganciaUno = totalUno * (carga / 100);
    const ceraUno = totalUno - fraganciaUno;
    const n = Math.max(1, Math.round(unidades));
    return {
      ceraUno,
      fraganciaUno,
      ceraTotal: ceraUno * n,
      fraganciaTotal: fraganciaUno * n,
      totalTotal: totalUno * n,
      onzasFragancia: (fraganciaUno * n) / 28.3495,
      n,
    };
  }, [unidades, capacidad, unidad, llenado, cera, carga]);

  return (
    <section className="ficha-formula border-y border-ink bg-card lg:border">
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(25rem,1.1fr)]">
        <div className="relative border-b border-ink p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <span className="numero-gigante pointer-events-none absolute right-3 top-4 text-tomate/15">01</span>
          <p className="etiqueta relative inline-block -rotate-2">Herramienta principal</p>
          <h2 className="display-lg relative mt-6 max-w-[10ch]">Calculadora de velas</h2>
          <p className="font-mano relative mt-4 text-2xl text-tomate">cera + fragancia, al gramo</p>
          <p className="relative mt-6 max-w-[42ch] text-lg leading-relaxed">
            Indica el tamaño de tu envase y cuántas velas harás. La ficha calcula cuánto pesar de cada material.
          </p>
          <ol className="relative mt-8 grid gap-3 text-sm">
            <li className="border-l-4 border-chartreuse pl-4"><strong>1.</strong> Mide la capacidad del envase.</li>
            <li className="border-l-4 border-cobalto pl-4"><strong>2.</strong> Elige tu cera y porcentaje de aroma.</li>
            <li className="border-l-4 border-tomate pl-4"><strong>3.</strong> Pesa cada resultado por separado.</li>
          </ol>
        </div>

        <div className="bg-paper/85 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <Campo label="Cantidad de velas" ayuda="Redondeamos a unidades completas.">
              <input type="number" min={1} value={unidades} onChange={(e) => setUnidades(Number(e.target.value))} className={inputCls} />
            </Campo>

            <Campo label="Capacidad del envase" ayuda="Usa la capacidad interior, no el tamaño exterior.">
              <div className="grid grid-cols-[1fr_auto]">
                <input type="number" min={0} step="0.5" value={capacidad} onChange={(e) => setCapacidad(Number(e.target.value))} className={inputCls} />
                <div className="flex" aria-label="Unidad de capacidad">
                  {(["oz", "ml"] as const).map((u) => (
                    <button key={u} type="button" onClick={() => setUnidad(u)} aria-pressed={unidad === u} className={`label-xs min-h-12 border border-l-0 border-ink px-4 ${unidad === u ? "bg-ink text-paper" : "bg-paper"}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </Campo>

            <Campo label="Tipo de cera" ayuda="La densidad cambia según la cera y afecta el peso final.">
              <select value={cera} onChange={(e) => setCera(e.target.value)} className={inputCls}>
                {ceras.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}
              </select>
            </Campo>

            <Campo label="Porcentaje de llenado" ayuda="Deja espacio hasta el borde para una terminación limpia.">
              <div className="maker-range">
                <output htmlFor="llenado">{llenado}%</output>
                <input id="llenado" type="range" min={60} max={100} value={llenado} onChange={(e) => setLlenado(Number(e.target.value))} aria-valuetext={`${llenado} por ciento de llenado`} />
              </div>
            </Campo>

            <Campo label="Carga de fragancia" ayuda="Es el porcentaje de aroma dentro de la mezcla total. Revisa el máximo recomendado por tu cera.">
              <div className="maker-range">
                <output htmlFor="carga-vela">{carga}%</output>
                <input id="carga-vela" type="range" min={0} max={12} step={0.5} value={carga} onChange={(e) => setCarga(Number(e.target.value))} aria-valuetext={`${carga} por ciento de fragancia`} />
              </div>
            </Campo>
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-ink sm:grid-cols-3" aria-live="polite">
        <Resultado acento="bg-chartreuse text-ink" titulo="Cera" valor={g(r.ceraTotal)} pie={`${g(r.ceraUno)} por vela`} />
        <Resultado acento="bg-cobalto text-paper" titulo="Fragancia" valor={g(r.fraganciaTotal)} pie={`${r.onzasFragancia.toFixed(2)} oz · ${g(r.fraganciaUno)} por vela`} />
        <Resultado acento="bg-ink text-paper" titulo="Mezcla total" valor={g(r.totalTotal)} pie={`${r.n} unidad(es)`} />
      </div>
      <p className="border-t border-ink bg-paper p-5 text-sm text-muted-foreground sm:px-8">
        Referencia de taller: vierte entre 50–55 °C según la ficha de tu cera. La soya suele admitir 8–10% de fragancia.
      </p>
    </section>
  );
}

type Aceite = { id: string; nombre: string; sap: number };
const aceites: Aceite[] = [
  { id: "coco", nombre: "Aceite de coco", sap: 0.19 },
  { id: "oliva", nombre: "Aceite de oliva", sap: 0.1345 },
  { id: "palma", nombre: "Aceite de palma", sap: 0.1417 },
  { id: "castor", nombre: "Aceite de ricino", sap: 0.1286 },
  { id: "girasol", nombre: "Aceite de girasol", sap: 0.1342 },
  { id: "aguacate", nombre: "Aceite de aguacate", sap: 0.1339 },
  { id: "manteca-karite", nombre: "Manteca de karité", sap: 0.128 },
  { id: "manteca-cacao", nombre: "Manteca de cacao", sap: 0.137 },
  { id: "almendras", nombre: "Aceite de almendras dulces", sap: 0.136 },
  { id: "cera-abeja", nombre: "Cera de abeja", sap: 0.069 },
];

function CalcJabon() {
  const [filas, setFilas] = useState([
    { id: "coco", gramos: 300 },
    { id: "oliva", gramos: 500 },
    { id: "palma", gramos: 200 },
  ]);
  const [superfat, setSuperfat] = useState(5);
  const [concentracion, setConcentracion] = useState(33);
  const [cargaFragancia, setCargaFragancia] = useState(3);

  const r = useMemo(() => {
    const totalAceites = filas.reduce((t, f) => t + (f.gramos || 0), 0);
    const naohPuro = filas.reduce((t, f) => t + (f.gramos || 0) * (aceites.find((a) => a.id === f.id)?.sap ?? 0), 0);
    const naoh = naohPuro * (1 - superfat / 100);
    const agua = concentracion > 0 ? naoh * (100 / concentracion - 1) : 0;
    const fragancia = totalAceites * (cargaFragancia / 100);
    return { totalAceites, naoh, agua, fragancia, lote: totalAceites + naoh + agua + fragancia };
  }, [filas, superfat, concentracion, cargaFragancia]);

  const actualizar = (i: number, patch: Partial<{ id: string; gramos: number }>) =>
    setFilas((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));

  return (
    <section className="border-y border-ink bg-card lg:border">
      <div className="grid lg:grid-cols-[minmax(20rem,0.68fr)_minmax(0,1.32fr)]">
        <div className="relative overflow-hidden border-b border-ink bg-cobalto p-6 text-paper sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <span className="numero-gigante pointer-events-none absolute -right-3 top-4 text-paper/10">02</span>
          <p className="etiqueta relative inline-block rotate-2">Fórmula técnica</p>
          <h2 className="display-md relative mt-6">Jabón en frío</h2>
          <p className="font-mano relative mt-4 text-2xl text-chartreuse">saponificación con sosa</p>
          <p className="relative mt-6 max-w-[40ch] leading-relaxed text-paper/85">
            Cada aceite necesita una cantidad distinta de sosa. Su valor SAP indica exactamente cuánto; esta herramienta hace esa suma por ti.
          </p>
          <div className="relative mt-8 space-y-4 border-t border-paper/30 pt-5 text-sm text-paper/80">
            <p><strong className="text-paper">Sobreengrasado:</strong> deja parte de los aceites sin saponificar. Más porcentaje suele dar un jabón más suave.</p>
            <p><strong className="text-paper">Concentración:</strong> define la proporción de sosa en la solución. Menos concentración significa más agua.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <fieldset>
            <legend className="label-xs">Aceites de la fórmula</legend>
            <p className="mt-2 max-w-[52ch] text-sm text-muted-foreground">Añade cada aceite y su peso real. No uses porcentajes en estos campos.</p>
            <div className="mt-5 space-y-3">
              {filas.map((f, i) => (
                <div key={`${f.id}-${i}`} className="grid grid-cols-[minmax(0,1fr)_6.5rem_3rem] gap-2">
                  <select value={f.id} onChange={(e) => actualizar(i, { id: e.target.value })} className={inputCls} aria-label={`Aceite ${i + 1}`}>
                    {aceites.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                  </select>
                  <div className="relative">
                    <input type="number" min={0} value={f.gramos} onChange={(e) => actualizar(i, { gramos: Number(e.target.value) })} className={`${inputCls} pr-8`} aria-label={`Gramos del aceite ${i + 1}`} />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm">g</span>
                  </div>
                  <button type="button" onClick={() => setFilas((prev) => prev.filter((_, idx) => idx !== i))} className="flex size-12 items-center justify-center border border-ink hover:bg-tomate hover:text-paper" aria-label={`Quitar aceite ${i + 1}`}>
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => setFilas((prev) => [...prev, { id: "girasol", gramos: 100 }])} className="label-xs inline-flex min-h-12 items-center gap-2 border border-ink px-5 py-3 hover:bg-chartreuse">
                <Plus className="size-4" aria-hidden /> Agregar aceite
              </button>
            </div>
          </fieldset>

          <div className="mt-9 grid gap-7 sm:grid-cols-3">
            <Campo label="Sobreengrasado" ayuda="5% es un punto de partida habitual.">
              <div className="maker-range"><output htmlFor="superfat">{superfat}%</output><input id="superfat" type="range" min={0} max={12} value={superfat} onChange={(e) => setSuperfat(Number(e.target.value))} aria-valuetext={`${superfat} por ciento de sobreengrasado`} /></div>
            </Campo>
            <Campo label="Concentración de sosa" ayuda="33% es una referencia común.">
              <div className="maker-range"><output htmlFor="concentracion">{concentracion}%</output><input id="concentracion" type="range" min={25} max={50} value={concentracion} onChange={(e) => setConcentracion(Number(e.target.value))} aria-valuetext={`${concentracion} por ciento de concentración`} /></div>
            </Campo>
            <Campo label="Carga de fragancia" ayuda="Confirma siempre el límite de uso seguro.">
              <div className="maker-range"><output htmlFor="fragancia-jabon">{cargaFragancia}%</output><input id="fragancia-jabon" type="range" min={0} max={6} step={0.5} value={cargaFragancia} onChange={(e) => setCargaFragancia(Number(e.target.value))} aria-valuetext={`${cargaFragancia} por ciento de fragancia`} /></div>
            </Campo>
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-ink sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        <Resultado acento="bg-paper text-ink" titulo="Aceites" valor={g(r.totalAceites)} pie="peso base" />
        <Resultado acento="bg-tomate text-paper" titulo="Sosa (NaOH)" valor={g(r.naoh)} pie={`sobreengrasado ${superfat}%`} />
        <Resultado acento="bg-chartreuse text-ink" titulo="Agua" valor={g(r.agua)} pie={`solución al ${concentracion}%`} />
        <Resultado acento="bg-ink text-paper" titulo="Lote total" valor={g(r.lote)} pie={`incluye ${g(r.fragancia)} de fragancia`} />
      </div>
      <div className="border-t border-ink bg-paper p-5 sm:px-8">
        <p className="flex max-w-3xl gap-3 text-sm leading-relaxed text-muted-foreground">
          <FlaskConical className="mt-0.5 size-5 shrink-0 text-tomate" aria-hidden />
          Usa gafas, guantes y ventilación. Añade siempre la sosa al agua, nunca al revés. Verifica los valores SAP y límites de fragancia con las fichas de tus proveedores antes de producir.
        </p>
      </div>
    </section>
  );
}

function CalculadorasPage() {
  return (
    <div className="bg-background">
      <header className="paper-texture relative overflow-hidden border-b border-ink px-4 py-14 lg:px-8 lg:py-20">
        <span className="numero-gigante pointer-events-none absolute -right-5 top-4 text-cobalto/10">05</span>
        <p className="label-xs text-tomate">Herramientas del taller</p>
        <h1 className="display-xl relative mt-5 max-w-5xl">Calcula. <span className="text-cobalto">No adivines.</span></h1>
        <p className="font-mano relative mt-6 max-w-xl text-2xl">dos fichas, cero cálculos a ojo</p>
        <p className="relative mt-4 max-w-2xl text-lg text-muted-foreground">Convierte tu idea en una fórmula clara. Ajusta los controles y lee inmediatamente cuánto necesitas para producir.</p>
      </header>

      <div className="space-y-12 py-12 lg:px-8 lg:py-16">
        <CalcVelas />
        <CalcJabon />
      </div>
    </div>
  );
}
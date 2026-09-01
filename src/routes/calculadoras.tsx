import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/calculadoras")({
  head: () => ({
    meta: [
      { title: "Calculadoras del taller — Artelier by Apothecare" },
      {
        name: "description",
        content:
          "Calculadora de velas y calculadora de jabón en frío (saponificación) para makers en Santo Domingo. Cera, fragancia, sosa y agua al gramo.",
      },
      { property: "og:title", content: "Calculadoras del taller — Artelier" },
      {
        property: "og:description",
        content: "Cera, fragancia, sosa y agua al gramo. Herramientas de taller, no adivinanzas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalculadorasPage,
});

/* ---------- utilidades ---------- */

const g = (n: number) => `${n.toFixed(1)} g`;
const OZ_A_ML = 29.5735;

/* ---------- calculadora de velas ---------- */

const ceras = [
  { id: "soya", nombre: "Soya (golden wax)", densidad: 0.9 },
  { id: "coco-soya", nombre: "Coco–soya", densidad: 0.92 },
  { id: "parafina", nombre: "Parafina", densidad: 0.9 },
  { id: "abeja", nombre: "Cera de abeja", densidad: 0.96 },
] as const;

function CalcVelas() {
  const [unidades, setUnidades] = useState(1);
  const [capacidad, setCapacidad] = useState(8);
  const [unidad, setUnidad] = useState<"oz" | "ml">("oz");
  const [llenado, setLlenado] = useState(90);
  const [cera, setCera] = useState(ceras[0]!.id as string);
  const [carga, setCarga] = useState(8);

  const r = useMemo(() => {
    const ml = (unidad === "oz" ? capacidad * OZ_A_ML : capacidad) * (llenado / 100);
    const densidad = ceras.find((c) => c.id === cera)?.densidad ?? 0.9;
    const totalUno = ml * densidad;
    const fraganciaUno = totalUno * (carga / 100);
    const ceraUno = totalUno - fraganciaUno;
    const n = Math.max(1, Math.round(unidades));
    return {
      ceraUno,
      fraganciaUno,
      totalUno,
      ceraTotal: ceraUno * n,
      fraganciaTotal: fraganciaUno * n,
      totalTotal: totalUno * n,
      onzasFragancia: (fraganciaUno * n) / 28.3495,
      n,
    };
  }, [unidades, capacidad, unidad, llenado, cera, carga]);

  return (
    <div className="ficha-formula border border-ink p-6 lg:p-8">
      <p className="etiqueta inline-block rotate-[-2deg]">Ficha 01</p>
      <h2 className="display-md mt-4">Calculadora de velas</h2>
      <p className="font-mano mt-2 text-lg">cera + fragancia, al gramo</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Campo label="Cantidad de velas">
          <input
            type="number"
            min={1}
            value={unidades}
            onChange={(e) => setUnidades(Number(e.target.value))}
            className={inputCls}
          />
        </Campo>

        <Campo label="Capacidad del envase">
          <div className="flex">
            <input
              type="number"
              min={0}
              step="0.5"
              value={capacidad}
              onChange={(e) => setCapacidad(Number(e.target.value))}
              className={`${inputCls} flex-1`}
            />
            <div className="flex">
              {(["oz", "ml"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnidad(u)}
                  className={`label-xs border border-l-0 border-ink px-3 ${
                    unidad === u ? "bg-ink text-paper" : ""
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </Campo>

        <Campo label="Tipo de cera">
          <select value={cera} onChange={(e) => setCera(e.target.value)} className={inputCls}>
            {ceras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </Campo>

        <Campo label={`Llenado: ${llenado}%`}>
          <input
            type="range"
            min={60}
            max={100}
            value={llenado}
            onChange={(e) => setLlenado(Number(e.target.value))}
            className="w-full accent-tomate"
          />
        </Campo>

        <Campo label={`Carga de fragancia: ${carga}%`}>
          <input
            type="range"
            min={0}
            max={12}
            step={0.5}
            value={carga}
            onChange={(e) => setCarga(Number(e.target.value))}
            className="w-full accent-cobalto"
          />
        </Campo>
      </div>

      <div className="mt-8 grid gap-px bg-ink sm:grid-cols-3">
        <Dato acento="bg-chartreuse text-ink" titulo="Cera" valor={g(r.ceraTotal)} pie={`${g(r.ceraUno)} por vela`} />
        <Dato
          acento="bg-cobalto text-paper"
          titulo="Fragancia"
          valor={g(r.fraganciaTotal)}
          pie={`${r.onzasFragancia.toFixed(2)} oz · ${g(r.fraganciaUno)} por vela`}
        />
        <Dato acento="bg-ink text-paper" titulo="Total mezcla" valor={g(r.totalTotal)} pie={`${r.n} unidad(es)`} />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Vierte entre 50–55 °C según tu cera. La carga máxima depende de la ficha técnica: soya suele
        aguantar 8–10%.
      </p>
    </div>
  );
}

/* ---------- calculadora de jabón en frío ---------- */

type Aceite = { id: string; nombre: string; sap: number };

const aceites: Aceite[] = [
  { id: "coco", nombre: "Aceite de coco", sap: 0.19 },
  { id: "oliva", nombre: "Aceite de oliva", sap: 0.1345 },
  { id: "palma", nombre: "Aceite de palma", sap: 0.1417 },
  { id: "castor", nombre: "Aceite de ricino (castor)", sap: 0.1286 },
  { id: "girasol", nombre: "Aceite de girasol", sap: 0.1342 },
  { id: "aguacate", nombre: "Aceite de aguacate", sap: 0.1339 },
  { id: "manteca-karite", nombre: "Manteca de karité", sap: 0.128 },
  { id: "manteca-cacao", nombre: "Manteca de cacao", sap: 0.137 },
  { id: "almendras", nombre: "Aceite de almendras dulces", sap: 0.136 },
  { id: "cera-abeja", nombre: "Cera de abeja", sap: 0.069 },
];

function CalcJabon() {
  const [filas, setFilas] = useState<{ id: string; gramos: number }[]>([
    { id: "coco", gramos: 300 },
    { id: "oliva", gramos: 500 },
    { id: "palma", gramos: 200 },
  ]);
  const [superfat, setSuperfat] = useState(5);
  const [concentracion, setConcentracion] = useState(33);
  const [cargaFragancia, setCargaFragancia] = useState(3);

  const r = useMemo(() => {
    const totalAceites = filas.reduce((t, f) => t + (f.gramos || 0), 0);
    const naohPuro = filas.reduce((t, f) => {
      const sap = aceites.find((a) => a.id === f.id)?.sap ?? 0;
      return t + (f.gramos || 0) * sap;
    }, 0);
    const naoh = naohPuro * (1 - superfat / 100);
    const agua = concentracion > 0 ? naoh * (100 / concentracion - 1) : 0;
    const fragancia = totalAceites * (cargaFragancia / 100);
    return {
      totalAceites,
      naoh,
      agua,
      fragancia,
      lote: totalAceites + naoh + agua + fragancia,
    };
  }, [filas, superfat, concentracion, cargaFragancia]);

  const actualizar = (i: number, patch: Partial<{ id: string; gramos: number }>) =>
    setFilas((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));

  return (
    <div className="border border-ink bg-card p-6 lg:p-8">
      <p className="etiqueta inline-block rotate-[2deg]">Ficha 02</p>
      <h2 className="display-md mt-4">Jabón en frío</h2>
      <p className="font-mano mt-2 text-lg">saponificación con sosa (NaOH)</p>

      <div className="mt-8 space-y-3">
        {filas.map((f, i) => (
          <div key={i} className="flex flex-wrap gap-2 sm:flex-nowrap">
            <select
              value={f.id}
              onChange={(e) => actualizar(i, { id: e.target.value })}
              className={`${inputCls} flex-1`}
            >
              {aceites.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              value={f.gramos}
              onChange={(e) => actualizar(i, { gramos: Number(e.target.value) })}
              className={`${inputCls} w-24 sm:w-28`}
              aria-label="Gramos"
            />
            <button
              type="button"
              onClick={() => setFilas((prev) => prev.filter((_, idx) => idx !== i))}
              className="label-xs min-h-11 border border-ink px-4 hover:bg-tomate hover:text-paper"
              aria-label="Quitar aceite"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFilas((prev) => [...prev, { id: "girasol", gramos: 100 }])}
          className="label-xs border border-ink px-4 py-3 hover:bg-ink hover:text-paper"
        >
          + Agregar aceite
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <Campo label={`Superfat: ${superfat}%`}>
          <input
            type="range"
            min={0}
            max={12}
            step={1}
            value={superfat}
            onChange={(e) => setSuperfat(Number(e.target.value))}
            className="w-full accent-rosa"
          />
        </Campo>
        <Campo label={`Concentración de sosa: ${concentracion}%`}>
          <input
            type="range"
            min={25}
            max={50}
            value={concentracion}
            onChange={(e) => setConcentracion(Number(e.target.value))}
            className="w-full accent-cobalto"
          />
        </Campo>
        <Campo label={`Fragancia: ${cargaFragancia}%`}>
          <input
            type="range"
            min={0}
            max={6}
            step={0.5}
            value={cargaFragancia}
            onChange={(e) => setCargaFragancia(Number(e.target.value))}
            className="w-full accent-chartreuse"
          />
        </Campo>
      </div>

      <div className="mt-8 grid gap-px bg-ink sm:grid-cols-2 lg:grid-cols-4">
        <Dato acento="bg-paper text-ink" titulo="Aceites" valor={g(r.totalAceites)} pie="peso base" />
        <Dato acento="bg-tomate text-paper" titulo="Sosa (NaOH)" valor={g(r.naoh)} pie={`superfat ${superfat}%`} />
        <Dato acento="bg-cobalto text-paper" titulo="Agua" valor={g(r.agua)} pie={`sol. al ${concentracion}%`} />
        <Dato acento="bg-ink text-paper" titulo="Lote total" valor={g(r.lote)} pie={`fragancia ${g(r.fragancia)}`} />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Trabaja siempre con gafas, guantes y ventilación. Añade la sosa al agua, nunca al revés.
        Verifica tus valores SAP con la ficha técnica de cada proveedor antes de producir.
      </p>
    </div>
  );
}

/* ---------- piezas compartidas ---------- */

const inputCls =
  "label-xs min-h-11 min-w-0 border border-ink bg-paper px-3 py-3 text-ink focus:bg-chartreuse/30";

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-xs opacity-70">{label}</span>
      {children}
    </label>
  );
}

function Dato({
  titulo,
  valor,
  pie,
  acento,
}: {
  titulo: string;
  valor: string;
  pie: string;
  acento: string;
}) {
  return (
    <div className={`flex flex-col gap-1 p-5 ${acento}`}>
      <span className="label-xs opacity-80">{titulo}</span>
      <span className="font-display text-3xl font-black leading-none">{valor}</span>
      <span className="text-xs opacity-70">{pie}</span>
    </div>
  );
}

function CalculadorasPage() {
  return (
    <div className="bg-background">
      <header className="relative overflow-hidden border-b border-ink px-4 py-16 lg:px-8 lg:py-24">
        <span className="numero-gigante pointer-events-none absolute -right-4 top-0 select-none">
          05
        </span>
        <p className="label-xs text-tomate">05 · Herramientas de taller</p>
        <h1 className="display-xl mt-5 max-w-4xl">
          Calcula. <span className="text-cobalto">No adivines.</span>
        </h1>
        <p className="font-mano mt-6 max-w-xl text-2xl">
          dos fichas, cero cálculos a ojo
        </p>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Cera, fragancia, sosa y agua en gramos exactos para tu próximo lote.
        </p>
      </header>

      <div className="grid gap-8 px-4 py-14 lg:grid-cols-2 lg:px-8">
        <CalcVelas />
        <CalcJabon />
      </div>
    </div>
  );
}

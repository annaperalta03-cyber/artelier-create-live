import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  className?: string;
  duration?: number;
  separator?: string;
};

export function Marquee({ items, className, duration = 40, separator = "·" }: Props) {
  const secuencia = [...items, ...items, ...items, ...items];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((copia) => (
          <div key={copia} className="flex shrink-0" aria-hidden={copia === 1}>
            {secuencia.map((texto, i) => (
              <span key={`${copia}-${i}`} className="label-xs flex items-center whitespace-nowrap">
                {texto}
                <span className="mx-4 opacity-60">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

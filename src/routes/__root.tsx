import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartProvider } from "@/lib/cart";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="display-xl">404</h1>
      <h2 className="mt-4 font-display text-2xl font-bold uppercase">
        Esta página se fue a mezclar aromas
      </h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        No encontramos lo que buscabas, pero hay mucho por crear en el resto del estudio.
      </p>
      <Link to="/" className="label-xs mt-8 bg-ink px-6 py-4 text-paper">
        Volver al inicio
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="display-lg">Algo se derramó</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Esta página no cargó bien. Puedes intentarlo otra vez o volver al inicio.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="label-xs bg-ink px-6 py-4 text-paper"
        >
          Intentar otra vez
        </button>
        <Link to="/" className="label-xs border border-ink px-6 py-4">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ARTELIER by Apothecare — Menos scroll. Más crear." },
      {
        name: "description",
        content:
          "Estudio de experiencias creativas en Santo Domingo: talleres, kits DIY, materiales y fragancias para makers.",
      },
      { name: "author", content: "Artelier by Apothecare" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Archivo:wght@400;500;600;700&family=Caveat:wght@500;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <SiteHeader />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main>
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

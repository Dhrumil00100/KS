import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/shared/SmoothScroll";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-kult-black">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-[120px] leading-none text-kult-red">404</h1>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-widest text-kult-white">Page not found</h2>
          <p className="mt-3 text-sm text-kult-gray">The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="mt-8 inline-block border border-kult-red bg-kult-red px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white"
          >
            Back to home
          </Link>
        </div>
      </div>
      <Footer />
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
    <div className="flex min-h-screen items-center justify-center bg-kult-black px-4 text-kult-white">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl uppercase tracking-widest">This page didn't load</h1>
        <p className="mt-3 text-sm text-kult-gray">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-kult-red bg-kult-red px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white"
          >
            Try again
          </button>
          <a href="/" className="border border-kult-white px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KULT Salon — Premium Hair & Beauty" },
      { name: "description", content: "KULT Salon: premium unisex luxury salon. Hair, colour, skin, nails and bridal for the discerning." },
      { name: "author", content: "KULT Salon" },
      { property: "og:title", content: "KULT Salon — Premium Hair & Beauty" },
      { property: "og:description", content: "Beauty with an edge. Book your appointment at KULT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "preload", href: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&fit=crop&auto=format&q=75", as: "image" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap" },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <div className="flex min-h-screen flex-col bg-kult-white">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}


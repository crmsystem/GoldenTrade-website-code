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

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, organizationJsonLd } from "../lib/seo";
import { getFirebaseAnalytics } from "../lib/firebase";
import { PAGESENSE_SNIPPET, activatePageSense } from "../lib/pagesense";
import {
  META_PIXEL_SNIPPET,
  META_PIXEL_NOSCRIPT_SRC,
  installMetaClickTracking,
  trackMetaPageView,
} from "../lib/metaPixel";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
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
      { title: `${SITE_NAME} — Zoho Authorized Partner & Implementation Experts` },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: SITE_NAME },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#00205B" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: `${SITE_NAME} — Zoho Authorized Partner & Implementation Experts` },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/logo.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_NAME} — Zoho Authorized Partner & Implementation Experts` },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/logo.png` },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/logo.png" },
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
        {/* Zoho PageSense — kept first in <head> so its anti-flicker guard runs before paint */}
        <script id="pagesenseCode" dangerouslySetInnerHTML={{ __html: PAGESENSE_SNIPPET }} />
        {/* Meta Pixel — base code (init + first PageView) */}
        <script id="metaPixelCode" dangerouslySetInnerHTML={{ __html: META_PIXEL_SNIPPET }} />
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} alt="" src={META_PIXEL_NOSCRIPT_SRC} />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  // PageSense: re-activate on every client-side navigation so goals, heatmaps,
  // recordings and funnels track each page view in this single-page app.
  useEffect(() => {
    return router.subscribe("onResolved", (evt) => {
      if (evt.pathChanged) activatePageSense();
    });
  }, [router]);

  // Meta Pixel: the base code already sent the first PageView, so only send one
  // when the path actually changes during client-side navigation.
  useEffect(() => {
    let lastPath = window.location.pathname;
    return router.subscribe("onResolved", (evt) => {
      const path = evt.toLocation.pathname;
      if (path !== lastPath) {
        lastPath = path;
        trackMetaPageView();
      }
    });
  }, [router]);

  // Meta Pixel: Contact (email/phone links) and StartTrial (Zoho signup) clicks on every page.
  useEffect(() => installMetaClickTracking(), []);

  useEffect(() => {
    getFirebaseAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

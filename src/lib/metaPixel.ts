// Meta (Facebook) Pixel — base code injected into <head> by __root.tsx.
// This is a single-page app, so pages don't reload on navigation: the base code
// fires the first PageView, and __root.tsx fires one more on every route change.

export const META_PIXEL_ID = "731385407768380";

export const META_PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

export const META_PIXEL_NOSCRIPT_SRC = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Fire a standard Meta event (PageView, Lead, Contact, StartTrial, ...). Safe on the server and with ad blockers. */
export function trackMetaEvent(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}

export function trackMetaPageView(): void {
  trackMetaEvent("PageView");
}

/**
 * Site-wide click tracking, so CTAs on every page are covered without editing each one:
 * - mailto: / tel: links          -> Contact
 * - Zoho One free-signup link     -> StartTrial
 * Returns a cleanup function.
 */
export function installMetaClickTracking(): () => void {
  if (typeof document === "undefined") return () => {};
  const onClick = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href.startsWith("mailto:")) {
      trackMetaEvent("Contact", { content_name: "Email" });
    } else if (href.startsWith("tel:")) {
      trackMetaEvent("Contact", { content_name: "Phone" });
    } else if (href.includes("zoho.com/one/signup")) {
      trackMetaEvent("StartTrial", { content_name: "Zoho One Free Trial" });
    }
  };
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}

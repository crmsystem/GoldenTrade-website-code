import type { ReactNode } from "react";
import { TopUtilityBar } from "./TopUtilityBar";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SalesIQWidget } from "./SalesIQWidget";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-ink flex flex-col">
      <TopUtilityBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <SalesIQWidget />
    </div>
  );
}

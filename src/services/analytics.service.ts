import type { SalesIQAnalyticsEvent } from "@/types/salesiq";

const events: SalesIQAnalyticsEvent[] = [];

export function trackAnalyticsEvent(name: string, properties?: Record<string, unknown>): void {
  events.push({
    name,
    timestamp: new Date().toISOString(),
    properties,
  });
}

export function getAnalyticsEvents(): SalesIQAnalyticsEvent[] {
  return [...events];
}

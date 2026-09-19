import type { SalesIQConfig, SalesIQVisitorData } from "@/types/salesiq";

let scriptPromise: Promise<boolean> | null = null;
let initialized = false;
let lastSyncedVisitor: Partial<SalesIQVisitorData> | null = null;
let loadAttempts = 0;
const SALESIQ_MAX_LOAD_ATTEMPTS = 3;
const SALESIQ_LOAD_RETRY_DELAY_MS = 1000;

function getSalesIQWindow(): Window & typeof globalThis {
  return window as Window & typeof globalThis;
}

function getBrowserDocument(): Document | null {
  return typeof document === "undefined" ? null : document;
}

function isSalesIQReady(): boolean {
  return Boolean(getSalesIQWindow().__salesiq_ready__);
}

function buildSalesIQScriptSrc(scriptUrl: string, widgetCode?: string): string {
  if (!widgetCode) return scriptUrl;

  try {
    const url = new URL(scriptUrl);
    if (!url.searchParams.has("wc")) {
      url.searchParams.set("wc", widgetCode);
    }
    return url.toString();
  } catch {
    if (scriptUrl.includes("wc=")) return scriptUrl;
    const separator = scriptUrl.includes("?") ? "&" : "?";
    return `${scriptUrl}${separator}wc=${encodeURIComponent(widgetCode)}`;
  }
}

function normalizeVisitorInfo(visitor: SalesIQVisitorData): Record<string, string> {
  const info: Record<string, string> = {};

  if (visitor.company) info.Company = visitor.company;
  if (visitor.phone) info.Phone = visitor.phone;
  if (visitor.interestedProduct) info.InterestedProduct = visitor.interestedProduct;
  if (visitor.budget) info.Budget = visitor.budget;
  if (visitor.industry) info.Industry = visitor.industry;
  if (visitor.employees) info.Employees = visitor.employees;
  if (visitor.currentStage) info.CurrentStage = visitor.currentStage;

  return info;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^\+?[0-9().\s-]{7,15}$/.test(phone);
}

function getChangedVisitorFields(visitor: Partial<SalesIQVisitorData>): Partial<SalesIQVisitorData> {
  if (!lastSyncedVisitor) return visitor;

  return Object.entries(visitor).reduce<Partial<SalesIQVisitorData>>((changes, [key, value]) => {
    if (value && value !== lastSyncedVisitor?.[key as keyof SalesIQVisitorData]) {
      changes[key as keyof SalesIQVisitorData] = value;
    }
    return changes;
  }, {});
}

function registerSalesIQReadyHandler(resolve: (value: boolean) => void): void {
  const win = getSalesIQWindow();
  win.$zoho = win.$zoho || {};
  win.$zoho.salesiq = win.$zoho.salesiq || {};

  const previousReady = win.$zoho.salesiq?.ready;
  win.$zoho.salesiq.ready = () => {
    win.__salesiq_ready__ = true;
    if (typeof previousReady === "function") previousReady();
    resolve(true);
  };

  if (typeof win.$zoho.salesiq.afterReady === "function") {
    win.$zoho.salesiq.afterReady(() => {
      win.__salesiq_ready__ = true;
      resolve(true);
    });
  }
}

function configureSalesIQGlobal(widgetCode?: string): void {
  const win = getSalesIQWindow();
  win.$zoho = win.$zoho || {};
  win.$zoho.salesiq = win.$zoho.salesiq || {};

  if (widgetCode) {
    win.$zoho.salesiq.widgetcode = widgetCode;
  }
}

export function isSalesIQLoaded(): boolean {
  return isSalesIQReady();
}

export function isSalesIQAvailable(): boolean {
  return typeof window !== "undefined";
}

export async function initializeSalesIQ(config: SalesIQConfig = {}): Promise<boolean> {
  if (!isSalesIQAvailable()) return false;
  if (initialized) return isSalesIQReady();
  if (scriptPromise) return scriptPromise;

  const enabled = config.enabled ?? import.meta.env.VITE_ZOHO_SALESIQ_ENABLED === "true";
  const scriptUrl = config.scriptUrl ?? import.meta.env.VITE_ZOHO_SALESIQ_SCRIPT_URL;
  const widgetCode = config.widgetCode ?? import.meta.env.VITE_ZOHO_SALESIQ_WIDGET_CODE;

  if (!enabled || !scriptUrl) {
    console.warn("SalesIQ integration is not configured. Set the Zoho script URL and widget code in your environment variables.");
    initialized = true;
    return false;
  }

  if (isSalesIQReady()) {
    initialized = true;
    return true;
  }

  const documentRef = getBrowserDocument();
  if (!documentRef) return false;

  const existingScript = documentRef.querySelector('script[data-salesiq-script="true"]');
  if (existingScript) {
    initialized = true;
    return true;
  }

  configureSalesIQGlobal(widgetCode);

  scriptPromise = new Promise<boolean>((resolve) => {
    const tryLoad = () => {
      if (loadAttempts >= SALESIQ_MAX_LOAD_ATTEMPTS) {
        initialized = true;
        resolve(false);
        return;
      }

      loadAttempts += 1;
      const script = documentRef.createElement("script");
      script.id = "zsiqscript";
      script.async = true;
      script.dataset.salesiqScript = "true";
      script.src = buildSalesIQScriptSrc(scriptUrl, widgetCode);

      let settled = false;
      const finish = (value: boolean) => {
        if (settled) return;
        settled = true;
        initialized = true;
        resolve(value);
      };

      registerSalesIQReadyHandler(finish);

      script.onload = () => {
        const win = getSalesIQWindow();
        win.__salesiq_script_loaded__ = true;
        if (isSalesIQReady()) {
          finish(true);
        } else {
          window.setTimeout(() => finish(Boolean(win.$zoho?.salesiq)), 3000);
        }
      };

      script.onerror = () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        window.setTimeout(() => {
          if (loadAttempts < SALESIQ_MAX_LOAD_ATTEMPTS) {
            tryLoad();
          } else {
            finish(false);
          }
        }, SALESIQ_LOAD_RETRY_DELAY_MS);
      };

      documentRef.head.appendChild(script);
    };

    tryLoad();
  });

  return scriptPromise;
}

export function setSalesIQVisitor(visitor: SalesIQVisitorData): void {
  if (!isSalesIQReady()) return;

  const salesiq = getSalesIQWindow().$zoho?.salesiq;
  if (!salesiq) return;

  const changed = getChangedVisitorFields(visitor);
  if (!Object.keys(changed).length) return;

  if (changed.name) salesiq.visitor?.name?.(changed.name);
  if (changed.email && isValidEmail(changed.email)) salesiq.visitor?.email?.(changed.email);
  if (changed.phone && isValidPhone(changed.phone)) salesiq.visitor?.contactnumber?.(changed.phone);

  const info = normalizeVisitorInfo(changed as SalesIQVisitorData);
  if (Object.keys(info).length > 0) {
    salesiq.visitor?.info?.(info);
  }

  lastSyncedVisitor = { ...lastSyncedVisitor, ...changed };
}

export function setSalesIQVisitorInfo(visitor: SalesIQVisitorData): void {
  setSalesIQVisitor(visitor);
}

export function setSalesIQVisitorName(name: string): void {
  if (!isSalesIQReady()) return;
  const normalized = name.trim();
  if (!normalized) return;
  getSalesIQWindow().$zoho?.salesiq?.visitor?.name?.(normalized);
  lastSyncedVisitor = { ...lastSyncedVisitor, name: normalized };
}

export function setSalesIQVisitorEmail(email: string): void {
  if (!isSalesIQReady()) return;
  const normalized = email.trim();
  if (!normalized || !isValidEmail(normalized)) return;
  getSalesIQWindow().$zoho?.salesiq?.visitor?.email?.(normalized);
  lastSyncedVisitor = { ...lastSyncedVisitor, email: normalized };
}

export function startSalesIQChat(question?: string, department?: string): void {
  if (!isSalesIQReady()) return;
  const salesiq = getSalesIQWindow().$zoho?.salesiq;
  if (!salesiq?.chat) return;

  if (question) {
    salesiq.visitor?.question?.(question);
  }

  if (department) {
    salesiq.chat.department?.(department);
  }

  salesiq.chat.start?.();
}

export function openSalesIQWidget(): void {
  if (!isSalesIQReady()) return;
  const salesiq = getSalesIQWindow().$zoho?.salesiq;
  salesiq?.chat?.show?.();
  salesiq?.chat?.open?.();
}

export function hideSalesIQWidget(): void {
  if (!isSalesIQReady()) return;
  getSalesIQWindow().$zoho?.salesiq?.chat?.hide?.();
}

export function maximizeSalesIQWidget(): void {
  if (!isSalesIQReady()) return;
  getSalesIQWindow().$zoho?.salesiq?.chat?.maximize?.();
}

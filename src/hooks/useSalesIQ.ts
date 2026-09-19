import { useCallback, useEffect, useRef, useState } from "react";
import {
  initializeSalesIQ,
  isSalesIQLoaded,
  isSalesIQAvailable,
  maximizeSalesIQWidget,
  openSalesIQWidget,
  hideSalesIQWidget,
  setSalesIQVisitor,
  setSalesIQVisitorEmail,
  setSalesIQVisitorInfo,
  setSalesIQVisitorName,
  startSalesIQChat,
} from "@/services/salesiq.service";
import type { SalesIQConfig, SalesIQVisitorData } from "@/types/salesiq";

export function useSalesIQ(config: SalesIQConfig = {}) {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const initialize = useCallback(async () => {
    if (!isSalesIQAvailable()) return false;

    const result = await initializeSalesIQ(configRef.current);
    setLoaded(isSalesIQLoaded());
    setReady(result);
    return result;
  }, []);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return {
    initialize,
    isLoaded: () => loaded,
    isReady: () => ready,
    startChat: (question?: string, department?: string) => startSalesIQChat(question, department),
    openWidget: openSalesIQWidget,
    hideWidget: hideSalesIQWidget,
    maximizeWidget: maximizeSalesIQWidget,
    setVisitor: (visitor: SalesIQVisitorData) => setSalesIQVisitor(visitor),
    setVisitorInfo: (visitor: SalesIQVisitorData) => setSalesIQVisitorInfo(visitor),
    setVisitorEmail: (email: string) => setSalesIQVisitorEmail(email),
    setVisitorName: (name: string) => setSalesIQVisitorName(name),
  };
}

export interface SalesIQConfig {
  enabled?: boolean;
  scriptUrl?: string;
  widgetCode?: string;
}

export interface SalesIQVisitorData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  interestedProduct?: string;
  budget?: string;
  industry?: string;
  employees?: string;
  currentStage?: string;
  [key: string]: string | undefined;
}

export interface SalesIQIntent {
  intent: string;
  confidence: number;
  product?: string;
  department?: string;
}

export interface SalesIQAnalyticsEvent {
  name: string;
  timestamp: string;
  properties?: Record<string, unknown>;
}

export interface ConversationSummary {
  conversationSummary: string;
  interestedProduct?: string;
  problems: string[];
  recommendedSolution?: string;
  budget?: string;
  urgency?: string;
  sentiment?: string;
}

declare global {
  interface Window {
    $zoho?: {
      salesiq?: {
        ready?: () => void;
        afterReady?: (callback: () => void) => void;
        chat?: {
          start?: () => unknown;
          show?: () => unknown;
          hide?: () => unknown;
          open?: () => unknown;
          maximize?: () => unknown;
          minimize?: () => unknown;
          department?: (department: string) => unknown;
        };
        visitor?: {
          name?: (value: string) => unknown;
          email?: (value: string) => unknown;
          contactnumber?: (value: string) => unknown;
          info?: (value: Record<string, string>) => unknown;
          question?: (value: string) => unknown;
        };
      };
    };
    __salesiq_script_loaded__?: boolean;
    __salesiq_ready__?: boolean;
  }
}

export {};

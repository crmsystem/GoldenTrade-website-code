import type { SalesIQVisitorData } from "@/types/salesiq";

export interface ConversationSummary {
  conversationSummary: string;
  interestedProduct?: string;
  problems: string[];
  recommendedSolution?: string;
  budget?: string;
  urgency?: string;
  sentiment?: string;
}

export function persistConversationSummary(summary: ConversationSummary): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("salesiq-conversation-summary", JSON.stringify(summary));
}

export function buildConversationSummary(message: string, visitorData?: Partial<SalesIQVisitorData>): ConversationSummary {
  const problems = ["Visitor inquired about Zoho-related support or implementation"];

  if (/pricing|quote|budget|cost/i.test(message)) {
    problems.push("Pricing discussion identified");
  }

  if (/demo|book/i.test(message)) {
    problems.push("Demo request identified");
  }

  if (/support|issue|problem|bug/i.test(message)) {
    problems.push("Support need identified");
  }

  return {
    conversationSummary: `Visitor asked: ${message}`,
    interestedProduct: visitorData?.interestedProduct,
    problems,
    recommendedSolution: "Connect with a Zoho expert for a guided next step.",
    budget: visitorData?.budget,
    urgency: /urgent|asap|today|now/i.test(message) ? "High" : "Medium",
    sentiment: /help|need|want|demo|pricing/i.test(message) ? "Interested" : "Neutral",
  };
}

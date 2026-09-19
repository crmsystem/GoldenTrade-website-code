import type { SalesIQIntent } from "@/types/salesiq";

const productKeywords: Array<{ keyword: string; product: string }> = [
  { keyword: "crm", product: "CRM" },
  { keyword: "people", product: "People" },
  { keyword: "books", product: "Books" },
  { keyword: "recruit", product: "Recruit" },
  { keyword: "salesiq", product: "SalesIQ" },
  { keyword: "creator", product: "Creator" },
  { keyword: "support", product: "Support" },
];

const intentRules: Array<{ keywords: string[]; intent: string; department: string }> = [
  {
    keywords: ["talk to human", "need support", "speak to consultant", "need sales", "book demo", "call me", "need expert", "need engineer", "human", "agent"],
    intent: "human_requested",
    department: "Support Department",
  },
  {
    keywords: ["pricing", "price", "quote", "budget", "cost"],
    intent: "pricing",
    department: "Sales Department",
  },
  {
    keywords: ["demo", "schedule demo", "book a demo"],
    intent: "demo",
    department: "Sales Department",
  },
  {
    keywords: ["support", "issue", "problem", "bug"],
    intent: "support",
    department: "Support Department",
  },
];

export function detectIntent(message: string): SalesIQIntent {
  const normalized = message.toLowerCase();

  for (const rule of intentRules) {
    const matched = rule.keywords.some((keyword) => normalized.includes(keyword));
    if (matched) {
      const productMatch = productKeywords.find(({ keyword }) => normalized.includes(keyword));
      return {
        intent: rule.intent,
        confidence: 0.9,
        product: productMatch?.product,
        department: rule.department,
      };
    }
  }

  const productMatch = productKeywords.find(({ keyword }) => normalized.includes(keyword));
  return {
    intent: "general",
    confidence: 0.7,
    product: productMatch?.product,
    department: productMatch ? "Sales Department" : "Support Department",
  };
}

export function getDepartmentForIntent(intent: string, product?: string): string {
  if (intent === "human_requested" || intent === "support" || intent === "pricing" || intent === "demo") {
    return intent === "support" ? "Support Department" : "Sales Department";
  }

  if (product?.toLowerCase() === "people") return "HR Department";
  if (product?.toLowerCase() === "books") return "Finance Department";
  if (product?.toLowerCase() === "recruit") return "HR Department";
  if (product?.toLowerCase() === "creator") return "Product Department";
  if (product?.toLowerCase() === "salesiq") return "Sales Department";

  return "Support Department";
}

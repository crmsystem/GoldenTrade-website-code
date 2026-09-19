import type { SalesIQVisitorData } from "@/types/salesiq";

export function qualifyLead(message: string, visitorData?: Partial<SalesIQVisitorData>): { score: number; qualified: boolean; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  if (visitorData?.email) {
    score += 2;
    reasons.push("email captured");
  }

  if (visitorData?.company) {
    score += 2;
    reasons.push("company captured");
  }

  if (visitorData?.phone) {
    score += 2;
    reasons.push("phone captured");
  }

  if (/demo|pricing|quote|budget|book/i.test(message)) {
    score += 2;
    reasons.push("purchase intent detected");
  }

  if (/support|issue|problem|help/i.test(message)) {
    score += 1;
    reasons.push("support need detected");
  }

  return {
    score,
    qualified: score >= 4,
    reasons,
  };
}

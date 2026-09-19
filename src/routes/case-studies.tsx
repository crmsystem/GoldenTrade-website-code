import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TrendingUp, Users, Clock, ArrowRight, X, Award } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import zoholicsImg from "@/assets/zoholics-2026.jpg";
import zoho30YearsImg from "@/assets/zoho-30years.jpg";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Zoho Implementation Success Stories | Goldentrade" },
      { name: "description", content: "Real Zoho implementation results: revenue uplift, cycle-time reduction and process automation across enterprise clients." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/case-studies` }],
  }),
  component: CaseStudies,
});

const CASES = [
  {
    id: 1,
    industry: "Zoho Community & Events",
    title: "Zoholics Philippines 2026 — Meeting with Zoho Leadership",
    metric: "Global partnership connections",
    Icon: Award,
    desc: "Connected with Gibu Mathew, Managing Director of Zoho APAC, at Marriott Hotel Manila during Zoholics Philippines 2026 — a pivotal moment in our Zoho partnership journey.",
    challenge: "As a dedicated Zoho developer and CRM solutions partner, we sought to deepen our connections within the global Zoho ecosystem and understand the latest strategic direction for APAC region.",
    solution: "Participated in Zoholics Philippines 2026 conference at Marriott Hotel Manila, where we had the opportunity for a meaningful encounter with Gibu Mathew, Managing Director of Zoho APAC, to discuss partnership opportunities and industry trends.",
    results: [
      "Direct connection with Zoho APAC leadership established",
      "Insights into Zoho's strategic vision for APAC region gained",
      "Strengthened relationships with Rare Global Food Trading Corp. and broader Zoho community",
      "Enhanced understanding of automation and CRM trends shaping enterprise solutions",
    ],
    timeline: "Zoholics Philippines 2026 — Manila",
    team_size: "Global Zoho Community",
    image: zoholicsImg,
  },
  {
    id: 2,
    industry: "Zoho Community & Partnership",
    title: "Celebrating 30 Years of Zoho — A Community Milestone",
    metric: "10+ years as Zoho partner",
    Icon: Award,
    desc: "Celebrating three decades of innovation with Zoho and a thriving global community of innovators, partners, and CRM professionals at Zoholics Philippines.",
    challenge: "Building lasting partnerships within a rapidly evolving CRM ecosystem while staying committed to helping businesses grow through technology and automation.",
    solution: "Actively participated in Zoholics Philippines, connecting with the global Zoho community to celebrate three decades of innovation and share expertise in helping businesses scale through CRM automation and digital transformation.",
    results: [
      "Over 10 years of dedicated partnership with Zoho ecosystem",
      "Connected with innovation leaders and CRM professionals worldwide",
      "Shared passion for helping businesses grow through technology and automation",
      "Strengthened community bonds and partnership opportunities for the next phase of Zoho's growth",
    ],
    timeline: "Zoholics Philippines — 30 Years Celebration",
    team_size: "Global Partner Community",
    image: zoho30YearsImg,
  },
  {
    id: 3,
    industry: "Enterprise SaaS",
    title: "Sales pipeline rebuild on Zoho CRM",
    metric: "+34% conversion",
    Icon: TrendingUp,
    desc: "Custom Deluge functions, Blueprint-driven stages, lead scoring and full marketing-to-sales handoff automation.",
    challenge: "Sales team operated in disconnected spreadsheets with no pipeline visibility. Lead scoring was manual, and conversion rates stalled at 15%.",
    solution: "Implemented Zoho CRM with custom Deluge functions for lead scoring, Blueprint automation for sales stages, and integrated marketing-to-sales handoff. Created custom dashboards for real-time pipeline visibility.",
    results: [
      "Conversion rate increased from 15% to 20.1%",
      "Sales cycle reduced by 18 days",
      "Pipeline visibility improved visibility across 50+ active deals",
      "Lead qualification time cut from 5 days to 1.5 days",
    ],
    timeline: "4 months",
    team_size: "8 users",
  },
  {
    id: 4,
    industry: "Manufacturing",
    title: "End-to-end HR on Zoho People",
    metric: "1,200 employees migrated",
    Icon: Users,
    desc: "Attendance with geofencing across 14 plants, payroll integration and self-service portal rollout in 90 days.",
    challenge: "Manual HR processes across 14 plants in 4 countries. Payroll delays, no real-time attendance tracking, high admin overhead for leave approvals.",
    solution: "Deployed Zoho People with geofenced mobile attendance, integrated payroll system, automated leave workflows, and self-service portal. Custom dashboards for HR analytics and compliance.",
    results: [
      "1,200 employees successfully migrated to self-service",
      "Payroll processing time reduced by 65%",
      "Attendance accuracy improved to 99.2% across all plants",
      "HR admin overhead reduced by 40%",
    ],
    timeline: "3 months",
    team_size: "12 users (HR + plant managers)",
  },
  {
    id: 5,
    industry: "Professional Services",
    title: "Zoho Books finance automation",
    metric: "3x faster month-end close",
    Icon: TrendingUp,
    desc: "Multi-entity setup, automated reconciliation and custom P&L dashboards — integrated with QuickBooks legacy data.",
    challenge: "Month-end close took 15 days manually. Legacy QuickBooks data was siloed, no real-time insights, and reconciliation errors were common.",
    solution: "Migrated to Zoho Books with multi-entity structure, automated reconciliation workflows, custom P&L dashboards by project/client. Connected to CRM for real-time revenue recognition.",
    results: [
      "Month-end close reduced from 15 days to 5 days",
      "Reconciliation errors reduced by 92%",
      "Real-time profit margins visible at project level",
      "Tax compliance improved with automated audit trails",
    ],
    timeline: "6 weeks",
    team_size: "6 users (accounting team)",
  },
  {
    id: 6,
    industry: "Hospitality",
    title: "SalesIQ visitor intelligence",
    metric: "+47% qualified leads",
    Icon: Users,
    desc: "Behavioral lead scoring, chat triggers and CRM sync turned anonymous website traffic into a measurable pipeline source.",
    challenge: "80% of website visitors left without engagement. No lead qualification, reactive sales follow-up, and low conversion from web traffic.",
    solution: "Implemented Zoho SalesIQ with behavioral lead scoring, chat triggers for high-intent visitors, and CRM integration for automated handoffs. Built AI chatbot for initial qualification.",
    results: [
      "Qualified leads from website increased by 47%",
      "Chat engagement rate reached 34% of visitors",
      "Average lead response time improved to 90 seconds",
      "Website-sourced conversion rate improved by 23%",
    ],
    timeline: "4 weeks",
    team_size: "3 users (sales + support)",
  },
];

function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<typeof CASES[0] | null>(null);

  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-sky/40 to-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-4 block">Case Studies</span>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-deep tracking-tight mb-6 text-balance">
            Real results. <span className="text-brand-blue">Measured.</span>
          </h1>
          <p className="text-lg text-brand-deep/60">
            Click any case study to see the full implementation details and results.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className="group bg-white border border-brand-blue/10 rounded-3xl p-8 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all text-left cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">{c.industry}</span>
                <div className="size-9 rounded-lg bg-brand-blue/10 grid place-items-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                  <c.Icon size={16} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-brand-deep mb-3 leading-tight">{c.title}</h3>
              <div className="text-3xl font-bold text-brand-blue tracking-tighter mb-4">{c.metric}</div>
              <p className="text-sm text-brand-deep/55 leading-relaxed">{c.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-deep text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-all">
            Discuss your project <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {selectedCase && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-brand-blue/10 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-brand-blue/10 grid place-items-center text-brand-blue">
                  <selectedCase.Icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">{selectedCase.industry}</p>
                  <h2 className="text-2xl font-bold text-brand-deep">{selectedCase.title}</h2>
                </div>
              </div>
              <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-brand-blue/10 rounded-lg transition-all">
                <X size={20} className="text-brand-deep" />
              </button>
            </div>

            <div className="p-8 space-y-10">
              <div className="bg-gradient-to-r from-brand-blue/5 to-transparent p-6 rounded-2xl border border-brand-blue/10">
                <div className="text-5xl font-bold text-brand-blue mb-2">{selectedCase.metric}</div>
                <p className="text-brand-deep/70">Primary success metric</p>
              </div>

              {selectedCase.image && (
                <div className="rounded-2xl overflow-hidden">
                  <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-auto object-cover" />
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-3">The Challenge</h3>
                  <p className="text-lg text-brand-deep/70 leading-relaxed">{selectedCase.challenge}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-3">Our Solution</h3>
                  <p className="text-lg text-brand-deep/70 leading-relaxed">{selectedCase.solution}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-4">Key Results</h3>
                  <div className="space-y-3">
                    {selectedCase.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="size-2 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <p className="text-lg text-brand-deep/70">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-brand-blue/10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-2">Implementation Timeline</p>
                    <p className="text-2xl font-bold text-brand-deep">{selectedCase.timeline}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-2">Team Size</p>
                    <p className="text-2xl font-bold text-brand-deep">{selectedCase.team_size}</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10">
                <p className="text-brand-deep/70 text-center mb-4">Interested in similar results for your organization?</p>
                <Link
                  to="/contact"
                  onClick={() => setSelectedCase(null)}
                  className="block w-full bg-brand-deep text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-blue transition-all text-center"
                >
                  Start Your Implementation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

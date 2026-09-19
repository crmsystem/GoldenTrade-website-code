import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/service-fee")({
  head: () => ({
    meta: [
      { title: "Pricing & Engagement Model | Goldentrade Solutions" },
      { name: "description", content: "Structured 3-stage milestone-based payment schedule for Zoho implementation projects — transparent and aligned with delivery." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/service-fee` }],
  }),
  component: Pricing,
});

const STAGES = [
  { pct: "20%", title: "Initial Deposit", when: "Upon contract signing", desc: "Officially kicks off the project. Covers discovery, blueprinting and resource allocation." },
  { pct: "40%", title: "Milestone Payments", when: "On milestone sign-off", desc: "Due upon completion and client sign-off of pre-defined milestones — configuration, integration, data migration." },
  { pct: "40%", title: "Final Payment", when: "On successful go-live", desc: "Due within 7 days of project completion and successful go-live with all acceptance criteria met." },
];

function Pricing() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-sky/40 to-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-4 block">Pricing & Engagement</span>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-deep tracking-tight mb-6 text-balance">
            A structured payment schedule, <span className="text-brand-blue">tied to milestones.</span>
          </h1>
          <p className="text-lg text-brand-deep/60">
            Transparent, predictable and aligned with the value delivered at every stage.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAGES.map((s, i) => (
            <div key={s.title} className="relative bg-white border border-brand-blue/10 rounded-3xl p-8 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all">
              <div className="absolute -top-4 left-8 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Stage {i + 1}
              </div>
              <div className="text-6xl font-bold text-brand-blue tracking-tighter mt-4 mb-2">{s.pct}</div>
              <h3 className="text-xl font-bold text-brand-deep mb-1">{s.title}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-deep/40 mb-4">{s.when}</p>
              <p className="text-sm text-brand-deep/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-surface-mist rounded-3xl p-8 text-center border border-brand-blue/5">
          <p className="text-sm text-brand-deep/60 mb-4">
            Need ongoing support after go-live? Ask about our flexible retainer packages.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-deep transition-all">
            Discuss Your Requirements →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

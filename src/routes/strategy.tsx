import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ArrowRight } from "lucide-react";
import zohoProductsHexagon from "@/assets/zoho-products-hexagon.jpg";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/strategy")({
  head: () => ({
    meta: [
      { title: "Our 5-Phase Methodology — Zoho Implementation Strategy | Goldentrade" },
      { name: "description", content: "Specialized knowledge and industry best practices to turn the Zoho suite into a tailored business solution — across consulting, implementation, integration, training and support." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/strategy` }],
  }),
  component: Strategy,
});

const PHASES = [
  {
    n: "01",
    title: "Consulting & Strategy",
    sub: "Pre-implementation discovery",
    desc: "We act as your trusted advisor to navigate the 50+ applications in the Zoho ecosystem.",
    items: [
      { t: "Needs Assessment", d: "Comprehensive review of your business processes, current challenges and long-term goals." },
      { t: "Product Selection", d: "Recommend the optimal combination of Zoho apps — CRM, Books, Zoho One — for your requirements and budget." },
      { t: "Solution Blueprinting", d: "Process flowcharts, module maps and a phased implementation roadmap." },
    ],
  },
  {
    n: "02",
    title: "Implementation & Customization",
    sub: "Technical build phase",
    desc: "The hands-on phase where the solution is configured, customized and built to your specs.",
    items: [
      { t: "System Setup", d: "Install and configure apps, user roles, permissions and security settings." },
      { t: "Customization", d: "Tailor modules, fields, layouts, workflows, Blueprints and Wizards to your business logic." },
      { t: "Custom Development", d: "Deluge scripting to build Custom Functions and apps in Creator for unique rules." },
      { t: "Data Migration", d: "Secure transfer of historical data from legacy systems and spreadsheets, with data integrity assured." },
    ],
  },
  {
    n: "03",
    title: "Integration & Connectivity",
    sub: "Seamless tech stack",
    desc: "Ensuring Zoho works seamlessly with your existing technology stack to eliminate data silos.",
    items: [
      { t: "Internal Zoho Integration", d: "Connect CRM, Books, Projects, People and other Zoho apps end-to-end." },
      { t: "Third-Party Integration", d: "APIs and connectors for ERPs, payment gateways, marketing platforms and industry-specific tools." },
    ],
  },
  {
    n: "04",
    title: "Training & Adoption",
    sub: "Maximize ROI through people",
    desc: "Ensuring your team can effectively use the new system to achieve maximum return on investment.",
    items: [
      { t: "User Training", d: "Tailored sessions for sales, finance, marketing and ops teams." },
      { t: "Documentation", d: "Customized user guides and SOPs for ongoing reference." },
      { t: "Change Management", d: "Helping your business adapt to new workflows." },
    ],
  },
  {
    n: "05",
    title: "Post-Launch Support & Optimization",
    sub: "Continuous improvement",
    desc: "Providing continuous support to maintain and grow your system.",
    items: [
      { t: "Help Desk Support", d: "Issues, bugs and queries resolved by senior Zoho experts." },
      { t: "System Maintenance", d: "Routine maintenance, updates and health monitoring." },
      { t: "Optimization & Scaling", d: "Quarterly reviews and recommendations for new features and expansion." },
    ],
  },
];

function Strategy() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-sky/40 to-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-4 block">Our Methodology</span>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-deep tracking-tight mb-6 text-balance">
            A structured approach to <span className="text-brand-blue">Zoho transformation.</span>
          </h1>
          <p className="text-lg text-brand-deep/60 max-w-3xl mx-auto">
            As a Zoho Authorized Partner, we apply specialized knowledge and industry best practices to
            turn a powerful suite of software into a highly effective, tailored business solution.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="relative">
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-brand-blue/15" />
          <div className="space-y-16">
            {PHASES.map((p) => (
              <div key={p.n} className="relative pl-20 md:pl-28">
                <div className="absolute left-0 size-12 md:size-20 rounded-2xl bg-white border border-brand-blue/15 shadow-xl shadow-brand-blue/10 grid place-items-center text-base md:text-xl font-bold text-brand-blue">
                  {p.n}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/70">{p.sub}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-1 mb-3">{p.title}</h2>
                  <p className="text-brand-deep/60 mb-6 italic">{p.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {p.items.map((it) => (
                      <div key={it.t} className="bg-surface-mist rounded-2xl p-5 border border-brand-blue/5">
                        <h4 className="font-bold text-brand-deep text-sm mb-1">{it.t}</h4>
                        <p className="text-sm text-brand-deep/55 leading-relaxed">{it.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-brand-deep rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 text-white relative overflow-hidden grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 size-64 sm:size-96 bg-brand-blue/30 blur-[120px] rounded-full" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-balance">
              Share your <span className="text-brand-blue">pain points.</span>
            </h3>
            <p className="text-white/60 mb-6 md:mb-8 text-sm sm:text-base">
              Free discovery call. We'll listen, audit, and outline a concrete first phase.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-brand-deep px-6 py-3.5 rounded-xl font-bold hover:bg-brand-blue hover:text-white transition-all">
              Book a Consultation <ArrowRight size={16} />
            </Link>
          </div>
          <img
            src={zohoProductsHexagon}
            alt="Zoho product suite — CRM, Books, People, Desk, Projects and Invoice"
            width={1200}
            height={675}
            loading="lazy"
            className="relative w-full h-auto rounded-xl md:rounded-2xl bg-white/5"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

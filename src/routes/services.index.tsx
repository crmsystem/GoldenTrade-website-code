import { createFileRoute, Link } from "@tanstack/react-router";
import { Database, Users, Wallet, Code2, MessageSquare, Briefcase, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import dashCrm from "@/assets/zoho-crm-logo.jpg";
import dashPeople from "@/assets/zoho-people-logo.png";
import dashBooks from "@/assets/zoho-books-logo.jpg";
import dashCreator from "@/assets/zoho-creator-logo.png";
import dashSalesIq from "@/assets/zoho-salesiq-logo.png";
import dashRecruit from "@/assets/zoho-recruit-logo.png";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Zoho Implementation & Consulting | Goldentrade Solutions" },
      { name: "description", content: "Explore our specialized Zoho services: CRM, People, Books, Creator, SalesIQ, Recruit — implemented, customized and integrated end-to-end." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
  component: ServicesIndex,
});

const PRODUCTS = [
  { slug: "zoho-crm", name: "Zoho CRM", tag: "Sales", Icon: Database, image: dashCrm, blurb: "Customer relationship management with blueprint automation and Deluge scripting." },
  { slug: "zoho-people", name: "Zoho People", tag: "HR", Icon: Users, image: dashPeople, blurb: "End-to-end HR — attendance, leave, performance, onboarding and engagement." },
  { slug: "zoho-books", name: "Zoho Books", tag: "Finance", Icon: Wallet, image: dashBooks, blurb: "Compliant accounting, invoicing, expense tracking and bank reconciliation." },
  { slug: "zoho-creator", name: "Zoho Creator", tag: "Low-Code", Icon: Code2, image: dashCreator, blurb: "Build custom applications for unique business workflows in weeks, not months." },
  { slug: "zoho-salesiq", name: "Zoho SalesIQ", tag: "Live Engagement", Icon: MessageSquare, image: dashSalesIq, blurb: "Visitor tracking, live chat and behavioral lead scoring on your website." },
  { slug: "zoho-recruit", name: "Zoho Recruit", tag: "Talent", Icon: Briefcase, image: dashRecruit, blurb: "Applicant tracking, candidate pipelines and full hiring funnel analytics." },
];

function ServicesIndex() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-sky/40 to-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-4 block">Our Services</span>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-deep tracking-tight mb-6 text-balance">
            Specialized Zoho expertise for <span className="text-brand-blue">every department.</span>
          </h1>
          <p className="text-lg text-brand-deep/60 max-w-2xl mx-auto">
            Six core Zoho products. Deep technical implementation. One trusted partner.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to="/services/$slug"
              params={{ slug: p.slug }}
              className="group bg-white border border-brand-blue/10 rounded-3xl p-2 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white">
                <img src={p.image} alt={`${p.name} logo`} width={1400} height={900} loading="lazy" className="w-full h-full object-contain p-10 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-deep">{p.tag}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-9 rounded-lg bg-brand-blue/10 grid place-items-center text-brand-blue">
                    <p.Icon size={18} />
                  </div>
                  <h4 className="text-xl font-bold text-brand-deep">{p.name}</h4>
                </div>
                <p className="text-sm text-brand-deep/55 leading-relaxed flex-1">{p.blurb}</p>
                <span className="mt-5 text-xs font-bold text-brand-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore features <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

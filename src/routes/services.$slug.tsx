import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import dashCrm from "@/assets/zoho-crm-logo.jpg";
import dashPeople from "@/assets/zoho-people-logo.png";
import dashBooks from "@/assets/zoho-books-logo.jpg";
import dashCreator from "@/assets/zoho-creator-logo.png";
import dashSalesIq from "@/assets/zoho-salesiq-logo.png";
import dashRecruit from "@/assets/zoho-recruit-logo.png";
import { SITE_URL } from "@/lib/seo";

type Product = {
  slug: string;
  name: string;
  tag: string;
  hero: string;
  intro: string;
  image: string;
  sections: { title: string; bullets: string[] }[];
};

const PRODUCTS: Record<string, Product> = {
  "zoho-crm": {
    slug: "zoho-crm",
    name: "Zoho CRM",
    tag: "Sales Acceleration",
    hero: "Your customer database — the foremost asset of your organization.",
    intro: "Zoho CRM is a comprehensive platform for managing customer relationships, optimizing sales cycles and driving growth through automation and AI-powered insights.",
    image: dashCrm,
    sections: [
      { title: "Contact & Lead Management", bullets: ["Centralized interaction tracking across email, phone, social", "Automated lead capture, organization and funnel tracking", "Smart lead assignment and nurturing workflows"] },
      { title: "Sales Pipeline Management", bullets: ["Custom sales stages and visual pipeline boards", "Deal and product tracking with revenue forecasting", "Real-time pipeline health metrics"] },
      { title: "Workflow Automation", bullets: ["Blueprint step-by-step process enforcement", "Trigger-based automation for emails and record updates", "Custom Deluge functions for complex logic"] },
      { title: "Advanced Analytics", bullets: ["Custom reports and dashboards", "AI-powered sales forecasting", "Territory and quota management"] },
      { title: "Multichannel Communication", bullets: ["Email, phone, social and chat integration", "Telephony integration with call logging", "Customer portal for self-service access"] },
      { title: "Mobile, Security & Scale", bullets: ["iOS & Android apps with offline access", "Role-based permissions and GDPR compliance", "Custom fields, modules and validation rules"] },
    ],
  },
  "zoho-people": {
    slug: "zoho-people",
    name: "Zoho People",
    tag: "HR & Workforce",
    hero: "The app that handles your people, effectively.",
    intro: "Cloud-based HRMS to manage and automate HR processes — streamlining operations and enhancing engagement, productivity and compliance.",
    image: dashPeople,
    sections: [
      { title: "Database & Document Management", bullets: ["Centralized employee data", "Document management for contracts, IDs and certifications", "Role-based access and audit trails"] },
      { title: "Leave & Attendance", bullets: ["Configurable leave policies", "Biometric, mobile and web attendance", "Shift management and overtime tracking"] },
      { title: "Time & Attendance with Geofencing", bullets: ["Timesheets and automated time capture", "Geo-fenced check-in/out", "Cross-timezone shift scheduling"] },
      { title: "Performance Management", bullets: ["Goal setting and 360° reviews", "Continuous feedback loops", "Self-assessment workflows"] },
      { title: "Self-Service & Onboarding", bullets: ["Self-service portal for info, leave and payslips", "Custom onboarding workflows", "Exit and clearance management"] },
      { title: "Engagement & Integrations", bullets: ["Surveys, polls and recognition programs", "Zoho Payroll, Slack, G Suite, Office 365 integrations", "Mobile app with location tracking"] },
    ],
  },
  "zoho-books": {
    slug: "zoho-books",
    name: "Zoho Books",
    tag: "Finance & Billing",
    hero: "Accounting that scales with your business.",
    intro: "Configurable accounting and finance management with automated invoicing, expense tracking, inventory and bank reconciliation — fully integrated with your Zoho stack.",
    image: dashBooks,
    sections: [
      { title: "Invoicing & Payments", bullets: ["Customizable invoice templates", "Multi-currency and tax-compliant billing", "Online payment gateways and reminders"] },
      { title: "Expense & Banking", bullets: ["Automated expense capture", "Bank feeds and reconciliation", "Vendor and bill management"] },
      { title: "Inventory & Reporting", bullets: ["SKU and stock tracking", "Real-time P&L, balance sheet and cash-flow reports", "Custom financial dashboards"] },
      { title: "Integrations", bullets: ["Zoho CRM, Inventory, Expense", "QuickBooks migration", "Payment gateways and Stripe"] },
    ],
  },
  "zoho-creator": {
    slug: "zoho-creator",
    name: "Zoho Creator",
    tag: "Low-Code Apps",
    hero: "Custom business apps — built for your unique workflows.",
    intro: "Zoho Creator lets us build custom applications tailored to your exact operations. We use Deluge scripting and the visual designer to ship apps in weeks, not months.",
    image: dashCreator,
    sections: [
      { title: "Visual App Builder", bullets: ["Drag-and-drop form and page designer", "Mobile-ready by default", "Custom layouts, views and reports"] },
      { title: "Deluge Scripting", bullets: ["Custom business logic", "RESTful API integrations", "Scheduled workflows and triggers"] },
      { title: "Data & Automation", bullets: ["Relational data models", "Workflow automation and approvals", "Real-time analytics dashboards"] },
      { title: "Integrations", bullets: ["Native Zoho ecosystem integration", "3rd-party REST APIs", "Webhooks and event triggers"] },
    ],
  },
  "zoho-salesiq": {
    slug: "zoho-salesiq",
    name: "Zoho SalesIQ",
    tag: "Visitor Intelligence",
    hero: "Convert anonymous visitors into qualified pipeline.",
    intro: "Real-time visitor tracking, live chat engagement and behavioral lead scoring — directly embedded into your website with full Zoho CRM integration.",
    image: dashSalesIq,
    sections: [
      { title: "Live Chat", bullets: ["Real-time customer engagement", "Smart routing and chat triggers", "AI chatbot automation"] },
      { title: "Visitor Tracking", bullets: ["Anonymous and known visitor profiles", "Behavioral heatmaps", "Geo-location insights"] },
      { title: "Lead Scoring", bullets: ["Behavior-based scoring", "Custom scoring rules", "CRM sync for hot leads"] },
      { title: "Analytics", bullets: ["Conversation reports", "Agent performance metrics", "Conversion funnel insights"] },
    ],
  },
  "zoho-recruit": {
    slug: "zoho-recruit",
    name: "Zoho Recruit",
    tag: "Talent Acquisition",
    hero: "Hire faster. Onboard smarter.",
    intro: "End-to-end applicant tracking system with candidate pipelines, interview scheduling, hiring analytics and seamless Zoho People integration.",
    image: dashRecruit,
    sections: [
      { title: "Applicant Tracking", bullets: ["Custom candidate pipelines", "Resume parsing", "Pre-screening and assessments"] },
      { title: "Interview Management", bullets: ["Interview scheduling with calendar sync", "Feedback collection", "Panel coordination"] },
      { title: "Hiring Analytics", bullets: ["Hiring funnel reports", "Time-to-hire and source-of-hire metrics", "Cost-per-hire tracking"] },
      { title: "Integrations", bullets: ["LinkedIn and job boards", "Background check services (HireRight)", "Zoho People onboarding sync"] },
    ],
  },
};

export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    if (!PRODUCTS[params.slug]) throw notFound();
  },
  head: ({ params }) => {
    const p = PRODUCTS[params.slug];
    if (!p) return { meta: [{ title: "Service Not Found" }] };
    return {
      meta: [
        { title: `${p.name} Implementation & Customization | Goldentrade Solutions` },
        { name: "description", content: p.intro },
        { property: "og:title", content: `${p.name} — Goldentrade Solutions` },
        { property: "og:description", content: p.intro },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/services/${p.slug}` }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="text-4xl font-bold text-brand-deep mb-4">Service not found</h1>
        <Link to="/services" className="text-brand-blue font-bold">Back to services →</Link>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const p = PRODUCTS[slug]!;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-sky/40 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6 ring-1 ring-brand-blue/20">
              {p.tag}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-deep leading-tight tracking-tight mb-6 text-balance">
              {p.name}: <span className="text-brand-blue">{p.hero}</span>
            </h1>
            <p className="text-lg text-brand-deep/60 leading-relaxed mb-8">{p.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="bg-brand-deep text-white px-6 py-3.5 rounded-xl font-bold hover:bg-brand-blue transition-all text-center">
                Discuss your {p.name} project
              </Link>
              <Link to="/contact" className="px-6 py-3.5 rounded-xl font-bold border-2 border-brand-blue/15 text-brand-deep hover:border-brand-blue/40 transition-all text-center">
                Start Free Trial
              </Link>
            </div>
          </div>
          <div className="glass-strong rounded-3xl p-3 shadow-2xl shadow-brand-deep/10">
            <div className="bg-white rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden">
              <img src={p.image} alt={`${p.name} logo`} width={1400} height={900} loading="lazy" className="w-full h-full object-contain p-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature sections */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-3 block">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-deep tracking-tight text-balance">
            What we configure and customize.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {p.sections.map((s) => (
            <div key={s.title} className="bg-surface-mist rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-brand-blue/5 transition-all border border-transparent hover:border-brand-blue/10">
              <h3 className="text-xl font-bold text-brand-deep mb-5">{s.title}</h3>
              <ul className="space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-brand-deep/70">
                    <CheckCircle2 size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="bg-brand-deep rounded-[2rem] p-12 text-white text-center relative overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-96 bg-brand-blue/30 blur-[120px] rounded-full" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Ready to implement {p.name}?
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Free 30-minute discovery call. We'll audit your current setup and design a tailored roadmap.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-brand-deep px-8 py-4 rounded-xl font-bold hover:bg-brand-blue hover:text-white transition-all">
              Book a Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

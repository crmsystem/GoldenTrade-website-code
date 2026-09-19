import { Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import {
  Users, Database, Wallet, Code2, MessageSquare, Briefcase,
  Mail, MapPin, Phone, Sparkles, ArrowRight, ShieldCheck,
  Zap, Workflow, BarChart3, Headphones, GraduationCap, CheckCircle2, Star
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";
import dashCrm from "@/assets/zoho-crm-logo.jpg";
import dashPeople from "@/assets/zoho-people-logo.png";
import dashBooks from "@/assets/zoho-books-logo.jpg";
import dashCreator from "@/assets/zoho-creator-logo.png";
import dashSalesIq from "@/assets/zoho-salesiq-logo.png";
import dashRecruit from "@/assets/zoho-recruit-logo.png";
import implementationBanner from "@/assets/zoho-implementation-banner.png";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ZohoPartnerShowcase } from "@/components/site/ZohoPartnerShowcase";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Goldentrade Solutions — Zoho Authorized Partner & Implementation Experts" },
      { name: "description", content: "Zoho Certified Developers offering end-to-end implementation, customization and integration of Zoho CRM, People, Books, Creator and the full Zoho One suite." },
      { property: "og:title", content: "Goldentrade Solutions — Zoho Authorized Partner" },
      { property: "og:description", content: "End-to-end Zoho consulting, customization and integration for growing enterprises." },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Home,
});

type Product = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  image: string;
};

const PRODUCTS: Product[] = [
  { slug: "zoho-crm", name: "Zoho CRM", tag: "Sales Acceleration", blurb: "Pipeline visualization, Blueprint automation, lead scoring and Deluge custom logic.", Icon: Database, image: dashCrm },
  { slug: "zoho-people", name: "Zoho People", tag: "HR & Workforce", blurb: "Attendance with geofencing, leave automation, performance reviews and onboarding.", Icon: Users, image: dashPeople },
  { slug: "zoho-books", name: "Zoho Books", tag: "Finance & Billing", blurb: "Compliant accounting, automated invoicing, expense tracking and reconciliation.", Icon: Wallet, image: dashBooks },
  { slug: "zoho-creator", name: "Zoho Creator", tag: "Low-Code Apps", blurb: "Custom business applications built with Deluge for unique operational workflows.", Icon: Code2, image: dashCreator },
  { slug: "zoho-salesiq", name: "Zoho SalesIQ", tag: "Visitor Intelligence", blurb: "Live chat engagement, real-time visitor tracking and behavioral lead scoring.", Icon: MessageSquare, image: dashSalesIq },
  { slug: "zoho-recruit", name: "Zoho Recruit", tag: "Talent Acquisition", blurb: "End-to-end ATS, candidate pipelines, interview scheduling and hiring analytics.", Icon: Briefcase, image: dashRecruit },
];

const PHASES = [
  { n: "01", title: "Consulting & Strategy", desc: "We map your processes, audit gaps and design the Zoho blueprint for your business." },
  { n: "02", title: "Implementation & Build", desc: "Configure modules, layouts, workflows and Deluge logic tailored to your operations." },
  { n: "03", title: "Integration & Connect", desc: "Connect Zoho with your existing stack via REST APIs and native connectors." },
  { n: "04", title: "Training & Adoption", desc: "Role-specific training, change management and bespoke documentation." },
  { n: "05", title: "Support & Optimization", desc: "Ongoing health checks, optimization and continuous platform evolution." },
];

const INTEGRATIONS = ["GoDaddy", "HireRight", "Calendly", "A2 Hosting", "QuickBooks", "Mailchimp", "Slack", "Google Workspace", "Microsoft 365", "LinkedIn"];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-surface-light">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1280}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-brand-sky/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6 ring-1 ring-brand-blue/20">
              <Sparkles size={12} /> Zoho Authorized Partner
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-deep leading-[1.05] tracking-tighter mb-6 text-balance">
              Build Better <br />
              Business <span className="text-brand-blue underline decoration-4 underline-offset-8">Logic.</span>
            </h1>
            <p className="text-lg text-brand-deep/60 leading-relaxed max-w-lg mb-10 font-medium">
              As Zoho Certified Developers, we design, customize and implement the full Zoho suite to
              streamline enterprise operations with precision, automation and measurable ROI.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/contact"
                className="bg-brand-deep text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-brand-deep/20 hover:bg-brand-blue transition-all text-center"
              >
                Start Project Roadmap
              </Link>
              <Link
                to="/strategy"
                className="px-8 py-4 rounded-xl font-bold border-2 border-brand-blue/15 hover:border-brand-blue/40 transition-all text-center text-brand-deep"
              >
                View Our Strategy
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-xs text-brand-deep/50 font-medium">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>10+ implementations</span>
              </div>
              <div className="h-4 w-px bg-brand-blue/20" />
              <span>10+ years Zoho expertise</span>
            </div>
          </div>

          {/* Zoho Partner Showcase */}
          <ZohoPartnerShowcase />
        </div>
      </section>

      {/* INTEGRATIONS STRIP */}
      <div className="border-y border-brand-blue/5 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-deep/30 mb-8 text-center">
            Integrated with the tools you already use
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {INTEGRATIONS.map((name) => (
              <span
                key={name}
                className="text-lg font-bold text-brand-deep/40 hover:text-brand-deep transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="py-20 bg-surface-mist">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: "10+", l: "Implementations Delivered" },
            { v: "10+", l: "Years Zoho Expertise" },
            { v: "50+", l: "Zoho Apps Mastered" },
            { v: "98%", l: "Client Retention Rate" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-blue tracking-tighter">{s.v}</div>
              <div className="text-xs uppercase tracking-widest text-brand-deep/50 mt-2 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS BENTO */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-3 block">Product Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep tracking-tight mb-4 text-balance">
              One partner. <span className="text-brand-blue">Every Zoho app.</span>
            </h2>
            <p className="text-brand-deep/50 max-w-md">
              Deeply integrated solutions tailored to your sales, finance, HR and operations stack.
            </p>
          </div>
          <Link
            to="/services"
            className="text-brand-blue font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
          >
            Explore all solutions <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to="/services/$slug"
              params={{ slug: p.slug }}
              className="group bg-white border border-brand-blue/10 rounded-3xl p-2 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white">
                <img
                  src={p.image}
                  alt={`${p.name} logo`}
                  width={1400}
                  height={900}
                  loading="lazy"
                  className="w-full h-full object-contain p-10 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-deep">
                  {p.tag}
                </div>
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

      {/* STRATEGY */}
      <section className="bg-brand-deep py-24 text-white overflow-hidden relative">
        <div className="absolute -top-32 -left-32 size-96 bg-brand-blue/30 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-0 size-96 bg-brand-blue/20 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-3 block">Our Methodology</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-balance">
              5-Phase Implementation <span className="text-brand-blue">Mastery.</span>
            </h2>
            <div className="space-y-5">
              {PHASES.map((p) => (
                <div key={p.n} className="flex gap-4 group">
                  <div className="size-10 shrink-0 rounded-full border border-white/15 grid place-items-center text-xs font-bold group-hover:bg-brand-blue group-hover:border-brand-blue transition-all">
                    {p.n}
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{p.title}</h5>
                    <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/strategy"
              className="mt-10 inline-flex items-center gap-2 bg-white text-brand-deep px-6 py-3 rounded-xl font-bold hover:bg-brand-blue hover:text-white transition-all"
            >
              Full methodology <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative">
            <ZohoPartnerShowcase
              src={implementationBanner}
              alt="Goldentrade Solutions — 8+ Years Zoho Partner, trusted certified results-driven Zoho One implementation across CRM, Books, Inventory, Analytics, People and more"
              width={1672}
              height={941}
            />
            <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-5 ring-1 ring-white/30 shadow-xl hidden md:block animate-float-slow">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-blue" size={28} />
                <div>
                  <div className="text-brand-deep font-bold text-sm">Certified Partner</div>
                  <div className="text-brand-deep/50 text-xs">Authorized since 2018</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-3 block">Why Goldentrade</span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-deep tracking-tight text-balance">
            Senior expertise. <span className="text-brand-blue">Zero hand-offs.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Icon: Zap, t: "Speed to value", d: "Average go-live in under 60 days with our pre-built blueprints and rapid configuration." },
            { Icon: Workflow, t: "Custom Deluge logic", d: "We code the unique business rules off-the-shelf solutions can't accommodate." },
            { Icon: BarChart3, t: "Data-driven ROI", d: "Every project ties to measurable KPIs you can defend to your CFO." },
            { Icon: Headphones, t: "Lifetime support", d: "Help desk, health monitoring and optimization long after go-live." },
            { Icon: GraduationCap, t: "Team enablement", d: "Role-based training and custom documentation drives 100% adoption." },
            { Icon: ShieldCheck, t: "GDPR-grade security", d: "Role permissions, audit trails and compliance built into every implementation." },
          ].map((w) => (
            <div key={w.t} className="bg-surface-mist rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:shadow-brand-blue/5 transition-all border border-transparent hover:border-brand-blue/10">
              <div className="size-12 rounded-xl bg-brand-blue/10 grid place-items-center text-brand-blue mb-5">
                <w.Icon size={22} />
              </div>
              <h4 className="font-bold text-brand-deep mb-2">{w.t}</h4>
              <p className="text-sm text-brand-deep/55 leading-relaxed">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 bg-brand-sky/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[0,1,2,3,4].map((i) => <Star key={i} className="fill-amber-400 text-amber-400" size={20} />)}
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-brand-deep leading-snug text-balance">
            "Goldentrade rebuilt our entire sales pipeline in Zoho CRM with custom Deluge functions
            we didn't think were possible. Lead conversion is up <span className="text-brand-blue font-bold">34%</span> in six months."
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="size-12 rounded-full bg-brand-deep grid place-items-center text-white font-bold">RD</div>
            <div className="text-left">
              <div className="font-bold text-brand-deep">Rachel D.</div>
              <div className="text-xs text-brand-deep/50">VP Revenue, Enterprise SaaS</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-brand-deep rounded-[2rem] p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 size-96 bg-brand-blue/30 blur-[120px] rounded-full" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-balance">
                Ready to architect your <span className="text-brand-blue">Zoho ecosystem?</span>
              </h3>
              <p className="text-white/60 mb-8">
                Book a free 30-minute discovery call. We'll audit your current setup and outline a
                concrete roadmap — no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="bg-white text-brand-deep px-6 py-3.5 rounded-xl font-bold hover:bg-brand-blue hover:text-white transition-all text-center">
                  Book Discovery Call
                </Link>
                <Link to="/contact" className="px-6 py-3.5 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-all text-center">
                  Start Free Zoho Trial
                </Link>
                <Link to="/contact" className="px-6 py-3.5 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-all text-center">
                  CRM Discovery and Requirement Form
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { Icon: CheckCircle2, t: "No upfront commitment" },
                { Icon: CheckCircle2, t: "Free 30-min audit" },
                { Icon: CheckCircle2, t: "Roadmap & milestone plan included" },
                { Icon: CheckCircle2, t: "Response within 1 business day" },
              ].map((i) => (
                <div key={i.t} className="flex items-center gap-3 text-white/80">
                  <i.Icon size={20} className="text-brand-blue shrink-0" />
                  <span>{i.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 bg-surface-mist">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-3 block">Our Location</span>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-deep mb-6 tracking-tight text-balance">
              Headquartered in <span className="text-brand-blue">Parañaque</span>, serving globally.
            </h3>
            <div className="space-y-4 text-brand-deep/70">
              <div className="flex gap-3">
                <MapPin className="text-brand-blue shrink-0" size={20} />
                <a href="https://share.google/fvQysFuDGf30D3cGI" target="_blank" rel="noreferrer" className="hover:text-brand-blue">
                  B5L4, Sta. Monica St., Gatchalian Phase2C Subdivision, San Dionisio, Parañaque City, 1700, Metro Manila, Philippines
                </a>
              </div>
              <div className="flex gap-3"><Mail className="text-brand-blue shrink-0" size={20} /><a href="mailto:developer@goldentrade.solutions">developer@goldentrade.solutions</a></div>
              <div className="flex gap-3"><Phone className="text-brand-blue shrink-0" size={20} /><a href="tel:+639171408241">+63 917 140 8241</a></div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-deep/10 border border-brand-blue/10 aspect-video bg-white">
            <iframe
              title="Goldentrade Solutions location"
              src="https://www.google.com/maps?q=B5L4%20Sta.%20Monica%20St%2C%20Gatchalian%20Phase%202C%20Subdivision%2C%20San%20Dionisio%2C%20Paranaque%20City%2C%201700%20Metro%20Manila%2C%20Philippines&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import teamImg from "@/assets/team.jpg";
import jobEcoImg from "@/assets/job-eco-profile.jpg";
import { ShieldCheck, Award, Target, Heart, Linkedin } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Goldentrade Solutions — Zoho Authorized Partner" },
      { name: "description", content: "Zoho Certified Developers based in the Philippines, helping enterprises and scale-ups worldwide unlock the full power of the Zoho ecosystem." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-sky/40 to-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-4 block">About Us</span>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-deep tracking-tight mb-6 text-balance">
            Senior Zoho experts. <span className="text-brand-blue">Built for trust.</span>
          </h1>
          <p className="text-lg text-brand-deep/60">
            We're a Zoho Authorized Partner based in Parañaque, Philippines — serving enterprises and
            scale-ups worldwide with deep technical expertise across the full Zoho ecosystem.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="glass-strong rounded-3xl p-3 shadow-2xl">
          <img src={teamImg} alt="Goldentrade team collaborating" width={1600} height={1000} loading="lazy" className="w-full rounded-2xl" />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-6 tracking-tight">
            We turn Zoho into a <span className="text-brand-blue">business engine.</span>
          </h2>
          <p className="text-brand-deep/60 mb-4 leading-relaxed">
            As Zoho Certified Developers, we develop, customize and implement the entire Zoho suite —
            from CRM workflows and Creator apps to Books configuration and Deluge-driven custom functions
            connected through RESTful APIs.
          </p>
          <p className="text-brand-deep/60 mb-4 leading-relaxed">
            We manage the entire project lifecycle from requirements gathering through roadmap execution,
            staying adaptable and proficient in the latest features within the Zoho ecosystem.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { Icon: Award, t: "Zoho Certified", d: "Authorized Partner since 2018" },
            { Icon: Target, t: "Outcome-Driven", d: "Every project tied to measurable KPIs" },
            { Icon: ShieldCheck, t: "Enterprise-Grade", d: "GDPR-compliant, audit-ready builds" },
            { Icon: Heart, t: "Lifetime Support", d: "Long-term partnership, not transactions" },
          ].map((v) => (
            <div key={v.t} className="bg-surface-mist rounded-2xl p-6 text-center">
              <div className="size-12 mx-auto rounded-xl bg-brand-blue/10 grid place-items-center text-brand-blue mb-4">
                <v.Icon size={20} />
              </div>
              <h4 className="font-bold text-brand-deep mb-1">{v.t}</h4>
              <p className="text-sm text-brand-deep/55">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4 text-balance">
            Meet our <span className="text-brand-blue">Leadership</span>
          </h2>
          <p className="text-lg text-brand-deep/60">Certified Zoho experts dedicated to your success.</p>
        </div>
        <div className="grid md:grid-cols-1 max-w-2xl mx-auto gap-8">
          <div className="bg-white border border-brand-blue/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-blue/10 transition-all">
            <div className="relative pt-8 flex justify-center bg-surface-mist">
              <img src={jobEcoImg} alt="Job Eco" width={220} height={220} loading="lazy" className="w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover shadow-lg ring-4 ring-white" />
            </div>
            <div className="p-8">
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-brand-deep">Job Eco</h3>
                <p className="text-sm text-brand-blue font-semibold mb-1">CEO & Founder</p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-blue mb-4">He/Him • Certified Zoho Authorized Partner</p>
              </div>
              <p className="text-brand-deep/70 mb-6 leading-relaxed">
                Visionary leader and Zoho Certified Developer with a passion for transforming businesses through intelligent automation and strategic implementation.
                Job brings 8+ years of Zoho expertise to every project, leading the charge in enterprise-grade solutions.
              </p>
              <a
                href="https://www.linkedin.com/in/zohocrmdeveloper/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-5 py-3 rounded-lg font-semibold hover:bg-brand-blue hover:text-white transition-all"
              >
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-brand-deep mb-6 text-balance">
          Let's build something <span className="text-brand-blue">that scales.</span>
        </h3>
        <Link to="/contact" className="inline-flex bg-brand-deep text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-all">
          Get in Touch
        </Link>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CheckCircle2 } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/free-trial")({
  head: () => ({
    meta: [
      { title: "Start Your Free Zoho Trial | Goldentrade Solutions" },
      { name: "description", content: "Get hands-on with Zoho CRM, Books, People and the full Zoho One suite — no payment information required. Risk-free 30-day trial." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/free-trial` }],
  }),
  component: FreeTrial,
});

const BENEFITS = [
  { t: "Hands-on Exploration", d: "Try the core features and interface without any financial commitment." },
  { t: "Feature Testing", d: "Test automation, integrations and customizations specific to your workflow." },
  { t: "Decision Making", d: "Determine workflow and objective fit before you commit to a paid plan." },
  { t: "No Payment Required", d: "No payment information upfront — completely risk-free evaluation." },
];

function FreeTrial() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-sky/40 to-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-4 block">Free Zoho Trial</span>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-deep tracking-tight mb-6 text-balance">
            Hands-on with Zoho. <span className="text-brand-blue">Zero commitment.</span>
          </h1>
          <p className="text-lg text-brand-deep/60 mb-10">
            Experience the full Zoho One suite — CRM, Books, People and 40+ apps — before you decide
            to invest. We'll help you set up the trial and explore the features that matter most to your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="https://www.zoho.com/one/signup.html"
              target="_blank"
              rel="noreferrer"
              className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-deep transition-all shadow-lg shadow-brand-blue/20"
            >
              Get Free Zoho Account
            </a>
            <Link to="/contact" className="px-8 py-4 rounded-xl font-bold border-2 border-brand-blue/15 text-brand-deep hover:border-brand-blue/40 transition-all">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BENEFITS.map((b, i) => (
            <div key={b.t} className="bg-white border border-brand-blue/10 rounded-3xl p-8 hover:shadow-xl hover:shadow-brand-blue/5 transition-all">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl bg-brand-blue/10 grid place-items-center text-brand-blue font-bold shrink-0">{i + 1}</div>
                <div>
                  <h3 className="text-lg font-bold text-brand-deep mb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-blue" /> {b.t}
                  </h3>
                  <p className="text-sm text-brand-deep/60 leading-relaxed">{b.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-brand-deep/50 italic">
          The free trial serves as a valuable tool to assess Zoho's suitability for your business — and our
          team is here to guide you through every step.
        </div>
      </section>
    </SiteLayout>
  );
}

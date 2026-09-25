import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { SITE_URL } from "@/lib/seo";
import { trackMetaEvent } from "@/lib/metaPixel";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Goldentrade Solutions — Free Zoho Consultation" },
      { name: "description", content: "Book a free 30-minute discovery call with a Zoho expert. Email, phone or visit our Parañaque, Philippines office." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

const FREE_TRIAL_URL =
  "https://store.zoho.com/ResellerCustomerSignUp.do?id=a5b0039685c08d09095b0bb5d56bdc15a9156d449bbbc224fc99425f50e920ed";
const CRM_DISCOVERY_FORM_URL =
  "https://forms.zohopublic.com/goldenapps/form/goldentrade/formperma/Zga2S3t8sO9w7dOL0Lpi2oiET_TQAQvMagpqaz1t3Xo";

const TABS = [
  { key: "message", label: "Send a Message" },
  { key: "trial", label: "Start Free Trial" },
  { key: "discovery", label: "CRM Discovery and Requirement Form" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("message");

  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-sky/40 to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue mb-4 block">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-deep tracking-tight mb-4 md:mb-6 text-balance">
            Let's discuss your <span className="text-brand-blue">Zoho project.</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-deep/60">
            Free 30-minute discovery call. We'll audit your current setup and outline a concrete roadmap.
          </p>
        </div>
      </section>

      <section className="pt-10 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all text-center leading-snug ${
                activeTab === t.key
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                  : "bg-white text-brand-deep border-2 border-brand-blue/25 hover:border-brand-blue/60 hover:bg-brand-blue/5 shadow-sm"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {activeTab !== "message" && (
        <section className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-brand-deep/10 flex flex-col">
            {activeTab === "discovery" && (
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 text-brand-deep">CRM Discovery and Requirement Form</h3>
                <p className="text-sm text-brand-deep/50 mb-4 md:mb-6">
                  Tell us about your CRM needs — filled out right here, without leaving this page.
                </p>
                <iframe
                  title="CRM Discovery and Requirement Form"
                  src={CRM_DISCOVERY_FORM_URL}
                  className="w-full rounded-xl sm:rounded-2xl border border-brand-blue/10 bg-white"
                  style={{ height: "min(1100px, 85vh)" }}
                />
              </div>
            )}

            {activeTab === "trial" && (
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 text-brand-deep">Start Your Free Zoho Trial</h3>
                <p className="text-sm text-brand-deep/50 mb-4 md:mb-6">
                  Sign up for the free trial right here, without leaving this page.
                </p>
                <iframe
                  title="Start Your Free Zoho Trial"
                  src={FREE_TRIAL_URL}
                  className="w-full rounded-xl sm:rounded-2xl border border-brand-blue/10 bg-white"
                  style={{ height: "min(1100px, 85vh)" }}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === "message" && (
      <section className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-6 md:gap-10">
        <div className="md:col-span-2 space-y-4 md:space-y-6">
          <div className="bg-surface-mist rounded-2xl p-5 sm:p-6 border border-brand-blue/5">
            <div className="size-10 rounded-lg bg-brand-blue/10 grid place-items-center text-brand-blue mb-4"><Mail size={18} /></div>
            <h4 className="font-bold text-brand-deep mb-1">Email</h4>
            <a href="mailto:developer@goldentrade.solutions" className="text-sm text-brand-deep/70 hover:text-brand-blue break-all">developer@goldentrade.solutions</a>
          </div>
          <div className="bg-surface-mist rounded-2xl p-5 sm:p-6 border border-brand-blue/5">
            <div className="size-10 rounded-lg bg-brand-blue/10 grid place-items-center text-brand-blue mb-4"><Phone size={18} /></div>
            <h4 className="font-bold text-brand-deep mb-1">Phone</h4>
            <a href="tel:+639171408241" className="text-sm text-brand-deep/70 hover:text-brand-blue">+63 917 140 8241</a>
          </div>
          <div className="bg-surface-mist rounded-2xl p-5 sm:p-6 border border-brand-blue/5">
            <div className="size-10 rounded-lg bg-brand-blue/10 grid place-items-center text-brand-blue mb-4"><MapPin size={18} /></div>
            <h4 className="font-bold text-brand-deep mb-1">Office</h4>
            <a
              href="https://share.google/fvQysFuDGf30D3cGI"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-brand-deep/70 hover:text-brand-blue"
            >
              B5L4, Sta. Monica St., Gatchalian Phase2C Subdivision, San Dionisio, Parañaque City, 1700, Metro Manila, Philippines
            </a>
          </div>
        </div>

        <div className="md:col-span-3 glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl shadow-brand-deep/10 min-h-[640px] flex flex-col">
          {(submitted ? (
            <div className="text-center py-10">
              <div className="size-16 mx-auto rounded-full bg-emerald-100 grid place-items-center text-emerald-600 mb-4">
                <Send size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-deep mb-2">Message received</h3>
              <p className="text-brand-deep/60">We'll get back to you within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); trackMetaEvent("Lead", { content_name: "Contact Form" }); setSubmitted(true); }} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-brand-deep/40 tracking-wider">First Name</label>
                  <input required type="text" className="w-full bg-white/70 border border-brand-blue/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-brand-deep/40 tracking-wider">Last Name</label>
                  <input required type="text" className="w-full bg-white/70 border border-brand-blue/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-brand-deep/40 tracking-wider">Business Email</label>
                <input required type="email" className="w-full bg-white/70 border border-brand-blue/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-brand-deep/40 tracking-wider">Mobile</label>
                <input type="tel" className="w-full bg-white/70 border border-brand-blue/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20" placeholder="+63 ..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-brand-deep/40 tracking-wider">Which Zoho Products?</label>
                <select className="w-full bg-white/70 border border-brand-blue/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20">
                  <option>Zoho One (full suite)</option>
                  <option>Zoho CRM</option>
                  <option>Zoho People</option>
                  <option>Zoho Books</option>
                  <option>Zoho Creator</option>
                  <option>Zoho SalesIQ</option>
                  <option>Zoho Recruit</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-brand-deep/40 tracking-wider">Project Details</label>
                <textarea rows={4} className="w-full bg-white/70 border border-brand-blue/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20" placeholder="Tell us about your current setup and goals..." />
              </div>
              <button className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold hover:bg-brand-deep transition-all shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2">
                Send Message <Send size={16} />
              </button>
              <p className="text-[10px] text-center text-brand-deep/40">Response within 1 business day. Your information stays confidential.</p>
            </form>
          ))}
        </div>
      </section>
      )}

      <section className="pb-20 max-w-7xl mx-auto px-6">
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-deep/10 border border-brand-blue/10 aspect-[21/9] bg-white">
          <iframe
            title="Goldentrade Solutions location"
            src="https://www.google.com/maps?q=B5L4%20Sta.%20Monica%20St%2C%20Gatchalian%20Phase%202C%20Subdivision%2C%20San%20Dionisio%2C%20Paranaque%20City%2C%201700%20Metro%20Manila%2C%20Philippines&output=embed"
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

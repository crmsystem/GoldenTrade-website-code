import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 size-96 bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 bg-brand-blue rounded-xl grid place-items-center text-white font-bold">
                GS
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">
                GoldenTrade <span className="text-brand-blue">Solutions</span>
              </span>
            </div>
            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
              Zoho Authorized Partner. We architect, implement, and optimize the Zoho ecosystem for
              enterprises and scale-ups worldwide.
            </p>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-brand-blue" />
                <a href="mailto:developer@goldentrade.solutions" className="hover:text-white">
                  developer@goldentrade.solutions
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-brand-blue" />
                <a href="tel:+639171408241" className="hover:text-white">
                  +63 917 140 8241
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-brand-blue shrink-0" />
                <a
                  href="https://share.google/fvQysFuDGf30D3cGI"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  B5L4, Sta. Monica St., Gatchalian Phase2C Subdivision, San Dionisio, Parañaque City, 1700, Metro Manila, Philippines
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:contents">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                Solutions
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services/zoho-crm" className="text-white/70 hover:text-white">Zoho CRM</Link></li>
                <li><Link to="/services/zoho-people" className="text-white/70 hover:text-white">Zoho People</Link></li>
                <li><Link to="/services/zoho-books" className="text-white/70 hover:text-white">Zoho Books</Link></li>
                <li><Link to="/services/zoho-creator" className="text-white/70 hover:text-white">Zoho Creator</Link></li>
                <li><Link to="/services/zoho-salesiq" className="text-white/70 hover:text-white">Zoho SalesIQ</Link></li>
                <li><Link to="/services/zoho-recruit" className="text-white/70 hover:text-white">Zoho Recruit</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                Company
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link to="/strategy" className="text-white/70 hover:text-white">Our Strategy</Link></li>
                <li><Link to="/case-studies" className="text-white/70 hover:text-white">Case Studies</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-white">Free Trial</Link></li>
                <li><Link to="/about" className="text-white/70 hover:text-white">About</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 Goldentrade Solutions. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <a href="https://www.linkedin.com/company/goldentradesolutions" target="_blank" rel="noreferrer" className="hover:text-brand-blue">LinkedIn</a>
            <a href="https://www.facebook.com/zohocrmmanager" target="_blank" rel="noreferrer" className="hover:text-brand-blue">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

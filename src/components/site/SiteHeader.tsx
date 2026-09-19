import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/strategy", label: "Strategy" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-brand-blue/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="GoldenTrade Solutions logo"
            className="h-[3.75rem] sm:h-[4.5rem] w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-center gap-7 font-medium text-sm text-brand-deep/70">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-brand-blue transition-colors whitespace-nowrap"
              activeProps={{ className: "text-brand-blue" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="/Goldentrade%20Website%20signuppage.html"
            className="inline-flex bg-brand-deep text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-deep/20 hover:bg-brand-blue hover:-translate-y-0.5 transition-all"
          >
            Sign Up
          </a>
          <Link
            to="/contact"
            className="inline-flex bg-brand-blue text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-blue/20 hover:bg-brand-deep hover:-translate-y-0.5 transition-all"
          >
            Contact Us
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-brand-deep"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-brand-blue/10 bg-white/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-brand-deep/80 hover:text-brand-blue border-b border-brand-blue/5"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/Goldentrade%20Website%20signuppage.html"
              onClick={() => setOpen(false)}
              className="mt-4 bg-brand-deep text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-center"
            >
              Sign Up
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 bg-brand-blue text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

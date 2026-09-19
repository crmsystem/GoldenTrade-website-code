export function TopUtilityBar() {
  return (
    <div className="bg-brand-deep py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] font-medium tracking-wider text-white/80 uppercase">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <a href="mailto:developer@goldentrade.solutions" className="hover:text-white transition-colors">
            E: developer@goldentrade.solutions
          </a>
          <a href="tel:+639171408241" className="hover:text-white transition-colors">
            P: +63 917 140 8241
          </a>
        </div>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/company/goldentradesolutions"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/zohocrmmanager"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}



const companyLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "How It Works", href: "#solution" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "X(Twitter)", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
];


const GiggoFooter = () => {
  return (
    <footer className="bg-[hsl(0,0%,97%)] border-t border-black/5 py-12 md:py-16">
      <div className="mx-auto px-6 max-w-[1200px]">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(155,60%,38%)] to-[hsl(155,60%,30%)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-[hsl(0,0%,10%)]">GIGGO</span>
            </div>
            <p className="text-sm text-[hsl(0,0%,50%)] mb-6 max-w-[300px] leading-relaxed">
              Build UGC Faster, Without Friction.
            </p>
            {/* App store badges */}
            <div className="flex items-center gap-3">
              <div className="bg-black text-white text-[10px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </div>
              <div className="bg-black text-white text-[10px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                Google Play
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-[hsl(0,0%,10%)] text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[hsl(0,0%,50%)] hover:text-[hsl(155,60%,38%)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold text-[hsl(0,0%,10%)] text-sm mb-4">Socials</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[hsl(0,0%,50%)] hover:text-[hsl(155,60%,38%)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black/5 pt-8 text-center">
          <p className="text-xs text-[hsl(0,0%,60%)]">
            Copyright © {new Date().getFullYear()} GIGGO. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GiggoFooter;

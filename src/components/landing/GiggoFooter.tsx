import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";

const columns = [
  {
    title: "Agency Partners",
    links: [
      { label: "Partnership Program", href: "#" },
      { label: "Case Studies", href: "#" },
    ],
  },
  {
    title: "API Documentation",
    links: [
      { label: "Developer Docs", href: "#" },
      { label: "API Reference", href: "#" },
    ],
  },
  {
    title: "Brand Guidelines",
    links: [
      { label: "Media Kit", href: "#" },
      { label: "Brand Assets", href: "#" },
    ],
  },
];

const socialIcons = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

const GiggoFooter = () => {
  return (
    <footer className="bg-landing-surface/50 border-t border-white/10 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Links */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white text-base mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-landing-body hover:text-landing-accent transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 mb-8">
          {socialIcons.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-landing-body hover:text-landing-accent hover:bg-landing-accent/10 transition-all"
            >
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/10 pt-8">
          <p className="text-sm text-landing-body-muted">
            Copyright © {new Date().getFullYear()} GIGGO. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GiggoFooter;

import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const footerColumns = [
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
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
];

const GiggoFooter = () => {
  return (
    <footer
      className="py-16 border-t border-white/10"
      style={{ background: "rgba(26, 35, 50, 0.5)" }}
    >
      <div className="mx-auto px-6 max-w-[1280px]">
        {/* Footer grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-base font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#94A3B8] hover:text-[#00D9FF] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-6 mb-8">
          {socialIcons.map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-[#00D9FF] transition-colors duration-300"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-[#94A3B8]">
          Copyright © {new Date().getFullYear()} GIGGO. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default GiggoFooter;

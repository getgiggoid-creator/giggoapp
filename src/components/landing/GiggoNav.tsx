import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Solusi", href: "#solusi" },
  { label: "Studi Kasus", href: "#studi-kasus" },
  { label: "Harga", href: "#harga" },
  { label: "FAQ", href: "#faq" },
];

const GiggoNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map((l) => l.href.replace("#", "")).filter(Boolean);
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0A1628]/80 backdrop-blur-[10px] border-b border-white/10"
          : "bg-transparent"
      )}
      style={{ height: 72 }}
    >
      <div className="mx-auto px-6 max-w-[1280px] h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00D9FF] flex items-center justify-center">
              <span className="text-[#0A1628] font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-white">GIGGO</span>
          </Link>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-300",
                    isActive ? "text-white" : "text-[#94A3B8] hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 w-full h-0.5 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      background: "linear-gradient(90deg, transparent, #00D9FF, transparent)",
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/auth?mode=login"
              className="text-sm font-semibold text-[#00D9FF] border border-[#00D9FF] rounded-lg px-5 py-2.5 hover:bg-[#00D9FF]/10 transition-all duration-300"
            >
              Masuk
            </Link>
            <Link
              to="/auth?mode=register"
              className="text-sm font-semibold text-[#0A1628] bg-[#00D9FF] rounded-lg px-5 py-2.5 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all duration-300"
            >
              Buat Campaign Kreator
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-[#0A1628]/95 backdrop-blur-[10px] z-40 animate-in slide-in-from-top duration-300">
          <div className="flex justify-end p-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-6 pt-8 px-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-lg font-semibold text-white hover:text-[#00D9FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-4 w-full mt-8">
              <Link
                to="/auth?mode=login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-sm font-semibold text-[#00D9FF] border border-[#00D9FF] rounded-lg px-5 py-3 hover:bg-[#00D9FF]/10 transition-all"
              >
                Masuk
              </Link>
              <Link
                to="/auth?mode=register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-sm font-semibold text-[#0A1628] bg-[#00D9FF] rounded-lg px-5 py-3 transition-all"
              >
                Buat Campaign Kreator
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GiggoNav;

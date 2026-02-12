import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Solusi", href: "#solution" },
  { label: "Studi Kasus", href: "#proof" },
  { label: "Harga", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const GiggoNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-landing-bg/80 backdrop-blur-xl border-b border-white/10 py-2"
          : "bg-transparent py-3"
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-landing-accent">GIGGO</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-medium text-landing-body hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              asChild
              className="text-sm font-medium border-landing-accent text-landing-accent hover:bg-landing-accent/10 bg-transparent rounded-lg h-10 px-6"
            >
              <Link to="/auth?mode=login">Masuk</Link>
            </Button>
            <Button
              asChild
              className="rounded-lg bg-landing-accent hover:bg-landing-accent-hover text-landing-bg font-bold px-6 h-10"
            >
              <Link to="/auth?mode=register">Buat Campaign Kreator</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-landing-bg/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="px-4 py-3 text-base font-medium text-landing-body hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Button variant="outline" asChild className="w-full h-12 rounded-xl border-landing-accent text-landing-accent bg-transparent">
              <Link to="/auth?mode=login" onClick={() => setIsMobileMenuOpen(false)}>Masuk</Link>
            </Button>
            <Button asChild className="w-full h-12 rounded-xl bg-landing-accent hover:bg-landing-accent-hover text-landing-bg font-bold">
              <Link to="/auth?mode=register" onClick={() => setIsMobileMenuOpen(false)}>Buat Campaign Kreator</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GiggoNav;

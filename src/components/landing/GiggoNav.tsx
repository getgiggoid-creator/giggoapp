import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Harga", href: "#pricing" },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Portfolio", href: "#portfolio" },
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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E0E0E0] py-2"
          : "bg-white/80 backdrop-blur-sm py-3"
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6B00] to-[#FFA726] bg-clip-text text-transparent">
              Giggo
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild className="text-sm font-medium text-[#666666] hover:text-[#1A1A1A]">
              <Link to="/auth?mode=login">Masuk</Link>
            </Button>
            <Button
              asChild
              className="rounded-lg bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-bold px-5 h-10 shadow-lg shadow-[#FF6B00]/20"
            >
              <Link to="/auth?mode=register" className="flex items-center gap-1">
                Daftar Gratis <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#1A1A1A] p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E0E0E0] p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="px-4 py-3 text-base font-medium text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-[#E0E0E0] flex flex-col gap-3">
            <Button variant="outline" asChild className="w-full h-12 rounded-xl">
              <Link to="/auth?mode=login" onClick={() => setIsMobileMenuOpen(false)}>
                Masuk
              </Link>
            </Button>
            <Button
              asChild
              className="w-full h-12 rounded-xl bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-bold"
            >
              <Link to="/auth?mode=register" onClick={() => setIsMobileMenuOpen(false)}>
                Daftar Gratis
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GiggoNav;

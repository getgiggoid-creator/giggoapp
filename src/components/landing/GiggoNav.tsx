import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#solution" },
  { label: "Book A Call", href: "#pricing" },
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
          ? "bg-white/90 backdrop-blur-xl border-b border-black/5 py-1"
          : "bg-transparent py-2"
      )}
    >
      <div className="mx-auto px-6 max-w-[1200px]">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(155,60%,38%)] to-[hsl(155,60%,30%)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-[hsl(0,0%,10%)]">GIGGO</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-medium text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,10%)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <span className="text-sm font-medium text-[hsl(0,0%,40%)]">Are You A Brand?</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              asChild
              className="text-sm font-medium text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,10%)] h-10 px-4"
            >
              <Link to="/auth?mode=login">Login</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[hsl(155,60%,38%)] to-[hsl(155,60%,30%)] hover:from-[hsl(155,60%,32%)] hover:to-[hsl(155,60%,25%)] text-white font-semibold px-6 h-10 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <Link to="/auth?mode=register">Signup</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[hsl(0,0%,10%)] p-2 hover:bg-black/5 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/5 p-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="px-4 py-3 text-base font-medium text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,10%)] rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-black/5 flex flex-col gap-3">
            <Button variant="ghost" asChild className="w-full h-12 rounded-full">
              <Link to="/auth?mode=login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            </Button>
            <Button asChild className="w-full h-12 rounded-full bg-gradient-to-r from-[hsl(155,60%,38%)] to-[hsl(155,60%,30%)] text-white font-semibold">
              <Link to="/auth?mode=register" onClick={() => setIsMobileMenuOpen(false)}>Signup</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GiggoNav;

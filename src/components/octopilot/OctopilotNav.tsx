import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Fitur", href: "#fitur" },
  { label: "Harga", href: "#harga" },
  { label: "Free Tools", href: "#tools" },
];

const OctopilotNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#000000]/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        )}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/octopilot" className="flex items-center gap-2">
              <span className="text-2xl">🐙</span>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Octopilot
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/auth?mode=login"
                className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors px-4 py-2"
              >
                Masuk
              </Link>
              <Link
                to="/auth?mode=register"
                className="rounded-full bg-[#06b6d4] hover:bg-[#22d3ee] text-black font-semibold text-sm px-6 py-2.5 transition-all hover:shadow-[0_0_24px_rgba(6,182,212,0.4)]"
              >
                Mulai Gratis
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 text-white p-2"
              aria-label="Tutup menu"
            >
              <X size={28} />
            </button>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-semibold text-white hover:text-[#22d3ee] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}

            <div className="flex flex-col gap-4 mt-4 w-64">
              <Link
                to="/auth?mode=login"
                onClick={() => setMobileOpen(false)}
                className="text-center rounded-full border border-white/20 text-white font-medium py-3 hover:bg-white/10 transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/auth?mode=register"
                onClick={() => setMobileOpen(false)}
                className="text-center rounded-full bg-[#06b6d4] text-black font-semibold py-3 hover:bg-[#22d3ee] transition-colors"
              >
                Mulai Gratis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OctopilotNav;

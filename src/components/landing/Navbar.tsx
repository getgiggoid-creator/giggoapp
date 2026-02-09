import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import LogoMonogram from "@/components/shared/LogoMonogram";
import RoleToggle from "@/components/shared/RoleToggle";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  activeRole?: "creators" | "brands";
  setActiveRole?: (role: "creators" | "brands") => void;
}

const Navbar = ({ activeRole = "creators", setActiveRole }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleRoleChange = (role: "creators" | "brands") => {
    setActiveRole?.(role);
  };

  return (
    <nav className="sticky top-0 z-50 bg-landing-nav/80 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <LogoMonogram size="md" />

          {/* Center: Segmented Control (Desktop) */}
          <div className="hidden md:flex items-center">
            <RoleToggle
              activeRole={activeRole}
              onRoleChange={handleRoleChange}
              layoutId="desktopRoleToggle"
            />
          </div>

          {/* Right: Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              className="bg-foreground/10 hover:bg-foreground/20 text-foreground border border-border rounded-lg"
              asChild
            >
              <Link to="/auth">
                {t("common.login")}
                <ArrowUpRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile: Toggle + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-slide-up">
            <div className="flex flex-col gap-4">
              {/* Mobile Segmented Control */}
              <RoleToggle
                activeRole={activeRole}
                onRoleChange={handleRoleChange}
                layoutId="mobileRoleToggle"
                compact
                centered
              />

              {/* Mobile Links */}
              <Link
                to="/campaigns"
                className="text-muted-foreground hover:text-foreground transition-colors py-3 min-h-[44px] text-center flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.gigs")}
              </Link>

              {/* Mobile CTA */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/30">
                <Button
                  className="bg-foreground/10 hover:bg-foreground/20 text-foreground border border-border rounded-lg w-full"
                  asChild
                >
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    {t("common.login")}
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-foreground/10 rounded-lg w-full"
                  asChild
                >
                  <Link to={`/auth?mode=register&role=${activeRole === "brands" ? "brand" : "creator"}`} onClick={() => setIsOpen(false)}>
                    {t("common.getStarted")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LucideIcon, LogOut, Menu, X } from "lucide-react";
import LogoMonogram from "@/components/shared/LogoMonogram";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  path?: string;
}

interface DashboardSidebarProps {
  variant: "brand" | "creator";
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userInitial: string;
  onLogout?: () => void;
}

const DashboardSidebar = ({
  variant,
  navItems,
  activeTab,
  onTabChange,
  userName,
  userInitial,
  onLogout,
}: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hubLabel = variant === "brand" ? "Brand Hub" : "Creator Hub";

  const handleNavClick = (item: NavItem) => {
    if (item.path) {
      navigate(item.path);
    } else {
      onTabChange(item.id);
    }
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <LogoMonogram size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              activeTab === item.id
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:translate-x-0.5"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User with Online Dot */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
              {userInitial}
            </div>
            {/* Blinking Green Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{userName}</p>
            <p className="text-xs text-muted-foreground">{hubLabel}</p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - Glassmorphism */}
      <aside className="hidden md:flex w-64 flex-col bg-card/60 backdrop-blur-xl border-r border-border/50 shadow-elevated">
        {sidebarContent}
      </aside>

      {/* Mobile Hamburger Trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-lg border border-border/50 shadow-elevated text-foreground hover:scale-105 transition-transform"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="w-72 h-full bg-card/90 backdrop-blur-xl border-r border-border/50 shadow-elevated-lg flex flex-col animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;

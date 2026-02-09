import { ReactNode } from "react";
import { Bell, Search } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  actions?: ReactNode;
}

const DashboardHeader = ({
  title,
  subtitle,
  showSearch = true,
  searchPlaceholder = "Search...",
  actions,
}: DashboardHeaderProps) => {
  return (
    <header className="bg-card/60 backdrop-blur-xl border-b border-border/50 px-6 md:px-8 py-4 flex items-center justify-between">
      <div className="ml-12 md:ml-0">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
          {title}
        </h1>
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        {showSearch && (
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 py-2 bg-muted/50 backdrop-blur-sm rounded-xl border border-border/50 focus:ring-2 focus:ring-primary focus:border-transparent text-sm w-48 lg:w-64 text-foreground placeholder:text-muted-foreground transition-all duration-200"
            />
          </div>
        )}
        <button className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-200 hover:scale-105">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </button>
        {actions}
      </div>
    </header>
  );
};

export default DashboardHeader;

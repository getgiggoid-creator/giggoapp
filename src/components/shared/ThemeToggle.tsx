import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-9 h-9 flex items-center justify-center rounded-full",
        "border border-border bg-card hover:bg-muted transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "absolute w-4 h-4 transition-all duration-300",
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute w-4 h-4 transition-all duration-300",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
    </button>
  );
};

export default ThemeToggle;

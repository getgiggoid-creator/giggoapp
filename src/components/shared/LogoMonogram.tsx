import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoMonogramProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
  className?: string;
  asLink?: boolean;
}

const sizeConfig = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

const LogoMonogram = React.forwardRef<HTMLDivElement, LogoMonogramProps>(
  ({ size = "md", variant = "default", className, asLink = true }, ref) => {
    const logoClasses = cn(
      sizeConfig[size],
      "font-display font-extrabold tracking-tight",
      variant === "light" ? "text-white" : "text-accent",
      className
    );

    if (asLink) {
      return (
        <div ref={ref} className="inline-flex">
          <Link to="/">
            <span className={logoClasses}>Giggo</span>
          </Link>
        </div>
      );
    }

    return (
      <span ref={ref} className={logoClasses}>
        Giggo
      </span>
    );
  }
);

LogoMonogram.displayName = "LogoMonogram";

export default LogoMonogram;

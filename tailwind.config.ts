import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },

      colors: {
        /* ═══════════════════════════════════════════════════════
           GIGGO SEMANTIC COLOR TOKENS
           Dark SaaS / Hyper-Utilitarian
           ═══════════════════════════════════════════════════════ */

        /* Background (Surface Hierarchy) */
        background: "hsl(var(--background))",
        "surface-1": "hsl(var(--surface-1))",
        "surface-2": "hsl(var(--surface-2))",
        "surface-3": "hsl(var(--surface-3))",

        /* Text Hierarchy */
        "primary": "hsl(var(--foreground))",
        "secondary": "hsl(var(--muted-foreground))",
        "muted": "hsl(var(--muted-foreground))",
        "disabled": "#52525B",

        /* Border & Divider */
        "default": "hsl(var(--border))",
        "subtle": "hsl(var(--border))",
        "active": "#3F3F46",

        /* Accent (Electric Cyan) */
        accent: {
          primary: "#38BDF8",
          hover: "#7DD3FC",
          active: "#0284C7",
        },

        /* Signal */
        signal: {
          yellow: "#FACC15",
        },

        /* Status Colors */
        status: {
          success: "hsl(var(--status-success))",
          error: "hsl(var(--status-error))",
          warning: "hsl(var(--status-warning))",
          info: "#38BDF8",
        },

        /* Landing page themed surfaces */
        "landing-bg": "hsl(var(--landing-bg))",
        "landing-surface": "hsl(var(--landing-surface))",
        "landing-surface-alt": "hsl(var(--landing-surface-alt))",
        "landing-card": "hsl(var(--landing-card))",
        "landing-card-border": "hsl(var(--landing-card-border))",
        "landing-heading": "hsl(var(--landing-heading))",
        "landing-body": "hsl(var(--landing-body))",
        "landing-body-muted": "hsl(var(--landing-body-muted))",
        "landing-nav": "hsl(var(--landing-nav-bg))",
        "landing-fade": "hsl(var(--landing-fade))",

        /* Glow colors */
        "glow-cyan": "hsl(var(--glow-cyan))",
        "glow-magenta": "hsl(var(--glow-magenta))",
        "status-success": "hsl(var(--status-success))",
        "status-error": "hsl(var(--status-error))",
        "status-warning": "hsl(var(--status-warning))",

        /* SHADCN COMPATIBILITY LAYER */
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        "muted-foreground": "hsl(var(--muted-foreground))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },

      /* ─────────────────────────────────────────────────────
         BORDER RADIUS
         ───────────────────────────────────────────────────── */
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },

      /* ─────────────────────────────────────────────────────
         BOX SHADOW (Minimal, functional only)
         ───────────────────────────────────────────────────── */
      boxShadow: {
        elevated: "0 4px 12px -2px rgba(0,0,0,0.5)",
        "elevated-lg": "0 8px 24px -4px rgba(0,0,0,0.6)",
      },

      /* ─────────────────────────────────────────────────────
         RING (Focus states)
         ───────────────────────────────────────────────────── */
      ringWidth: {
        DEFAULT: "1px",
      },
      ringColor: {
        DEFAULT: "#38BDF8",
      },

      /* ─────────────────────────────────────────────────────
         TRANSITIONS
         ───────────────────────────────────────────────────── */
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },

      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "slide-in-right": "slide-in-right 300ms ease-out",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),

    /* Custom utilities for strict semantic usage */
    plugin(({ addUtilities }) => {
      addUtilities({
        /* Text color utilities (strict, no opacity) */
        ".text-primary": { color: "#FFFFFF" },
        ".text-secondary": { color: "#A1A1AA" },
        ".text-muted": { color: "#71717A" },
        ".text-disabled": { color: "#52525B" },

        /* Border color utilities */
        ".border-default": { borderColor: "#1F1F1F" },
        ".border-subtle": { borderColor: "#27272A" },
        ".border-active": { borderColor: "#3F3F46" },

        /* Accent utilities */
        ".text-accent": { color: "#38BDF8" },
        ".border-accent": { borderColor: "#38BDF8" },
        ".bg-accent": { backgroundColor: "#38BDF8" },

        /* Status utilities */
        ".text-success": { color: "#22C55E" },
        ".text-error": { color: "#EF4444" },
        ".text-warning": { color: "#F59E0B" },
        ".text-info": { color: "#38BDF8" },

        /* Signal (limited use) */
        ".bg-signal": { backgroundColor: "#FACC15" },
        ".text-signal": { color: "#FACC15" },
      })
    }),

    /* Component patterns */
    plugin(({ addComponents }) => {
      addComponents({
        /* Card with proper state management */
        ".card-surface": {
          backgroundColor: "#0B0B0B",
          borderRadius: "0.5rem",
          border: "1px solid #1F1F1F",
          transition: "all 200ms ease-out",
        },
        ".card-surface:hover": {
          backgroundColor: "#111111",
          borderColor: "#27272A",
        },
        ".card-surface:focus-visible, .card-surface[data-active='true']": {
          borderColor: "#38BDF8",
          outline: "none",
        },

        /* Button - Primary accent */
        ".btn-primary": {
          backgroundColor: "#38BDF8",
          color: "#000000",
          fontWeight: "500",
          borderRadius: "0.375rem",
          transition: "all 150ms ease-out",
        },
        ".btn-primary:hover": {
          backgroundColor: "#7DD3FC",
        },
        ".btn-primary:active": {
          backgroundColor: "#0284C7",
        },
        ".btn-primary:focus-visible": {
          outline: "1px solid #38BDF8",
          outlineOffset: "2px",
        },
        ".btn-primary:disabled": {
          backgroundColor: "#111111",
          color: "#52525B",
          cursor: "not-allowed",
        },

        /* Button - Ghost */
        ".btn-secondary": {
          backgroundColor: "transparent",
          color: "#A1A1AA",
          border: "1px solid #1F1F1F",
          fontWeight: "500",
          borderRadius: "0.375rem",
          transition: "all 150ms ease-out",
        },
        ".btn-secondary:hover": {
          backgroundColor: "#111111",
          color: "#FFFFFF",
          borderColor: "#27272A",
        },
        ".btn-secondary:active": {
          backgroundColor: "#161616",
        },
        ".btn-secondary:focus-visible": {
          borderColor: "#38BDF8",
          outline: "none",
        },

        /* Input field */
        ".input-field": {
          backgroundColor: "#0B0B0B",
          border: "1px solid #1F1F1F",
          color: "#FFFFFF",
          borderRadius: "0.375rem",
          transition: "border-color 150ms ease-out",
        },
        ".input-field::placeholder": {
          color: "#71717A",
        },
        ".input-field:hover": {
          borderColor: "#27272A",
        },
        ".input-field:focus": {
          borderColor: "#38BDF8",
          outline: "none",
        },
        ".input-field:disabled": {
          backgroundColor: "#111111",
          color: "#52525B",
          cursor: "not-allowed",
        },

        /* Status badges */
        ".badge-success": {
          backgroundColor: "rgba(34, 197, 94, 0.15)",
          color: "#22C55E",
          border: "1px solid rgba(34, 197, 94, 0.3)",
          fontSize: "0.75rem",
          fontWeight: "500",
          padding: "0.125rem 0.5rem",
          borderRadius: "0.25rem",
        },
        ".badge-error": {
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          color: "#EF4444",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          fontSize: "0.75rem",
          fontWeight: "500",
          padding: "0.125rem 0.5rem",
          borderRadius: "0.25rem",
        },
        ".badge-warning": {
          backgroundColor: "rgba(245, 158, 11, 0.15)",
          color: "#F59E0B",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          fontSize: "0.75rem",
          fontWeight: "500",
          padding: "0.125rem 0.5rem",
          borderRadius: "0.25rem",
        },
        ".badge-signal": {
          backgroundColor: "#FACC15",
          color: "#000000",
          fontSize: "0.625rem",
          fontWeight: "600",
          padding: "0.125rem 0.375rem",
          borderRadius: "0.25rem",
        },
      })
    }),
  ],
}

export default config

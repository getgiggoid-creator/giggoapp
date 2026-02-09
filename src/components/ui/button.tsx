import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap font-medium",
    "rounded-md transition-all duration-200 ease-out",
    "hover:scale-[1.02] active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-disabled disabled:border-subtle disabled:hover:scale-100",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary accent button (Electric Cyan)
        default:
          "bg-accent-primary text-primary-foreground hover:bg-accent-hover active:bg-accent-active",

        // Hero CTA button - emphasized primary
        hero:
          "bg-accent-primary text-primary-foreground hover:bg-accent-hover active:bg-accent-active shadow-elevated",

        // Secondary/Ghost button
        secondary:
          "bg-transparent text-secondary border border-default hover:bg-surface-2 hover:text-primary hover:border-subtle active:bg-surface-3",

        // Outline variant
        outline:
          "bg-transparent border border-default text-secondary hover:bg-surface-1 hover:text-primary hover:border-subtle",

        // Ghost - minimal
        ghost:
          "bg-transparent text-secondary hover:bg-surface-2 hover:text-primary",

        // Destructive
        destructive:
          "bg-status-error text-primary hover:brightness-110 active:brightness-90",

        // Success
        success:
          "bg-status-success text-primary-foreground hover:brightness-110 active:brightness-90",

        // Link style
        link:
          "text-accent-primary underline-offset-4 hover:underline hover:text-accent-hover",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }

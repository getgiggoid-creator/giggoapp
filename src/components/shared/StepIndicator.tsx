import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const StepIndicator = ({ steps, currentStep, className }: StepIndicatorProps) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile: Simple dots */}
      <div className="flex items-center justify-center gap-2 md:hidden">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index < currentStep
                ? "bg-primary"
                : index === currentStep
                ? "bg-primary w-6"
                : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Desktop: Full step indicator */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground hidden lg:block">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5 bg-muted relative">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 bg-primary transition-all duration-500",
                    index < currentStep ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

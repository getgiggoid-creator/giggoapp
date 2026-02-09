import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const CategoryChip = ({
  label,
  selected = false,
  onClick,
  icon,
  className,
}: CategoryChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
        "border focus:outline-none focus:ring-2 focus:ring-primary/50",
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-accent",
        className
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{label}</span>
      {selected && <Check className="w-4 h-4" />}
    </button>
  );
};

interface CategoryChipGroupProps {
  categories: { value: string; label: string; icon?: React.ReactNode }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  className?: string;
}

export const CategoryChipGroup = ({
  categories,
  selected,
  onChange,
  multiple = true,
  className,
}: CategoryChipGroupProps) => {
  const handleClick = (value: string) => {
    if (multiple) {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    } else {
      onChange([value]);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => (
        <CategoryChip
          key={category.value}
          label={category.label}
          icon={category.icon}
          selected={selected.includes(category.value)}
          onClick={() => handleClick(category.value)}
        />
      ))}
    </div>
  );
};

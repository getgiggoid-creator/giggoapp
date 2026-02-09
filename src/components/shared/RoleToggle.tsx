import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Role = "creators" | "brands";

interface RoleToggleProps {
  activeRole: Role;
  onRoleChange: (role: Role) => void;
  /** Unique layoutId prefix to prevent animation conflicts between instances */
  layoutId?: string;
  /** Compact mode for mobile with smaller padding */
  compact?: boolean;
  /** Center the toggle within its container */
  centered?: boolean;
  className?: string;
}

const RoleToggle = ({
  activeRole,
  onRoleChange,
  layoutId = "roleToggle",
  compact = false,
  centered = false,
  className,
}: RoleToggleProps) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const roles: { id: Role; label: string }[] = [
    { id: "brands", label: t("nav.forBrands") },
    { id: "creators", label: t("nav.forCreators") },
  ];

  return (
    <div
      className={cn(
        "bg-black/10 backdrop-blur-sm rounded-full p-1 flex",
        centered && "mx-auto",
        className
      )}
      role="tablist"
      aria-label={t("nav.selectUserType", "Select user type")}
    >
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onRoleChange(role.id)}
          role="tab"
          aria-selected={activeRole === role.id}
          aria-label={`Switch to ${role.label} view`}
          className={cn(
            "relative text-xs sm:text-sm font-medium rounded-full transition-colors whitespace-nowrap min-h-[44px] flex items-center justify-center",
            compact ? "px-3 sm:px-4 py-2.5" : "px-4 sm:px-5 py-2.5"
          )}
        >
          {activeRole === role.id && (
            <motion.div
              layoutId={prefersReducedMotion ? undefined : layoutId}
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={cn(
              "relative z-10 transition-colors duration-200",
              activeRole === role.id
                ? "text-gray-900"
                : "text-white/80 hover:text-white"
            )}
          >
            {role.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RoleToggle;

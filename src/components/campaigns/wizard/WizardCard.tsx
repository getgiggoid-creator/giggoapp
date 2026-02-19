import { ReactNode } from "react";

interface WizardCardProps {
  title?: string;
  children: ReactNode;
}

const WizardCard = ({ title, children }: WizardCardProps) => (
  <div className="rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 p-5 sm:p-6">
    {title && <h3 className="text-sm font-semibold text-zinc-200 mb-4">{title}</h3>}
    {children}
  </div>
);

export default WizardCard;

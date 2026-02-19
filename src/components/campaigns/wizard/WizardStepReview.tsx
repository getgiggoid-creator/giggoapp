import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Banknote } from "lucide-react";
import { CampaignFormData } from "@/pages/dashboard/CreateCampaign";
import WizardCard from "./WizardCard";

const BUDGET_PRESETS = [500000, 1000000, 2000000, 5000000];

const formatRupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
const presetLabel = (n: number) => {
  if (n >= 1000000) return `Rp ${n / 1000000}jt`;
  return `Rp ${n / 1000}rb`;
};

const ReviewRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between py-2 border-b border-zinc-800/40 last:border-0">
    <span className="text-zinc-500 text-sm">{label}</span>
    <span className="text-zinc-200 text-sm font-medium text-right max-w-[60%]">{value || "—"}</span>
  </div>
);

const WizardStepReview = () => {
  const { register, formState: { errors }, watch, setValue } = useFormContext<CampaignFormData>();
  const budgetPerCreator = watch("budgetPerCreator");
  const creatorsNeeded = watch("creatorsNeeded");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">Budget & Review</h1>
        <p className="text-zinc-400 mt-1 text-sm">Set your budget and review everything before publishing.</p>
      </div>

      <WizardCard title="Budget">
        <div className="space-y-4">
          <div>
            <Label className="text-zinc-300 text-xs">Budget per Creator (Rp)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {BUDGET_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setValue("budgetPerCreator", preset, { shouldValidate: true })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    budgetPerCreator === preset
                      ? "bg-amber-500/15 border-amber-500/50 text-amber-400"
                      : "bg-zinc-800/30 border-zinc-700/30 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {presetLabel(preset)}
                </button>
              ))}
            </div>
            <Input
              type="number"
              {...register("budgetPerCreator", { valueAsNumber: true })}
              className="mt-2 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 w-48"
            />
            {errors.budgetPerCreator && <p className="text-red-400 text-xs mt-1">{errors.budgetPerCreator.message}</p>}
          </div>
          <div>
            <Label className="text-zinc-300 text-xs">Number of Creators</Label>
            <Input
              type="number"
              {...register("creatorsNeeded", { valueAsNumber: true })}
              className="mt-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 w-32"
            />
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-amber-500" />
              <span className="text-amber-400 text-sm font-semibold">
                Total Budget: {formatRupiah((budgetPerCreator || 0) * (creatorsNeeded || 0))}
              </span>
            </div>
          </div>
        </div>
      </WizardCard>

      <WizardCard title="Timeline">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label className="text-zinc-300 text-xs flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> Start Date</Label>
            <Input type="date" {...register("startDate")} className="mt-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100" />
            {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate.message}</p>}
          </div>
          <div>
            <Label className="text-zinc-300 text-xs flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> End Date</Label>
            <Input type="date" {...register("endDate")} className="mt-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100" />
            {errors.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate.message}</p>}
          </div>
          <div>
            <Label className="text-zinc-300 text-xs flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> Submission Deadline</Label>
            <Input type="date" {...register("submissionDeadline")} className="mt-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100" />
            {errors.submissionDeadline && <p className="text-red-400 text-xs mt-1">{errors.submissionDeadline.message}</p>}
          </div>
        </div>
      </WizardCard>

      {/* Review Summary */}
      <WizardCard title="📋 Campaign Summary">
        <div className="space-y-0">
          <ReviewRow label="Title" value={watch("title")} />
          <ReviewRow label="Type" value={watch("campaignType")} />
          <ReviewRow label="Objectives" value={watch("objectives")?.join(", ")} />
          <ReviewRow label="Niches" value={watch("niches")?.join(", ")} />
          <ReviewRow label="Creator Tier" value={watch("creatorTier")} />
          <ReviewRow label="Min Followers" value={watch("minFollowers")?.toLocaleString()} />
          <ReviewRow label="Product" value={watch("productName")} />
          <ReviewRow label="Budget/Creator" value={formatRupiah(budgetPerCreator || 0)} />
          <ReviewRow label="Creators" value={creatorsNeeded} />
          <ReviewRow label="Total Budget" value={formatRupiah((budgetPerCreator || 0) * (creatorsNeeded || 0))} />
          <ReviewRow label="Period" value={`${watch("startDate") || "—"} → ${watch("endDate") || "—"}`} />
        </div>
      </WizardCard>
    </div>
  );
};

export default WizardStepReview;

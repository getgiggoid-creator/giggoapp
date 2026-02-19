import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CampaignFormData } from "@/pages/dashboard/CreateCampaign";
import WizardCard from "./WizardCard";
import ChipSelect from "./ChipSelect";

const CAMPAIGN_TYPES = [
  "UGC Video", "Unboxing Video", "Product Review", "Tutorial", "Creative Story", "Other"
];

const OBJECTIVES = [
  "Drive Sales", "Brand Awareness", "Product Launch", "Engagement", "Others"
];

const WizardStepBasics = () => {
  const { register, formState: { errors }, watch, setValue } = useFormContext<CampaignFormData>();
  const campaignType = watch("campaignType");
  const objectives = watch("objectives") || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">Campaign Basics</h1>
        <p className="text-zinc-400 mt-1 text-sm">Define what your campaign is about.</p>
      </div>

      <WizardCard>
        <div className="space-y-5">
          <div>
            <Label className="text-zinc-200">Campaign Title *</Label>
            <Input
              {...register("title")}
              placeholder="e.g., Summer Glow Skincare Challenge"
              className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label className="text-zinc-200">Campaign Type *</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1.5">
              {CAMPAIGN_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setValue("campaignType", type, { shouldValidate: true })}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    campaignType === type
                      ? "bg-amber-500/15 border-amber-500/50 text-amber-400"
                      : "bg-zinc-800/30 border-zinc-700/30 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.campaignType && <p className="text-red-400 text-xs mt-1">{errors.campaignType.message}</p>}
          </div>

          <div>
            <Label className="text-zinc-200">Main Objective *</Label>
            <p className="text-zinc-500 text-xs mb-2">Select one or more objectives</p>
            <ChipSelect
              options={OBJECTIVES}
              selected={objectives}
              onChange={(val) => setValue("objectives", val, { shouldValidate: true })}
            />
            {errors.objectives && <p className="text-red-400 text-xs mt-1">{errors.objectives.message}</p>}
          </div>

          <div>
            <Label className="text-zinc-200">Campaign Description *</Label>
            <Textarea
              {...register("description")}
              placeholder="Describe your campaign goals, what you're looking for, and the vibe you want..."
              rows={4}
              className="mt-1.5 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20 resize-none"
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>
        </div>
      </WizardCard>
    </div>
  );
};

export default WizardStepBasics;

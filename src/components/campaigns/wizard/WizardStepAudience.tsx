import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CampaignFormData } from "@/pages/dashboard/CreateCampaign";
import WizardCard from "./WizardCard";
import ChipSelect from "./ChipSelect";

const NICHES = [
  "Beauty", "Fashion", "Food & Beverage", "Tech & Gadget", "Lifestyle",
  "Health & Fitness", "Travel", "Gaming", "Education", "Parenting",
  "Home & Living", "Automotive", "Finance", "Entertainment"
];

const CREATOR_TIERS = [
  { value: "nano", label: "Nano (1K–10K)", desc: "High engagement, niche audience" },
  { value: "micro", label: "Micro (10K–100K)", desc: "Good reach with strong trust" },
  { value: "macro", label: "Macro (100K+)", desc: "Massive reach, brand awareness" },
];

const WizardStepAudience = () => {
  const { register, formState: { errors }, watch, setValue } = useFormContext<CampaignFormData>();
  const niches = watch("niches") || [];
  const creatorTier = watch("creatorTier");
  const gender = watch("gender");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">Audience & Requirements</h1>
        <p className="text-zinc-400 mt-1 text-sm">Define your ideal creators and target audience.</p>
      </div>

      <WizardCard title="Niche / Category">
        <ChipSelect options={NICHES} selected={niches} onChange={(val) => setValue("niches", val, { shouldValidate: true })} />
        {errors.niches && <p className="text-red-400 text-xs mt-1">{errors.niches.message}</p>}
      </WizardCard>

      <WizardCard title="Target Audience">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-zinc-300 text-xs">Gender</Label>
            <Select value={gender} onValueChange={(v) => setValue("gender", v)}>
              <SelectTrigger className="mt-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-zinc-300 text-xs">Location</Label>
            <Select value={watch("location")} onValueChange={(v) => setValue("location", v)}>
              <SelectTrigger className="mt-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="all">Indonesia (All)</SelectItem>
                <SelectItem value="jabodetabek">Jabodetabek</SelectItem>
                <SelectItem value="jawa">Jawa</SelectItem>
                <SelectItem value="sumatera">Sumatera</SelectItem>
                <SelectItem value="kalimantan">Kalimantan</SelectItem>
                <SelectItem value="sulawesi">Sulawesi</SelectItem>
                <SelectItem value="bali-ntt">Bali & Nusa Tenggara</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </WizardCard>

      <WizardCard title="Creator Tier">
        <div className="space-y-2">
          {CREATOR_TIERS.map((tier) => (
            <button
              key={tier.value}
              type="button"
              onClick={() => setValue("creatorTier", tier.value)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                creatorTier === tier.value
                  ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                  : "bg-zinc-800/30 border-zinc-700/30 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <p className="font-medium text-sm">{tier.label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{tier.desc}</p>
            </button>
          ))}
        </div>
        <div className="mt-4">
          <Label className="text-zinc-300 text-xs">Minimum Follower Count</Label>
          <Input
            type="number"
            {...register("minFollowers", { valueAsNumber: true })}
            className="mt-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 w-40"
          />
        </div>
      </WizardCard>
    </div>
  );
};

export default WizardStepAudience;

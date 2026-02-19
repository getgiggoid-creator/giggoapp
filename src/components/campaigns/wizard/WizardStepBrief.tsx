import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Link as LinkIcon } from "lucide-react";
import { CampaignFormData } from "@/pages/dashboard/CreateCampaign";
import WizardCard from "./WizardCard";

const DynamicList = ({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) => {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setInput("");
    }
  };

  return (
    <div>
      <Label className="text-zinc-300 text-xs">{label}</Label>
      <div className="flex gap-2 mt-1.5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 text-sm"
        />
        <Button type="button" variant="outline" size="sm" onClick={add} className="border-zinc-700 text-zinc-300 shrink-0">
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800/60 border border-zinc-700/40 text-zinc-300 text-xs"
            >
              {item}
              <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="hover:text-red-400 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const WizardStepBrief = () => {
  const { register, formState: { errors }, watch, setValue } = useFormContext<CampaignFormData>();
  const keyMessages = watch("keyMessages") || [];
  const mandatoryElements = watch("mandatoryElements") || [];
  const dos = watch("dos") || [];
  const donts = watch("donts") || [];
  const referenceLinks = watch("referenceLinks") || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">Creative Brief</h1>
        <p className="text-zinc-400 mt-1 text-sm">Guide creators on what content to produce.</p>
      </div>

      <WizardCard title="Product Info">
        <div className="space-y-4">
          <div>
            <Label className="text-zinc-300 text-xs">Product Name *</Label>
            <Input
              {...register("productName")}
              placeholder="e.g., GlowUp Serum 30ml"
              className="mt-1 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500"
            />
            {errors.productName && <p className="text-red-400 text-xs mt-1">{errors.productName.message}</p>}
          </div>
          <div>
            <Label className="text-zinc-300 text-xs">Product Link</Label>
            <div className="relative mt-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <Input
                {...register("productLink")}
                placeholder="https://tokopedia.link/..."
                className="pl-9 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>
          </div>
        </div>
      </WizardCard>

      <WizardCard title="Content Direction">
        <div className="space-y-5">
          <DynamicList label="Key Messages / Selling Points" items={keyMessages} onChange={(v) => setValue("keyMessages", v)} placeholder="e.g., Kulit glowing dalam 7 hari" />
          <DynamicList label="Mandatory Elements" items={mandatoryElements} onChange={(v) => setValue("mandatoryElements", v)} placeholder="e.g., Show product close-up" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <DynamicList label="✅ Do's" items={dos} onChange={(v) => setValue("dos", v)} placeholder="e.g., Use natural lighting" />
            <DynamicList label="❌ Don'ts" items={donts} onChange={(v) => setValue("donts", v)} placeholder="e.g., Don't mention competitors" />
          </div>
        </div>
      </WizardCard>

      <WizardCard title="Reference Links">
        <DynamicList
          label="Add TikTok / Instagram / YouTube reference videos"
          items={referenceLinks}
          onChange={(v) => setValue("referenceLinks", v)}
          placeholder="https://tiktok.com/@..."
        />
      </WizardCard>
    </div>
  );
};

export default WizardStepBrief;

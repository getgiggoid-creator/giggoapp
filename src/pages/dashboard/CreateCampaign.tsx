import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, Rocket, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateCampaign, CampaignType, CampaignStatus } from "@/hooks/useCampaigns";


import WizardStepBasics from "@/components/campaigns/wizard/WizardStepBasics";
import WizardStepAudience from "@/components/campaigns/wizard/WizardStepAudience";
import WizardStepBrief from "@/components/campaigns/wizard/WizardStepBrief";
import WizardStepReview from "@/components/campaigns/wizard/WizardStepReview";

// ── Zod Schema ──
const campaignSchema = z.object({
  // Step 1
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  campaignType: z.string().min(1, "Select a campaign type"),
  objectives: z.array(z.string()).min(1, "Select at least one objective"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  // Step 2
  niches: z.array(z.string()).min(1, "Select at least one niche"),
  ageRange: z.array(z.number()).length(2).default([18, 45]),
  gender: z.string().default("all"),
  location: z.string().default("all"),
  creatorTier: z.string().default("nano"),
  minFollowers: z.number().min(0).default(1000),
  // Step 3
  productName: z.string().min(1, "Product name is required"),
  productLink: z.string().url("Enter a valid URL").or(z.literal("")),
  keyMessages: z.array(z.string()).default([]),
  mandatoryElements: z.array(z.string()).default([]),
  dos: z.array(z.string()).default([]),
  donts: z.array(z.string()).default([]),
  referenceLinks: z.array(z.string()).default([]),
  // Step 4
  budgetPerCreator: z.number().min(100000, "Minimum Rp 100.000"),
  creatorsNeeded: z.number().min(1, "At least 1 creator").max(500),
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"),
  submissionDeadline: z.string().min(1, "Deadline required"),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;

const STEPS = [
  { label: "Campaign Basics", shortLabel: "Basics" },
  { label: "Audience & Requirements", shortLabel: "Audience" },
  { label: "Creative Brief", shortLabel: "Brief" },
  { label: "Budget & Review", shortLabel: "Review" },
];

const stepFields: Record<number, (keyof CampaignFormData)[]> = {
  0: ["title", "campaignType", "objectives", "description"],
  1: ["niches", "creatorTier"],
  2: ["productName"],
  3: ["budgetPerCreator", "creatorsNeeded", "startDate", "endDate", "submissionDeadline"],
};

const CreateCampaign = () => {
  const [step, setStep] = useState(0);
  
  const createCampaign = useCreateCampaign();

  const methods = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      campaignType: "",
      objectives: [],
      description: "",
      niches: [],
      ageRange: [18, 45],
      gender: "all",
      location: "all",
      creatorTier: "nano",
      minFollowers: 1000,
      productName: "",
      productLink: "",
      keyMessages: [],
      mandatoryElements: [],
      dos: [],
      donts: [],
      referenceLinks: [],
      budgetPerCreator: 500000,
      creatorsNeeded: 5,
      startDate: "",
      endDate: "",
      submissionDeadline: "",
    },
  });

  const nextStep = useCallback(async () => {
    const fields = stepFields[step];
    if (fields) {
      const valid = await methods.trigger(fields);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, 3));
  }, [step, methods]);

  const prevStep = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  const handleSaveDraft = async () => {
    const values = methods.getValues();
    createCampaign.mutate({
      title: values.title || "Untitled Campaign",
      description: values.description || "Draft campaign",
      brief: JSON.stringify({
        productName: values.productName,
        productLink: values.productLink,
        keyMessages: values.keyMessages,
        mandatoryElements: values.mandatoryElements,
        dos: values.dos,
        donts: values.donts,
        referenceLinks: values.referenceLinks,
      }),
      category: values.niches?.[0] || "Lifestyle",
      type: CampaignType.DEAL,
      budget: (values.budgetPerCreator || 500000) * (values.creatorsNeeded || 1),
      start_date: values.startDate ? new Date(values.startDate).toISOString() : new Date().toISOString(),
      end_date: values.endDate ? new Date(values.endDate).toISOString() : new Date(Date.now() + 30 * 86400000).toISOString(),
      status: CampaignStatus.DRAFT,
    });
  };

  const handlePublish = methods.handleSubmit((values) => {
    createCampaign.mutate({
      title: values.title,
      description: values.description,
      brief: JSON.stringify({
        productName: values.productName,
        productLink: values.productLink,
        keyMessages: values.keyMessages,
        mandatoryElements: values.mandatoryElements,
        dos: values.dos,
        donts: values.donts,
        referenceLinks: values.referenceLinks,
        campaignType: values.campaignType,
        objectives: values.objectives,
        creatorTier: values.creatorTier,
        minFollowers: values.minFollowers,
        ageRange: values.ageRange,
        gender: values.gender,
        location: values.location,
      }),
      category: values.niches[0] || "Lifestyle",
      type: CampaignType.DEAL,
      budget: values.budgetPerCreator * values.creatorsNeeded,
      start_date: new Date(values.startDate).toISOString(),
      end_date: new Date(values.endDate).toISOString(),
      status: CampaignStatus.LIVE,
    });
  });

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/brand"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-5 w-px bg-zinc-800" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <span className="font-semibold text-zinc-100 text-sm">New Campaign</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={createCampaign.isPending}
            className="border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 text-xs"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Draft
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-3">
          <div className="flex items-center gap-2 mb-2">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => i < step && setStep(i)}
                className={`text-xs font-medium transition-colors ${
                  i === step
                    ? "text-amber-500"
                    : i < step
                    ? "text-zinc-400 hover:text-zinc-200 cursor-pointer"
                    : "text-zinc-600"
                }`}
              >
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.shortLabel}</span>
              </button>
            ))}
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
          <p className="text-[11px] text-zinc-500 mt-1.5">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
      </header>

      {/* Content */}
      <FormProvider {...methods}>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && <WizardStepBasics />}
              {step === 1 && <WizardStepAudience />}
              {step === 2 && <WizardStepBrief />}
              {step === 3 && <WizardStepReview />}
            </motion.div>
          </AnimatePresence>
        </main>
      </FormProvider>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === 0}
            className="text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            {step < 3 ? (
              <Button
                onClick={nextStep}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-6"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                disabled={createCampaign.isPending}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-6"
              >
                {createCampaign.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-1.5" />
                    Publish Campaign
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;

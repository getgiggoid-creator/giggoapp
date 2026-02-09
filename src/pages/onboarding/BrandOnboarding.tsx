import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { CategoryChipGroup } from "@/components/shared/CategoryChip";
import { ConfettiCelebration } from "@/components/shared/ConfettiCelebration";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Upload,
  Check,
  Target,
  Users,
  TrendingUp,
  ShoppingCart,
  Megaphone,
  Globe,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Company Info" },
  { title: "Target Audience" },
  { title: "Goals" },
  { title: "Complete" },
];

const industries = [
  { value: "tech", label: "Technology" },
  { value: "fashion", label: "Fashion & Apparel" },
  { value: "beauty", label: "Beauty & Cosmetics" },
  { value: "food", label: "Food & Beverage" },
  { value: "health", label: "Health & Wellness" },
  { value: "entertainment", label: "Entertainment" },
  { value: "finance", label: "Finance" },
  { value: "travel", label: "Travel & Hospitality" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "other", label: "Other" },
];

const ageRanges = [
  { value: "13-17", label: "13-17" },
  { value: "18-24", label: "18-24" },
  { value: "25-34", label: "25-34" },
  { value: "35-44", label: "35-44" },
  { value: "45-54", label: "45-54" },
  { value: "55+", label: "55+" },
];

const regions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "eu", label: "Europe" },
  { value: "asia", label: "Asia Pacific" },
  { value: "latam", label: "Latin America" },
  { value: "global", label: "Global" },
];

const goals = [
  { value: "awareness", label: "Brand Awareness", icon: <Megaphone className="w-5 h-5" />, description: "Increase visibility and recognition" },
  { value: "engagement", label: "Engagement", icon: <Users className="w-5 h-5" />, description: "Build community and interaction" },
  { value: "traffic", label: "Website Traffic", icon: <Globe className="w-5 h-5" />, description: "Drive visitors to your site" },
  { value: "sales", label: "Sales & Conversions", icon: <ShoppingCart className="w-5 h-5" />, description: "Generate revenue and leads" },
  { value: "ugc", label: "UGC Content", icon: <Target className="w-5 h-5" />, description: "Collect authentic entries" },
  { value: "growth", label: "Social Growth", icon: <TrendingUp className="w-5 h-5" />, description: "Grow your social following" },
];

const budgetRanges = [
  { value: "under-1k", label: "Under $1k" },
  { value: "1k-5k", label: "$1k - $5k" },
  { value: "5k-10k", label: "$5k - $10k" },
  { value: "10k-25k", label: "$10k - $25k" },
  { value: "25k-plus", label: "$25k+" },
];

const BrandOnboarding = () => {
  const navigate = useNavigate();
  const { user, role, isLoading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);

  // Redirect if not authenticated or wrong role
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/auth");
      } else if (role && role !== "brand") {
        navigate("/onboarding/creator");
      }
    }
  }, [user, role, authLoading, navigate]);

  // Pre-fill from profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, website")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        if (data.full_name) setCompanyName(data.full_name);
        if (data.website) setWebsite(data.website);
      }
    };

    fetchProfile();
  }, [user]);

  const handleNext = async () => {
    if (currentStep === steps.length - 2) {
      await saveBrandProfile();
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const saveBrandProfile = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      // Update base profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: companyName,
          website: website,
        })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      // Create brand profile
      const { error: brandError } = await supabase
        .from("brand_profiles")
        .upsert(
          {
            user_id: user.id,
            company_name: companyName,
            company_logo: logo, // This is now a URL from storage
            industry: selectedIndustry[0] || null,
            target_age_ranges: selectedAgeRanges,
            target_regions: selectedRegions,
            goals: selectedGoals,
            monthly_budget: selectedBudget[0] || null,
          },
          { onConflict: 'user_id' }
        );

      if (brandError) throw brandError;

      setShowConfetti(true);
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // REFACTORED: Upload to Storage instead of Base64
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // 1. Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `brand-logos/${fileName}`;

      // 2. Upload to 'public_assets' bucket
      // Note: Ensure you have created a bucket named 'public_assets' in Supabase
      const { error: uploadError } = await supabase.storage
        .from('public_assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data } = supabase.storage
        .from('public_assets')
        .getPublicUrl(filePath);

      // 4. Set state
      setLogo(data.publicUrl);
      toast.success("Logo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo. Please check your connection.");
    } finally {
      setIsUploading(false);
      // Reset input value so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return companyName.trim().length > 0 && !isUploading; // Prevent next if uploading
      case 1:
        return true; 
      case 2:
        return true; 
      default:
        return true;
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 2) {
      // Skip to completion
      saveBrandProfile().then(() => setCurrentStep(steps.length - 1));
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Tell us about your brand
              </h2>
              <p className="text-muted-foreground">
                This helps us match you with the right creators
              </p>
            </div>

            {/* Logo Upload */}
            <div className="flex justify-center mb-8">
              <label className={cn(
                "relative cursor-pointer group",
                isUploading && "pointer-events-none opacity-70"
              )}>
                <div
                  className={cn(
                    "w-28 h-28 rounded-2xl flex items-center justify-center transition-all",
                    "border-2 border-dashed relative overflow-hidden",
                    logo
                      ? "border-transparent"
                      : "border-muted-foreground/30 hover:border-primary"
                  )}
                >
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  ) : logo ? (
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-full h-full rounded-2xl object-contain bg-white p-2"
                    />
                  ) : (
                    <Building2 className="w-10 h-10 text-muted-foreground" />
                  )}
                </div>
                
                {!isUploading && (
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Upload className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Company Name
                </label>
                <Input
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Website
                </label>
                <Input
                  placeholder="https://example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  About your brand
                </label>
                <Textarea
                  placeholder="Describe your brand and what makes it unique..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">
                  Industry
                </label>
                <CategoryChipGroup
                  categories={industries}
                  selected={selectedIndustry}
                  onChange={setSelectedIndustry}
                  multiple={false}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">
                  Monthly Content Budget <span className="text-muted-foreground font-normal">(Optional)</span>
                </label>
                <CategoryChipGroup
                  categories={budgetRanges}
                  selected={selectedBudget}
                  onChange={setSelectedBudget}
                  multiple={false}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Define your target audience
              </h2>
              <p className="text-muted-foreground">
                We'll help you find creators who reach your ideal customers
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">
                  Age Range
                </label>
                <CategoryChipGroup
                  categories={ageRanges}
                  selected={selectedAgeRanges}
                  onChange={setSelectedAgeRanges}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-3">
                  Target Regions
                </label>
                <CategoryChipGroup
                  categories={regions}
                  selected={selectedRegions}
                  onChange={setSelectedRegions}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                What are your goals?
              </h2>
              <p className="text-muted-foreground">
                Select all that apply to your gig objectives
              </p>
            </div>

            <div className="grid gap-3">
              {goals.map((goal) => {
                const isSelected = selectedGoals.includes(goal.value);
                return (
                  <button
                    key={goal.value}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedGoals(selectedGoals.filter((g) => g !== goal.value));
                      } else {
                        setSelectedGoals([...selectedGoals, goal.value]);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {goal.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{goal.label}</h4>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in text-center">
            <div className="w-24 h-24 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-6">
              <Check className="w-12 h-12 text-success" />
            </div>

            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Welcome aboard! 🚀
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your brand profile is ready. Create your first gig and start connecting with amazing creators!
            </p>

            <div className="pt-6">
              <Button
                size="xl"
                className="w-full gap-2"
                onClick={() => navigate("/dashboard/brand/campaigns/new")}
              >
                <Target className="w-5 h-5" />
                Create Your First Gig
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient Glow Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[100px] animate-pulse-slow pointer-events-none -z-10" style={{ animationDelay: '2s' }} />
      <ConfettiCelebration show={showConfetti} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-lg mx-auto">
          {renderStep()}
        </div>
      </main>

      {/* Footer */}
      {currentStep < steps.length - 1 && (
        <footer className="sticky bottom-0 bg-background/95 backdrop-blur-lg border-t border-border px-4 py-4">
          <div className="max-w-lg mx-auto flex gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleNext}
              disabled={!isStepValid() || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {currentStep === steps.length - 2 ? "Complete Setup" : "Continue"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <div className="max-w-lg mx-auto text-center pt-2">
              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                disabled={isSaving}
              >
                Skip for now
              </button>
            </div>
          )}
        </footer>
      )}
    </div>
  );
};

export default BrandOnboarding;
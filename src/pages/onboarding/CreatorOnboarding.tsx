import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { SocialConnectCard } from "@/components/shared/SocialConnectCard";
import { CategoryChipGroup } from "@/components/shared/CategoryChip";
import { ConfettiCelebration } from "@/components/shared/ConfettiCelebration";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  ArrowRight, 
  Camera, 
  Upload,
  Sparkles,
  Check,
  Music,
  Gamepad2,
  Utensils,
  Dumbbell,
  Palette,
  BookOpen,
  Plane,
  ShoppingBag,
  Loader2,
  X // Added for delete button
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Personal Info" },
  { title: "Connect Social" },
  { title: "Your Niche" },
  { title: "Portfolio" },
  { title: "Complete" },
];

const categories = [
  { value: "lifestyle", label: "Lifestyle", icon: <Sparkles className="w-4 h-4" /> },
  { value: "music", label: "Music", icon: <Music className="w-4 h-4" /> },
  { value: "gaming", label: "Gaming", icon: <Gamepad2 className="w-4 h-4" /> },
  { value: "food", label: "Food & Drink", icon: <Utensils className="w-4 h-4" /> },
  { value: "fitness", label: "Fitness", icon: <Dumbbell className="w-4 h-4" /> },
  { value: "beauty", label: "Beauty", icon: <Palette className="w-4 h-4" /> },
  { value: "education", label: "Education", icon: <BookOpen className="w-4 h-4" /> },
  { value: "travel", label: "Travel", icon: <Plane className="w-4 h-4" /> },
  { value: "fashion", label: "Fashion", icon: <ShoppingBag className="w-4 h-4" /> },
];

interface SocialConnection {
  platform: "tiktok" | "instagram" | "youtube" | "twitter";
  connected: boolean;
  username?: string;
  followers?: number;
}

const CreatorOnboarding = () => {
  const navigate = useNavigate();
  const { user, role, isLoading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // New state for upload status
  
  // Form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<string[]>([]);
  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    { platform: "tiktok", connected: false },
    { platform: "instagram", connected: false },
    { platform: "youtube", connected: false },
    { platform: "twitter", connected: false },
  ]);

  // Redirect if not authenticated or wrong role
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/auth");
      } else if (role && role !== "creator") {
        navigate("/onboarding/brand");
      }
    }
  }, [user, role, authLoading, navigate]);

  // Pre-fill name from profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, username, bio, avatar_url")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        if (data.full_name) setName(data.full_name);
        if (data.username) setUsername(data.username);
        if (data.bio) setBio(data.bio);
        if (data.avatar_url) setProfileImage(data.avatar_url);
      }
    };

    fetchProfile();
  }, [user]);

  // --- HELPER: Upload to Supabase Storage ---
  const uploadToStorage = async (file: File, folder: 'avatars' | 'portfolio') => {
    if (!user) throw new Error("User not found");

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from('public_assets') // Pastikan bucket 'public_assets' ada & public
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from('public_assets')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 2) {
      // Save to database before showing completion
      await saveCreatorProfile();
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const saveCreatorProfile = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      // Update base profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: name,
          username: username,
          bio: bio,
          avatar_url: profileImage,
        })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      // Create creator profile
      const { error: creatorError } = await supabase
        .from("creator_profiles")
        .upsert(
          {
            user_id: user.id,
            categories: selectedCategories,
            portfolio_items: portfolioItems,
            social_connections: JSON.stringify(socialConnections.filter(s => s.connected)),
          },
          { onConflict: 'user_id' }
        );

      if (creatorError) throw creatorError;

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

  const handleConnectSocial = (_platform: SocialConnection["platform"]) => {
    // Mock OAuth flow - Bisa diganti real OAuth nanti
    toast.info("Social integration coming soon!");
  };

  const handleDisconnectSocial = (platform: SocialConnection["platform"]) => {
    setSocialConnections((prev) =>
      prev.map((s) =>
        s.platform === platform
          ? { ...s, connected: false, username: undefined, followers: undefined }
          : s
      )
    );
  };

  const handleManualHandleChange = (platform: SocialConnection["platform"], handle: string) => {
    setSocialConnections((prev) =>
      prev.map((s) =>
        s.platform === platform
          ? { ...s, username: handle, connected: handle.length > 0 }
          : s
      )
    );
  };

  // --- UPDATED: Handle Profile Image Upload ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const publicUrl = await uploadToStorage(file, 'avatars');
      setProfileImage(publicUrl);
      toast.success("Profile photo uploaded!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset input value to allow re-uploading same file if needed
      e.target.value = "";
    }
  };

  // --- UPDATED: Handle Portfolio Upload ---
  const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (portfolioItems.length >= 6) {
      toast.error("Maximum 6 portfolio items allowed");
      return;
    }

    setIsUploading(true);
    try {
      const publicUrl = await uploadToStorage(file, 'portfolio');
      setPortfolioItems((prev) => [...prev, publicUrl]);
      toast.success("Added to portfolio!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload portfolio item");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemovePortfolioItem = (index: number) => {
    setPortfolioItems((prev) => prev.filter((_, i) => i !== index));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return name.trim().length > 0 && username.trim().length > 0 && !isUploading;
      case 3:
        return !isUploading; // Prevent next if uploading portfolio
      default:
        return true;
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 2) {
      // Skip to completion
      saveCreatorProfile().then(() => setCurrentStep(steps.length - 1));
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
                Let's get to know you
              </h2>
              <p className="text-muted-foreground">
                Tell us about yourself so brands can find you
              </p>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <label className={cn(
                "relative cursor-pointer group",
                isUploading && "pointer-events-none opacity-70"
              )}>
                <div
                  className={cn(
                    "w-28 h-28 rounded-full flex items-center justify-center transition-all bg-muted overflow-hidden",
                    "border-2 border-dashed",
                    profileImage
                      ? "border-transparent"
                      : "border-muted-foreground/30 hover:border-primary"
                  )}
                >
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  ) : profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                
                {!isUploading && (
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Full Name
                </label>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    @
                  </span>
                  <Input
                    className="pl-8"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Bio
                </label>
                <Textarea
                  placeholder="Tell brands about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Connect your social accounts
              </h2>
              <p className="text-muted-foreground">
                Link your accounts or enter handles manually
              </p>
            </div>

            <div className="space-y-4">
              {socialConnections.map((connection) => (
                <div key={connection.platform} className="space-y-2">
                  <SocialConnectCard
                    platform={connection.platform}
                    isConnected={connection.connected} // Removed random follower check logic for clarity
                    username={connection.username}
                    followers={connection.followers}
                    onConnect={() => handleConnectSocial(connection.platform)}
                    onDisconnect={() => handleDisconnectSocial(connection.platform)}
                  />
                  {!connection.connected && (
                    <div className="pl-4">
                      <Input
                        placeholder={`@your_${connection.platform}_handle`}
                        className="text-sm"
                        value={connection.username || ""}
                        onChange={(e) => handleManualHandleChange(connection.platform, e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Can't connect? Enter your handle manually
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                What's your niche?
              </h2>
              <p className="text-muted-foreground">
                Select the categories that best describe your content
              </p>
            </div>

            <CategoryChipGroup
              categories={categories}
              selected={selectedCategories}
              onChange={setSelectedCategories}
              className="justify-center"
            />

            {selectedCategories.length > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {selectedCategories.length} categories selected
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Showcase your work
              </h2>
              <p className="text-muted-foreground">
                Upload your best content to attract brands (optional)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl bg-muted overflow-hidden relative group"
                >
                  <img
                    src={item}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Delete Button */}
                  <button
                    onClick={() => handleRemovePortfolioItem(index)}
                    className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {/* Upload Button */}
              {portfolioItems.length < 6 && (
                <label className={cn(
                  "aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-accent transition-all cursor-pointer",
                  isUploading && "pointer-events-none opacity-50"
                )}>
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePortfolioUpload} 
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in text-center">
            <div className="w-24 h-24 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-6">
              <Check className="w-12 h-12 text-success" />
            </div>
            
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              You're all set! 🎉
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your creator profile is ready. Start exploring gigs and submit your first entry!
            </p>

            <div className="pt-6">
              <Button
                size="xl"
                className="w-full gap-2"
                onClick={() => navigate("/campaigns")}
              >
                <Sparkles className="w-5 h-5" />
                Explore Gigs
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
                disabled={isSaving || isUploading}
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
                disabled={isSaving || isUploading}
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

export default CreatorOnboarding;
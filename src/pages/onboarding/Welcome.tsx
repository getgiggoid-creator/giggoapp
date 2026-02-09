import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Building2, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, role, isLoading, hasCompletedOnboarding } = useAuth();

  // Redirect based on auth state
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in, redirect to auth
        navigate("/auth?mode=register");
      } else if (role && hasCompletedOnboarding) {
        // Already completed onboarding
        navigate(role === "brand" ? "/dashboard/brand" : "/dashboard/creator");
      } else if (role) {
        // Has role but hasn't completed onboarding
        navigate(role === "brand" ? "/onboarding/brand" : "/onboarding/creator");
      }
      // If user exists but no role, show welcome page for role selection
    }
  }, [user, role, isLoading, hasCompletedOnboarding, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Giggo
          </h1>
          <p className="text-white/80 text-lg">
            Where Creators Get the Gig
          </p>
        </div>

        {/* Tagline */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Create. Get Paid. Repeat.
          </h2>
          <p className="text-white/70">
            Join thousands of creators earning from brand gigs.
          </p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button
            size="xl"
            className="w-full bg-white text-primary hover:bg-white/90 shadow-xl gap-3 group"
            onClick={() => navigate("/onboarding/creator")}
          >
            <Sparkles className="w-5 h-5" />
            I'm a Creator
            <ArrowRight className="w-5 h-5 ml-auto transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            size="xl"
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 gap-3 group"
            onClick={() => navigate("/onboarding/brand")}
          >
            <Building2 className="w-5 h-5" />
            I'm a Brand
            <ArrowRight className="w-5 h-5 ml-auto transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Login link */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-white/60 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth")}
              className="text-white font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Brand showcase carousel placeholder */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <p className="text-white/50 text-xs mb-4">TRUSTED BY TOP BRANDS</p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            {["Nike", "Adidas", "Spotify", "Netflix"].map((brand) => (
              <div
                key={brand}
                className="text-white font-display font-bold text-lg"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

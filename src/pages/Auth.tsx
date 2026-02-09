import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Building2, Video, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import LogoMonogram from "@/components/shared/LogoMonogram";

type AuthMode = "login" | "register";
type UserRole = "creator" | "brand";

// Validation schemas
const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const nameSchema = z.string().min(2, "Name must be at least 2 characters");

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, signIn, user, role, isLoading: authLoading, hasCompletedOnboarding } = useAuth();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const initialRole = searchParams.get("role") as UserRole || "creator";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      if (!role) {
        // User exists but no role - shouldn't happen, but handle it
        navigate("/onboarding");
      } else if (!hasCompletedOnboarding) {
        // Has role but hasn't completed onboarding
        navigate(role === "brand" ? "/onboarding/brand" : "/onboarding/creator");
      } else {
        // Fully onboarded
        navigate(role === "brand" ? "/dashboard/brand" : "/dashboard/creator");
      }
    }
  }, [user, role, hasCompletedOnboarding, authLoading, navigate]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    
    if (mode === "register") {
      const nameResult = nameSchema.safeParse(formData.name);
      if (!nameResult.success) {
        newErrors.name = nameResult.error.errors[0].message;
      }
    }

    const emailResult = emailSchema.safeParse(formData.email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(formData.password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (mode === "register") {
        const { error } = await signUp(formData.email, formData.password, formData.name, selectedRole);
        
        if (error) {
          // Enhanced error handling for security policies
          if (error.message.includes("been exposed") || error.message.includes("data breach") || error.message.includes("leaked")) {
            toast.error("This password has been found in a data breach. Please choose a different, secure password.");
          } else if (error.message.includes("weak") || error.message.includes("strength") || error.message.includes("too short")) {
            toast.error("Password is too weak. Use at least 8 characters with mixed case and numbers.");
          } else if (error.message.includes("already registered")) {
            toast.error("This email is already registered. Please sign in instead.");
          } else {
            toast.error(error.message || "Failed to create account");
          }
          return;
        }

        toast.success("Account created successfully!");
        // Navigation will be handled by useEffect
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message || "Failed to sign in");
          }
          return;
        }

        toast.success("Welcome back!");
        // Navigation will be handled by useEffect
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Glow Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />
        
        {/* Glassmorphism Form Container */}
        <div className="w-full max-w-md relative z-10 glass-medium rounded-3xl p-8 border border-white/10 shadow-2xl">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="mb-8">
            <LogoMonogram size="md" />
          </div>

          {/* Header */}
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {mode === "login" ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {mode === "login"
              ? "Log in to continue to your hub."
              : "Join Giggo and start earning from your content."}
          </p>

          {/* Role Selector (Register only) */}
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setSelectedRole("creator")}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedRole === "creator"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedRole === "creator" ? "gradient-primary" : "bg-muted"
                }`}>
                  <Video className={`w-5 h-5 ${selectedRole === "creator" ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Creator</p>
                  <p className="text-xs text-muted-foreground">Get paid for gigs</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("brand")}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedRole === "brand"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedRole === "brand" ? "gradient-primary" : "bg-muted"
                }`}>
                  <Building2 className={`w-5 h-5 ${selectedRole === "brand" ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Brand</p>
                  <p className="text-xs text-muted-foreground">Launch gigs</p>
                </div>
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <Label htmlFor="name" className="text-foreground">
                  {selectedRole === "brand" ? "Company Name" : "Full Name"}
                </Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={selectedRole === "brand" ? "Your company name" : "Your full name"}
                    className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
            </div>

            {mode === "login" && (
              <div className="text-right">
                <button 
                  type="button" 
                  className="text-sm text-primary hover:underline"
                  onClick={async () => {
                    if (!formData.email) {
                      toast.error("Please enter your email first");
                      return;
                    }
                    
                    const { error } = await supabase.auth.resetPasswordForEmail(
                      formData.email,
                      { redirectTo: `${window.location.origin}/auth?mode=reset` }
                    );
                    
                    if (error) {
                      toast.error(error.message);
                    } else {
                      toast.success("Password reset link sent to your email");
                    }
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                mode === "login" ? "Log In" : "Create Account"
              )}
            </Button>
          </form>

          {/* Toggle Mode */}
          <p className="text-center text-muted-foreground mt-8">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-primary font-semibold hover:underline"
                >
                  Log In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 gradient-primary items-center justify-center p-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center text-white max-w-md">
          <div className="flex justify-center mb-8">
            <LogoMonogram size="lg" variant="light" asLink={false} />
          </div>
          <h2 className="font-display text-4xl font-bold mb-4">
            {selectedRole === "brand"
              ? "Launch Gigs That Go Viral"
              : "Turn Your Content Into Income"}
          </h2>
          <p className="text-white/80 text-lg">
            {selectedRole === "brand"
              ? "Create challenges that connect your brand with authentic content creators."
              : "Join gigs from top brands and get paid doing what you love."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

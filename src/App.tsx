import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { RoleProvider } from "@/contexts/RoleContext";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

// Layouts
import IndexLayout from "@/components/layouts/IndexLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Eager-loaded pages (critical path)
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

// Lazy-loaded pages (non-critical)
const BrowseCampaigns = lazy(() => import("@/pages/campaigns/BrowseCampaigns"));
const CampaignDetail = lazy(() => import("@/pages/campaigns/CampaignDetail"));
const BrandDashboard = lazy(() => import("@/pages/dashboard/BrandDashboard"));
const CreatorDashboard = lazy(() => import("@/pages/dashboard/CreatorDashboard"));
const CreatorWallet = lazy(() => import("@/pages/dashboard/CreatorWallet"));
const CreateCampaign = lazy(() => import("@/pages/dashboard/CreateCampaign"));
const BrandsLandingPage = lazy(() => import("@/pages/brands/Index"));
const CreatorsLandingPage = lazy(() => import("@/pages/creators/Index"));
const BrandOnboarding = lazy(() => import("@/pages/onboarding/BrandOnboarding"));
const CreatorOnboarding = lazy(() => import("@/pages/onboarding/CreatorOnboarding"));
const Welcome = lazy(() => import("@/pages/onboarding/Welcome"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const PublicCreatorProfile = lazy(() => import("@/pages/creators/PublicProfile"));
const AdminCreatorManagement = lazy(() => import("@/pages/admin/CreatorManagement"));

// Guards
import AdminGuard from "@/components/admin/AdminGuard";

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <RoleProvider>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Landing page (own nav/footer) */}
                  <Route path="/" element={<Index />} />

                  {/* Public Routes (with shared Navbar & Footer) */}
                  <Route element={<IndexLayout />}>
                    <Route path="/brands" element={<BrandsLandingPage />} />
                    <Route path="/creators" element={<CreatorsLandingPage />} />
                    <Route path="/campaigns" element={<BrowseCampaigns />} />
                    <Route path="/campaigns/:id" element={<CampaignDetail />} />
                  </Route>

                  {/* Auth Routes (plain) */}
                  <Route path="/auth" element={<Auth />} />
                  
                  {/* Public Creator Profile */}
                  <Route path="/c/:username" element={<PublicCreatorProfile />} />
                  
                  {/* Legal Pages */}
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  
                  {/* Onboarding Routes - Protected but accessible for incomplete profiles */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/onboarding" element={<Welcome />} />
                    <Route path="/onboarding/brand" element={<BrandOnboarding />} />
                    <Route path="/onboarding/creator" element={<CreatorOnboarding />} />
                  </Route>

                  {/* Brand Dashboard Routes - Only for Brands */}
                  <Route element={<ProtectedRoute allowedRoles={['brand']} />}>
                    <Route path="/dashboard/brand" element={<BrandDashboard />} />
                    <Route path="/dashboard/brand/campaigns/new" element={<CreateCampaign />} />
                  </Route>

                  {/* Creator Dashboard Routes - Only for Creators */}
                  <Route element={<ProtectedRoute allowedRoles={['creator']} />}>
                    <Route path="/dashboard/creator" element={<CreatorDashboard />} />
                    <Route path="/dashboard/creator/wallet" element={<CreatorWallet />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route element={<AdminGuard />}>
                    <Route path="/admin/creators" element={<AdminCreatorManagement />} />
                  </Route>

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </RoleProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
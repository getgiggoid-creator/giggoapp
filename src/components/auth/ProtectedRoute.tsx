import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  allowedRoles?: ('brand' | 'creator')[];
}

/**
 * ProtectedRoute - Handles authentication, onboarding, and role-based access control
 * 
 * Flow:
 * 1. Not authenticated → Redirect to /auth
 * 2. Authenticated but no role → Redirect to /onboarding (shouldn't happen normally)
 * 3. Authenticated with role but incomplete onboarding → Redirect to role-specific onboarding
 * 4. Authenticated, onboarded, but wrong role for route → Redirect to correct dashboard
 * 5. All checks pass → Render child routes
 */
const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, role, isLoading, hasCompletedOnboarding } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // 1. Not authenticated → Redirect to login
  if (!user) {
    // Save the attempted location for redirect after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 2. User exists but no role assigned → Edge case, redirect to welcome
  if (!role) {
    // This shouldn't happen in normal flow, but handle gracefully
    return <Navigate to="/onboarding" replace />;
  }

  // Check if current path is an onboarding path
  const isOnboardingPath = location.pathname.startsWith('/onboarding');
  const isRoleMatchedOnboarding = 
    (role === 'brand' && location.pathname === '/onboarding/brand') ||
    (role === 'creator' && location.pathname === '/onboarding/creator');
  const isWelcomePath = location.pathname === '/onboarding';

  // 3. Handle onboarding routing
  if (isOnboardingPath) {
    // Already completed onboarding → Redirect to dashboard
    if (hasCompletedOnboarding) {
      const dashboardPath = role === 'brand' ? '/dashboard/brand' : '/dashboard/creator';
      return <Navigate to={dashboardPath} replace />;
    }

    // On welcome page with role → Redirect to role-specific onboarding
    if (isWelcomePath && role) {
      const onboardingPath = role === 'brand' ? '/onboarding/brand' : '/onboarding/creator';
      return <Navigate to={onboardingPath} replace />;
    }

    // On wrong role's onboarding page → Redirect to correct one
    if (!isWelcomePath && !isRoleMatchedOnboarding) {
      const onboardingPath = role === 'brand' ? '/onboarding/brand' : '/onboarding/creator';
      return <Navigate to={onboardingPath} replace />;
    }

    // Correct onboarding page, allow access
    return <Outlet />;
  }

  // 4. Not on onboarding path but hasn't completed onboarding → Force onboarding
  if (!hasCompletedOnboarding) {
    const onboardingPath = role === 'brand' ? '/onboarding/brand' : '/onboarding/creator';
    return <Navigate to={onboardingPath} replace />;
  }

  // 5. Role-based access control for protected routes
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) {
      // User trying to access route they don't have permission for
      // Redirect to their correct dashboard instead of home
      const correctDashboard = role === 'brand' ? '/dashboard/brand' : '/dashboard/creator';
      return <Navigate to={correctDashboard} replace />;
    }
  }

  // All checks passed → Render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
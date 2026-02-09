import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type AppRole = 'brand' | 'creator';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  signUp: (email: string, password: string, name: string, role: AppRole) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface ProfileCheckResult {
  hasProfile: boolean;
  error?: Error;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State Management
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  /**
   * Check if user has completed their profile based on role
   * Returns structured result instead of just updating state
   */
  const checkProfileCompletion = async (
    userId: string, 
    userRole: AppRole
  ): Promise<ProfileCheckResult> => {
    try {
      const tableName = userRole === 'brand' ? 'brand_profiles' : 'creator_profiles';
      
      const { data, error } = await supabase
        .from(tableName)
        .select('id')
        .eq('user_id', userId)
        .maybeSingle(); // Use maybeSingle() instead of single() to avoid errors when no rows exist

      if (error) {
        console.error(`Error checking ${userRole} profile:`, error);
        return { hasProfile: false, error };
      }

      return { hasProfile: !!data };
    } catch (error) {
      console.error('Unexpected error in checkProfileCompletion:', error);
      return { 
        hasProfile: false, 
        error: error instanceof Error ? error : new Error('Unknown error occurred')
      };
    }
  };

  /**
   * Fetch user role and onboarding status
   * Centralized data fetching for consistency
   */
  const fetchUserData = async (userId: string): Promise<void> => {
    try {
      // Fetch role from database
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (roleError) {
        console.error('Error fetching user role:', roleError);
        setRole(null);
        setHasCompletedOnboarding(false);
        return;
      }

      if (!roleData) {
        console.warn('No role found for user:', userId);
        setRole(null);
        setHasCompletedOnboarding(false);
        return;
      }

      const userRole = roleData.role as AppRole;
      setRole(userRole);

      // Check profile completion
      const profileResult = await checkProfileCompletion(userId, userRole);
      setHasCompletedOnboarding(profileResult.hasProfile);

    } catch (error) {
      console.error('Unexpected error in fetchUserData:', error);
      setRole(null);
      setHasCompletedOnboarding(false);
    }
  };

  /**
   * Public function to manually refresh profile status
   * Useful after completing onboarding
   */
  const refreshProfile = async (): Promise<void> => {
    if (!user || !role) {
      console.warn('Cannot refresh profile: user or role is missing');
      return;
    }

    try {
      const profileResult = await checkProfileCompletion(user.id, role);
      setHasCompletedOnboarding(profileResult.hasProfile);
    } catch (error) {
      console.error('Error refreshing profile:', error);
      // Don't throw - just log the error
    }
  };

  /**
   * Reset all auth-related state
   */
  const resetAuthState = (): void => {
    setUser(null);
    setSession(null);
    setRole(null);
    setHasCompletedOnboarding(false);
  };

  // ============================================================================
  // INITIALIZATION EFFECT
  // ============================================================================

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setIsLoading(false);
          }
          return;
        }

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserData(session.user.id);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        // Auth state change logged in development only
        if (import.meta.env.DEV) {
          console.log('Auth state changed:', event);
        }

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Show loading during auth transitions
          setIsLoading(true);
          await fetchUserData(session.user.id);
          setIsLoading(false);
        } else {
          // Reset state on sign out
          resetAuthState();
          setIsLoading(false);
        }
      }
    );

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array - only run once on mount

  // ============================================================================
  // AUTH METHODS
  // ============================================================================

  /**
   * Sign up a new user with email, password, name, and role
   */
  const signUp = async (
    email: string, 
    password: string, 
    name: string, 
    selectedRole: AppRole
  ): Promise<{ error: Error | null }> => {
    try {
      // Validate inputs
      if (!email || !password || !name || !selectedRole) {
        return { error: new Error('All fields are required') };
      }

      if (password.length < 6) {
        return { error: new Error('Password must be at least 6 characters') };
      }

      const redirectUrl = `${window.location.origin}/`;
      
      // Sign up user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { full_name: name }
        }
      });

      if (error) {
        return { error };
      }

      if (!data.user) {
        return { error: new Error('Sign up failed: no user returned') };
      }

      // Create user role entry
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({ 
          user_id: data.user.id, 
          role: selectedRole 
        });

      if (roleError) {
        console.error('Error creating user role:', roleError);
        return { error: roleError };
      }
      
      // Update local state for immediate UI responsiveness
      setRole(selectedRole);
      setHasCompletedOnboarding(false); // New users haven't completed onboarding

      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        error: error instanceof Error ? error : new Error('An unexpected error occurred during sign up')
      };
    }
  };

  /**
   * Sign in an existing user
   */
  const signIn = async (
    email: string, 
    password: string
  ): Promise<{ error: Error | null }> => {
    try {
      // Validate inputs
      if (!email || !password) {
        return { error: new Error('Email and password are required') };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      // State will be updated by onAuthStateChange listener
      return { error: null };
    } catch (error) {
      console.error('Signin error:', error);
      return { 
        error: error instanceof Error ? error : new Error('An unexpected error occurred during sign in')
      };
    }
  };

  /**
   * Sign out the current user
   * Fully clears session and local state
   */
  const signOut = async (): Promise<void> => {
    try {
      // Pre-emptively clear local state for immediate UI feedback
      resetAuthState();
      
      // Clear any cached role from localStorage
      localStorage.removeItem('giggo_active_role');
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        throw error;
      }

      // State already reset above, onAuthStateChange will confirm
    } catch (error) {
      console.error('Signout error:', error);
      toast.error('Failed to sign out. Please try again.');
      throw error; // Re-throw so caller can handle if needed
    }
  };

  // ============================================================================
  // CONTEXT PROVIDER
  // ============================================================================

  const contextValue: AuthContextType = {
    user,
    session,
    role,
    isLoading,
    hasCompletedOnboarding,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ============================================================================
// CUSTOM HOOK
// ============================================================================

/**
 * Hook to access auth context
 * Throws error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

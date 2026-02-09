import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Pastikan path ini sesuai

type Role = "creators" | "brands";

interface RoleContextType {
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  toggleRole: () => void; // Helper baru untuk mempermudah switching
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = "giggo_active_role";

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role: authRole, user } = useAuth(); // Ambil role asli dari database
  
  const [activeRole, setActiveRole] = useState<Role>(() => {
    const stored = localStorage.getItem(ROLE_STORAGE_KEY);
    // Validasi awal: jika stored role tidak valid, default ke 'creators'
    return stored === "brands" ? "brands" : "creators";
  });

  // 1. Sync Role dengan URL, TAPI validasi dengan Auth Role
  useEffect(() => {
    // Abaikan jika user belum login
    if (!user || !authRole) return;

    let targetRole: Role | null = null;

    if (location.pathname.startsWith("/dashboard/brand") || location.pathname === "/brands") {
      targetRole = "brands";
    } else if (location.pathname.startsWith("/dashboard/creator") || location.pathname === "/creators") {
      targetRole = "creators";
    }

    // Jika URL meminta role tertentu...
    if (targetRole) {
      // ...Cek apakah user punya izin? 
      // (Asumsi: 'brand' bisa lihat creator view, tapi 'creator' GABISA lihat brand view)
      if (authRole === "creator" && targetRole === "brands") {
        // Redirect paksa jika creator mencoba akses area brand
        console.warn("Unauthorized role access attempt");
        setActiveRole("creators");
        navigate("/dashboard/creator");
      } else {
        setActiveRole(targetRole);
      }
    }
  }, [location.pathname, authRole, user, navigate]);

  // 2. Persist role ke localStorage
  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, activeRole);
  }, [activeRole]);

  // 3. Helper function untuk toggle
  const toggleRole = () => {
    const newRole = activeRole === "brands" ? "creators" : "brands";
    setActiveRole(newRole);
  };

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
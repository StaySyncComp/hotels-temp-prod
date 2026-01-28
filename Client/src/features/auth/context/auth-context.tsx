import { createContext } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
type AuthContextType = ReturnType<typeof useAuth>;

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

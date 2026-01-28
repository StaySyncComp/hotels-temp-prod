import React, { ReactNode } from "react";
import { AuthContext } from "@/features/auth/context/auth-context"; // Adjust the import path as needed
import { useAuth } from "@/features/auth/hooks/useAuth";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const contextValue = auth;
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

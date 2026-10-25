"use client";
import { createContext, ReactNode } from "react";

export const AuthContext = createContext(false);

export function AuthProvider({
  children,
  isAuthenticated,
}: {
  children: ReactNode;
  isAuthenticated: boolean;
}) {
  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
}

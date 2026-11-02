import { useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getToken, setToken, subscribeToken } from "../lib/api/token";

interface AuthContextValue {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [token, setTokenState] = useState<string | null>(getToken);

  useEffect(
    () =>
      subscribeToken((next) => {
        setTokenState(next);
        if (!next) queryClient.clear();
      }),
    [queryClient],
  );

  const signIn = useCallback((next: string) => {
    setToken(next);
  }, []);
  const signOut = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo(() => ({ token, signIn, signOut }), [token, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

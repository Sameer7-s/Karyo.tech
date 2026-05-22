import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AdminUser, adminApi, clearToken, getToken, setToken } from "../api/adminApi";

type AuthContextValue = {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAdmin: (admin: AdminUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const verify = useCallback(async () => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    try {
      const response = await adminApi.me();
      setAdmin(response.admin);
    } catch (_error) {
      clearToken();
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verify();
  }, [verify]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await adminApi.login(email, password);
    setToken(response.token);
    setAdmin(response.admin);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (getToken()) await adminApi.logout();
    } catch (_error) {
      // Token removal is the real logout source of truth on the client.
    } finally {
      clearToken();
      setAdmin(null);
    }
  }, []);

  const value = useMemo(() => ({ admin, loading, login, logout, refreshAdmin: setAdmin }), [admin, loading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

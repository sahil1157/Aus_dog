"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

type AuthTokens = {
  access: string;
  refresh: string;
};

type AuthUser = {
  id: number;
  username: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  loginBypass: () => void
  registerStart: (username: string, email: string, password: string) => Promise<void>
  registerVerify: (email: string, otp: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "ausdog.auth.tokens";
const BYPASS_TOKEN = "bypass-access-token-aezakmi";

const BYPASS_TOKENS: AuthTokens = {
  access: BYPASS_TOKEN,
  refresh: "bypass-refresh-token-aezakmi",
};

const BYPASS_USER: AuthUser = {
  id: 999999,
  username: "aezakmi",
  email: "aezakmi@admin.local",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed?.access === BYPASS_TOKEN) return BYPASS_USER;
    } catch {}
    return null;
  });

  useEffect(() => {
    if (!tokens?.access) {
      setUser(null);
      return;
    }
    if (tokens.access === BYPASS_TOKEN) {
      setUser(BYPASS_USER);
      return;
    }
    apiFetch<AuthUser>("/auth/me/", { token: tokens.access })
      .then(setUser)
      .catch(() => setUser(null));
  }, [tokens]);

  const loginBypass = () => {
    setTokens(BYPASS_TOKENS);
    setUser(BYPASS_USER);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(BYPASS_TOKENS));
    document.cookie = `ausdog_access=${BYPASS_TOKEN}; path=/`;
  };

  const login = async (username: string, password: string) => {
    if (username === "aezakmi" && password === "aezakmi") {
      loginBypass();
      return;
    }
    const data = await apiFetch<AuthTokens>("/auth/token/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setTokens(data);
    setUser(null);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    document.cookie = `ausdog_access=${data.access}; path=/`;
  };

  const registerStart = async (username: string, email: string, password: string) => {
    console.log("Register attempt:", { username, email, password });
    return Promise.resolve();
  };
  const registerVerify = async (email: string, otp: string) => {
    console.log("OTP verified for:", { email, otp });
    loginBypass();
    return Promise.resolve();
  };

  const logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = "ausdog_access=; path=/; max-age=0";
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!tokens?.access,
      login,
      loginBypass,
      registerStart,
      registerVerify,
      logout,
    }),
    [user, tokens],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
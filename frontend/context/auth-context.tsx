'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { apiFetch } from "@/lib/api"

type AuthTokens = {
  access: string
  refresh: string
}

type AuthUser = {
  id: number
  username: string
  email: string
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = "ausdog.auth.tokens"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  
  // ✅ Safe lazy init (no effect, no warning)
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    if (typeof window === "undefined") return null
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const [user, setUser] = useState<AuthUser | null>(null)

  // ✅ Fetch user (valid effect usage)
  useEffect(() => {
    if (!tokens?.access) return

    apiFetch<AuthUser>("/auth/me/", { token: tokens.access })
      .then(setUser)
      .catch(() => setUser(null))
  }, [tokens])

  // ✅ Login
  const login = async (username: string, password: string) => {
    const data = await apiFetch<AuthTokens>("/auth/token/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })

    setTokens(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  // ✅ Logout
  const logout = () => {
    setTokens(null)
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!tokens?.access,
      login,
      logout,
    }),
    [user, tokens]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
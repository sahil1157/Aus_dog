'use client'

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { useAuth } from "@/context/auth-context"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get("next") ?? "/"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-extrabold">Login</h1>
        <p className="text-gray-600 mt-2">
          Don’t have an account?{" "}
          <Link className="text-[#ee6d49] font-semibold" href="/register">
            Create one
          </Link>
        </p>

        <div className="mt-7 space-y-3">
          <input
            className="border rounded-lg px-4 py-3 w-full"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border rounded-lg px-4 py-3 w-full"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={submitting}
            className="w-full bg-[#ee6d49] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            onClick={async () => {
              setSubmitting(true)
              try {
                await login(username, password)
                toast.success("Logged in")
                router.replace(next)
              } catch (e: unknown) {
                toast.error(e instanceof Error ? e.message : "Login failed")
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {submitting ? "Signing in…" : "Login"}
          </button>
        </div>
      </div>
    </div>
  )
}


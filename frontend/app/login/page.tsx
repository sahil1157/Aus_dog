'use client'
export const dynamic = 'force-dynamic'

import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"

// Move the main logic to a separate component
function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get("next") ?? "/dashboard"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter username and password")
      return
    }

    setSubmitting(true)
    try {
      await login(username, password)
      toast.success("Logged in successfully!")
      router.push(next)
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Login failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-14 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800">Login</h1>
        <p className="text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link className="text-[#ff9167] font-semibold hover:underline" href="/register">
            Create one
          </Link>
        </p>

        <div className="mt-7 space-y-4">
          <input
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff9167]"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff9167]"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <button
            disabled={submitting}
            className="w-full bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg transition-all cursor-pointer"
            onClick={handleLogin}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Demo: aezakmi / aezakmi
          </p>
        </div>
      </div>
    </div>
  )
}

// Main page component with Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
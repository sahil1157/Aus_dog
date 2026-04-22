'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { useAuth } from "@/context/auth-context"

export default function RegisterPage() {
  const { registerStart, registerVerify } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState<"start" | "verify">("start")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-extrabold">Create account</h1>
        <p className="text-gray-600 mt-2">
          Already have an account?{" "}
          <Link className="text-[#ee6d49] font-semibold" href="/login">
            Login
          </Link>
        </p>

        {step === "start" && (
          <div className="mt-7 space-y-3">
            <input
              className="border rounded-lg px-4 py-3 w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border rounded-lg px-4 py-3 w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border rounded-lg px-4 py-3 w-full"
              placeholder="Password (min 8 chars)"
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
                  await registerStart(username, email, password)
                  toast.success("OTP sent to your email")
                  setStep("verify")
                } catch (e: unknown) {
                  toast.error(e instanceof Error ? e.message : "Registration failed")
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {submitting ? "Sending OTP…" : "Send OTP"}
            </button>
          </div>
        )}

        {step === "verify" && (
          <div className="mt-7 space-y-3">
            <div className="text-sm text-gray-600">
              Enter the 6-digit code sent to <span className="font-semibold">{email}</span>.
            </div>
            <input
              className="border rounded-lg px-4 py-3 w-full tracking-widest text-center text-lg"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />

            <button
              disabled={submitting || otp.length !== 6}
              className="w-full bg-[#ee6d49] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              onClick={async () => {
                setSubmitting(true)
                try {
                  await registerVerify(email, otp)
                  toast.success("Account verified")
                  router.replace("/")
                } catch (e: unknown) {
                  toast.error(e instanceof Error ? e.message : "OTP verification failed")
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {submitting ? "Verifying…" : "Verify & Create account"}
            </button>

            <button
              className="w-full border rounded-lg py-3 font-semibold"
              onClick={() => setStep("start")}
            >
              Change details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


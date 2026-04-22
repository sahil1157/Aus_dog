'use client'

import { useMemo, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { apiFetch } from "@/lib/api"
import { toast } from "sonner"

type ShippingAddress = {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  phone?: string
}

type ShippingQuote = {
  amount: number
  currency: string
  rate_name: string
}

type CheckoutCreateResponse = {
  order_id: number
  currency: string
  amount: number
  client_secret: string
  shipping: { amount: number; rate_name: string }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "")

function StripePay() {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setSubmitting(true)
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/checkout/success`
          }
        })
        setSubmitting(false)
        if (error) toast.error(error.message ?? "Payment failed")
      }}
      className="space-y-4"
    >
      <PaymentElement />
      <button
        disabled={!stripe || !elements || submitting}
        className="w-full bg-[#ee6d49] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {submitting ? "Processing…" : "Pay now"}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const { cart } = useCart()
  const { isAuthenticated, login, tokens, user } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [addr, setAddr] = useState<ShippingAddress>({
    full_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "AU",
    phone: ""
  })

  const [quote, setQuote] = useState<ShippingQuote | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  )

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-gray-600 mt-2">Add products to continue checkout.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Left: forms */}
        <div className="bg-white rounded-2xl shadow p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold">Checkout</h1>
            <p className="text-gray-600 mt-1">Secure payment + delivery fee by location.</p>
          </div>

          {!isAuthenticated && (
            <div className="border rounded-xl p-5 bg-orange-50/40">
              <h2 className="text-lg font-bold mb-3">Login required before payment</h2>
              <div className="grid gap-3">
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bg-[#ee6d49] text-white py-3 rounded-lg font-semibold"
                  onClick={async () => {
                    try {
                      await login(username, password)
                      toast.success("Logged in")
                    } catch (e: unknown) {
                      toast.error(e instanceof Error ? e.message : "Login failed")
                    }
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          )}

          {isAuthenticated && (
            <div className="text-sm text-gray-600">
              Logged in as <span className="font-semibold">{user?.username}</span>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-bold">Shipping details</h2>
            <div className="grid gap-3">
              <input
                className="border rounded-lg px-4 py-3"
                placeholder="Full name"
                value={addr.full_name}
                onChange={(e) => setAddr((a) => ({ ...a, full_name: e.target.value }))}
              />
              <input
                className="border rounded-lg px-4 py-3"
                placeholder="Address line 1"
                value={addr.address_line1}
                onChange={(e) => setAddr((a) => ({ ...a, address_line1: e.target.value }))}
              />
              <input
                className="border rounded-lg px-4 py-3"
                placeholder="Address line 2 (optional)"
                value={addr.address_line2 ?? ""}
                onChange={(e) => setAddr((a) => ({ ...a, address_line2: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="City"
                  value={addr.city}
                  onChange={(e) => setAddr((a) => ({ ...a, city: e.target.value }))}
                />
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="State"
                  value={addr.state ?? ""}
                  onChange={(e) => setAddr((a) => ({ ...a, state: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="Postcode"
                  value={addr.postal_code}
                  onChange={(e) => setAddr((a) => ({ ...a, postal_code: e.target.value }))}
                />
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="Country (ISO2 e.g. AU)"
                  value={addr.country}
                  onChange={(e) => setAddr((a) => ({ ...a, country: e.target.value.toUpperCase() }))}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="border-2 border-[#ee6d49] text-[#ee6d49] px-4 py-3 rounded-lg font-semibold"
                onClick={async () => {
                  try {
                    const q = await apiFetch<ShippingQuote>("/shipping/quote/", {
                      method: "POST",
                      body: JSON.stringify({
                        country: addr.country,
                        state: addr.state ?? "",
                        postal_code: addr.postal_code
                      })
                    })
                    setQuote(q)
                    toast.success(`Delivery: ${(q.amount / 100).toFixed(2)} ${q.currency.toUpperCase()}`)
                  } catch (e: unknown) {
                    toast.error(e instanceof Error ? e.message : "Failed to quote shipping")
                  }
                }}
              >
                Calculate delivery
              </button>

              <button
                disabled={!isAuthenticated || !tokens?.access}
                className="bg-[#ee6d49] text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
                onClick={async () => {
                  try {
                    const data = await apiFetch<CheckoutCreateResponse>("/checkout/create/", {
                      method: "POST",
                      token: tokens?.access,
                      body: JSON.stringify({
                        items: cart.map((c) => ({
                          product_id: c.id,
                          variant_color: c.color,
                          quantity: c.quantity
                        })),
                        shipping_address: addr
                      })
                    })
                    setClientSecret(data.client_secret)
                    toast.success("Payment ready")
                  } catch (e: unknown) {
                    toast.error(e instanceof Error ? e.message : "Checkout failed")
                  }
                }}
              >
                Continue to payment
              </button>
            </div>

            {quote && (
              <div className="text-sm text-gray-700">
                Delivery: <span className="font-semibold">{(quote.amount / 100).toFixed(2)} {quote.currency.toUpperCase()}</span> ({quote.rate_name})
              </div>
            )}
          </div>
        </div>

        {/* Right: order summary + payment */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-lg font-bold mb-4">Order summary</h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={`${item.id}-${item.color}`} className="flex justify-between text-sm">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-500">Color: {item.color} • Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="border-t mt-5 pt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-semibold">
                  {quote ? `$${(quote.amount / 100).toFixed(2)}` : "—"}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-extrabold">
                  {quote ? `$${(subtotal + quote.amount / 100).toFixed(2)}` : "—"}
                </span>
              </div>
            </div>
          </div>

          {clientSecret && (
            <div className="bg-white rounded-2xl shadow p-8">
              <h2 className="text-lg font-bold mb-4">Payment</h2>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePay />
              </Elements>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


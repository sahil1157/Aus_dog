"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

type ShippingAddress = {
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  phone?: string;
};

type ShippingQuote = {
  amount: number;
  currency: string;
  rate_name: string;
};

export default function CheckoutPage() {
  const { cart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [processingPayment, setProcessingPayment] = useState(false);

  const [addr, setAddr] = useState<ShippingAddress>({
    full_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "AU",
    phone: "",
  });

  const [quote, setQuote] = useState<ShippingQuote | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?next=/checkout");
    }
  }, [isAuthenticated, router]);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const total = quote ? subtotal + quote.amount / 100 : subtotal;

  const handlePayment = async () => {
    if (
      !addr.full_name ||
      !addr.address_line1 ||
      !addr.city ||
      !addr.postal_code
    ) {
      toast.error("Please fill in all shipping details");
      return;
    }

    setProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      // Create order object
      const newOrder = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString(),
        total: total,
        subtotal: subtotal,
        shipping: quote ? quote.amount / 100 : 0,
        status: "processing",
        items: cart.length,
        cartItems: cart.map((item) => ({
          ...item,
          subtotal: item.price * item.quantity,
        })),
        shippingAddress: addr,
        userName: user?.username || "aezakmi",
        userEmail: user?.email || "admin@ausdog.com",
        timestamp: new Date().toISOString(),
      };

      // Get existing orders
      const existingOrders = localStorage.getItem("ausdog_orders");
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.unshift(newOrder);
      localStorage.setItem("ausdog_orders", JSON.stringify(orders));

      toast.success("Payment successful! Redirecting to dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }, 1500);
  };

  // Show loading while checking auth
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 text-center">
          <div className="animate-pulse">Checking authentication...</div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-gray-600 mt-2">
            Add products to continue checkout.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 bg-[#ee6d49] text-white px-6 py-2 rounded-lg hover:bg-[#df6839] transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Left: forms */}
        <div className="bg-white rounded-2xl shadow p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold">Checkout</h1>
            <p className="text-gray-600 mt-1">Complete your purchase</p>
          </div>

          {/* Logged in as user */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              ✅ Logged in as{" "}
              <span className="font-semibold">{user?.username || "Admin"}</span>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold">Shipping details</h2>
            <div className="grid gap-3">
              <input
                className="border rounded-lg px-4 py-3"
                placeholder="Full name *"
                value={addr.full_name}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, full_name: e.target.value }))
                }
              />
              <input
                className="border rounded-lg px-4 py-3"
                placeholder="Address line 1 *"
                value={addr.address_line1}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, address_line1: e.target.value }))
                }
              />
              <input
                className="border rounded-lg px-4 py-3"
                placeholder="Address line 2 (optional)"
                value={addr.address_line2 ?? ""}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, address_line2: e.target.value }))
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="City *"
                  value={addr.city}
                  onChange={(e) =>
                    setAddr((a) => ({ ...a, city: e.target.value }))
                  }
                />
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="State"
                  value={addr.state ?? ""}
                  onChange={(e) =>
                    setAddr((a) => ({ ...a, state: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="Postcode *"
                  value={addr.postal_code}
                  onChange={(e) =>
                    setAddr((a) => ({ ...a, postal_code: e.target.value }))
                  }
                />
                <input
                  className="border rounded-lg px-4 py-3"
                  placeholder="Country"
                  value={addr.country}
                  onChange={(e) =>
                    setAddr((a) => ({
                      ...a,
                      country: e.target.value.toUpperCase(),
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                className="border-2 border-[#ee6d49] text-[#ee6d49] px-4 py-3 rounded-lg font-semibold cursor-pointer hover:bg-purple-50 transition"
                onClick={async () => {
                  try {
                    const q = await apiFetch<ShippingQuote>(
                      "/shipping/quote/",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          country: addr.country,
                          state: addr.state ?? "",
                          postal_code: addr.postal_code,
                        }),
                      },
                    );
                    setQuote(q);
                    toast.success(
                      `Delivery: ${(q.amount / 100).toFixed(2)} ${q.currency.toUpperCase()}`,
                    );
                  } catch (e: unknown) {
                    toast.error(
                      e instanceof Error
                        ? e.message
                        : "Failed to quote shipping",
                    );
                  }
                }}
              >
                Calculate delivery
              </button>
            </div>

            {quote && (
              <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                Delivery:{" "}
                <span className="font-semibold">
                  ${(quote.amount / 100).toFixed(2)}{" "}
                  {quote.currency.toUpperCase()}
                </span>{" "}
                ({quote.rate_name})
              </div>
            )}
          </div>
        </div>

        {/* Right: order summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-lg font-bold mb-4">Order summary</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.material}-${item.size}`}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-500 text-xs">
                      {item.color} • {item.material} • {item.size} • Qty:{" "}
                      {item.quantity}
                    </div>
                  </div>
                  <div className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
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
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-extrabold text-[#d56539] text-xl">
                    {quote
                      ? `$${(subtotal + quote.amount / 100).toFixed(2)}`
                      : `$${subtotal.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processingPayment}
              className={`w-full mt-6 py-3 rounded-lg font-semibold transition cursor-pointer ${
                processingPayment
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#ee6d49] hover:bg-[#df6839] text-white"
              }`}
            >
              {processingPayment ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                `Pay Now $${quote ? (subtotal + quote.amount / 100).toFixed(2) : subtotal.toFixed(2)}`
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Secure payment powered by AusDog
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

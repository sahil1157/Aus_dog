"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";
import {
  User,
  CheckCircle,
  Clock,
  ShoppingBag,
  LogOut,
  ChevronRight,
  Eye,
  ShoppingCart,
  Truck,
  AlertCircle,
  Trash2,
} from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  material: string;
  size: string;
  image: string;
};

type Order = {
  id: string;
  status: string;
  date: string;
  total: number;
  items: number;
  orderItems?: CartItem[];
};

type SavedCart = {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
  cartItems: CartItem[];
};

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedOrders = localStorage.getItem("ausdog_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login?next=/dashboard");
    }
  }, [mounted, isAuthenticated, router]);

  const completedOrders = orders.filter(
    (o) => o.status === "delivered" || o.status === "completed",
  );
  const pendingOrders = orders.filter(
    (o) => o.status === "processing" || o.status === "pending",
  );

  // Saved carts = current cart only (synced with actual cart)
  const currentCart: SavedCart | null =
    cart.length > 0
      ? {
          id: "CART-CURRENT",
          date: new Date().toISOString().split("T")[0],
          total: cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          ),
          status: "active",
          items: cart.length,
          cartItems: cart,
        }
      : null;

  const allCarts: SavedCart[] = currentCart ? [currentCart] : [];

  const menuItems = [
    { id: "overview", label: "Overview", icon: User, color: "text-orange-500" },
    {
      id: "completed",
      label: "Completed Orders",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: "pending",
      label: "Pending Orders",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      id: "cart",
      label: "Saved Carts",
      icon: ShoppingBag,
      color: "text-blue-600",
    },
  ];

  const handleViewOrder = (order: Order) => {
    localStorage.setItem("view_order", JSON.stringify(order));
    router.push(`/dashboard/order/${order.id}`);
  };

  const handleTrackOrder = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  const handleRemoveCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fff8f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9167]" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#fff8f5] pb-12 px-4">
      <div className="max-w-7xl mx-auto pt-16">
        {/* Coming Soon Toast */}
        {showComingSoon && (
          <div className="fixed top-24 right-4 z-50">
            <div className="bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <AlertCircle size={20} />
              <span className="font-semibold">
                Track Order feature coming soon!
              </span>
            </div>
          </div>
        )}
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff9167] to-[#df6839] rounded-xl flex items-center justify-center shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back, {user?.username || "Customer"}!
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                  {user?.email || "customer@example.com"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="flex items-center gap-2 px-4 py-2 border-2 border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-all font-semibold text-sm cursor-pointer"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 sticky top-24">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-[#fff4f0] to-[#fff8f5]">
                <p className="font-bold text-gray-700 text-sm uppercase tracking-wider">
                  My Account
                </p>
              </div>
              <nav className="p-3 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white shadow-md"
                        : "hover:bg-orange-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={17}
                        className={
                          activeTab === item.id ? "text-white" : item.color
                        }
                      />
                      <span className="font-semibold text-sm">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight
                      size={15}
                      className={
                        activeTab === item.id ? "text-white" : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </nav>

              {/* Continue Shopping at the very bottom of sidebar */}
              <div className="p-3 border-t border-orange-100">
                <button
                  onClick={() => router.push("/products")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ff9167] font-bold text-sm transition-all cursor-pointer"
                >
                  <ShoppingCart size={16} /> Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Completed Orders",
                      count: completedOrders.length,
                      icon: CheckCircle,
                      bg: "bg-green-50",
                      iconColor: "text-green-600",
                      tab: "completed",
                    },
                    {
                      label: "Pending Orders",
                      count: pendingOrders.length,
                      icon: Clock,
                      bg: "bg-yellow-50",
                      iconColor: "text-yellow-600",
                      tab: "pending",
                    },
                    {
                      label: "Saved Carts",
                      count: allCarts.length,
                      icon: ShoppingBag,
                      bg: "bg-blue-50",
                      iconColor: "text-blue-600",
                      tab: "cart",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.tab}
                      onClick={() => setActiveTab(stat.tab)}
                      className="bg-white rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-lg transition-all border border-transparent hover:border-orange-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center`}
                        >
                          <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                        </div>
                        <span className="text-3xl font-extrabold text-gray-800">
                          {stat.count}
                        </span>
                      </div>
                      <p className="font-bold text-gray-700 text-sm">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 border border-orange-50">
                  <h3 className="font-bold text-xl mb-4 text-gray-800">
                    Recent Activity
                  </h3>
                  {pendingOrders.length === 0 &&
                  completedOrders.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No orders yet
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {[...pendingOrders, ...completedOrders]
                        .slice(0, 3)
                        .map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 transition-all"
                          >
                            <div>
                              <p className="font-bold text-sm">
                                Order #{order.id}
                              </p>
                              <p className="text-xs text-gray-400">
                                {order.status} • {order.date}
                              </p>
                            </div>
                            <span className="text-[#ff9167] font-extrabold">
                              ${order.total?.toFixed(2)}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* COMPLETED ORDERS TAB */}
            {activeTab === "completed" && (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-orange-50">
                <h3 className="font-bold text-2xl mb-6 text-gray-800">
                  Completed Orders
                </h3>
                {completedOrders.length === 0 ? (
                  <p className="text-gray-400 text-center py-12">
                    No completed orders yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {completedOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-200 transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-extrabold text-gray-800">
                              Order #{order.id}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {order.date}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            {order.status}
                          </span>
                        </div>
                        {order.orderItems && order.orderItems.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {order.orderItems.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 bg-gray-50 rounded-xl p-2"
                              >
                                <div className="w-12 h-12 bg-white rounded-lg border overflow-hidden flex-shrink-0">
                                  <Image
                                    src={
                                      item.image || "/images/placeholder.jpg"
                                    }
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="object-contain w-full h-full p-1"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-bold text-sm">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {item.color} • {item.material} • {item.size}{" "}
                                    • Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-extrabold text-[#ff9167] text-sm">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <p className="text-sm text-gray-500">
                            {order.items} items
                          </p>
                          <p className="font-extrabold text-[#ff9167]">
                            ${order.total?.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="mt-3 text-sm text-[#ff9167] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Eye size={13} /> View Details →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PENDING ORDERS TAB */}
            {activeTab === "pending" && (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-orange-50">
                <h3 className="font-bold text-2xl mb-6 text-gray-800">
                  Pending Orders
                </h3>
                {pendingOrders.length === 0 ? (
                  <p className="text-gray-400 text-center py-12">
                    No pending orders
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-200 transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-extrabold text-gray-800">
                              Order #{order.id}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {order.date}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                            {order.status}
                          </span>
                        </div>
                        {order.orderItems && order.orderItems.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {order.orderItems.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 bg-gray-50 rounded-xl p-2"
                              >
                                <div className="w-12 h-12 bg-white rounded-lg border overflow-hidden flex-shrink-0">
                                  <Image
                                    src={
                                      item.image || "/images/placeholder.jpg"
                                    }
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="object-contain w-full h-full p-1"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-bold text-sm">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {item.color} • {item.material} • {item.size}{" "}
                                    • Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-extrabold text-[#ff9167] text-sm">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <p className="text-sm text-gray-500">
                            {order.items} items
                          </p>
                          <p className="font-extrabold text-[#ff9167]">
                            ${order.total?.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={handleTrackOrder}
                          className="mt-3 text-sm text-[#ff9167] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Truck size={13} /> Track Order →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SAVED CARTS TAB - with Remove button */}
            {activeTab === "cart" && (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-orange-50">
                <h3 className="font-bold text-2xl text-gray-800 mb-6">
                  Saved Carts
                </h3>
                {allCarts.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400">Your cart is empty.</p>
                    <button
                      onClick={() => router.push("/products")}
                      className="mt-4 px-5 py-2 bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {allCarts.map((savedCart) => (
                      <div
                        key={savedCart.id}
                        className="border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-200 transition-all"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-extrabold text-gray-800">
                              🛒 Current Cart
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {savedCart.date}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                            active
                          </span>
                        </div>

                        {savedCart.cartItems?.length > 0 && (
                          <div className="space-y-2 mb-4 max-h-56 overflow-y-auto">
                            {savedCart.cartItems.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 bg-gray-50 rounded-xl p-2"
                              >
                                <div className="w-12 h-12 bg-white rounded-lg border overflow-hidden flex-shrink-0">
                                  <Image
                                    src={
                                      item.image || "/images/placeholder.jpg"
                                    }
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="object-contain w-full h-full p-1"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-sm truncate">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {item.color} • {item.material} • {item.size}{" "}
                                    • Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-extrabold text-[#ff9167] text-sm flex-shrink-0">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-500 font-semibold">
                            {savedCart.items} items
                          </p>
                          <p className="font-extrabold text-[#ff9167] text-lg">
                            ${savedCart.total.toFixed(2)}
                          </p>
                        </div>

                        {/* Remove button only - positioned on the right */}
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={handleRemoveCart}
                            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer border border-red-200"
                          >
                            <Trash2 size={16} /> Remove Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

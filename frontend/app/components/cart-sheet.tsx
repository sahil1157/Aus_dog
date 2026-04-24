"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCart } from "@/context/cart-context";

export default function CartSheet() {
  const [mounted, setMounted] = useState(false);

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingCart className="w-8 h-7 text-[#ff9167] cursor-pointer hover:text-[#df6839] transition-colors duration-300" />

          {/* ✅ Only render badge after client mount */}
          {mounted && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#60a879] text-white text-xs rounded-full px-2">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-[450px] sm:w-[540px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl">Your Cart</SheetTitle>
          <p className="text-sm text-gray-500 mt-1">
            {mounted ? totalItems : 0} {totalItems === 1 ? "item" : "items"}
          </p>
        </SheetHeader>

        <div className="mt-6 space-y-6 h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {mounted && cart.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <Link
                href="/"
                className="inline-block mt-4 text-[#ff9167] hover:underline"
              >
                Continue Shopping →
              </Link>
            </div>
          )}

          {mounted &&
            cart.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.material}-${item.size}`}
                className="flex gap-4 border-b pb-4 last:border-0"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-base">{item.name}</h4>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                    <p className="text-sm text-gray-600">
                      Material: {item.material}
                    </p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                  </div>
                  <p className="text-[#d56539] font-bold mt-2">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        decreaseQty(
                          item.id,
                          item.color,
                          item.material,
                          item.size,
                        )
                      }
                      className="border border-gray-300 p-1 rounded hover:border-[#ff9167] transition"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="font-medium w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(
                          item.id,
                          item.color,
                          item.material,
                          item.size,
                        )
                      }
                      className="border border-gray-300 p-1 rounded hover:border-[#ff9167] transition"
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.color,
                          item.material,
                          item.size,
                        )
                      }
                      className="ml-auto text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {mounted && cart.length > 0 && (
          <div className="pt-4 pb-6 px-4 mt-4 border-t sticky bottom-0 bg-white">
            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-[#d56539]">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block text-center w-full mt-4 bg-[#ff9167] text-white py-3 rounded-lg hover:bg-[#df6839] transition font-semibold"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="block text-center w-full mt-2 text-sm text-gray-500 hover:text-[#ff9167] transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

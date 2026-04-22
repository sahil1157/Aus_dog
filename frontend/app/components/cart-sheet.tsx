'use client'

import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"

import { useCart } from "@/context/cart-context"

export default function CartSheet() {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useCart()

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  return (
    <Sheet>

      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingCart className="w-8 h-7 text-white cursor-pointer " />

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#60a879] text-white text-xs rounded-full px-2">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-[400px]">

        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {cart.length === 0 && (
            <p className="text-gray-500">
              Your cart is empty
            </p>
          )}

          {cart.map(item => (
            <div
              key={`${item.id}-${item.color}`}
              className="flex gap-4 border-b pb-4"
            >

              <Image
                src={item.image}
                alt={item.name}
                width={70}
                height={70}
                className="rounded-md object-contain"
              />

              <div className="flex-1">

                <h4 className="font-semibold">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-500">
                  Color: {item.color}
                </p>

                <p className="text-[#d56539] font-bold">
                  ${item.price}
                </p>

                {/* Quantity Controls */}

                <div className="flex items-center gap-3 mt-2">

                  <button
                    onClick={() =>
                      decreaseQty(item.id, item.color)
                    }
                    className="border p-1 rounded"
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQty(item.id, item.color)
                    }
                    className="border p-1 rounded"
                  >
                    <Plus size={14} />
                  </button>

                  {/* Delete */}

                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.color)
                    }
                    className="ml-auto text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            </div>
          ))}

          {/* Subtotal */}

          {cart.length > 0 && (
            <div className="pt-4 border-t">

              <div className="flex justify-between font-semibold text-lg">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block text-center w-full mt-4 bg-[#ff9167] text-white py-3 rounded-lg"
              >
                Checkout
              </Link>

            </div>
          )}

        </div>

      </SheetContent>
    </Sheet>
  )
}
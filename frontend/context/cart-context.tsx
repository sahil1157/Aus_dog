'use client'

import { createContext, useContext, useState } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  color: string
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number, color: string) => void
  increaseQty: (id: number, color: string) => void
  decreaseQty: (id: number, color: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, "quantity">) => {

    setCart(prev => {

      const existing = prev.find(
        p => p.id === item.id && p.color === item.color
      )

      if (existing) {
        return prev.map(p =>
          p.id === item.id && p.color === item.color
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number, color: string) => {
    setCart(prev => prev.filter(p => !(p.id === id && p.color === color)))
  }

  const increaseQty = (id: number, color: string) => {
    setCart(prev =>
      prev.map(p =>
        p.id === id && p.color === color
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    )
  }

  const decreaseQty = (id: number, color: string) => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id && p.color === color
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter(p => p.quantity > 0)
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used inside CartProvider")
  return context
}
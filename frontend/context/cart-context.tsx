"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  color: string;
  material: string;
  size: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (
    id: number,
    color: string,
    material: string,
    size: string,
  ) => void;
  increaseQty: (
    id: number,
    color: string,
    material: string,
    size: string,
  ) => void;
  decreaseQty: (
    id: number,
    color: string,
    material: string,
    size: string,
  ) => void;
  clearCart: () => void; // ✅ Added clearCart function
}

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "ausdog_cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize cart from localStorage immediately
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id &&
          p.color === item.color &&
          p.material === item.material &&
          p.size === item.size,
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id &&
          p.color === item.color &&
          p.material === item.material &&
          p.size === item.size
            ? { ...p, quantity: p.quantity + 1 }
            : p,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (
    id: number,
    color: string,
    material: string,
    size: string,
  ) => {
    setCart((prev) =>
      prev.filter(
        (p) =>
          !(
            p.id === id &&
            p.color === color &&
            p.material === material &&
            p.size === size
          ),
      ),
    );
  };

  const increaseQty = (
    id: number,
    color: string,
    material: string,
    size: string,
  ) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id &&
        p.color === color &&
        p.material === material &&
        p.size === size
          ? { ...p, quantity: p.quantity + 1 }
          : p,
      ),
    );
  };

  const decreaseQty = (
    id: number,
    color: string,
    material: string,
    size: string,
  ) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id &&
          p.color === color &&
          p.material === material &&
          p.size === size
            ? { ...p, quantity: p.quantity - 1 }
            : p,
        )
        .filter((p) => p.quantity > 0),
    );
  };

  // ✅ Add clearCart function
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  image: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  clearCart: () => void;
  checkout: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.size === item.size,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeFromCart: (id, size) =>
        set((state) => {
          const updatedItems = state.items
            .map((i) => {
              if (i.id === id && i.size === size) {
                const newQuantity = i.quantity - 1;
                return newQuantity > 0 ? { ...i, quantity: newQuantity } : null;
              }
              return i;
            })
            .filter((i): i is CartItem => i !== null); // remove nulls

          return { items: updatedItems };
        }),

      clearCart: () => set({ items: [] }),

      checkout: () => set({ items: [] }),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: "cart-storage" },
  ),
);

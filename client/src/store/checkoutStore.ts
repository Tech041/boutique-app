import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cartStore";

interface CheckoutForm {
  name: string;
  contact: string;
  address: string;
  state: string;
}

interface CheckoutState {
  form: CheckoutForm;
  items: CartItem[];
  setForm: (form: CheckoutForm) => void;
  setItems: (items: CartItem[]) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      form: { name: "", contact: "", address: "", state: "" },
      items: [],
      setForm: (form) => set({ form }),
      setItems: (items) => set({ items }),
      clearCheckout: () =>
        set({
          form: { name: "", contact: "", address: "", state: "" },
          items: [],
        }),
    }),
    { name: "checkout-storage" },
  ),
);

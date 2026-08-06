import { create } from "zustand";

interface NavbarState {
  open: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  setOpen: (value) => set({ open: value }),

  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
}));

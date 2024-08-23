import { create } from "zustand";

interface State {
  cartCount: number;
}

interface Action {
  updateCartCount: (firstName: State["cartCount"]) => void;
}

const useCartCountStore = create<State & Action>((set) => ({
  cartCount: 0,
  updateCartCount: (cartCount) => set(() => ({ cartCount: cartCount })),
}));

export default useCartCountStore;

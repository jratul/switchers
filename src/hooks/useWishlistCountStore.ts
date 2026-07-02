import { create } from "zustand";

interface State {
  wishlistCount: number;
}

interface Action {
  updateWishlistCount: (wishlistCount: State["wishlistCount"]) => void;
}

const useWishlistCountStore = create<State & Action>((set) => ({
  wishlistCount: 0,
  updateWishlistCount: (wishlistCount) => set(() => ({ wishlistCount })),
}));

export default useWishlistCountStore;

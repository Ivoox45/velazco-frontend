// src/store/useAuthStore.ts
import { create } from "zustand";

export type AuthUser = {
  name: string;
  email: string;
  role: string;
  active: boolean;
};

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

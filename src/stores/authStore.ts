import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { authType, authResponseType } from "../types/authType";
import { login, logout, checkAuth } from "../services/authAxios";

export type authStore = {
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  user: authResponseType | null;
  isHydrated: boolean;
  setUser: (user: authResponseType | null) => void;
  login: (data: authType) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

export const useAuthStore = create<authStore>()(
  persist(
    (set) => ({
      loading: false,
      error: null,
      accessToken: null,
      refreshToken: null,
      user: null,
      isHydrated: false,
      setUser: (user: authResponseType | null) => set({ user }),

      login: async (data: authType) => {
        set({ loading: true, error: null });
        try {
          const res = await login(data);
          const { accessToken } = res;
          localStorage.setItem("accessToken", accessToken);
          set({ accessToken, user: res });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await logout();
          localStorage.removeItem("accessToken");
          set({
            accessToken: null,
            user: null,
          });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      },

      checkAuth: async () => {
        set({ loading: true, error: null });
        try {
          const res = await checkAuth();
          set({ user: res, accessToken: res.accessToken });
          return true;
        } catch {
          localStorage.removeItem("accessToken");
          set({ accessToken: null, user: null });
          return false;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);

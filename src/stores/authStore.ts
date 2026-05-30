import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  authType,
  authResponseType,
  refreshTokenType,
} from "../types/authType";
import { login, logout, checkAuth, refreshToken } from "../services/authAxios";

export type authStore = {
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: authResponseType | null;
  setUser: (user: authResponseType | null) => void;
  login: (data: authType) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  refreshTokenAction: (data: refreshTokenType) => Promise<void>;
};

export const useAuthStore = create<authStore>()(
  persist(
    (set) => ({
      loading: true,
      error: null,
      accessToken: null,
      refreshToken: null,
      user: null,
      setUser: (user: authResponseType | null) => set({ user }),

      login: async (data: authType) => {
        set({ loading: true, error: null });
        try {
          const res = await login(data);
          const { accessToken, refreshToken } = res;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          set({ accessToken, refreshToken, user: res, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await logout();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            loading: false,
          });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        } finally {
          set({ loading: false });
        }
      },

      checkAuth: async () => {
        const accessToken = useAuthStore.getState().accessToken;
        if (!accessToken) {
          set({ loading: false });
          return false;
        }
        set({ loading: true, error: null });
        try {
          const res = await checkAuth();
          set({
            user: res,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            loading: false,
          });
          return true;
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      refreshTokenAction: async (data: refreshTokenType) => {
        set({ loading: true, error: null });
        try {
          const res = await refreshToken(data);
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          set({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            loading: false,
          });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    },
  ),
);

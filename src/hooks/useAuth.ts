"use client";
import { useRef, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
  const { checkAuth, user, loading } = useAuthStore();
  const isChecked = useRef(false);

  useEffect(() => {
    if (isChecked.current) return;
    isChecked.current = true;
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated: !!user, loading };
}

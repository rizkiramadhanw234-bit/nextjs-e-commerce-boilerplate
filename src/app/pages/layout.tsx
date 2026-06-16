"use client";

import QueryProvider from "@/provider/queryProvider";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { accessToken, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, isHydrated, router]);

  if (!isHydrated) return null;
  if (!accessToken) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <QueryProvider>{children}</QueryProvider>
    </div>
  );
}

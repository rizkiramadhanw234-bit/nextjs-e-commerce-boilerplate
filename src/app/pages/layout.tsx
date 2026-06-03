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
  const { user, isHydrated, loading } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;
    if (!user && !loading) router.push("/login");
  }, [user, isHydrated, loading, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <QueryProvider>{children}</QueryProvider>
    </div>
  );
}

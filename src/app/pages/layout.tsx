"use client";

import QueryProvider from "@/provider/queryProvider";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <QueryProvider>{children}</QueryProvider>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const { user, logout, loading } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-semibold text-lg">
        MyStore
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/pages/product" className="text-sm hover:text-gray-500">
          Products
        </Link>
        <Link href="/pages/cart" className="text-sm hover:text-gray-500">
          Cart
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline">
                {user?.username.charAt(0).toLocaleUpperCase()}
              </Button>
            }
          />
          <DropdownMenuContent>
            <Link href={`/pages/profile/${user?.id}`}>
              <DropdownMenuItem>
                <UserIcon />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <SettingsIcon />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOutIcon />
              {loading ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { accessToken, login, loading, error } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      router.push("/pages/product");
    }
  }, [accessToken, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { username, password };
    try {
      await login(credentials);
      router.push("/pages/product");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-400 text-white p-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-80 max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">username</Label>
                  <Input
                    id="username"
                    type="username"
                    placeholder="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-4">
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

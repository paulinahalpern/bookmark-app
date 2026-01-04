import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { api } from "@/lib/api";
import type { SignUpProps } from "@/App";
import axios from "axios";

export function SignUp({
  setUsername,
  setPassword,
  username,
  password,
}: SignUpProps) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await api.post("/signup", { username, password });
      console.log("Signup successful:", res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError("User already exists");
        } else {
          setError("Signup failed");
        }
      } else {
        setError("Unexpected error");
      }

      console.error("Signup error:", err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create a new account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              {error && (
                <div className="mt-3 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600 border border-red-200">
                  {error}
                </div>
              )}
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

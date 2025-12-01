"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Rate limiting: block after 5 failed attempts
    if (attempts >= 5) {
      setError("Too many failed attempts. Please try again later.");
      setIsLoading(false);
      return;
    }

    try {
      console.log('[LoginForm] Attempting login...');
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('[LoginForm] Login response:', { status: response.status, data });

      if (response.ok) {
        setError("");
        setAttempts(0);
        console.log('[LoginForm] Login successful, waiting for cookie to be set...');
        // Wait for cookie to be properly set in browser
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('[LoginForm] Calling onLoginSuccess');
        onLoginSuccess();
      } else {
        setError(data.error || "Invalid credentials");
        setAttempts(prev => prev + 1);
      }
    } catch (error) {
      setError("Network error. Please try again.");
      setAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-lg border bg-card p-8 shadow-sm">
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || attempts >= 5}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {attempts > 0 && attempts < 5 && (
              <p className="text-xs text-muted-foreground text-center">
                Failed attempts: {attempts}/5
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

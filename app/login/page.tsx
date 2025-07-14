// app/login/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";


function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/domain";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(redirect);
    } else {
      setError("Invalid password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="password"
        placeholder="Enter dashboard password"
        className="border px-3 py-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-black text-white px-4 py-2">Login</button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

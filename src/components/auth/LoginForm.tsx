"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { getCurrentSession } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    const session =
      getCurrentSession();

    if (session) {
      router.push(
        "/dashboard"
      );
    }
  }, [router]);

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const result = loginUser(
      email.trim(),
      password
    );

    if (!result.success) {
      setError(
        result.error ||
          "Invalid email or password"
      );
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-md rounded-2xl bg-[#669bbc] p-6 sm:p-8 shadow-xl">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h1>

        <p className="mt-2 mb-6 text-center text-sm text-white">
          Login to continue
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-gray-900"
            >
              Email
            </label>

            <input
              id="email"
              data-testid="auth-login-email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target
                    .value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-semibold text-gray-900"
            >
              Password
            </label>

            <input
              id="password"
              data-testid="auth-login-password"
              type="password"
              value={
                password
              }
              onChange={(e) =>
                setPassword(
                  e.target
                    .value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            data-testid="auth-login-submit"
            className="w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800 active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        <button
          onClick={() =>
            router.push(
              "/signup"
            )
          }
          className="mt-4 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 active:scale-[0.98]"
        >
          Create Account
        </button>
      </section>
    </main>
  );
}

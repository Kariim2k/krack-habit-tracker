"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/lib/auth";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const result = signupUser(
      email.trim(),
      password
    );

    if (!result.success) {
      setError(
        result.error ||
          "User already exists"
      );
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-md rounded-2xl bg-purple-500 p-6 sm:p-8 shadow-xl">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 mb-6 text-center text-sm text-white">
          Start building better habits today
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
              type="email"
              data-testid="auth-signup-email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target
                    .value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
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
              type="password"
              data-testid="auth-signup-password"
              value={
                password
              }
              onChange={(e) =>
                setPassword(
                  e.target
                    .value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            data-testid="auth-signup-submit"
            className="w-full rounded-xl bg-green-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-800 active:scale-[0.98]"
          >
            Signup
          </button>
        </form>

        <button
          onClick={() =>
            router.push(
              "/login"
            )
          }
          className="mt-4 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 active:scale-[0.98]"
        >
          Already Have Account?
        </button>
      </section>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { cn } from "cn";
import { API_URL } from "@/constant";
import { getErrorMsg } from "@/utlis/error";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignUpFormData = {
  email: string;
  password: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();
  const router = useRouter();
  const [errorFromServer, setErrorFromServer] = useState("");

  const onSubmit = async (data: SignUpFormData) => {
    setErrorFromServer("");
    const res = await fetch(`${API_URL}/users/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      setErrorFromServer(getErrorMsg(result));
      return;
    }
    router.replace("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <p className="mb-8 text-center text-gray-500">Sign up a new account</p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={cn(
                "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                { "border-red-500": !!errors.email || !!errorFromServer },
              )}
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              className={cn(
                "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                { "border-red-500": !!errors.password || !!errorFromServer },
              )}
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Sign Up"}
          </button>
          {!!errorFromServer && (
            <p className="text-sm font-semibold text-red-500">
              {errorFromServer}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

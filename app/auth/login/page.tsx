"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Axios from "@/lib/axios";
import { API_URL } from "@/constant";
import { cn } from "@/lib/utils";
import { getErrorMsg } from "@/utlis/error";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: LoginFormData) =>
      Axios.post(`${API_URL}/auth/login`, data),

    onSuccess: () => {
      router.replace("/");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Welcome back
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign in to your account
        </p>

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
              aria-invalid={!!errors.email}
              className={cn(
                "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                { "border-red-500": !!errors.email },
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
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              className={cn(
                "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                { "border-red-500": !!errors.password },
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

          {!!error && (
            <p role="alert" className="text-sm font-semibold text-red-500">
              {getErrorMsg(error)}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Do not have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

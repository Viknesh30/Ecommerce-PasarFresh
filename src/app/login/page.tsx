"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, getStoredUsers } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setFormError("");
    dispatch(loginStart());
    try {
      const users = getStoredUsers();
      const user = users.find(u => u.email === data.email && u.password === data.password);
      if (!user) {
        setFormError('Invalid email or password.');
        dispatch(loginFailure('Invalid email or password.'));
        return;
      }
      dispatch(loginSuccess({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token: 'mock-token' }));
      router.push('/');
    } catch (err) {
      setFormError('Login failed.');
      dispatch(loginFailure('Login failed.'));
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left branding side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-300 to-green-400 items-center justify-center flex-col text-white">
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-6">
            <Image src="/PasarFresh.png" alt="PasarFresh Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-4xl font-bold mb-2">PasarFresh</h1>
          <p className="text-lg text-center max-w-xs opacity-90">
            The leading online fresh market platform in your area
          </p>
        </div>
      </div>
      {/* Right form side */}
      <div className="flex w-full md:w-1/2 items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Log In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Phone number / Username / Email"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
              <input
                type="password"
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              {formError && <p className="text-red-600 text-sm">{formError}</p>}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "LOG IN"}
              </button>
            </form>
            <div className="flex justify-between items-center mt-3">
              <Link href="/forgot-password" className="text-sm text-green-700 hover:underline font-medium">Forgot Password</Link>
            </div>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
              New to PasarFresh?{' '}
              <Link href="/signup" className="text-green-700 hover:underline font-medium">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, getStoredUsers, saveStoredUsers } from '@/store/authSlice';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupForm = z.infer<typeof schema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: SignupForm) => {
    setFormError("");
    dispatch(loginStart());
    try {
      // Check for existing user
      const users = getStoredUsers();
      if (users.some(u => u.email === data.email)) {
        setFormError('Email already registered.');
        dispatch(loginFailure('Email already registered.'));
        return;
      }
      // Save new user
      const newUser = {
        id: uuidv4(),
        email: data.email,
        name: data.name,
        password: data.password,
        role: 'customer',
      };
      users.push(newUser);
      saveStoredUsers(users);
      // Log in the user
      dispatch(loginSuccess({ user: { id: newUser.id, email: newUser.email, name: newUser.name, role: 'customer' }, token: 'mock-token' }));
      router.push('/');
    } catch (err) {
      setFormError('Signup failed.');
      dispatch(loginFailure('Signup failed.'));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-300 to-green-400 items-center justify-center">
        <div className="text-center text-white">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <Image
              src="/PasarFresh.png"
              alt="PasarFresh Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">Join PasarFresh!</h1>
          <p className="text-xl opacity-90">Create your account and start shopping fresh</p>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src="/PasarFresh.png"
                alt="PasarFresh Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">PasarFresh</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600">Join our community of fresh food lovers</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
                )}
              </div>



              {formError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{formError}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";
import { signInCredentials } from "@/lib/action";
import React, { useActionState } from "react";

const LoginForm = () => {
  const [state, formActions] = useActionState(signInCredentials, null);
  return (
    <form className="space-y-4" action={formActions}>
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span>{state?.message}</span>
        </div>
      ) : null}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Email
        </label>
        <input
          name="email"
          type="text"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer w-full bg-purple-800 text-white py-2 rounded-lg focus:border-purple-600 transition-colors"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;

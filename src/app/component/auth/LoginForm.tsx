
  import { signInCredentials } from "@/lib/action";
  import React from "react";

  const LoginForm = () => {
    return (
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";
          await signInCredentials(formData);
        }}
      >
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 text-black"
          />
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
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Login
        </button>
      </form>
    );
  };

  export default LoginForm;

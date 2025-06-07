"use client";
import React, { useActionState } from "react";
import { singUpCredentials } from "@/lib/action"; 

const RegisterForm = () => {
  const [state, formActions] = useActionState(
    (prevState: any, formData: FormData) => singUpCredentials(formData),
    null
  );
  return (
    <form className="space-y-4" action={formActions}>
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Full Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 text-black"
        />
      </div>
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
          Birth Date
        </label>
        <input
          name="birthDate"
          type="date"
          placeholder="Enter Your Birth Date"
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
          placeholder="Create a password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600 text-black"
        />
      </div>
      <button
        type="submit"
        className="pcursor-pointer w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

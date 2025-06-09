import React from "react";
import Link from "next/link";
import LoginForm from "@/app/component/auth/LoginForm";
import GoogleButton from "@/app/component/button";

const page = async () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-purple-800 text-3xl font-bold mb-6 text-center">
          QuizApp
        </h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&rsquo;t have an account?{" "}
          <Link
            href="/register"
            className="text-purple-800 hover:text-purple-700 font-medium">
            Register here
          </Link>
        </p>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleButton />
        </div>
      </div>
    </div>
  );
};

export default page;

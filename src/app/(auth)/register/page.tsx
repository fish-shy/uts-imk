import RegisterForm from "@/app/component/auth/RegisterForm";
import GoogleButton from "@/app/component/button";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-purple-800 text-3xl font-bold mb-6 text-center">
          QuizApp
        </h1>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-800 hover:text-purple-700 font-medium"
          >
            Login here
          </Link>
        </p>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or register with
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

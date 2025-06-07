import { signIn } from "@/auth";
import React from "react";

const GoogleButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/quiz" });
      }}
    >
      <button
        type="submit"
        className="mt-4 w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5"
        />
        Sign in with Google
      </button>
    </form>
  );
};

export default GoogleButton;

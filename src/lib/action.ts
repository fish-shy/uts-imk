"use server";
import { hashSync } from "bcrypt-ts";
import { LoginSchema, RegisterSchema } from "./zod";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredentials = async (
  _prevState: unknown,
  formData: FormData
) => {
  const data = Object.fromEntries(formData.entries());
  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    return {
      error:result.error.flatten().fieldErrors,
    };
  }

  const { name, email, birthDate, password } = result.data;
  const hashedPassword = hashSync(password, 10);
  
  const birthDateFormatted = new Date(birthDate);
  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        dateOfBirth: birthDateFormatted,
        password: hashedPassword,
      },
    });
  } catch (err) {
    return { message: "Failed to register user.", err};
  }
  redirect("/login")
};

export const signInCredentials = async (_prevState: unknown,formData: FormData) => {
  const validatedData = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedData.success) {
    return {
      error: validatedData.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (err) {
    if(err instanceof AuthError) {
      switch(err.type){
        case "CredentialsSignin":
          return { message: "Invalid email or password." };
        default:
          return { message: "An unknown error occurred." };
      }
    }
  }
  redirect("/");
};

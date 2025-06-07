"use server";
import { hashSync } from "bcrypt-ts";
import { LoginSchema, RegisterSchema } from "./zod";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export const singUpCredentials = async (formData: FormData) => {
  const validatedData = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedData.success) {
    return {
      error: validatedData.error.flatten().fieldErrors,
    };
  }
  const { name, email, birthDate, password } = validatedData.data;
  const hashedPassword = await hashSync(password, 10);

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
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      error: "An error occurred while creating the user.",
    };
  }
  redirect("/login");
};

export const signInCredentials = async (formData: FormData) => {
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
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid credentials" };
    }
    redirect("/");
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
};

import {object,string } from 'zod';

export const LoginSchema = object({
  email: string().email("invalid email"),
  password: string().min(6, "Password must be at least 6 characters"),
})

export const RegisterSchema = object({
  name: string().min(1, "Name is required"),
  email: string().email("invalid email"),
  birthDate: string().min(1, "Birth date is required"),
  password: string().min(6, "Password must be at least 6 characters"),
})


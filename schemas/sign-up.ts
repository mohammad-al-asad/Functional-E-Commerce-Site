import { z } from "zod";

export const usernameSchema = z
  .string()
  .nonempty({ message: "username is required" })
  .min(3, { message: "username must be atleast 3 charecters" })
  .max(15, { message: "username must be atmost 15 charecters" });

export const phoneSchema = z
  .string()
  .nonempty({ message: "phone number is required" })
  .length(10, { message: "phone number must be 10 charecters" })
  .regex(/^\d{10}$/, "invalid phone number");

export const emailSchema = z
  .string()
  .email({ message: "invalid email" })
  .nonempty({ message: "email is required" });

export const passwordSchema = z
  .string()
  .nonempty({ message: "password is required" })
  .min(8, { message: "password must be atleast 8 charecters" })
  .max(16, { message: "password must be atmost 16 charecters" });

export const confirmPasswordSchema = z
  .string()
  .nonempty({ message: "confirm your password" });

export const signUpSchema = z
  .object({
    username: usernameSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

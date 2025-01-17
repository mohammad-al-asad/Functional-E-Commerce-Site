import { z } from "zod";

const username = z
  .string()
  .nonempty({ message: "username is required" })
  .min(3, { message: "username must be atleast 3 charecters" })
  .max(15, { message: "username must be atmost 15 charecters" });

const phone = z
  .string()
  .nonempty({ message: "phone number is required" })
  .regex(/^\d{10}$/, "invalid phone number")
  .length(10, { message: "phone number must be 10 charecters" });

const email = z
  .string()
  .email({ message: "invalid email" })
  .nonempty({ message: "email is required" });

const password = z
  .string()
  .nonempty({ message: "password is required" })
  .min(8, { message: "password must be atleast 8 charecters" })
  .max(16, { message: "password must be atmost 16 charecters" });

const confirmPassword = z
  .string()
  .nonempty({ message: "confirm your password" });

export const signUpSchema = z
  .object({
    username,
    phone,
    email,
    password,
    confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

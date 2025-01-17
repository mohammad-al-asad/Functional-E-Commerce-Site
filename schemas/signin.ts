import { z } from "zod";

const email = z
  .string()
  .email({ message: "invalid email" })
  .nonempty({ message: "email is required" });

const password = z
  .string()
  .nonempty({ message: "password is required" })
  .min(8, { message: "password must be atleast 8 charecters" })
  .max(16, { message: "password must be atmost 16 charecters" });

export const signinSchema = z.object({
  email,
  password,
});

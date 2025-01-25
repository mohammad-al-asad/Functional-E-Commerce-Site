import { z } from "zod";

const passwordSchema = z
  .string()
  .nonempty({ message: "password is required" })
  .min(8, { message: "password must be atleast 8 charecters" })
  .max(16, { message: "password must be atmost 16 charecters" });

const confirmPasswordSchema = z
  .string()
  .nonempty({ message: "confirm your password" });

export const changePasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

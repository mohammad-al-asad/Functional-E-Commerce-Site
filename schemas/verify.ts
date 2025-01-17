import { z } from "zod";

export const verifySchema = z.object({
  otp: z.string().length(6, { message: "otp must be 6 charecters" }),
});

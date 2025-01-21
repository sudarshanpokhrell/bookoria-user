import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "Password should be of atleast 6 characters" }),
});

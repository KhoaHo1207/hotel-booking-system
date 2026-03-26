import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

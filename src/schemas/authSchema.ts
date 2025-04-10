// src/schemas/authSchema.ts
import { z } from "zod";

//esquema de login
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// esquema de registro
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })

export type RegisterSchema = z.infer<typeof registerSchema>;

// esquema do newsletter
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password needs at least one uppercase character",
    })
    .refine((password) => /\d/.test(password), {
      message: "Password needs at least one digit",
    })
    .refine((password) => /[@$!%*?&]/.test(password), {
      message: "Password needs at least one special character",
    }),
});

export type SignupFields = z.infer<typeof SignupSchema>;

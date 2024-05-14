import { z } from "zod";

export const UsernameSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
});
export const EmailSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  })
});
export const PasswordSchema =
  z.object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.",
      }),
    newPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.",
      })
      .refine((newPassword) => /[A-Z]/.test(newPassword), {
        message: "Password needs at least one uppercase character.",
      })
      .refine((newPassword) => /\d/.test(newPassword), {
        message: "Password needs at least one digit.",
      })
      .refine((newPassword) => /[@$!%*?&]/.test(newPassword), {
        message: "Password needs at least one special character.",
      })
  }).refine((data) => data.password !== data.newPassword, {
    message: "New password must be different from old password.",
    path: ['newPassword'],
  });

export type UsernameField = z.infer<typeof UsernameSchema>;
export type EmailField = z.infer<typeof EmailSchema>;
export type PasswordField = z.infer<typeof PasswordSchema>;

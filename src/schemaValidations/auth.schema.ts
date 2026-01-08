import z from "zod";

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z
      .string()
      .trim()
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Email không hợp lệ",
      }),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export type RegisterBodyType = z.infer<typeof RegisterBody>;

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();
export type LoginBodyType = z.infer<typeof LoginBody>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});
export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export type RegisterResType = z.TypeOf<typeof RegisterRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;

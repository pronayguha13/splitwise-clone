import { z } from "zod";

export const signupSchema = {
    body: z
        .object({
            username: z.string().trim().min(3).max(50),
            email: z.email().trim(),
            password: z.string().min(8).max(128),
            rememberMe: z.boolean().optional(),
        })
        .strict(),
};

export const signinSchema = {
    body: z.object({
        email: z.email().trim(),
        password: z.string().min(8).max(128),
        rememberMe: z.boolean(),
    }),
};

export const refreshSchema = {
    body: z.object({
        refreshToken: z.jwt("Refresh token must be a valid JWT"),
    }),
};

export type SignupBody = z.infer<typeof signupSchema.body>;
export type SignInBody = z.infer<typeof signinSchema.body>;
export type RefreshScehmaBody = z.infer<typeof refreshSchema.body>;

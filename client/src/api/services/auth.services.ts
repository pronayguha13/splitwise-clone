import type { SignInPayload, SignUpPayload } from "@/api/types/auth.types";
import authService from "@/transport/auth.transport";

export const signUpService = (payload: SignUpPayload) => {
    return authService.post("/signup", payload);
};

export const signInService = (payload: SignInPayload) => {
    return authService.post("/signin", payload);
};

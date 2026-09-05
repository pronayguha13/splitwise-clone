import { signInService, signUpService } from "@/api/services/auth.services";
import type { SignInPayload, SignUpPayload } from "@/api/types/auth.types";

export const signUp = async (payload: SignUpPayload) => {
    const response = await signUpService(payload);
    return response.data;
};

export const signIn = async (payload: SignInPayload) => {
    const response = await signInService(payload);
    return response.data;
};

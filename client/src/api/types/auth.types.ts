export type SignUpPayload = {
    email: string;
    username: string;
    password: string;
    rememberMe: boolean;
};

export type SignInPayload = {
    email: string;
    password: string;
};

import { Button, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "@/shared/components/FormField";
import { loginInitialValues } from "../helpers/loginForm.helper";
import { loginCopy } from "../utils/loginCopy.util";
import { useState } from "react";
import { showError, showSuccess } from "@/shared/utils/useToast";
import { signIn } from "@/api/controller/auth.controller";
import createStorageClient from "@/shared/utils/storage-utils";

const LoginForm = () => {
    const [email, setEmail] = useState(loginInitialValues.email);
    const [password, setPassword] = useState(loginInitialValues.password);
    const [rememberMe, setRememberMe] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const { storeData } = createStorageClient("local");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            setIsPending(true);
            console.log("Email:", email);
            console.log("Password:", password);
            console.log("Remember Me:", rememberMe);

            const response = await signIn({ email, password, rememberMe });
            const { accessToken, refreshToken, user } = response;

            storeData("accessToken", accessToken);
            storeData("refreshToken", refreshToken);
            storeData("user", JSON.stringify(user));

            showSuccess("Sign-in successful!");
            navigate("/dashboard");
        } catch {
            showError("An error occurred during sign-in. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form className="grid gap-[18px]">
            <FormField
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="login-email"
                label="Email address"
                name="email"
                placeholder="alex@example.com"
                type="email"
            />
            <FormField
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="login-password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
            />

            <div className="flex items-center justify-between gap-4 text-sm text-[#66736d]">
                <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                >
                    Remember me
                </Checkbox>
                {/* <a
                    className="font-bold text-[#1f8c6e] no-underline"
                    href="/forgot-password"
                >
                    Forgot password?
                </a> */}
            </div>

            <Button
                block
                className="shadow-[0_18px_40px_rgba(31,140,110,0.24)]"
                htmlType="button"
                onClick={handleSignIn}
                size="large"
                type="primary"
                disabled={!email || !password || isPending}
                loading={isPending}
            >
                {loginCopy.submitLabel}
            </Button>

            <p className="m-0 text-[#66736d]">
                New to Splitwise clone?{" "}
                <Link
                    className="font-bold text-[#1f8c6e] no-underline"
                    to="/signup"
                >
                    Create an account
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;

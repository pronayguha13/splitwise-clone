import { Button, Checkbox, Tooltip } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "@/shared/components/FormField";
import { signupInitialValues } from "../helpers/signupForm.helper";
import { signupCopy } from "../utils/signupCopy.util";
import { signUp } from "@/api/controller/auth.controller";
import showMessage from "@/shared/utils/useToast";
import { MESSAGE_SEVERITY } from "@/shared/constants/message";
import type { MESSAGE_SEVERITY_TYPES } from "@/shared/types/messages";

export function SignupForm() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>(signupInitialValues.fullName);
    const [email, setEmail] = useState<string>(signupInitialValues.email);
    const [password, setPassword] = useState<string>(
        signupInitialValues.password,
    );
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);

    const redirectToLogin = () => {
        navigate("/login");
    };

    const onCreateAccount = async () => {
        setIsPending(true);
        if (!agreeTerms) {
            setIsPending(false);
            return;
        }
        // Add further account creation logic here
        if (!name || !email || !password) {
            setIsPending(false);
            return;
        }

        const payload = {
            username: name,
            email,
            password,
        };
        try {
            await signUp(payload);
            showMessage(
                "Sign up successful",
                MESSAGE_SEVERITY.SUCCESS as MESSAGE_SEVERITY_TYPES,
            );
            redirectToLogin();
        } catch {
            // Handle error here
            showMessage(
                "Sign up failed",
                MESSAGE_SEVERITY.ERROR as MESSAGE_SEVERITY_TYPES,
            );
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form className="grid gap-[18px]">
            <FormField
                autoComplete="name"
                id="signup-full-name"
                label="Full name"
                name="fullName"
                placeholder="Alex Morgan"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormField
                autoComplete="email"
                id="signup-email"
                label="Email address"
                name="email"
                placeholder="alex@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
                autoComplete="new-password"
                id="signup-password"
                label="Password"
                name="password"
                placeholder="Create a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
            >
                <span className="text-sm leading-normal text-[#66736d]">
                    I agree to the terms and privacy policy.
                </span>
            </Checkbox>

            <Tooltip
                title={
                    agreeTerms
                        ? undefined
                        : "You must agree to the terms and privacy policy"
                }
                destroyOnHidden
            >
                <Button
                    block
                    className="shadow-[0_18px_40px_rgba(31,140,110,0.24)]"
                    disabled={!agreeTerms || isPending}
                    htmlType="button"
                    onClick={onCreateAccount}
                    size="large"
                    type="primary"
                >
                    {signupCopy.submitLabel}
                </Button>
            </Tooltip>

            <p className="m-0 text-[#66736d]">
                Already have an account?{" "}
                <Link
                    className="font-bold text-[#1f8c6e] no-underline"
                    to="/login"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
}

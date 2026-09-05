import { useState } from "react";
import { Link } from "react-router-dom";
import { FormField } from "@/shared/components/FormField";
import { signupInitialValues } from "../helpers/signupForm.helper";
import { signupCopy } from "../utils/signupCopy.util";

export function SignupForm() {
    const [name, setName] = useState<string>(signupInitialValues.fullName);
    const [email, setEmail] = useState<string>(signupInitialValues.email);
    const [password, setPassword] = useState<string>(
        signupInitialValues.password,
    );
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

    return (
        <form className="auth-form">
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

            <label className="checkbox-field terms-field">
                <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the terms and privacy policy.</span>
            </label>

            <button
                className="primary-button"
                type="submit"
                disabled={!agreeTerms}
            >
                {signupCopy.submitLabel}
            </button>

            <p className="auth-switch">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </form>
    );
}

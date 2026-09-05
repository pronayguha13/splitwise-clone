import { Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { FormField } from "@/shared/components/FormField";
import { loginInitialValues } from "../helpers/loginForm.helper";
import { loginCopy } from "../utils/loginCopy.util";

const LoginForm = () => {
    return (
        <form className="grid gap-[18px]">
            <FormField
                autoComplete="email"
                defaultValue={loginInitialValues.email}
                id="login-email"
                label="Email address"
                name="email"
                placeholder="alex@example.com"
                type="email"
            />
            <FormField
                autoComplete="current-password"
                defaultValue={loginInitialValues.password}
                id="login-password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
            />

            <div className="flex items-center justify-between gap-4 text-sm text-[#66736d]">
                <Checkbox>Remember me</Checkbox>
                <a className="font-bold text-[#1f8c6e] no-underline" href="/forgot-password">Forgot password?</a>
            </div>

            <Button block className="shadow-[0_18px_40px_rgba(31,140,110,0.24)]" htmlType="submit" size="large" type="primary">
                {loginCopy.submitLabel}
            </Button>

            <p className="m-0 text-[#66736d]">
                New to Splitwise clone?{" "}
                <Link className="font-bold text-[#1f8c6e] no-underline" to="/signup">Create an account</Link>
            </p>
        </form>
    );
};

export default LoginForm;

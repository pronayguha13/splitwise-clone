import { AuthLayout } from "@/shared/components/AuthLayout";
import LoginForm from "./components/LoginForm";
import { loginCopy } from "./utils/loginCopy.util";

const LoginPage = () => {
    return (
        <AuthLayout
            mode="login"
            subtitle={loginCopy.subtitle}
            title={loginCopy.title}
        >
            <LoginForm />
        </AuthLayout>
    );
};

export default LoginPage;

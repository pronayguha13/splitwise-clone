import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useIsAuthenticated from "@/shared/hooks/useIsAuthenticated";
import { ROUTE_PATHS } from "@/shared/constants/routeConst";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useIsAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
    }

    return children ?? <Outlet />;
};

export default ProtectedRoute;
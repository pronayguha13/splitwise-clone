import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useIsAuthenticated from "@/shared/hooks/useIsAuthenticated";
import { ROUTE_PATHS } from "@/shared/constants/routeConst";

type PublicRouteProps = PropsWithChildren;

const PublicRoute = ({ children }: PublicRouteProps) => {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
    }

    return children ?? <Outlet />;
};

export default PublicRoute;
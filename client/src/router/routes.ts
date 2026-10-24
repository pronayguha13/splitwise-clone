import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/constants/routeConst";

export type RouteType = {
    path?: string;
    index?: boolean;
    Component: React.ComponentType | React.LazyExoticComponent<React.ComponentType>;
    isProtected: boolean;
};

const LoginComponent = React.lazy(() => import("@/pages/login/LoginPage"));
const SignupComponent = React.lazy(() => import("@/pages/signup"));
const DashboardComponent = React.lazy(() => import("@/pages/dashboard"));

export const routes: RouteType[] = [
    {
        index: true,
        Component: () => React.createElement(Navigate, { to: ROUTE_PATHS.LOGIN, replace: true }),
        isProtected: false,
    },
    {
        path: ROUTE_PATHS.LOGIN,
        Component: LoginComponent,
        isProtected: false,
    },
    {
        path: ROUTE_PATHS.SIGNUP,
        Component: SignupComponent,
        isProtected: false,
    },
    {
        path: ROUTE_PATHS.DASHBOARD,
        Component: DashboardComponent,
        isProtected: true,
    },
];

import type { ReactNode } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute";
import PublicRoute from "@/router/PublicRoute";
import { routes, type RouteType } from "@/router/routes";

const generateRoutes = (routeList: RouteType[]): ReactNode[] => {
    return routeList.map(({ path, index, Component, isProtected }) => {
        const element = isProtected ? (
            <ProtectedRoute>
                <Component />
            </ProtectedRoute>
        ) : (
            <PublicRoute>
                <Component />
            </PublicRoute>
        );

        return <Route key={path ?? "index"} path={path} index={index} element={element} />;
    });
};

export function AppRoutes() {
    return (
        <Suspense fallback={null}>
            <Routes>{generateRoutes(routes)}</Routes>
        </Suspense>
    );
}

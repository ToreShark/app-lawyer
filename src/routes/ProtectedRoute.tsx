import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import {authAtom} from "../atoms/AuthAtoms.";
import {ReactNode} from "react";
interface ProtectedRouteProps {
    children: ReactNode;
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [auth] = useAtom(authAtom);

    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

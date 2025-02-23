import { Navigate } from "react-router-dom";
import useCheckUser from "../hooks/useCheckUser";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => !!state.auth.accessToken);

    return isLoggedIn ? <Navigate to="/StudentPortal/course" replace /> : children;
}

export default PublicRoute;
import { Navigate } from "react-router-dom";
import useCheckUser from "../hooks/useCheckUser";
import { useSelector } from "react-redux";

const AdminPublicRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => !!state.auth.accessToken);

    return isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : children;
}

export default AdminPublicRoute;
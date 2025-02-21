import { Navigate } from "react-router-dom";
import useCheckUser from "../hooks/useCheckUser";

const PublicRoute = ({ children }) => {
    const isLoggedIn = useCheckUser();

    return !isLoggedIn ? children : <Navigate to="/StudentPortal/course" />;
};

export default PublicRoute;
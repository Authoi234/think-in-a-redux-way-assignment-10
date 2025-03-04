import React from 'react';
import useCheckUser from '../hooks/useCheckUser';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useCheckUser();
    const {user} = useSelector((state) => state.auth);

    return isLoggedIn && user?.role === "student" ? children : (user?.role === "admin" ? <Navigate to="/admin/login" /> : <Navigate to="/" />);
};

export default PrivateRoute;
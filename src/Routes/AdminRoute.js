import React from 'react';
import useCheckUser from '../hooks/useCheckUser';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const isLoggedIn = useCheckUser();
    const { user } = useSelector((state) => state?.auth);
    if (isLoggedIn && user?.role === "admin") {
        return children
    }
    else if (isLoggedIn && user?.role === "student") {
        return  <Navigate to="/" />
    }
    else{
        return <Navigate to="/admin/login" />
    }
};

export default AdminRoute;
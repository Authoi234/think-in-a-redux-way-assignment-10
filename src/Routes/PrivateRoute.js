import React from 'react';
import useCheckUser from '../hooks/useCheckUser';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useCheckUser();

    return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
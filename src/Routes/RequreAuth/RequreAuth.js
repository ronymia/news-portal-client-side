import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const RequreAuth = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    if (user && user.uid) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />
}

export default RequreAuth;

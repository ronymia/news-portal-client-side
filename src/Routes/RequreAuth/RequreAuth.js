import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Loading from '../../Pages/shared/Loading/Loading';

const RequreAuth = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />
    }

    // chicking user
    if (user && user.uid) {
        return children;
    }

    //navigate to login page
    return <Navigate to="/login" state={{ from: location }} replace />
}

export default RequreAuth;

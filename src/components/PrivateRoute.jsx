    // src/components/PrivateRoute.js
    import React from 'react';
    import { Navigate } from 'react-router-dom';
    import { useAuthState } from 'react-firebase-hooks/auth';
    import { auth } from '../services/firebaseconfig';

    const PrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" />;
    };

    export default PrivateRoute;

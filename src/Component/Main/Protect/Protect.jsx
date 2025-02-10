import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';  
import { AuthContext } from '../Firebase/Auth';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
  
    if (loading) {
      return <div>Loading...</div>; // Optionally show a loading state until authentication is checked
    }
  
    if (!user) {
      // Use Navigate to redirect the user to the login page
      return <Navigate to="/login" />;
    }
  
    return children; // Render the protected content if the user is logged in
  };
  
  export default ProtectedRoute;

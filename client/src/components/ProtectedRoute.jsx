import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * @file ProtectedRoute.jsx
 * @description A wrapper component to protect routes from unauthenticated users.
 */

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a loading spinner

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

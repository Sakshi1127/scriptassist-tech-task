// components/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Navigate to="/dashboard/launches" replace /> : <Outlet />;
};

export default PublicRoute;

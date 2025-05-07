import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import RocketDetails from './pages/rocketDetails/RocketDetails'; 
import PublicRoute from './components/PublicRoute';
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <PublicRoute />, 
        children: [
          { path: '/', element: <Login /> },
          { path: '/login', element: <Login /> },
        ]
      },
      {
        element: <PrivateRoute />, 
        children: [
          { path: '/dashboard/launches', element: <Dashboard /> },
          { path: '/rocket/:id', element: <RocketDetails /> }
        ]
      },
      { path: '*', element: <Navigate to="/dashboard/launches" replace /> },
    ]
  }
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);

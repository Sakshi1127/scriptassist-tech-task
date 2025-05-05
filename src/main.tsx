import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute'; 

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
     { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
      {
        element: <PrivateRoute />, // ⬅️ Wrap private routes
        children: [
          { path: '/dashboard', element: <Dashboard /> }
        ]
      }
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

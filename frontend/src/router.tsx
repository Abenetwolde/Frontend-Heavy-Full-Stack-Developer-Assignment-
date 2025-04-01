import { createBrowserRouter, Navigate } from 'react-router-dom';
// import { Collections } from '../pages/Collections';
import { Dashboard } from './pages/Dashboard';
import { SchoolTasks } from './pages/Tasks';
import { NotFound } from './pages/NotFound';
import { Collections } from './pages/Collections';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/collections" replace />, // Redirect root to /collections
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/collections',
    element: <Collections />,
  },
  {
    path: '/collections/school',
    element: <SchoolTasks />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
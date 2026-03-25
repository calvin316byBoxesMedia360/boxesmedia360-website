import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/auth/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import ClientList from '../pages/crm/ClientList';
import ClientDetail from '../pages/crm/ClientDetail';
import Dashboard from '../pages/dashboard/Dashboard';

// Import pages (placeholders for now)
const Projects = () => <div className="p-4 bg-white rounded-lg shadow">Projects Module</div>;
const Files = () => <div className="p-4 bg-white rounded-lg shadow">Files Module</div>;
const Invoices = () => <div className="p-4 bg-white rounded-lg shadow">Invoicing Module</div>;

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: 'clients',
                        element: <ClientList />,
                    },
                    {
                        path: 'clients/:id',
                        element: <ClientDetail />,
                    },
                    {
                        path: 'projects',
                        element: <Projects />,
                    },
                    {
                        path: 'files',
                        element: <Files />,
                    },
                    {
                        path: 'invoices',
                        element: <Invoices />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

export default router;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import useAuthContext from 'src/hooks/useAuthContext';
import PageLayout from 'src/layouts/PageLayout';
import Login from 'src/pages/Login/Login';
import Create from 'src/pages/Create/Create';
import Manage from 'src/pages/Manage/Manage';
import Edit from 'src/pages/Edit/Edit';
import ProtectedRoute from 'src/utils/ProtectedRoute';

const Router = () => {
	const { user } = useAuthContext();
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PageLayout />,
			children: [
				{
					path: 'login',
					element: user ? <Navigate to="/manage" /> : <Login />,
				},
				{
					path: '/',
					element: <ProtectedRoute />,
					children: [
						{ path: 'create', element: <Create /> },
						{ path: 'manage', element: <Manage /> },
						{ path: 'edit/:id', element: <Edit /> },
					],
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;

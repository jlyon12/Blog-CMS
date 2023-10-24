import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import useAuthContext from './hooks/useAuthContext';

import PageLayout from 'src/layouts/PageLayout';
import Login from 'src/pages/Login/Login';
import Create from 'src/pages/Create/Create';

const Router = () => {
	const { user } = useAuthContext();
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PageLayout />,
			children: [
				{ index: true, element: user ? null : <Login /> },
				{ path: 'create', element: user ? <Create /> : <Login /> },
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;

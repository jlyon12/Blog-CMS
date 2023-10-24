import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import useAuthContext from './hooks/useAuthContext';

import PageLayout from 'src/layouts/PageLayout';
import Login from './pages/Login/Login';
const Router = () => {
	const { user } = useAuthContext();
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PageLayout />,
			children: [{ index: true, element: user ? null : <Login /> }],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;

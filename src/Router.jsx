import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PageLayout from 'src/layouts/PageLayout';
import Login from './pages/Login/Login';
const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PageLayout />,
			children: [{ path: 'login', element: <Login /> }],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;

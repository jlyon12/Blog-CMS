import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import useAuthContext from 'src//hooks/useAuthContext';
import PageLayout from 'src/layouts/PageLayout';
import Login from 'src/pages/Login/Login';
import Create from 'src/pages/Create/Create';
import Manage from 'src/pages/Manage/Manage';
import Edit from './pages/Edit/Edit';

const Router = () => {
	const { user } = useAuthContext();
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PageLayout />,
			children: [
				{ index: true, element: user ? <Manage /> : <Login /> },
				{ path: 'create', element: user ? <Create /> : <Login /> },
				{ path: 'manage', element: user ? <Manage /> : <Login /> },
				{ path: 'edit/:id', element: user ? <Edit /> : <Login /> },
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;

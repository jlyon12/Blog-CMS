import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthContext from 'src/hooks/useAuthContext';

const useLogin = () => {
	const [isLoading, setIsLoading] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { dispatch } = useAuthContext();
	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/login/admin`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			}
		);

		const json = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(json.errors);
		}

		if (res.ok) {
			localStorage.setItem('user', JSON.stringify(json.data));

			dispatch({ type: 'LOGIN', payload: json.data });
			setIsLoading(false);
			navigate('/manage');
		}
	};

	return { isLoading, error, login };
};

export default useLogin;

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

		const res = await fetch('http://localhost:3000/api/user/login/admin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const json = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(json.err);
		}

		if (res.ok) {
			localStorage.setItem('user', JSON.stringify(json));

			dispatch({ type: 'LOGIN', payload: json });
			setIsLoading(false);
			navigate('/manage');
		}
	};

	return { isLoading, error, login };
};

export default useLogin;

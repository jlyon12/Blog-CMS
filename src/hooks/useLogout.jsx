import useAuthContext from 'src/hooks/useAuthContext';

const useLogout = () => {
	const { dispatch } = useAuthContext();

	const logout = () => {
		localStorage.removeItem('user');

		dispatch({ type: 'LOGOUT' });
	};

	return { logout };
};

export default useLogout;

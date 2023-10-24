import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';

const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context)
		throw Error('AuthContext must be used inside of an AuthContextProvider');

	return context;
};

export default useAuthContext;

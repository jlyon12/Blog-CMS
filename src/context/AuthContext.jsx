import { createContext, useReducer, useEffect } from 'react';
import propTypes from 'prop-types';

const AuthContext = createContext(null);

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { user: action.payload };
		case 'LOGOUT':
			return { user: null };
		default:
			return state;
	}
};

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch({ type: 'LOGIN', payload: user });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthContextProvider.propTypes = {
	children: propTypes.element,
};

export { AuthContextProvider, AuthContext };

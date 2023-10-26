import { createContext, useState } from 'react';
import propTypes from 'prop-types';

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	const [darkMode, setDarkMode] = useState(prefersDark);
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};
	return (
		<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

DarkModeContextProvider.propTypes = {
	children: propTypes.element,
};

export { DarkModeContext, DarkModeContextProvider };

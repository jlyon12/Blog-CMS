import { createContext, useState } from 'react';
import propTypes from 'prop-types';

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);
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

import { createContext, useState } from 'react';
import propTypes from 'prop-types';
const ConfirmContext = createContext();

const ConfirmContextProvider = ({ children }) => {
	const [confirm, setConfirm] = useState({
		prompt: '',
		isOpen: false,
		proceed: null,
		cancel: null,
	});

	return (
		<ConfirmContext.Provider value={[confirm, setConfirm]}>
			{children}
		</ConfirmContext.Provider>
	);
};
ConfirmContextProvider.propTypes = {
	children: propTypes.element,
};

export { ConfirmContext, ConfirmContextProvider };

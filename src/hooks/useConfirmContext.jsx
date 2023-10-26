import { useContext } from 'react';
import { ConfirmContext } from 'src/context/ConfirmContext';

const useConfirmContext = () => {
	const context = useContext(ConfirmContext);

	if (!context) {
		throw Error(
			'ConfirmContext must be used inside of a ConfirmContextProvider'
		);
	}
	return context;
};

export default useConfirmContext;

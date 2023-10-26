import useConfirmContext from './useConfirmContext';

const useConfirm = () => {
	const [confirm, setConfirm] = useConfirmContext();

	const isConfirmed = (prompt) => {
		const promise = new Promise((resolve, reject) => {
			setConfirm({ prompt, isOpen: true, proceed: resolve, cancel: reject });
		});
		return promise.then(
			() => {
				setConfirm({ ...confirm, isOpen: false });
				return true;
			},
			() => {
				setConfirm({ ...confirm, isOpen: false });
				return false;
			}
		);
	};
	return { ...confirm, isConfirmed };
};

export default useConfirm;

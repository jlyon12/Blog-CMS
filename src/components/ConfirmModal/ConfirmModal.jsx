import { useRef, useEffect } from 'react';
import useConfirm from 'src/hooks/useConfirm';
import styles from './ConfirmModal.module.scss';

const ConfirmModal = () => {
	const { prompt, isOpen = false, proceed, cancel } = useConfirm();
	const modalRef = useRef(null);

	useEffect(() => {
		const modalElement = modalRef.current;
		const focusableElements = modalElement.querySelectorAll('button');
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];
		firstElement.focus();
		const handleTabKeyPress = (e) => {
			if (e.key === 'Tab') {
				if (e.shiftKey && document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				} else if (!e.shiftKey && document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		};
		const handleEscapeKeyPress = (event) => {
			if (event.key === 'Escape') {
				cancel();
			}
		};
		modalElement.addEventListener('keydown', handleTabKeyPress);
		modalElement.addEventListener('keydown', handleEscapeKeyPress);
		return () => {
			modalElement.removeEventListener('keydown', handleTabKeyPress);
			modalElement.removeEventListener('keydown', handleEscapeKeyPress);
		};
	}, [cancel, isOpen]);

	const handleClickOutside = (e) => {
		e.stopPropagation();
		cancel();
	};

	return (
		<div
			className={` ${styles.modalContainer} ${
				isOpen ? styles.open : styles.closed
			}`}
			onClick={handleClickOutside}
		>
			<div className={styles.modal} ref={modalRef}>
				<div className={styles.modalHeader}>
					<h3>Confirm</h3>
				</div>
				<div className={styles.modalBody}>
					<p>{prompt}</p>
				</div>
				<div className={styles.modalFooter}>
					<button className={styles.btn} onClick={cancel}>
						Cancel
					</button>
					<button className={styles.btnDelete} onClick={proceed}>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;

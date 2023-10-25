import styles from './Switch.module.scss';
import propTypes from 'prop-types';
const Switch = ({ label, isOn, handleToggle }) => {
	return (
		<>
			<input
				className={styles.checkbox}
				id={label}
				type="checkbox"
				checked={isOn}
				onChange={handleToggle}
			/>
			<label className={styles.label} htmlFor={label}>
				<span className={styles.btn} />
			</label>
		</>
	);
};

Switch.propTypes = {
	label: propTypes.string,
	isOn: propTypes.bool,
	handleToggle: propTypes.func,
};
export default Switch;

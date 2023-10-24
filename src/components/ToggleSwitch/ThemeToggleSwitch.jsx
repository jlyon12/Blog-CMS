import propTypes from 'prop-types';
import styles from './ThemeToggleSwitch.module.scss';

const ThemeToggleSwitch = ({ label, isOn, handleToggle }) => {
	return (
		<div className={styles.toggleSwitch}>
			<input
				type="checkbox"
				className={styles.checkbox}
				id={label}
				name={label}
				checked={!isOn}
				onChange={handleToggle}
			/>
			<label className={styles.label} htmlFor={label}>
				<span className={styles.inner} />
				<span className={styles.switch} />
			</label>
		</div>
	);
};
ThemeToggleSwitch.propTypes = {
	label: propTypes.string,
	isOn: propTypes.bool,
	handleToggle: propTypes.func,
};
export default ThemeToggleSwitch;

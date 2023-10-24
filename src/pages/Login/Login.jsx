import { useState } from 'react';
import styles from './Login.module.scss';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<legend>Login</legend>
				<fieldset>
					<label className={styles.formControl} htmlFor="email">
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							name="email"
							id="email"
						/>
					</label>
					<label className={styles.formControl} htmlFor="password">
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							name="password"
							id="password"
						/>
					</label>
				</fieldset>
				<button className={styles.btn}>Log In</button>
			</form>
		</main>
	);
};

export default Login;

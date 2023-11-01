import { Link } from 'react-router-dom';
import { TbError404 } from 'react-icons/tb';
import styles from './NotFound.module.scss';

const NotFound = () => {
	return (
		<main className={styles.main}>
			<TbError404 className={styles.error} size={72} />
			<h2>Page not found</h2>
			<p>
				Go to the{' '}
				<Link to={'/'} className={styles.link}>
					homepage
				</Link>
			</p>
		</main>
	);
};

export default NotFound;

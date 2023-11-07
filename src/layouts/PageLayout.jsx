import { Outlet } from 'react-router';
import useDarkModeContext from 'src/hooks/useDarkModeContext';
import ScrollToTop from 'src/utils/ScrollToTop';
import Header from 'src/components/Header/Header';
import ConfirmModal from 'src/components/ConfirmModal/ConfirmModal';
import styles from './PageLayout.module.scss';
const PageLayout = () => {
	const { darkMode } = useDarkModeContext();
	return (
		<div className={darkMode ? `theme-dark` : 'theme-light'}>
			<ScrollToTop />
			<div className={styles.app}>
				<Header />
				<Outlet />
				<ConfirmModal />
			</div>
		</div>
	);
};

export default PageLayout;

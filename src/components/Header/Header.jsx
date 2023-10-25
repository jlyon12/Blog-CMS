import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import styles from './Header.module.scss';
import useDarkModeContext from 'src/hooks/useDarkModeContext';
import useAuthContext from 'src/hooks/useAuthContext';
import useLogout from 'src/hooks/useLogout';
import ThemeToggleSwitch from 'src/components/ToggleSwitch/ThemeToggleSwitch';
const Header = () => {
	const { darkMode, toggleDarkMode } = useDarkModeContext();
	const { user } = useAuthContext();
	const { logout } = useLogout();
	const [isOpen, setIsOpen] = useState(false);
	const toggleNav = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className={styles.header}>
			<div className={styles.navContainer}>
				<Link>Admin</Link>
				<button className={styles.menuBtn} onClick={toggleNav}>
					<MdOutlineMenu size={32} />
				</button>
				<nav>
					<div
						className={`
							${styles.navMenu} ${isOpen ? styles.mobileMenu : styles.desktopMenu}`}
					>
						<Link className={styles.mobileMenuTitle}>Admin</Link>
						{user ? (
							<ul>
								<li>
									<Link to="manage">Manage</Link>
								</li>
								<li>
									<Link to="create">Create</Link>
								</li>
								<li>
									<button onClick={logout}>Logout</button>
								</li>
							</ul>
						) : (
							<ul>
								<li>
									<Link to="/login">Login</Link>
								</li>
							</ul>
						)}
						<ThemeToggleSwitch
							label="darkModeToggle"
							isOn={darkMode}
							handleToggle={toggleDarkMode}
						/>
						<button className={styles.menuClose} onClick={toggleNav}>
							<MdClose size={32} />
						</button>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;

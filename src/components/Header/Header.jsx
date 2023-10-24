import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import styles from './Header.module.scss';
import useDarkModeContext from 'src/hooks/useDarkModeContext';
import ThemeToggleSwitch from 'src/components/ToggleSwitch/ThemeToggleSwitch';
const Header = () => {
	const { darkMode, toggleDarkMode } = useDarkModeContext();
	const [isOpen, setIsOpen] = useState(false);
	const toggleNav = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className={styles.header}>
			<div className={styles.navContainer}>
				<Link>Your name</Link>
				<button className={styles.menuBtn} onClick={toggleNav}>
					<MdOutlineMenu size={32} />
				</button>
				<nav>
					<div
						className={`
							${styles.navMenu} ${isOpen ? styles.mobileMenu : styles.desktopMenu}`}
					>
						<Link className={styles.mobileMenuTitle}>Your name</Link>
						<ul>
							<li>
								<Link>Blog</Link>
							</li>
							<li>
								<Link>Project</Link>
							</li>
							<li>
								<Link>About</Link>
							</li>
							<li>
								<Link>Newsletter</Link>
							</li>
						</ul>
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

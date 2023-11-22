import { RiArrowRightLine, RiArrowLeftLine } from 'react-icons/ri';
import propTypes from 'prop-types';
import styles from './Pagination.module.scss';
const Pagination = ({ page, setPage, totalCount, pageSize }) => {
	const pageCount = Math.ceil(totalCount / pageSize);

	const handlePageDecrease = () => {
		if (page === 1) return;
		setPage((current) => current - 1);
	};
	const handlePageIncrease = () => {
		if (page === pageCount) return;
		setPage((current) => current + 1);
	};

	const generatePageNumberElements = () => {
		const elements = [];
		for (let i = 1; i <= pageCount; i += 1) {
			elements.push(
				<button
					key={`pageBtn-${i}`}
					onClick={() => setPage(i)}
					className={page === i ? styles.pageBtnActive : styles.pageBtn}
				>
					{i}
				</button>
			);
		}
		return elements;
	};
	return (
		<div className={styles.paginationContainer}>
			<button onClick={handlePageDecrease} className={styles.arrowBtn}>
				<RiArrowLeftLine />
				Previous
			</button>
			<div className={styles.pageNumbersContainer}>
				{generatePageNumberElements()}
			</div>
			<button onClick={handlePageIncrease} className={styles.arrowBtn}>
				Next
				<RiArrowRightLine />
			</button>
		</div>
	);
};
Pagination.propTypes = {
	page: propTypes.number,
	setPage: propTypes.func,
	totalCount: propTypes.number,
	pageSize: propTypes.number,
};

export default Pagination;

import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import useAuthContext from 'src/hooks/useAuthContext';
import usePostsContext from 'src/hooks/usePostsContext';
import PostPreview from 'src/components/PostPreview/PostPreview';
import Pagination from 'src/components/Pagination/Pagination';
import Switch from 'src/components/Switch/Switch';
import styles from './Manage.module.scss';

const Manage = () => {
	const { posts, dispatch } = usePostsContext();
	const { user } = useAuthContext();
	const [errors, setErrors] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [totalCount, setTotalCount] = useState();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [sort, setSort] = useState(-1);

	useEffect(() => {
		const fetchUserPosts = async () => {
			setIsLoading(true);
			setErrors(null);
			const res = await fetch(
				`${
					import.meta.env.VITE_API_CROSS_ORIGIN
				}/api/posts/?sort=${sort}&pageSize=${pageSize}&page=${page}`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			const json = await res.json();

			if (!res.ok) {
				setIsLoading(false);
				setErrors(json.errors);
			}
			if (res.ok) {
				setIsLoading(false);
				setTotalCount(json.metadata.totalCount);
				dispatch({ type: 'SET_POSTS', payload: json.data });
			}
		};

		fetchUserPosts();
	}, [dispatch, page, pageSize, sort, user]);
	const handleLimitChange = (e) => {
		setPageSize(e.target.value);
		setPage(1);
	};

	const handleSortChange = () => {
		setSort((prev) => (prev === 1 ? -1 : 1));
		setPage(1);
	};
	return (
		<main className={styles.main}>
			<section>
				<h2 className={styles.sectionTitle}>Your Blog Posts</h2>
				<DotLoader
					color="#6941c6"
					className={styles.spinner}
					loading={isLoading}
				/>
				{errors && errors.map((err) => <p key={err.detail}>{err.detail}</p>)}
				<div className={styles.querySelectors}>
					<p className={styles.total}>{totalCount} Total Posts</p>
					<label htmlFor="limit">
						Limit
						<select name="limit" id="limit" onChange={handleLimitChange}>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
						</select>
					</label>

					<div className={styles.toggleContainer}>
						<p>{sort === -1 ? 'By Recent' : 'By Oldest'}</p>
						<Switch
							label="sortToggle"
							isOn={sort === -1}
							handleToggle={handleSortChange}
						/>
					</div>
				</div>
				{posts && posts.length > 0 ? (
					posts.map((post) => <PostPreview key={post._id} post={post} />)
				) : (
					<>
						<p className={styles.noPosts}>
							You currently do not have any posts
						</p>
						<Link to="/create" className={styles.link}>
							Create a new post
						</Link>
					</>
				)}
				<Pagination
					page={page}
					setPage={setPage}
					totalCount={Number(totalCount)}
					pageSize={Number(pageSize)}
				/>
			</section>
		</main>
	);
};

export default Manage;

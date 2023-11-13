import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import useAuthContext from 'src/hooks/useAuthContext';
import usePostsContext from 'src/hooks/usePostsContext';
import PostPreview from 'src/components/PostPreview/PostPreview';

import styles from './Manage.module.scss';

const Manage = () => {
	const { posts, dispatch } = usePostsContext();
	const { user } = useAuthContext();
	const [errors, setErrors] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchUserPosts = async () => {
			setIsLoading(true);
			setErrors(null);
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/`,
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
				dispatch({ type: 'SET_POSTS', payload: json.data });
			}
		};

		fetchUserPosts();
	}, [dispatch, user.token]);

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
			</section>
		</main>
	);
};

export default Manage;

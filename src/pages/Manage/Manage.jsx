import { useEffect } from 'react';
import useAuthContext from 'src/hooks/useAuthContext';
import usePostsContext from 'src/hooks/usePostsContext';
import PostPreview from 'src/components/PostPreview/PostPreview';

import styles from './Manage.module.scss';

const Manage = () => {
	const { posts, dispatch } = usePostsContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchUserPosts = async () => {
			const res = await fetch('http://localhost:3000/api/posts/', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			});

			const json = await res.json();

			if (res.ok) {
				dispatch({ type: 'SET_POSTS', payload: json });
			}
		};

		fetchUserPosts();
	}, [dispatch, user.token]);

	return (
		<main className={styles.main}>
			<section>
				<h2 className={styles.sectionTitle}>Your Blog Posts</h2>
				{posts &&
					posts.map((post) => <PostPreview key={post._id} post={post} />)}
			</section>
		</main>
	);
};

export default Manage;

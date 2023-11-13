import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useAuthContext from 'src/hooks/useAuthContext';
import CommentPreview from 'src/components/CommentPreview/CommentPreview';
import styles from './Comments.module.scss';
const Comments = () => {
	const [comments, setComments] = useState(null);
	const [post, setPost] = useState(null);
	const { id } = useParams();
	const { user } = useAuthContext();

	useEffect(() => {
		const getPostComments = async (id) => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${id}/comments`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			const json = await res.json();
			if (res.ok) {
				setComments(json.data);
			}
		};
		const getPost = async (id) => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${id}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			const json = await res.json();
			if (res.ok) {
				setPost(json.data);
			}
		};
		getPostComments(id);
		getPost(id);
	}, [id, user.token]);
	return (
		<main className={styles.main}>
			<section>
				<h2 className={styles.sectionTitle}>Manage Comments</h2>
				<h3>{post && post.title}</h3>
				{comments && comments.length > 0 ? (
					comments.map((comment) => (
						<CommentPreview
							key={comment._id}
							post={post}
							comment={comment}
							setComments={setComments}
						/>
					))
				) : (
					<p>There are no comments for this post</p>
				)}
			</section>
		</main>
	);
};

export default Comments;

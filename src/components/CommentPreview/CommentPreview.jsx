import { formatDistance } from 'date-fns';
import propTypes from 'prop-types';
import useConfirm from 'src/hooks/useConfirm';
import useAuthContext from 'src/hooks/useAuthContext';
import styles from './CommentPreview.module.scss';

const CommentPreview = ({ post, comment, setComments }) => {
	const { isConfirmed } = useConfirm();
	const { user } = useAuthContext();
	const deleteComment = async (comment) => {
		const confirmed = await isConfirmed(`Delete comment? `);
		if (confirmed) {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${
					post._id
				}/comments/${comment._id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			const json = await res.json();
			if (res.ok) {
				setComments((prev) =>
					prev.filter((comment) => comment._id !== json.data._id)
				);
			}
		}
	};
	return (
		<>
			<div key={comment._id} className={styles.comment}>
				<div className={styles.header}>
					<p className={styles.author}>@ {comment.author.username}</p>
					<p className={styles.date}>
						{formatDistance(new Date(comment.createdAt), new Date())}
					</p>
				</div>
				<p className={styles.body}>{comment.body}</p>
				<div className={styles.footer}>
					<button
						className={styles.btnDelete}
						onClick={() => deleteComment(comment)}
					>
						Delete
					</button>
				</div>
			</div>
			<hr />
		</>
	);
};

CommentPreview.propTypes = {
	comment: propTypes.shape({
		_id: propTypes.string,
		author: propTypes.shape({
			username: propTypes.string,
		}),
		body: propTypes.string,
		createdAt: propTypes.string,
	}),
	post: propTypes.shape({ _id: propTypes.string }),
	setComments: propTypes.func,
};

export default CommentPreview;

import { Link } from 'react-router-dom';
import { RiArrowRightUpLine } from 'react-icons/ri';
import propTypes from 'prop-types';
import { format } from 'date-fns';
import usePostsContext from 'src/hooks/usePostsContext';
import useAuthContext from 'src/hooks/useAuthContext';
import useConfirm from 'src/hooks/useConfirm';
import Switch from 'src/components/Switch/Switch';
import styles from './PostPreview.module.scss';

const PostPreview = ({ post }) => {
	const { dispatch } = usePostsContext();
	const { user } = useAuthContext();
	const { isConfirmed } = useConfirm();
	const publishPost = async (post) => {
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${post._id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ is_published: true }),
			}
		);
		const json = await res.json();
		if (res.ok) {
			dispatch({ type: 'UPDATE_POST', payload: json.data });
		}
	};
	const unpublishPost = async (post) => {
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${post._id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ is_published: false }),
			}
		);
		const json = await res.json();

		if (res.ok) {
			dispatch({ type: 'UPDATE_POST', payload: json.data });
		}
	};

	const togglePublishPost = (post) => {
		if (post.is_published) {
			return unpublishPost(post);
		} else {
			return publishPost(post);
		}
	};

	const deletePost = async (post) => {
		const confirmed = await isConfirmed(`Delete ${post.title}? `);
		if (confirmed) {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${post._id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			const json = await res.json();
			if (res.ok) {
				dispatch({ type: 'DELETE_POST', payload: json.data });
			}
		}
	};

	return (
		<>
			<div key={post._id} className={styles.post}>
				<div to={`/posts/${post._id}`} className={styles.img}>
					<img src={post.img.url} alt="" />
				</div>
				<div className={styles.titleContainer}>
					<h3 className={styles.postTitle}>{post.title}</h3>
					{post.is_published && (
						<Link
							className={styles.readLink}
							to={`${import.meta.env.VITE_CLIENT_CROSS_ORIGIN}/posts/${
								post._id
							}`}
							target="_blank"
						>
							Read
							<RiArrowRightUpLine className={styles.arrowIcon} size={24} />
						</Link>
					)}
				</div>
				<div className={styles.postDetails}>
					<p>Created: {format(new Date(post.createdAt), 'PPPPp')}</p>
					<p>Modified: {format(new Date(post.updatedAt), 'PPPPp')}</p>
				</div>
				<div className={styles.postActions}>
					<div className={styles.toggleContainer}>
						<p>{post.is_published ? 'Published' : 'Unpublished'}</p>
						<Switch
							isOn={post.is_published}
							label={post._id + '_toggle'}
							handleToggle={() => togglePublishPost(post)}
						/>
					</div>
					<Link to={`/edit/${post._id}`}> Modify </Link>
					<button className={styles.btnDelete} onClick={() => deletePost(post)}>
						Delete
					</button>
					<div className={styles.commentControls}>
						<p>Total Comments : {post.comments.length}</p>
						{post.comments.length > 0 && (
							<Link to={`/comments/${post._id}`}> Manage Comments </Link>
						)}
					</div>
				</div>
			</div>
			<hr className={styles.hr} />
		</>
	);
};

PostPreview.propTypes = {
	post: propTypes.shape({
		_id: propTypes.string,
		title: propTypes.string,
		createdAt: propTypes.string,
		updatedAt: propTypes.string,
		is_published: propTypes.bool,
		comments: propTypes.array,
		img: propTypes.shape({
			url: propTypes.string,
		}),
	}),
};
export default PostPreview;

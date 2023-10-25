import { Link } from 'react-router-dom';
import { RiArrowRightUpLine } from 'react-icons/ri';
import propTypes from 'prop-types';
import usePostsContext from 'src/hooks/usePostsContext';
import useAuthContext from 'src/hooks/useAuthContext';
import Switch from 'src/components/Switch/Switch';
import styles from './PostPreview.module.scss';

const PostPreview = ({ post }) => {
	const { dispatch } = usePostsContext();
	const { user } = useAuthContext();

	const publishPost = async (post) => {
		const res = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify({ is_published: true }),
		});
		const json = await res.json();
		if (res.ok) {
			dispatch({ type: 'UPDATE_POST', payload: json });
		}
	};
	const unpublishPost = async (post) => {
		const res = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify({ is_published: false }),
		});
		const json = await res.json();

		if (res.ok) {
			dispatch({ type: 'UPDATE_POST', payload: json });
		}
	};

	const togglePublishPost = (post) => {
		if (post.is_published) {
			return unpublishPost(post);
		} else {
			return publishPost(post);
		}
	};

	return (
		<>
			<div key={post._id} className={styles.post}>
				<div className={styles.titleContainer}>
					<h3 className={styles.postTitle}>{post.title}</h3>
					{post.is_published && (
						<Link
							className={styles.readLink}
							to={`http://localhost:5173/posts/${post._id}`}
						>
							Read
							<RiArrowRightUpLine className={styles.arrowIcon} size={24} />
						</Link>
					)}
				</div>

				<div className={styles.postActions}>
					<p>{post.is_published ? 'Published' : 'Unpublished'}</p>
					<Switch
						isOn={post.is_published}
						label={post._id + '_toggle'}
						handleToggle={() => togglePublishPost(post)}
					/>
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
		is_published: propTypes.bool,
	}),
};
export default PostPreview;

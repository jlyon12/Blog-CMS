import { useState } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import propTypes from 'prop-types';
import styles from './TagsInput.module.scss';

const TagsInput = ({ tags, setTags }) => {
	const [input, setInput] = useState('');

	const handleKeyDown = (e) => {
		if (e.key !== 'Enter') return;
		// Allow multiple tags to be added at once via commas
		const tagsInput = e.target.value.split(',');
		// Ensure each tag is trimmed and filter out any empty tags
		const newTags = tagsInput
			.map((tag) => tag.trim())
			.filter((tag) => tag !== '');

		setTags([...tags, ...newTags]);
		setInput('');
	};

	const handleDeleteClick = (tag) => {
		setTags(tags.filter((t) => t !== tag));
	};

	return (
		<div className={styles.tagsContainer}>
			{tags.map((tag, i) => {
				return (
					<div
						key={i}
						className={styles.tagItem}
						onClick={() => handleDeleteClick(tag)}
					>
						<p className={styles.text}>{tag}</p>
						<FaDeleteLeft className={styles.close} />
					</div>
				);
			})}
			<input
				type="text"
				className={styles.input}
				onKeyDown={handleKeyDown}
				placeholder="Add a tag... (separate multiple tags with commas)"
				onChange={(e) => setInput(e.target.value)}
				value={input}
			/>
		</div>
	);
};
TagsInput.propTypes = {
	tags: propTypes.array,
	setTags: propTypes.func,
};

export default TagsInput;

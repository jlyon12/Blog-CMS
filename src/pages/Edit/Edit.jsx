import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate, useParams } from 'react-router';
import useAuthContext from 'src/hooks/useAuthContext';
import useDarkModeContext from 'src/hooks/useDarkModeContext';
import styles from './Edit.module.scss';
const Edit = () => {
	const [originalPost, setOriginalPost] = useState({ title: '', body: '' });

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const { id } = useParams();
	const Navigate = useNavigate();
	const { user } = useAuthContext();
	const { darkMode } = useDarkModeContext();
	const editorRef = useRef(null);

	useEffect(() => {
		const getBlogPost = async (id) => {
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
				setOriginalPost({ title: json.title, body: json.body });
				setTitle(json.title);
				setBody(json.body);
			}
		};
		getBlogPost(id);
	}, [id, user.token]);

	const updatePost = async (post) => {
		return await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(post),
			}
		);
	};
	const changeIsDetected = () => {
		if (title === originalPost.title && body === originalPost.body) {
			return false;
		} else return true;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!changeIsDetected()) {
			alert('No changes have been detected. Unable to process request.');
		}
		const post = { title, body };
		updatePost(post);
		Navigate('/manage');
	};
	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<fieldset>
					<legend>Create Blog</legend>
					<label className={styles.formControl}>
						Title
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>
					<Editor
						apiKey={import.meta.env.VITE_API_KEY}
						onInit={(evt, editor) => (editorRef.current = editor)}
						value={body}
						init={{
							height: 500,
							menubar: false,
							plugins: [
								'advlist',
								'autolink',
								'lists',
								'link',
								'image',
								'charmap',
								'preview',
								'anchor',
								'searchreplace',
								'visualblocks',
								'code',
								'fullscreen',
								'insertdatetime',
								'media',
								'table',
								'code',
								'help',
								'wordcount',
							],
							toolbar:
								'undo redo | blocks | ' +
								'bold italic forecolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help',
							content_style:
								'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
							skin: darkMode ? 'oxide-dark' : 'oxide',
							content_css: darkMode ? 'dark' : 'default',
						}}
						onEditorChange={() => setBody(editorRef.current.getContent())}
					/>
				</fieldset>
				<button className={styles.btn}>Edit Blog</button>
			</form>
		</main>
	);
};

export default Edit;

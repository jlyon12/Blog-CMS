import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router';
import useAuthContext from 'src/hooks/useAuthContext';
import useDarkModeContext from 'src/hooks/useDarkModeContext';
import styles from './Create.module.scss';
const Create = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const Navigate = useNavigate();
	const { user } = useAuthContext();
	const { darkMode } = useDarkModeContext();
	const editorRef = useRef(null);

	const createPost = async (post) => {
		return await fetch(`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify(post),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const post = { title, body };
		createPost(post);
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
						initialValue=""
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
								'bold italic forecolor  | alignleft aligncenter ' +
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
				<button className={styles.btn}>Post Blog</button>
			</form>
		</main>
	);
};

export default Create;

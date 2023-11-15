import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router';
import { DotLoader } from 'react-spinners';
import useAuthContext from 'src/hooks/useAuthContext';
import useDarkModeContext from 'src/hooks/useDarkModeContext';
import TagsInput from 'src/components/TagsInput/TagsInput';
import styles from './Create.module.scss';
const Create = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [tags, setTags] = useState([]);
	const [file, setFile] = useState(null);
	const [img_src, setImg_src] = useState('');

	const [errors, setErrors] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const Navigate = useNavigate();
	const { user } = useAuthContext();
	const { darkMode } = useDarkModeContext();
	const editorRef = useRef(null);

	const createPost = async (post) => {
		setErrors(null);
		setIsLoading(true);
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
				body: post,
			}
		);
		const json = await res.json();
		if (!res.ok) {
			setIsLoading(false);
			setErrors(json.errors);
		}
		if (res.ok) {
			setIsLoading(false);
			Navigate('/manage');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const post = new FormData();
		post.append('img', file);
		post.append('title', title);
		post.append('body', body);
		post.append('img_src', img_src);
		tags.forEach((tag) => post.append('tags[]', tag));
		createPost(post);
	};
	return (
		<main className={styles.main}>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
				onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
			>
				<fieldset>
					<legend>Create Blog</legend>
					<label className={styles.formControl}>
						Title
						<input
							required
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>
					<label className={styles.formControl}>
						Featured Image
						<input
							required
							type="file"
							name="img"
							accept="image/*"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</label>
					<label className={styles.formControl}>
						Image Credit/Source
						<input
							required
							type="text"
							value={img_src}
							onChange={(e) => setImg_src(e.target.value)}
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
					<label className={styles.formControl}>
						Post Tags
						<TagsInput tags={tags} setTags={setTags} />
					</label>
				</fieldset>

				<button disabled={isLoading} className={styles.btn}>
					Post Blog
				</button>
				<DotLoader
					color="#6941c6"
					className={styles.spinner}
					loading={isLoading}
				/>
				{errors &&
					errors.map((error) => {
						return (
							<p key={error} className={styles.error}>
								{error.detail}
							</p>
						);
					})}
			</form>
		</main>
	);
};

export default Create;

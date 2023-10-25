import { useContext } from 'react';
import { PostsContext } from 'src/context/PostsContext';

const usePostsContext = () => {
	const context = useContext(PostsContext);

	if (!context)
		throw Error('PostsContext must be used inside of an PostsContextProvider');

	return context;
};

export default usePostsContext;

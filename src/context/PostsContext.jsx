import { createContext, useReducer } from 'react';
import propTypes from 'prop-types';
const PostsContext = createContext();

const postsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_POSTS':
			return {
				posts: action.payload,
			};
		case 'CREATE_POST':
			return { posts: [action.payload, ...state.posts] };

		case 'DELETE_POST':
			return {
				posts: state.posts.filter((post) => post._id !== action.payload._id),
			};
		case 'UPDATE_POST':
			return {
				posts: state.posts.map((post) =>
					post._id === action.payload._id
						? { ...post, ...action.payload }
						: post
				),
			};
		default:
			return state;
	}
};
const PostsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(postsReducer, { posts: null });

	return (
		<PostsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</PostsContext.Provider>
	);
};

PostsContextProvider.propTypes = {
	children: propTypes.element,
};

export { PostsContext, PostsContextProvider };

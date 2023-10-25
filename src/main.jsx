import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from 'src/router';
import { DarkModeContextProvider } from 'src/context/DarkModeContext';
import { AuthContextProvider } from 'src/context/AuthContext';
import { PostsContextProvider } from './context/PostsContext';
import 'src/sass/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DarkModeContextProvider>
			<AuthContextProvider>
				<PostsContextProvider>
					<Router />
				</PostsContextProvider>
			</AuthContextProvider>
		</DarkModeContextProvider>
	</React.StrictMode>
);

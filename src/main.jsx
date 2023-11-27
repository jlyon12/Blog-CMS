import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from 'src/Router';
import { DarkModeContextProvider } from 'src/context/DarkModeContext';
import { AuthContextProvider } from 'src/context/AuthContext';
import { PostsContextProvider } from 'src/context/PostsContext';
import { ConfirmContextProvider } from 'src/context/ConfirmContext';
import 'src/sass/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DarkModeContextProvider>
			<AuthContextProvider>
				<PostsContextProvider>
					<ConfirmContextProvider>
						<Router />
					</ConfirmContextProvider>
				</PostsContextProvider>
			</AuthContextProvider>
		</DarkModeContextProvider>
	</React.StrictMode>
);

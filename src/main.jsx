import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from 'src/router';
import { DarkModeContextProvider } from './context/DarkModeContext';

import 'src/sass/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DarkModeContextProvider>
			<Router />
		</DarkModeContextProvider>
	</React.StrictMode>
);

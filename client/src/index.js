import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserContextProvider } from './context/userIndex';
import { FileContextProvider } from './context/fileIndex';
import { VideoContextProvider } from './context/videoIndex';
import { UtilContextProvider } from './context/utilIndex';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<UserContextProvider>
		<FileContextProvider>
			<VideoContextProvider>
				<UtilContextProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</UtilContextProvider>
			</VideoContextProvider>
		</FileContextProvider>
	</UserContextProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

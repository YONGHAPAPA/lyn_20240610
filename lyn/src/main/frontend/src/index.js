import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import reportWebVitals from './reportWebVitals';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


import {Provider} from 'react-redux';
import store from './store';



const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient} >
				{/* devtools */}
				<ReactQueryDevtools initialIsOpen={true} />

					<BrowserRouter>
					
						<Provider store={store}>
							<Header/>
							<App/>
							<Footer/>
						</Provider>
				
					</BrowserRouter>
			</QueryClientProvider>
		</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

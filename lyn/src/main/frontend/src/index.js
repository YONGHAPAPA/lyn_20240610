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

import store from './store';
import { Provider } from 'react-redux'

//import { worker } from './api/fake/server'

import { fetchUsers } from './reducers/usersSlice'

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore} from 'redux-persist';






export let persistor = persistStore(store);

async function main() {
	
	//console.log("index start!")
	
	//Start mock API server
	//await worker.start({onUnhandledRequest: 'bypass'}) 
	//console.log("worker started");
	if (process.env.NODE_ENV === "development") {
	  
	  //2024.10.22 MSW 중지하고 테스트DB로 처리
	  /* 
	  await (async () => {
	    const { worker } = await import("./api/fake/server");
	    await worker.start({onUnhandledRequest: 'bypass'});	//await 주의 없으면, ui 렌더링이 비동기로 처
		store.dispatch(fetchUsers());

	  })();
	  */
	  
	  
	}
	//console.log("index start! 2")
}

main().then((res)=>{
	
	//console.log("index start! 3", res);
	const queryClient = new QueryClient();
	const root = ReactDOM.createRoot(document.getElementById('root'));

	root.render(
			<React.StrictMode>
				<QueryClientProvider client={queryClient} >
				
					{/* devtools */}
					<ReactQueryDevtools initialIsOpen={true} /> 
					 
					 <Provider store={store}>
					 	<PersistGate loading={null} persistor={persistor}>
					 		<BrowserRouter>
								<Header/>
								<App/>
								<Footer/>
							</BrowserRouter>
					 	</PersistGate>
					 </Provider>
				</QueryClientProvider>
			</React.StrictMode>
	);
	
})






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

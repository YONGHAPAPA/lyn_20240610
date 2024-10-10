import { compose, createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer';

import { configureStore } from '@reduxjs/toolkit'

//const store = createStore(rootReducer);

import postsReducer from './reducers/postSlice';
import usersReducer from './reducers/usersSlice';


const store = configureStore({
	//reducer: rootReducer
	reducer: {
		posts: postsReducer, 
		users: usersReducer,
	}
})



console.log("store");
console.log(store.getState()) 


export default store;
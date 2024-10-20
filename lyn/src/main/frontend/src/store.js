import { compose, createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer';

import { configureStore } from '@reduxjs/toolkit'

//const store = createStore(rootReducer);

import postsReducer from './reducers/postSlice';
import usersReducer from './reducers/usersSlice';
import notificationsSlice from './reducers/sample/redux/notifications/notificationsSlice';


const store = configureStore({
	//reducer: rootReducer
	reducer: {
		posts: postsReducer, 
		users: usersReducer,
		notifications: notificationsSlice,
	}
})



//console.log("store");
//console.log(store.getState()) 


export default store;
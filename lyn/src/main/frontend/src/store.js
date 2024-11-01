import { compose, createStore, applyMiddleware, combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer';

import { configureStore } from '@reduxjs/toolkit'

//const store = createStore(rootReducer);

import sessionReducer from './reducers/session/sessionSlice';
import postsReducer from './reducers/postSlice';
import usersReducer from './reducers/usersSlice';
import notificationsSlice from './reducers/sample/redux/notifications/notificationsSlice';


const persistConfig = {
	key: 'root', 
	storage, 
	whitelist: ['session'],
}

const reducers = combineReducers({
	posts: postsReducer, 
	users: usersReducer,
	notifications: notificationsSlice,
	
	/* Login session reducer */
	session: sessionReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
})

/*const store = configureStore({
	//reducer: rootReducer
	reducer: {
		 test용 
		posts: postsReducer, 
		users: usersReducer,
		notifications: notificationsSlice,
		
		 Login session reducer 
		session: sessionReducer,
	}
})*/



//console.log("store");
//console.log(store.getState()) 


export default store;
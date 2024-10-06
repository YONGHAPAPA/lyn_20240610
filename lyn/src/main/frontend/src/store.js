import { compose, createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer';

import { configureStore } from '@reduxjs/toolkit'

//const store = createStore(rootReducer);

const store = configureStore({
	reducer: rootReducer
	
	
})


console.log(store.getState())


export default store;
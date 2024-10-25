import { createSlice, createAsyncThunk, createSelector } from 'reduxjs/toolkit'

import { invokeUserToken } from '../../api/user/userApi'

const initialState = {
	jwt: {
		grantType:'',
		accessToken: '', 
		accTokenExpiry: '', 
		refreshToken: '', 
		refTokenExpiry: '',
	}, 
	user: {
		id:'', 
		name: '',
		roles:'',
	}, 
	status: 'idle', 
	error: {
		code:'', 
		message: '',
	}
}


export const fetchInvokeUserSession = createAsyncThunk('auth/invokeSession', async (email, pwd) => {
	const result = await invokeUserToken(email, pwd)
	return result;
})


const sessionSlice = createSlice();



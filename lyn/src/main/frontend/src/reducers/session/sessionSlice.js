import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import { authenticateUser, logoutUser } from '../../api/user/userApi'

const initialState = {
	fetchState: 'idle', 
	user: {
		id:'', 
		name: '',
		roles:'',
	}, 
	jwt: {
		grantType:'',
		accessToken: '', 
		accessExpiry: '', 
		refreshToken: '', 
		refreshExpiry: '',
	}, 
}


export const fetchUserLogin = createAsyncThunk('auth/userLogin', async (submit) => {
	const result = await authenticateUser(submit.email, submit.password)
	return result;
})


export const fetchUserLogout = createAsyncThunk('auth/userlogout', async (session) => {
	const result = await logoutUser(session)
	return result;
})


const sessionSlice = createSlice({
	name: 'session', 
	initialState,
	reducers: {}, 
	extraReducers(builder){
		builder
		.addCase(fetchUserLogin.pending, (state, action)=>{
			state.fetchState = "pending";
		})
		.addCase(fetchUserLogin.fulfilled, (state, action)=>{
			const actionData = action.payload;
			const success = actionData.success;
			const payload = actionData.payload;
			const submit = actionData.submit;
			
			state.fetchState = "fulfilled";
			
			if(actionData.success){
				//로긴처리후 token 정보 state에 로드
				state.authenticated = true;
				state.jwt.grantType = payload.grantType;
				state.jwt.accessToken = payload.accessToken;
				state.jwt.accessExpiry = payload.accessExpiry;
				state.jwt.refreshToken = payload.refreshToken;
				state.jwt.refreshExpiry = payload.refreshExpiry;
				state.user.roles = payload.roles;
				state.user.id = submit.email;
			}
		})
		.addCase(fetchUserLogin.rejected, (state, action) => {
			console.log("sessionSlice- rejected");
			state.fetchState = "rejected";
		})
		
		.addCase(fetchUserLogout.pending, (state, action) => {
			state.fetchState = "pending";
		})
		.addCase(fetchUserLogout.fulfilled, (state, action) => {
			state.fetchState = "fulfilled";
			console.log('fulfilled logout');
		})
		.addCase(fetchUserLogout.rejected, (state, action) => {
			state.fetchState = "rejected";
			console.log("rejected logout");
			//비정상 로그아웃시 세션클랜징을 해야되나?
		})
	}
});



export default sessionSlice.reducer;


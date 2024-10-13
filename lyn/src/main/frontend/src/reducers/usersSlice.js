import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/fake/client'


/*
const initialState = [
	{id: '0', name: 'KKK'}, 
	{id: '1', name: 'BBB'}, 
	{id: '2', name: 'CCC'}
]
*/

const initialState = []


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await client.get('/fakeApi/users')
	return response.data
})


const usersSlice = createSlice({
	name: 'users', 
	initialState, 
	reducers: {}, 
	extraReducers(builder){
		builder.addCase(fetchUsers.fulfilled, (state, action)=>{
			return action.payload
		})
	}
})


export default usersSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
	{id: '0', name: 'KKK'}, 
	{id: '1', name: 'BBB'}, 
	{id: '2', name: 'CCC'}
]

const usersSlice = createSlice({
	name: 'users', 
	initialState, 
	reducers: {
	}
})


export default usersSlice.reducer
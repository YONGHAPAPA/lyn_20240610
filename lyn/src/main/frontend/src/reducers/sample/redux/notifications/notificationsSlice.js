import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../../../api/fake/client'

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', 
	async(_, {getState})=>{
		
		//console.log("fetchNotifications start")
		
		const allNotifications = selectAllNotifications(getState())
		const [latestNotification] = allNotifications
		const lastestTimestamp = latestNotification ? latestNotification.date : ''
		const response = await client.get(`/fakeApi/notifications?since=${lastestTimestamp}`)
		
		return response.data
	}
)

const notificationsSlice = createSlice({
	name: 'notifications', 
	initialState: [], 
	reducers: {
		allNotificationsRead(state, action){
			state.forEach(noti => {
				noti.read = true
			})
		}, 
	}, 
	extraReducers(builder){
		builder.addCase(fetchNotifications.fulfilled, (state, action) => {
			state.push(...action.payload)
			state.sort((a,b)=> b.date.localeCompare(a.date))
		})
	}
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications




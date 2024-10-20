import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchNotifications, selectAllNotifications } from '../../reducers/sample/redux/notifications/notificationsSlice'


export const ReduxSample = () => {
	const dispatch = useDispatch()
	const notifications = useSelector(selectAllNotifications)
	
	console.log(notifications)
	const numUnreadNoti = notifications.filter(n => !n.isRead).length
	
	let unreadNotiBadge
	
	if(numUnreadNoti => 0){
		unreadNotiBadge = (
			<span>{numUnreadNoti}</span>
		)
	}
	
	const fetchNewNotifications = () => {
		dispatch(fetchNotifications())		
	}
	
	
	
	return(
		<section>
			<Link to="/users"> @ Go to Users</Link>
			<Link to="/notifications"> @ Go to Notification ({unreadNotiBadge})</Link> <button onClick={fetchNewNotifications}>refresh noti</button>
		</section>
	)
	
}
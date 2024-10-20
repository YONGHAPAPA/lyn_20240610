import React, {useLayoutEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { selectAllUsers } from '../../../../reducers/usersSlice'
import { selectAllNotifications, allNotificationsRead } from '../../../../reducers/sample/redux/notifications/notificationsSlice'


export const NotificationsList = () => {
	
	
	
	const dispatch = useDispatch()
	const notifications = useSelector(selectAllNotifications)
	const users = useSelector(selectAllUsers)
	
	useLayoutEffect(()=>{
		dispatch(allNotificationsRead())
	})
	
	const renderedNotifications = notifications.map(noti => {
		const date = parseISO(noti.date)
		const timeAgo = formatDistanceToNow(date)
		const user = users.find(user => user.id === noti.user) || {name: 'Unknown User'}
		//const user = {name: 'unknown user'}
		
		//noti.isNew 값에 따라 noti 읽지 않은것들 다른방식으로 보이도록 처리가능 
		
		return (
			<section>
				<div key={noti.id}>
					<div>
						<b>{user.name}</b> {noti.message}
					</div>
					<div title={noti.date}>
						<i>{timeAgo} ago</i>
					</div>
				</div>
			</section>
		)
	})
	
	
	return (
		<section>
			<h2>Notifications</h2>
			{renderedNotifications}
		</section>
	)
}
import React from 'react'
import {useSelector} from 'react-redux'
import { selectAllUsers } from '../../../../reducers/usersSlice'
import { Link } from 'react-router-dom'


export const UsersList = () => {
	
	const users = useSelector(selectAllUsers)
	
	console.log(users);
	
	const renderedUsers = users.map(user => (
		<li key={user.id}>
			<Link to={`/users/${user.id}`}>{user.name}</Link>
		</li>
	))
	
	return (
		
		<section>
			<h2>User List</h2>
			<ul>{renderedUsers}</ul>
		</section>
	)
}
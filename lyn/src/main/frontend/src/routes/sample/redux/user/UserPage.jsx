import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../../../../reducers/usersSlice'
import { selectAllPosts } from '../../../../reducers/postSlice'



export const UserPage = () => {
	
	const params = useParams()
	const userId = params.userId
	
	
	console.log("userId", userId);

	const user = useSelector(state => selectUserById(state, userId))
	
		
	
	return (
		<section>
			<h2>{user.username}</h2>
			
		</section>
	)
	
}
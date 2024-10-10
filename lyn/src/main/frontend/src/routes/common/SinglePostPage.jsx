import React from 'react'

import { useSelector } from 'react-redux'

//thunk 적용
import { selectPostById } from '../../reducers/postSlice'

export const SinglePostPage = ({postId}) => {
	
	//const { postId } = post.id
	
	//thunk 적용
	/*const post = useSelector(state => 
		state.posts.find(post => post.id === postId)
	)*/
	const post = useSelector(state => selectPostById(state, postId))
	
	
	
	if(!post){
		
		return (
			<section>
				<h2>Post not found.</h2>
			</section>
		)
	}
	
	return (
		
		<section>
			<article>
				<h2>{post.title}</h2>
				<p>{post.content}</p>
			</article>
		</section>
	)
	
}
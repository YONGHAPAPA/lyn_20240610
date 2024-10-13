import React from 'react'

import { useSelector } from 'react-redux'

//thunk 적용
import { selectPostById } from '../../reducers/postSlice'
import { useParams } from 'react-router-dom';

export const SinglePostPage = () => {
	
	const params = useParams();
	
	console.log("SingelPostPage", params.postId);
	
	
	
	const postId = params.postId;
	
	console.log(postId);
	
	//thunk 적용
	/*
	const post = useSelector(state =>
		state.posts.posts.find(post => post.id === postId)
	)
	*/
	
	const post = useSelector(state => selectPostById(state, postId))
	
	console.log("SinglePost", post)
	
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
import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {PostAuthor_EX} from './PostAuthor_EX'
import {TimeAgo_ex} from './TimeAgo_ex'
import {ReactionButtons} from './ReactionButtons'
import { EditPostForm } from './EditPostForm';
import { Spinner } from './Spinner'

import {useSelector, useDispatch} from 'react-redux'
import {selectAllPosts, selectPostById, postAdded, postUpdated, areactionAdded, fetchPosts} from '../../reducers/postSlice'




let PostExcerpt = ({post}) => {
	
	
	return (
		
		<article key={post.id}>
			
			<h3>{post.title}</h3>
			<div>
				<PostAuthor_EX userId={post.user} />
				<TimeAgo_ex timestamp={post.date} />
			</div>
			<p>{post.content}</p>
			
			<Link to={`/posts/${post.id}`} >View Post</Link>|&nbsp;
			<Link to={`/editPosts/${post.id}`}>Edit Post</Link>
			
			<ReactionButtons post={post}/>
		</article>
	)
}



export const PostsList = () => {
	
	let content;
	
	const dispatch = useDispatch();
	let allPosts = useSelector(selectAllPosts);
	
	
	let userlist = allPosts.map(post => post.user)
	console.log("userlist >> ", userlist);
	
	
	const postStatus = useSelector(state => state.posts.status)
	
	//console.log("postStatus", postStatus);
	
	
	const users = useSelector(state => state.users);
	
	//console.log(users); 
	
	
	useEffect(()=>{
		console.log("postStatus", postStatus);
		
		if(postStatus === 'idle'){
			//dispatch(fetchPosts())	//개발시점에는 렌더링이 2번 발생하기 때문에 일단  주석 <React.StrictMode> 설정일경우 2번 랜더링 
		}
	}, [postStatus, dispatch])
	
	
	
	//console.log(allPosts);
	
	const [isEdit, setIsEdit] = useState(false); 
	
	const sortedPosts = useMemo(()=>{
		const sortedPosts = allPosts.slice();
		sortedPosts.sort((a,b) => (b.date.localeCompare(a.date)))
		return sortedPosts;
	}, [allPosts]) 
	
	
	//console.log(sortedPosts)
	let renderedPosts;
	
	if(postStatus === 'loading'){
		renderedPosts = <Spinner text='Loading....'/>
	} else if(postStatus === "succeeded"){
		renderedPosts = sortedPosts.map((post)=>{
			//console.log("renderedPosts", post.id);
			return <PostExcerpt key={`${post.id}`} post={post} />;
		})	
	}
	
	
	
	
	//console.log(renderedPosts);
	
	
	return (
		<section>
			<h2># Post List</h2>
			{renderedPosts}
		</section>
		
	)
}
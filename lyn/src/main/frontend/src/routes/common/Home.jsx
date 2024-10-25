import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultButton from '../../components/DefaultButton';

import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

//thunk 적용으로 변경
//import { postAdded, postUpdated } from '../../reducers/postSlice'
import { selectAllPosts, selectPostById, postAdded, postUpdated, fetchPosts, addNewPost} from '../../reducers/postSlice'

import { PostAuthor_EX } from './PostAuthor_EX';
import { TimeAgo_ex } from './TimeAgo_ex';
import { ReactionButtons } from './ReactionButtons';
import { SinglePostPage } from './SinglePostPage'

import { PostsList } from './PostsList'


const Home = () => {
	
	
	//console.log("Home !!!");
	
	const [postTitle, setPostTitle] = useState("");
	const [postContent, setPostContent] = useState("");
	const [userId, setUserId] = useState("");
	const [addRequestStatus, setAddRequestStatus] = useState('idle') 
	
	//thunk처리로 변경
	//const posts = useSelector(state => state.posts);
	const posts = useSelector(selectAllPosts);
	
	const users = useSelector(state => state.users);
	const dispatch = useDispatch();
	 
	//console.log(posts);
	//console.log(users);
	
	//console.log("addRequestStatus", addRequestStatus);
	
	const canSave = [postTitle, postContent, userId].every(Boolean) && addRequestStatus === 'idle';
	
	//console.log("canSave", canSave)
	
	const onSavePostClicked = async () => {
		if(canSave){
			try{
				setAddRequestStatus('pending')
				
				//console.log();
				
				await dispatch(addNewPost({title: postTitle, content: postContent, user: userId})).unwrap()
				setPostTitle('');
				setPostContent('');
				setUserId('');
			} catch (err) {
				console.log('Failed to save the post', err)
			} finally {
				setAddRequestStatus('idle')
			}
		}
	}
	
	
	const onAuthorChanged = (e) => {
		//console.log("onAuthorChanged", e.target.value)
		setUserId(e.target.value);
	}
	
	
	
	
	//sorting post
	//console.log("posts", posts);
	const orderedPosts = posts.slice().sort((a, b)=> 
		{
			//console.log("sort >> ", a.date, b.date)
			return b.title.localeCompare(a.title);
		}
	)
	
	
	
	/*
	const renderPosts = orderedPosts.map(post => {
		//console.log("renderPosts", post.id);
		return (
			<article key={post.id}>
				<SinglePostPage postId={post.id} />
				<PostAuthor_EX userId={post.user}/>
				<TimeAgo_ex timestamp={post.date}/>
				<ReactionButtons post={post} />
				
			</article>
		)
	})
	*/
	
	
	const usersOptions = users.map(user => {
		
		return(
			<option key={user.id} value={user.id}>{user.name}</option>
		)
	})
	
	
	
	useEffect(()=>{
		//console.log("init home");
	})
	
	
	function doAction(){
		//console.log("doAction")
		const url = "/home/index";
		axios.get(url, "", null).then(res=>{
			
			console.log(res);
		})
	}
	
	
	const onTitleChange = (e) => {
		setPostTitle(e.target.value);
	}

		
	const onContentChange = (e) => {
		setPostContent(e.target.value);
	}
	
	
	const onClickSavePost = (e) => {
			dispatch(
				/*postAdded(
					{
						id: '', 
						title: postTitle, 
						content: postContent
					}
				)*/ //normal reducer 적용시
				
				postAdded(postTitle, postContent, userId)	//prepare callback 적용시
			)
			
			setPostTitle('');
			setPostContent('');
		}
		
	const onClickGetAllPosts = (e) => {
		
		dispatch(fetchPosts())
		
	} 
	
	
	
	return (
		<>
			<div>Home</div>
			<DefaultButton onClick={doAction} text={"doAction"}/>
			<br/>
			
			 
			<div>
				<label>Post title: </label><input type="text" id="postTitle" value={postTitle} onChange={onTitleChange} />
				<label>Post content : </label><input type="text" id="postContent" value={postContent} onChange={onContentChange} />
				<select id='postAuthor' value={userId} onChange={onAuthorChanged}>
					{usersOptions}
				</select>
			</div>

			<div>
				<button onClick={(e)=>{onSavePostClicked()}} disabled={addRequestStatus === "idle" ? false : true} >{addRequestStatus === "idle" ? "save post" : "saving..."}</button>
				<button onClick={(e)=>{onClickGetAllPosts()}}>get all posts</button>
			</div>
						
			
			
			
			<div>
				<PostsList/>
				{/* {renderPosts} */}
				
			</div>
			
			
		</>
	);
}


export default Home;
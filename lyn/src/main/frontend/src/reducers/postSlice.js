import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

import { client } from '../api/client'

/*const initialState = [
	{
		id: '1', 
		date: sub(new Date(), {minutes: 10}).toISOString(), 
		title: 'first post', 
		content: 'hello', 
		reactions: {
			thumbsUp: 0,
			hooray: 0, 
			heart: 0, 
			rocket: 0, 
			eyes: 0 
		}, 
		user: ''
	}, 
	{
		id: '2', 
		date: sub(new Date(), {minutes: 30}).toISOString(), 
		title: 'second post', 
		content: 'hollo~~~~~', 
		reactions: {
			thumbsUp: 0,
			hooray: 0, 
			heart: 0, 
			rocket: 0, 
			eyes: 0 
		}, 
		user: ''
	}
]*/


const initialState = {
	posts: [], 
	status: 'idle', 
	error: null
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=> {
	const response = await client.get('/fakeApi/posts')
	return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
	/*postAdded(state, action){
		state.push(action.payload)
	},*/
	
	reactionAdded(state, action) {
		const { postId, reaction } = action.payload
		const existingPost = state.posts.find(post => post.id === postId)
		
		if(existingPost){
			existingPost.reactions[reaction]++
		}
	}, 
	
	//prepare callback 적용했을경우
	postAdded: {
		reducer(state, action){
			state.posts.push(action.payload)
		}, 
		prepare(title, content, userId){
			return {
				payload: {
					id: nanoid(),
					date: new Date().toISOString(), 
					title: title, 
					content: content,
					reactions: {
						thumbsUp: 0, 
						hooray: 0, 
						heart: 0, 
						rocket: 0, 
						eyes: 0
					}, 
					user: userId
				}
			}
		}
	}, 
	
	 
	postUpdated(state, action){
		const {id, title, content} = action.payload
		const existingPost = state.posts.find(post => post.id === id)
		if(existingPost){
			existingPost.title = title
			existingPost.content = content
		}
	}
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions 

export default postsSlice.reducer

//thunk 적용용
export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

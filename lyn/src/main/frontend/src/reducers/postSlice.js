import { createSlice, nanoid, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

import { client } from '../api/fake/client'

/*
const initialState = [
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
]
*/



const initialState = {
	posts: [], 
	status: 'idle', 
	error: null
}



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=> {
	//console.log("postSlice", "start fetchPosts !! ");
	const response = await client.get('/fakeApi/posts')
	//console.log("fetchPosts", response);
	return response.data
})


export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost)=> {
	const response = await client.post('/fakeApi/posts', initialPost)
	return response.data;
})



const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
	/*postAdded(state, action){
		state.push(action.payload)
	},*/
	
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
	
	reactionAdded(state, action) {
		const { postId, reaction } = action.payload
		const existingPost = state.posts.find(post => post.id === postId)
		
		if(existingPost){
			existingPost.reactions[reaction]++
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
  }, 
  
  extraReducers(builder){
	builder
	.addCase(fetchPosts.pending, (state, action) => {
		state.status = 'loading'
	})
	.addCase(fetchPosts.fulfilled, (state, action) => {
		
		console.log("postSlice", "fulfilled");
		state.status = 'succeeded'
		//console.log("action.payload", action.payload);
		state.posts = state.posts.concat(action.payload)	//새롭게 조회된 리스트를 기존의 states.posts에 연결해준다.  
	})
	.addCase(fetchPosts.rejected, (state, action) => {
		state.status = 'failed'
		state.error = action.error.message
	})
	.addCase(addNewPost.fulfilled, (state, action) => {
		
		console.log("addNewPost", action.payload)
		state.posts.push(action.payload)
	})
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions 

export default postsSlice.reducer

//thunk 적용용
export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
	[selectAllPosts, (state, userId) => userId], 
	(posts, userId) => posts.filter(post => post.user === userId)
)
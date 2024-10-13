import React, {useState} from 'react'
import { useHistory, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded, postUpdated, selectPostById} from '../../reducers/postSlice'

export const EditPostForm = () => {
	
	const params = useParams();
	const postId = params.postId;
	const dispatch = useDispatch();
	
	const post = useSelector(state => selectPostById(state, postId));
	
	const [postTitle, setPostTitle] = useState(post.title);
	const [postContent, setPostContent] = useState(post.content);
	const [userId, setUserId] = useState("");
	
	const navigate = useNavigate();
		
	
	//const history = useHistory();
	//console.log("post", post);
	
	const onSavePost = (e, postId) => {
			
		//console.log(e);
		console.log("onSavePost", postId)
		
		dispatch(
			postUpdated(
				{
					id: postId, 
					title: postTitle, 
					content: postContent
				}
			)
		)
		
		navigate("/")
	}
	
		
	
	
	const onChange_d1 = (e) => {
		setPostTitle(e.target.value);
		
	}
		
	const onChange_d2 = (e) => {
		setPostContent(e.target.value);
	}
	
	
	
	return (
		<section>
			<h2># Edit Post</h2>
			<form>
				<input id={`${post.id}_title`} type="text" value={postTitle} onChange={onChange_d1} />
				<input id={`${post.id}_ctnt`} type="text" value={postContent} onChange={onChange_d2} />
				<button type='button' onClick={(e) => onSavePost(e, `${post.id}`)}>save post</button>
			</form>
		</section>	
	)
		
}
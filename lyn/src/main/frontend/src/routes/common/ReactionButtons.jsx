import React from 'react'
import { useDispatch } from 'react-redux';
import { reactionAdded } from '../../reducers/postSlice'


const reactionEmoji = {
	thumbsUp: "👍", 
	hooray: "🎉", 
	heart: "❤️", 
	rocket: "🚀", 
	eyes: "👀"
}

export const ReactionButtons = ({post}) => {
	
	const dispatch = useDispatch();
	
	const reactionButtons = Object.entries(reactionEmoji).map(([nm, emoj]) => {
		
		//console.log("ReactionButtons >>> ", nm, emoj);
		return(
			<button onClick={()=> dispatch(reactionAdded({postId: post.id, reaction: nm}))}>
				{emoj} {post.reactions[nm]}
			</button>
		)
	});
	
	return <div>{reactionButtons}</div>
}
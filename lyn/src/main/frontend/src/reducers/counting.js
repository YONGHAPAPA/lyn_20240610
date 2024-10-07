const initialState = {
	count1: 0,
}

export default function countingReducer(state = initialState, action){
	switch(action.type){
		case 'push': {
			return {
				...state, 
				count1: state.count1 + 1
			}
		}
		case 'jump': {
			return {
				...state, 
				count1: action.payload
			}
		}
		
		default: {
			return state;
		}
		
	}
	
}
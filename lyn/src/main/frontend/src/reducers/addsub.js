const initialState = {
	value1: 0,
}

export default function addsubReducer(state = initialState, action) {
	switch(action.type){
		case 'increment': {
			return {
				...state, 
				value1: state.value1 + 1
			}
		}
		
		case 'decrement': {
			return {
				...state, 
				value1: state.value1 - 1
			}	
		}
		
		case 'reset': {
			return {
				...state, 
				value: 0
			}
		}
		
		default: {
			return state;
		}
	}
}
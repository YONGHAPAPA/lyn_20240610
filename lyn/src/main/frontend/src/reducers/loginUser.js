const initState = {
	loginUserInfo: {
		userId: "11", 
		accessToken: "aaaaaa", 
		accessTokenExpiryDate: "",
		refreshToken: "", 
		refreshTokenExpiryDate: "",
	}	
}


export default function loginUserReducer(state = initState, action){
	
	console.log("action", action.userId);
	
	switch(action.type){
		case "MUTATE_LOGIN_USER" : {
			return{
				...state, 
				...action.payload
			}
		}
		default : 
			return state;
	}
}
import axios from "axios";


export function extractAccessTokenFromRequestHeader(accessToken){
	
	let tokenData = "";
	
	try{
		
		if(accessToken !== "" && accessToken !== undefined && accessToken.includes("Bearer")){
			tokenData = accessToken.substr("Bearer".length + 1);	
		}
		
	} catch(e){
		console.log(`[modules::authentication::validateAccessToken] ${e.description}`)
		tokenData = "";
	}
	
	return tokenData;
}




export async function doSlientLogin(accessToken, slientLoginUrl){
	
	//debugger;
	console.log("doSlientLogin");

	let newAccessToken = null;
	
	/*
	try{
		
		if(accessToken){
			axios.post(slientLoginUrl, "", null).then(res=>{
				if(res.status === 200){
					newAccessToken = res.data.data;
				}
			}).catch(e=>{
				console.log("modules::authentication.js:doSlientLogin", e.description);
				return null;	
			});
		}
	} catch(e){
		newAccessToken = null;
		alert(`doSlientLogin ${e.description}`);
	}
	*/
	
	if(accessToken){
		let response = await axios.post(slientLoginUrl, "", null);
		newAccessToken = response.data.data;
	}
	
	console.log(newAccessToken);
	
	return newAccessToken;
}



import axios from "axios";
import authProps from "./authenticationProps";


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




export async function doSlientLogin(slientLoginUrl){
	
	//debugger;
	
	console.log(slientLoginUrl);
	
	
	let newAccessToken = null;
	
	const result = {
		status : true,
		data : Object 
	};	

	try{
		initRequestAuthHeader();	//토큰재발급시 request Header 의 access Token을 localStorage 의 것으로 새로 설정해준다.  
		
		let response = await axios.post(slientLoginUrl, "", null);
		//newAccessToken = response.data.data;
		result.status = true;
		result.data = response.data.data;
		
		/*
		await axios.post(slientLoginUrl, "", null).then((result)=>{
			console.log(result);
		}).catch(e=>{
			console.log(e);
		})
		*/
		
		console.log(newAccessToken);
		
		//return newAccessToken;
	}catch(e){
		console.log(e);
		result.status = false;
		result.data = e.response.data.error
		//throw e;
	}
	
	return result; 
}


/*
	localStorage access 토큰이 유효한지 확인하고
	유효기간이 지났다면 slientLogin 으로 재발급후 Request header으로 재설.  
*/
export async function invokeAccessToken(){
	
	let result;
	
	try{
		
		//debugger;
		
		//컴포넌트 리플래쉬 토큰 헤더가 없어졌으면 localStorage에 토큰값이 존재하면 그대로 헤더로 설정해준다.
		//if(!localStorage.getItem(authProps.LOCAL_STRG_AUTH_NM)){
		//	result = false;
		//}
		 
		if(isAuthenticationExpired()){
			//유효기간 지났으면 slientlogin 으로 accessToken 재갱신해준다.
			//console.log("token-expired");
			
			console.log("authProps.SLIENT_LOGIN_URL: ", authProps.SLIENT_LOGIN_URL);
			
			result = await doSlientLogin(authProps.SLIENT_LOGIN_URL).then((result)=>{
				
				//debugger;
				
				if(result.status === true){
					console.log(result);
					//const tokenData = result.data;
					setTokenToLocalStorage(result.data);
					return true;	
				} else {
					removeAuthentication();
					if(result.data.code === "REFRESH_TOKEN_INVALID"){
						//Refresh Token Invalid
						console.log(`${result.data.code} :: ${result.data.message}`);
					}
					return false;
				}
			}).catch(e=>{
				//removeAuthentication();
				alert(`${e.response.data.error.code} ${e.response.data.error.message}`)
				return false;	
			}) 
		} else {
			//const accessToken = getTokenFromLocalStorage();
			//axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(authProps.LOCAL_STRG_AUTH_TYPE_NM)} ${localStorage.getItem(authProps.LOCAL_STRG_AUTH_NM)}`
			initRequestAuthHeader();
			result = true;	
		}
	} catch(e) {
		console.log("[error]authentication::isValidAuthRequestHeader:", e);
		result = false;
	}
	
	console.log("invokeAccessToken:result > ", result);
	
	return result;
}


export function initRequestAuthHeader(){

	//debugger;
	
	try{
		if(localStorage.getItem(authProps.LOCAL_STRG_AUTH_TYPE) !== null && localStorage.getItem(authProps.LOCAL_STRG_AUTH) !== null){
			axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(authProps.LOCAL_STRG_AUTH_TYPE)} ${localStorage.getItem(authProps.LOCAL_STRG_AUTH)}`;
		}
		
		console.log(`1. [initRequestAuthHeader] >> ${axios.defaults.headers.common["Authorization"]}`);
		console.log(`1. [initRequestAuthHeader] localStorage.getItem(authProps.LOCAL_STRG_ROLES) >> ${localStorage.getItem(authProps.LOCAL_STRG_ROLES)}`)
	} catch(e){
		
	}
}


export function setTokenToLocalStorage(tokenDto){
	try{
		
		localStorage.clear();
		
		if(tokenDto.grantType && tokenDto.accessToken && tokenDto.accessExpiry){
			localStorage.setItem(authProps.LOCAL_STRG_AUTH_TYPE, tokenDto.grantType);
			localStorage.setItem(authProps.LOCAL_STRG_AUTH, tokenDto.accessToken);
			localStorage.setItem(authProps.LOCAL_STRG_AUTH_EXP_DT, tokenDto.accessExpiry);
			localStorage.setItem(authProps.LOCAL_STRG_ROLES, tokenDto.roles);
		}
	}catch(e){
		console.log("authentication::setTokenToLocalStorage");
	}
}



export function getTokenFromLocalStorage(){
	return localStorage.getItem(authProps.LOCAL_STRG_AUTH); 
}



export function isAuthenticationExpired(){

	//localstorage의 access토큰의 유효기간을 체크한다. 
	//token정보가 없으면 expired 된것으로 처리한다.  	
    //let result = false;
	try{
		
		if(localStorage.getItem(authProps.LOCAL_STRG_AUTH_EXP_DT) !== null){
			const now = new Date();
			const localTokenExpireDateTime = new Date(localStorage.getItem(authProps.LOCAL_STRG_AUTH_EXP_DT));
			return localTokenExpireDateTime.getTime() < now.getTime();
		} else {
			return true;
		}
	}catch(e){
		return true;
	}
}

export function removeAuthentication(){
	delete axios.defaults.headers.common["Authorization"];
	localStorage.clear();
}


export function isAuthenctedUser(){
	if(localStorage.getItem(authProps.LOCAL_STRG_AUTH_TYPE) !== null && localStorage.getItem(authProps.LOCAL_STRG_AUTH) !== null && localStorage.getItem(authProps.LOCAL_STRG_AUTH_EXP_DT) !== null)
		return true;
	else 
		return false;
}


export function getUserRoles(){
	if(localStorage.getItem(authProps.LOCAL_STRG_ROLES) !== null){
		return localStorage.getItem(authProps.LOCAL_STRG_ROLES);
	}
}

export function getUserType(){
	const userRoles = getUserRoles();
	
	if(userRoles){
		let roles = userRoles.split(",");
		
		//debugger;
		if(roles.includes(authProps.USER_ROLE_ADM)){
			return authProps.USER_TYPE_ADMIN;
		} else {
			return authProps.USER_TYPE_USR;
		} 
	}
}



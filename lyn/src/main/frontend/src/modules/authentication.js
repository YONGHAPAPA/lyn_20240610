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
	//console.log("doSlientLogin");
	let newAccessToken = null;

	try{
		initRequestAuthHeader();	//토큰재발급시 request Header 의 access Token을 localStorage 의 것으로 새로 설정해준다.  
		
		let response = await axios.post(slientLoginUrl, "", null);
		newAccessToken = response.data.data;
		//console.log(newAccessToken);
		return newAccessToken;
	}catch(e){
		console.log(e);
		throw e;
	}
}


/*
	localStorage access 토큰이 유효한지 확인하고
	유효기간이 지났다면 slientLogin 으로 재발급후 Request header으로 재설.  
*/
export async function invokeAccessToken(){
	
	let result = false;
	
	try{
		
		//debugger;
		
		
		//컴포넌트 리플래쉬 토큰 헤더가 없어졌으면 localStorage에 토큰값이 존재하면 그대로 헤더로 설정해준다.
		//if(!localStorage.getItem(authProps.LOCAL_STRG_AUTH_NM)){
		//	result = false;
		//}
			
		 
		if(isTokenExpired()){
			//유효기간 지났으면 slientlogin 으로 accessToken 재갱신해준다.
			console.log("token-expired");
			await doSlientLogin(authProps.SLIENT_LOGIN_URL).then((tokenDto)=>{
				console.log(tokenDto);
				setTokenToLocalStorage(tokenDto);
				result = true;
			}).catch(e=>{
				//Refresh Token Invalid
				removeAuthentication();
				
				if(e.response.status === 401){
					alert(`${e.response.data.error.code} ${e.response.data.error.message}`)
					result = false;	
				}
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
	
	return result;
}


export function initRequestAuthHeader(){

	try{
		if(localStorage.getItem(authProps.LOCAL_STRG_AUTH_TYPE_NM) !== null && localStorage.getItem(authProps.LOCAL_STRG_AUTH_NM) !== null){
				axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(authProps.LOCAL_STRG_AUTH_TYPE_NM)} ${localStorage.getItem(authProps.LOCAL_STRG_AUTH_NM)}`;
		}
		
		console.log(`1. [initRequestAuthHeader] >> ${axios.defaults.headers.common["Authorization"]}`)	
	} catch(e){
		
	}
}


export function setTokenToLocalStorage(tokenDto){
	
	localStorage.clear();
	
	try{
		localStorage.setItem(authProps.LOCAL_STRG_AUTH_TYPE_NM, tokenDto.grantType)
		localStorage.setItem(authProps.LOCAL_STRG_AUTH_NM, tokenDto.accessToken);
		localStorage.setItem(authProps.LOCAL_STRG_AUTH_EXP_TIME_NM, tokenDto.accessExpiry)
		initRequestAuthHeader();
	}catch(e){
		console.log("authentication::setTokenToLocalStorage");
	}
}

export function getTokenFromLocalStorage(){
	return localStorage.getItem(authProps.LOCAL_STRG_AUTH_NM); 
}


export function isTokenExpired(){

	//localstorage의 access토큰의 유효기간을 체크한다. 
	//token정보가 없으면 expired 된것으로 처리한다.  	
    //let result = false;
	try{
		
		if(localStorage.getItem(authProps.LOCAL_STRG_AUTH_EXP_TIME_NM) !== null){
			//alert("isTokenExpired >> " + localStorage.getItem(authProps.LOCAL_STRG_AUTH_EXP_TIME_NM));
			const now = new Date();
			const localTokenExpireDateTime = new Date(localStorage.getItem(authProps.LOCAL_STRG_AUTH_EXP_TIME_NM));
			//result = (localTokenExpireDateTime.getTime() < now.getTime());
			//alert("isTokenExpired::localToken:" + localStorage.getItem(authProps.LOCAL_STRG_AUTH_EXP_TIME_NM) + "::" + result);
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



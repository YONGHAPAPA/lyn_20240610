import {React, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as common from '../../modules/authentication';




const MyPage = () => {
 
 	let navigate = useNavigate();
 	let accessToken = useRef('');
 	let pids = useRef([]);
    
	useEffect(()=>{
		accessToken.current = common.extractAccessTokenFromRequestHeader(axios.defaults.headers.common["Authorization"]);
		//console.log("MyPage::accessToken: ", accessToken.current)
		
		//console.log("MyPage pids", pids);
		console.log("MyPage >> ");

		
		
		
		if(accessToken.current !== ""){
			//refreshAccessTokenBySlientLogin(accessToken.current);
		} else {
			
			//Access Token이 없는경우 Login 페이지로 이동
			alert("Your token is invalid. Login again!");
			navigate('/auth/Login');
		}
			
		return()=>{
			
			console.log("clear pids", pids);
			
			pids.current.forEach(pid=>{
				
				console.log("clear pid:: ", pid);
				clearTimeout(pid);	
				
			})
			
			//clearTimeout();
			pids.current = "";
		}
	}, []);
	
	
	
	
	const refreshAccessTokenBySlientLogin = async (oldAccessToken) => {

		try{
		
			if(oldAccessToken){
				let newTokenData = await common.doSlientLogin(oldAccessToken, "/auth/SlientLogin");
				
				if(newTokenData){
					accessToken.current = newTokenData.accessToken;
					axios.defaults.headers.common["Authorization"] = `${newTokenData.grantType} ${newTokenData.accessToken}`;
					
					let accessExpiry = (newTokenData.accessExpiry * 1000);
					
					console.log("accessExpiry", accessExpiry);
					
					let pid = setTimeout(refreshAccessTokenBySlientLogin, accessExpiry, accessToken.current);
					
					console.log("refreshAccessTokenBySlientLogin pid: ", pid);
					pids.current.push(pid);
					
					//pids.current = [...pids, pid];
					
					console.log("refreshAccessTokenBySlientLogin 누적 pids.current", pids.current);
				}
				
			}
		} catch (e){
			
		}
	}
	
	
	
	return(<>
		<div>
			My page			
		</div>
	</>);
	
	
	
}


const loadAuthentication = () => {
	
	//console.log("getAuthentication");
	const accessToken = axios.defaults.headers.common["Authorization"];
	console.log(`loadAuthentication: ${accessToken}`);
}









		
		
	
	




export default MyPage; 

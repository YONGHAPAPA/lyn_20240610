import {React, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
//import * as auth from '../../modules/authentication';

import {useSelector, useDispatch} from 'react-redux';




const MyPage = () => {
 
 	let navigate = useNavigate();
 	let accessToken = useRef('');
 	let pids = useRef([]);
	
	
	const { count1 } = useSelector(state => state.count1);
    
	useEffect(()=>{
		
		//console.log("start myPage");
		
		//화면 refresh 시 header 값은 사라지기 때문에 localstorage 에서 설정된 token으로 유효성체크한다. 
		
		//accessToken.current = common.extractAccessTokenFromRequestHeader(axios.defaults.headers.common["Authorization"]);
		//console.log("MyPage::accessToken: ", accessToken.current)
		//console.log("MyPage pids", pids);
		//console.log("MyPage >> ");
		/*
		accessToken.current = auth.getTokenFromLocalStorage();
		
		
		if(accessToken.current !== ""){
			//refreshAccessTokenBySlientLogin(accessToken.current);
			auth.refreshAccessToken().then(result=>{
				
				alert(`refreshAccessToken ${result}`)
				
				if(!result){
					alert("Your session is expired.\r\nplease login again.");
					navigate("/auth/Login");
				}
			});
			
		} else {
			
			//Access Token이 없는경우 Login 페이지로 이동
			alert("Your token is invalid. Login again!");
			navigate('/auth/Login');
		}
		*/
			
		return()=>{
			
			//console.log("clear pids", pids);
			
			/*
			pids.current.forEach(pid=>{
				
				console.log("clear pid:: ", pid);
				clearTimeout(pid);	
				
			})
			*/
			
			//clearTimeout();
			pids.current = "";
		}
	}, []);
	
	
	
	return(<>
		<div>
			My page
			<div>count: {count1}</div>
		</div>
	</>);
	
	
	
}


const loadAuthentication = () => {
	
	//console.log("getAuthentication");
	const accessToken = axios.defaults.headers.common["Authorization"];
	console.log(`loadAuthentication: ${accessToken}`);
}









		
		
	
	




export default MyPage; 

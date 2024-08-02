import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import * as common from '../../src/modules/authentication';


const Header = () => {
	
	let timer = "";
	
	useEffect(()=>{
		
		let local_token_grant = localStorage.getItem("grantType");
		let local_access_token = localStorage.getItem("auth");
		
		if(local_token_grant && local_access_token){
			//console.log("header grantType", local_token_grant)
			//console.log("header auth", local_access_token);
			
			if(!axios.defaults.headers.common["Authorization"]){
				axios.defaults.headers.common["Authorization"] = `${local_token_grant} ${local_access_token}`
			}
			
			let authorization = axios.defaults.headers.common["Authorization"];
			
			
			
			console.log("header axio authorization", authorization);
			
			if(authorization){
				//Slient Login 처리	
				let newToken = doSientLogin(authorization);
				console.log(newToken)
			}
				
		}
		
		
		return()=>{
			console.log("useEffect-header-close");
		}
	});
	
	
	const doSientLogin = async (authorization) => {
		
		let newAccessToken = null;
		
		try{
			newAccessToken = await common.doSlientLogin(common.extractAccessTokenFromRequestHeader(authorization), "/auth/SlientLogin");
		} catch(e){
			
			console.log(e.response.data.error);
			//alert(`[${e.response.data.error.code}]:: ${e.response.data.error.message}`);
			
			if(e.response.data.error.code === "REFRESH_TOKEN_INVALID"){
				alert("your session is expired\r\nlogin again!");
				newAccessToken = null;	
				localStorage.clear();
			}
			
			
		}
		
		return newAccessToken;
	}
	
	const navigate = useNavigate();
	
	
	const link_onClick = (e, menu) => {
		
		//console.log("link click.");
		//const authorization = axios.defaults.headers.common["Authorization"];
		//console.log("authorization", authorization);
		
		//to="/auth/login"
		//navigate("/auth/login");
		
		console.log(e);
		
		if(menu === "home"){
			
		} else if(menu === "join"){
			
		} else if(menu === "login"){
			
		} else if(menu === "mypage"){
			const authorization = axios.defaults.headers.common["Authorization"];
		
			if(authorization === undefined || authorization === ""){
				alert("It is need to login.(from header)")
				e.preventDefault();
			}	
		} else {
			
		}
		
	}
	
	
	
	const link_to_myPage_onClick = (e) => {
	
		console.log(e);
		
		
		const authorization = axios.defaults.headers.common["Authorization"];
		
		if(authorization === undefined || authorization === ""){
			alert("It is need to login.(from header)")
			e.preventDefault();
		}	
	}
	
	return(
		<header>
			<Link to='/' key={1} name="home" onClick={(e)=> {this.link_onClick(e, "home")}}>Home</Link>&nbsp;|&nbsp;
			<Link to='/auth/Join' onClick={(e) => {this.link_onClick(e, "join")}}>Join</Link>&nbsp;|&nbsp;
			<Link to='/auth/login' onClick={(e) => {this.link_onClick(e, "login")}} state={{data: '1'}}>Login</Link>&nbsp;|&nbsp;
			<Link to='/member/MyPage' onClick={(e) => {this.link_onClick(e, "mypage")}}>My Page</Link>
			<hr/>
		</header>
	);
}


export default Header;


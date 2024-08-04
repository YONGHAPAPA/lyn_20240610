import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import * as auth from '../../src/modules/authentication';
import authProps from '../modules/authenticationProps';


const Header = () => {
	const navigate = useNavigate();
	
	useEffect(()=>{
		auth.initRequestAuthHeader();	
		return()=>{
			//console.log("useEffect-header-close");
		}
	});
	
	const refreshAccessToken = () => {
		if(axios.defaults.headers.common["Authorization"] !== ""){
			console.log(`2. [refreshAccessToken] >> ${axios.defaults.headers.common["Authorization"]}`);
		} else {
			console.log(`2. [refreshAccessToken] >> Authorization Header 없음!!!`);
		}
		
		if(localStorage.getItem(authProps.LOCAL_STRG_AUTH_NM) !== null){
			auth.invokeAccessToken().then(result=>{
				if(!result){
					alert("인증세이 만료되었습니다. 재로긴하세요.");
					navigate("auth/Login")
					
				} else {
					
				}
			}).catch(e=>{
				alert("[error]link_onclick: " + e)
			})
		}
	}
	
	
	const link_onClick = (e, menu) => {
		
		switch(menu){
			case "home": 
			break;
			case "join": 
			break;
			case "login":
			break;
			case "mypage":
				if(axios.defaults.headers.common["Authorization"]){
					refreshAccessToken()
				} else {
					alert("로그인이 필요합니다.");
					navigate("auth/Login")
					e.preventDefault();	
				}
			break;
			case "logout":
				auth.removeAuthentication();
			break;
			
			
			default : 
		}
	}

	
	return(
		<header>
			<div className='div-header-menu-left'>
				<Link to='/' key={1} name="home" onClick={(e)=> {link_onClick(e, "home")}}>Home</Link>&nbsp;|&nbsp;
				<Link to='/auth/Join' onClick={(e) => {link_onClick(e, "join")}}>Join</Link>&nbsp;|&nbsp;
				<Link to='/auth/login' onClick={(e) => {link_onClick(e, "login")}} state={{data: '1'}}>Login</Link>&nbsp;|&nbsp;
				<Link to='/member/MyPage' onClick={(e) => {link_onClick(e, "mypage")}}>My Page</Link>
			</div>
			<div className='div-header-menu-right'>
				<Link to='' onClick={(e) => {link_onClick(e, "logout")}}>[Log out]</Link>
			</div>
			<br/>
			<hr/>
		</header>
	);
}


export default Header;


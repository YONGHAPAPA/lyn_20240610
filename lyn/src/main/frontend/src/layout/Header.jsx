import React, { useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import * as auth from '../../src/modules/authentication';
import authProps from '../modules/authenticationProps';


const Header = () => {
	const navigate = useNavigate();
	
	//let userRoles = useRef('');
	let [userRoles, setUserRoles] = useState('');
	let [userType, setUserType] = useState('');
	
	
	//component update 가 발생할때마다 useEffect 발생할수 있도록처리
	useEffect(()=>{
		//debugger;
		
		//console.log("Header-useEffect::start");
		//console.log("LOCAL_STRG_ROLES:", localStorage.getItem(authProps.LOCAL_STRG_ROLES));

		//default header 메뉴처리
		buildUserRole();
		//renderHeaderMenu();
		
		//console.log("Header -------------------------");
		//세션유효기간 체크하고..
		if(auth.isAuthenctedUser()){
			if(!auth.isAuthenticationExpired()){
				auth.initRequestAuthHeader();
			} else {
				if(localStorage.getItem(authProps.LOCAL_STRG_AUTH) !== null){
					auth.invokeAccessToken().then(invokeResult => {
						if(invokeResult){
							//userRoles.current = auth.getUserRoles();
						} else {
							alert("인증세션이 만료되었습니다. 재로긴하세요.");
							auth.removeAuthentication();
							//userRoles.current = null;
							navigate("auth/Login");
						}
					}).catch(e=>{
						alert("[error]link_onclick: " + e + ' 인증오류가 발생했습니다. 재로긴하세요.')
						navigate("auth/Login")
					})
				}
			}	
		}
			
		return()=>{
			//console.log("useEffect-header-close");
		}
	});
	
	
	

	
	
	const buildUserRole = () => {
		//debugger;
		if(auth.isAuthenctedUser()){
			setUserRoles(auth.getUserRoles());
			setUserType(auth.getUserType);
		} else {
			setUserRoles('');
			setUserType('')
		}	
	}
	
	
	const link_onClick = (e, menu) => {
		
		switch(menu){
			case "home": 
			break;
			case "join": 
			break;
			case "login":
				e.preventDefault();
				if(auth.isAuthenctedUser()){
					alert("이미 로긴한 사용자입니다.");	
				} else {
					navigate("auth/login")
				}
			break;
			case "mypage":
				e.preventDefault();

				//console.log("link to mypage::: ", axios.defaults.headers.common["Authorization"]);
				//mypage 내에 접근하기전에 먼저 AccessToken이 유효한지 체크
				if(auth.isAuthenctedUser()){
					navigate("/member/mypage");
				} else {
					alert("인증이 필요합니다.");
					navigate("/auth/login");
				}
			break;
			case "logout":

				//debugger;
				//console.log("logout", axios.defaults.headers.common["Authorization"]);
				
				if(axios.defaults.headers.common["Authorization"] !== undefined && axios.defaults.headers.common["Authorization"] !== ""){
					auth.removeAuthentication();
					
					//userRoles.current = null;
					alert("정상적으로 로그아웃되었습니다.");
				} 
				
				navigate("/");
			break;
			
			default : 
		}
	}

	
	return(
		<header className='header'>
			<div className='div-header-menu-left'>
				<Link to='/' key={1} name="home" onClick={(e)=> {link_onClick(e, "home")}}>Home</Link>&nbsp;|&nbsp;
				<Link to='/auth/Join' onClick={(e) => {link_onClick(e, "join")}}>Join</Link>&nbsp;|&nbsp;
				<Link to='/auth/login' onClick={(e) => {link_onClick(e, "login")}} state={{data: '1'}}>Login</Link>&nbsp;|&nbsp;
				<Link to='/member/MyPage' onClick={(e) => {link_onClick(e, "mypage")}}>My Page</Link>&nbsp;|&nbsp;
				{userType === "ADMIN" && <Link to="/admin" onClick={(e)=>{link_onClick(e, "admin")}}>Bunker</Link>}
			</div>
			
			<div className='div-header-menu-right'>
				<Link to='' onClick={(e) => {link_onClick(e, "logout")}}>[Log out]</Link>
			</div>
			<div className='div-header-menu-right'>[{userType}]</div>
			<br/>
		</header>
	);
}


export default Header;


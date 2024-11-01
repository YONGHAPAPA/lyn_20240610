import React, { useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../../src/modules/authentication';
import authProps from '../modules/authenticationProps';
import { Box, ButtonGroup, Button, Divider, Snackbar, useColorScheme, Container } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import { LoginDialog } from '../routes/Login/LoginDialog';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserLogout } from '../reducers/session/sessionSlice'





const Header = () => {
	const navigate = useNavigate();
	const [loginOpen, setLoginOpen] = useState(false);	//Login dailog popup 여부
	const [loginSnakbar, setloginSnakbar] = useState(false);	//Login 처리결과 snakbar popup 여부
	const [loginErrorMessage, setLoginErrorMessage] = useState('');
	
	const userSession = useSelector(state => state.session);
	const dispatch = useDispatch();
	
	//let userRoles = useRef('');
	let [userRoles, setUserRoles] = useState('');
	let [userType, setUserType] = useState('');

	
	//component update 가 발생할때마다 useEffect 발생할수 있도록처리
	useEffect(()=>{
		
		//console.log("userSession");
		//console.log(userSession)
		
		//default header 메뉴처리
		populateUserRole();

		
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
		}
		
	});
	
	
	const populateUserRole = () => {
		//debugger;
		if(auth.isAuthenctedUser()){
			setUserRoles(auth.getUserRoles());
			setUserType(auth.getUserType);
		} else {
			setUserRoles('');
			setUserType('')
		}	
	}
	
	
	const openLoginDialog = () => {
		setLoginOpen(true);
	}
	
	const setLoginResult = (result) => {
		
		//console.log("setLoginResult", result);
		
		if(result.success){
			navigate("/memeber/myPage");
		} else {
			setLoginErrorMessage(result.message);
			setloginSnakbar(true);	
		}
	}
	
	
	const handlClose_loginSnakbar = () => {
		setloginSnakbar(false);
	}
	
	const link_onClick = (e, menu) => {
		
		//console.log("link_onClick");
		e.preventDefault();
		
		switch(menu){
			case "home":
				navigate("/"); 
			break;
			case "study":
				navigate("/study") 
			break;
			case "redux":
				navigate("reduxSample")
			break;
			case "join": 
				navigate("/auth/join");
			break;
			case "login":
				
				//2024.10.23 다이얼로그 로긴 팝업 
				openLoginDialog()
				
				//debugger;
				//e.preventDefault();
				
				/*
				if(auth.isAuthenctedUser()){
					alert("이미 로긴한 사용자입니다.");	
				} else {
					navigate("auth/login")
				}
				*/
				
			break;
			case "mypage":
				//e.preventDefault();

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
				//console.log(userSession);
				dispatch(fetchUserLogout(userSession)).then(res => {
					//console.log(res);
					
					if(res.success){
						//정상 로그아웃
					} else {
						//비정상 로그아웃
					}
				})

				//doLogoutUser()
				
				/*if(axios.defaults.headers.common["Authorization"] !== undefined && axios.defaults.headers.common["Authorization"] !== ""){
					auth.removeAuthentication();
					
					//userRoles.current = null;
					alert("정상적으로 로그아웃되었습니다.");
				}*/ 
				
				navigate("/");
			break;
			case "admin": 
				navigate("/admin");
			break;
			
			default : 
		}
	}
	
	
	
	return(
		<React.Fragment>
			<LoginDialog loginOpen={loginOpen} setLoginOpen={setLoginOpen} setLoginResult={setLoginResult} />
				
			<Container sx={{display:'flex', border:0, backgroundColor:'whitesmoke'}}>
				<Box sx={(theme) => ({
					display:'flex', 
					flexDirection:'row', 
					width:'30%',
					border:0 
				})}
				>
					<IconButton sx={(theme) => ({
						
					})} size='large'>
						<MenuIcon/>
					</IconButton>
				</Box>
				<Box 
				sx={{
					display: 'flex', 
					flexDirection: 'row-reverse', 
					'& > *' : {
						m: 1, 
					},
					width:'70%',
					border:0, 
				}}
				>
					
				<ButtonGroup size='small' >
					<Button sx={{color: "black", borderColor:"gray", ":hover" : {borderColor: "gray"}}} onClick={(e) => link_onClick(e, 'logout')}>logout</Button>
				</ButtonGroup>
				
				<ButtonGroup size='small' variant='outlined' aria-label='Basic button group' sx={{float: "left"}}>
					<Button sx={{color: "black", borderColor:"gray", ":hover" : {borderColor: "gray"}}} onClick={(e) => link_onClick(e, 'home')}>Home</Button>
					<Button sx={{color: "black", borderColor:"gray", ":hover" : {borderColor: "gray"}}} onClick={(e) => link_onClick(e, 'study')}>Study</Button>
					<Button sx={{color: "black", borderColor:"gray", ":hover" : {borderColor: "gray"}}} onClick={(e) => link_onClick(e, 'redux')}>Redux</Button>
					<Button sx={{color: "black", borderColor:"gray", ":hover" : {borderColor: "gray"}}} onClick={(e) => link_onClick(e, 'join')}>join</Button>
					<Button sx={{color: "black", borderColor:"gray", ":hover" : {borderColor: "gray"}}} onClick={(e) => link_onClick(e, 'login')}>login</Button>
					<Button sx={{color: "black", borderColor:"gray", ":hover" : {borderColor: "gray"}}} onClick={(e) => link_onClick(e, 'mypage')}>my Page</Button>
					{
						userType === "ADMIN" && <Button sx={{color: "black", borderColor:"gray", ":hover" : {borderColor: "gray"}}} onClick={(e)=>link_onClick(e, 'admin')}>bunker</Button>
					}
				</ButtonGroup>
			</Box>
			
			{/*
			<Box sx={{border:1}}>
				[{userType}]	
			</Box>
			*/}
			
			
			{/*
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
			*/}
			
			</Container>
				
			{/*
			<Container sx={(theme)=>({
				backgroundColor:'whitesmoke'
			})}>
				
			</Container>
			*/}
			
			<Snackbar open={loginSnakbar} autoHideDuration={6000} onClose={handlClose_loginSnakbar}>
				<Alert 
					onClose={handlClose_loginSnakbar}
					severity='error'
					variant='filled'
					sx={{width:'100%'}}
				 >
					{loginErrorMessage}
				</Alert>
			</Snackbar>
			<Divider />
		</React.Fragment>
		
	);
}


export default Header;


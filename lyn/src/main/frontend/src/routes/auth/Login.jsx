import {React, useRef, useState, useEffect } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';

import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import axios from 'axios';

import * as auth from '../../modules/authentication';

const Login = () => {
	
	//const [accessToken, setAccessToken] = useState('');
	//let accessToken;
	let accessTokenExpDuration;	//second
	let refreshTokenExpDuration; //second
	let slientLoginNextInterval;

	
	//let slientLoginTimers = [];
	const slientLoginTimers = useRef([]); 
	
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const [timers, setTimers] = useState(['']);
	const [count, setCount] = useState(0);
	
	let navigate = useNavigate();
	
	const location = useLocation();
	//const tmp = location.state;
	//console.log(tmp);
	
	useEffect(() => {
		
		let auth = axios.defaults.headers.common["Authorization"];
		//console.log("Login auth:", auth);

		return() => {

			//console.log("slientLoginTimers clear", slientLoginTimers);
			
			/*
			if(slientLoginTimers.current){
					slientLoginTimers.current.forEach(pid=>{
					clearTimeout(pid);
				})
			
				slientLoginTimers.current = null;	
			}
			*/
		}
	}, []);

	
	const test_onClick = (e) => {
	
		//console.log("test_onClick:: ", slientLoginPids);
		slientLoginTimers.forEach(pid=>{
			//console.log("clearTimeout:: ", pid)
			clearTimeout(pid);
		})
	}
	
	
	const useremail_onChange = (e) => {
		setUserEmail(e.target.value);
	}

	
	const userPassword_onChange = (e) => {
		setUserPassword(e.target.value);	
	}

	
	const login_onClick = (e) => {

		//debugger;
		
		const pre_url = "https://localhost:8080"
		
		axios.post("/auth/LoginUser", null, {
			params:{
				userEmail: userEmail, 
				userPassword: userPassword
			}
		}).then((res)=>{
			//console.log(res);
			//console.log(res.status);
			//console.log(res.data);
			
			if(res.status === 200 && res.data.success === true){
				const tokenDto = res.data.data;
				if(tokenDto.grantType !== "" && tokenDto.accessToken !== ""){
					axios.defaults.headers.common["Authorization"] = `${tokenDto.grantType} ${tokenDto.accessToken}`;
					//accessTokenExpDuration = token.accessExpiry;
					
					//Local Storage에 토큰값설정
					auth.setTokenToLocalStorage(tokenDto);
					auth.initRequestAuthHeader();	
					alert("인증성공 - MyPage로 이동합니다.");
					navigate('/member/MyPage');
				}
				
				//moveToMyPage(tokenData);
			} else {
				//Login Error
			}
			 
			//afterLoginSuccess(res);
			//alert("Login success")
		})
		.catch((e)=>{
			console.log(e);
			if(e.response.status === 401){
				alert(e.response.data.error.message);	
			} else {
				alert(e.message)
			}
		})
	}
	
	

	
	/*
	const afterLoginSuccess = (res) => {
		
		let tokenInfo = res.data.data;
		let pid = 0;
		
		try{
			//console.log(`afterLoginSuccess accessToken :: ${tokenInfo.grantType} ${tokenInfo.accessToken}`);
			if(tokenInfo.grantType !== "" && tokenInfo.accessToken !== ""){
				axios.defaults.headers.common["Authorization"] = `${tokenInfo.grantType} ${tokenInfo.accessToken}`;
				accessTokenExpDuration = tokenInfo.accessExpiry;
				
				localStorage.setItem("auth", axios.defaults.headers.common["Authorization"]);
				
				console.log("localStorage", localStorage.getItem("auth"));
				
				//로긴후 access Token 만료 시점 후에 slient login 처리해준다.
				slientLoginNextInterval = (parseFloat(accessTokenExpDuration)) * 1000;
				pid = setTimeout(slient_login_onClick, 1000);
			}
		} catch(e){
			console.log(`afterLoginSuccess:: ${e.description}`)
			pid = 0;
		}
		
		return pid;
	};
	*/
	
	
	const myInfo_onClick = (e) => {
		//alert(accessToken);
		
		axios.post("/member/myInfo", null, {
			params:{
				userEmail: userEmail 
			}
		}).then((res)=>{
			const result = res.data;
			//console.log(result);
			alert(`Status:${res.status}\r\nData:${res.data}`);
		}).catch((e)=>{
			//alert(e.response.status);
			console.log(e);
			
			if(e.response.status !== "200"){
				alert(`myInfo_onClick Error :: ${e.response.data.error.code}`);	
			}
		})
	}
	
	
	const adminDashBoard_onClick = (e) => {
		axios.post("/admin/dashBoard", null, {
			params:{
				key:"email", 
				value:"admin@test.com"
			}
		}).then((res)=>{
			
			alert(`post then: ${res.data}`);
			
		}).catch((e)=>{
			
			alert(`adminDashBoard_onClick error :: ${e.message}`);
		})
	}
	
	
	
	const exception_test_onClick = () => {
		axios.get("/except1", null, {
			params:{
				var1:"1", 
				var2:"2"
			}
		}).then((res)=>{
			//console.log(res);
			alert(`[res] ${res.data}`);
		}).catch(e => {
			
			console.log(e.response);
			alert(`[error] ${e.response.data.error.code}`);
		});
	}
	
	
	/*
	const slient_login_onClick = () => {
		
		if(axios.defaults.headers.common["Authorization"] === undefined || axios.defaults.headers.common["Authorization"] === ""){
			return;
		}
		
		axios.post("/auth/SlientLogin", null, {
		}).then((res)=>{
			let pid = afterLoginSuccess(res);
			
			//Slient Login 처리에 대한 Timer Pid를 별도로 저장해뒀다가 페이지 언마운트시 Clear 처리할수 있게 해준다.  
			slientLoginTimers.current.push(pid);
			
			if(pid !== 0)
				navigate('/member/MyPage/', {replace:true})
				
		}).catch(e=>{
			console.log(e);
			alert(`[Error:: Slient Login] ${e.description}`);  
			//alert(e.response.data.error.message);
		}).finally(
			()=>{
				//console.log("slientLoginPids", slientLoginPids);
				//console.log("invokedPids", invokedPids);	
			}
		); 
	}
	*/
	
	
	return (
		<>
			<div>Login</div>
			<div>
				email: <DefaultInput type="text" name="userEmail" value={userEmail} placeholder="user email" onChange={useremail_onChange}  />
				password: <DefaultInput type={"password"} name={"userPassword"} value={userPassword} placeholder={"user password"} onChange={userPassword_onChange} />
			</div>
			
			<div>
				<DefaultButton text={"login"} onClick={login_onClick}/>
				<DefaultButton text={"my info"} onClick={myInfo_onClick} />
				<DefaultButton text={"admin dashboard"} onClick={adminDashBoard_onClick} />
				<DefaultButton text={"except test1"} onClick={exception_test_onClick} />
				<DefaultButton text={"slient login"}  />
				<DefaultButton text={"test"} onClick={test_onClick} />
			</div>
		</>
		
	);
}
 


export default Login;
import {React, useRef, useState, useEffect } from 'react';

import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import axios from 'axios';

const Login = () => {
	
	//const [accessToken, setAccessToken] = useState('');
	//let accessToken;
	let accessTokenExpDuration;	//second
	let refreshTokenExpDuration; //second
	let slientLoginNextInterval;
	
	let slientLoginPids = [];
	
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const [slientLoginInvokes, setSlientLoginInvokes] = useState([]);
	const [count, SetCount] = useState(0);
	
	
	useEffect(() => {
		console.log("useEffect");
		slient_login_onClick();
		//console.log("userEmail:: ", userEmail);
		//console.log("userPassword", userPassword);
		//console.log("useEffect > slInvokes: ", slientLoginPids);
		//console.log("accessToken: ", accessToken);
		
		return() => {
			console.log("useEffect - cleanup");
			check_setTimeout();
			
			//console.log("[clean up]slInvokes: ", slientLoginPids);

			//unload시 setTimeout 등록된 프로세스 제거
			/*
			slientLoginPids.forEach(pid => {
				console.log("clear pid: ", pid);
				clearTimeout(pid);
			});
			*/
		}
	}, []);
	
	
	const check_setTimeout = () => {
		console.log("check_setTimeout:", slientLoginPids);
	}
	
	const test_onClick = (e) => {
		/*
		SetCount(count+1);
		console.log("count: ", count);
		const updateInvokes = [...slientLoginInvokes, count];
		setSlientLoginInvokes(updateInvokes);
		console.log("SlientLoginInvokes::", slientLoginInvokes);
		*/
		
		let g = f();
		
		g(); 
		
		
	}
	
	function f() {
		
		let value = Math.random();

		  function g() {
		    debugger; // Uncaught ReferenceError: value is not defined가 출력됩니다.
		  }

  		return g;
	}
	
	const useremail_onChange = (e) => {
		setUserEmail(e.target.value);
	}
	
	const userPassword_onChange = (e) => {
		setUserPassword(e.target.value);	
	}
	
	const login_onClick = (e) => {

		axios.post("/auth/LoginUser", null, {
			params:{
				userEmail: userEmail, 
				userPassword: userPassword
			}
		}).then((res)=>{
			afterLoginSuccess(res);
		})
		.catch((e)=>{
			console.log(e);
			//alert(e.response.data.error.message);
		})
	}
	
	
	const afterLoginSuccess = (res) => {
		
		let tokenInfo = res.data.data;
		
		try{
			//console.log(`afterLoginSuccess accessToken :: ${tokenInfo.grantType} ${tokenInfo.accessToken}`);
			if(tokenInfo.grantType !== "" && tokenInfo.accessToken !== ""){
				
				//setAccessToken(tokenInfo.accessToken);
				axios.defaults.headers.common["Authorization"] = `${tokenInfo.grantType} ${tokenInfo.accessToken}`;
				accessTokenExpDuration = tokenInfo.accessExpiry;
				
				//로긴후 access Token 만료 시점 후에 slient login 처리해준다.
				slientLoginNextInterval = (parseFloat(accessTokenExpDuration)) * 1000;
				//console.log(`slientLoginRefreshDuration:: ${slientLoginNextInterval}`);
				//console.log("setTimeout >> slient_login_onClick");
				let pid = setTimeout(slient_login_onClick, 1000);
				slientLoginPids.push(pid);
			}
		} catch(e){
			console.log(`afterLoginSuccess:: ${e.description}`)
		}
	};
	

	
	
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
			console.log(res);
			alert(`[res] ${res.data}`);
		}).catch(e => {
			
			console.log(e.response);
			alert(`[error] ${e.response.data.error.code}`);
		});
	}
	
	
	const slient_login_onClick = () => {
		
		if(axios.defaults.headers.common["Authorization"] === undefined || axios.defaults.headers.common["Authorization"] === ""){
			return;
		}
		
		axios.post("/auth/SlientLogin", null, {
		}).then((res)=>{
			console.log(res);
			afterLoginSuccess(res);
		}).catch(e=>{
			console.log(e.response)
			alert(e.response.data.error.message);
		})
	}
	
	
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
				<DefaultButton text={"slient login"} onClick={slient_login_onClick} />
				<DefaultButton text={"test"} onClick={test_onClick} />
			</div>
		</>
		
	);
}
 


export default Login;
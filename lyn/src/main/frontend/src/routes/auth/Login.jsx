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
	
	//let slientLoginTimers = [];
	const slientLoginTimers = useRef([]); 
	
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const [timers, setTimers] = useState(['']);
	const [count, SetCount] = useState(0);
	
	
	useEffect(() => {
		
		//console.log("useEffect > update > ", timers);
		
		return() => {
			
			console.log("slientLoginTimers > close >>> ", slientLoginTimers);
			
			slientLoginTimers.current.forEach(pid=>{
				clearTimeout(pid);
			})
			/*
			console.log("useEffect > close > ", timers);
			timers.forEach(pid=>{
				clearTimeout(pid);
			})
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

		axios.post("/auth/LoginUser", null, {
			params:{
				userEmail: userEmail, 
				userPassword: userPassword
			}
		}).then((res)=>{
			afterLoginSuccess(res);
			alert("Login success")
		})
		.catch((e)=>{
			console.log(e);
			//alert(e.response.data.error.message);
		})
	}
	
	
	const afterLoginSuccess = (res) => {
		
		let tokenInfo = res.data.data;
		let pid = 0;
		
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
				pid = setTimeout(slient_login_onClick, 1000);
				//console.log("pid", pid);
				
				//slientLoginPids.push(pid);
				
				//pid = setTimeout(fn_t(invokedPids), 2000)
				
			}
		} catch(e){
			console.log(`afterLoginSuccess:: ${e.description}`)
		}
		
		return pid;
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
		
		//console.log("slient_login_onClick");
		
		
		if(axios.defaults.headers.common["Authorization"] === undefined || axios.defaults.headers.common["Authorization"] === ""){
			return;
		}
		
		axios.post("/auth/SlientLogin", null, {
		}).then((res)=>{
			//console.log(res);
			
			//console.log("invokedPids: ", invokedPids);
			
			let pid = afterLoginSuccess(res);
			
			//const updPids = [...invokedPids, pid]
			//console.log("updPids", updPids);
			
			//invokedPids
			//setInvokedPids([...invokedPids, pid])
			
			//console.log("slient_login_onClick > pid > " + pid);
			//slientLoginTimers.push(pid);
			//const updTimers = [...timers, pid];
			//setTimers(updTimers);
			slientLoginTimers.current.push(pid);
			
			
			console.log("slientLoginTimers:", slientLoginTimers.current);
			//slientLoginPids.push(pid);
			
		}).catch(e=>{
			console.log(e);
			alert(e);
			
			//alert(e.response.data.error.message);
		}).finally(
			()=>{
				//console.log("slientLoginPids", slientLoginPids);
				//console.log("invokedPids", invokedPids);	
			}
		); 
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
import {React, useRef, useState } from 'react';

import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import axios from 'axios';

const Login = () => {
	
	
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	
	const useremail_onChange = (e) => {
		setUserEmail(e.target.value);
	}
	
	
	const userPassword_onChange = (e) => {
		setUserPassword(e.target.value);	
	}
	
	const login_onClick = (e) => {
		
		console.log("login - click");
		
		axios.post("/auth/LoginUser", null, {
			params:{
				userEmail: userEmail, 
				userPassword: userPassword
			}
		}).then((res)=>{
			const jwtToken = res.data;
			axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken.accessToken}`

			//console.log(res.data.accessToken);
		})
		.catch((e)=>{
			alert("err : " + e.response.data)
		})
	}
	
	
	const authTest_onClick = (e) => {
		
		console.log("authTest_onClick");
		
		axios.post("/auth/AuthTest", null, {
			params:{
				key: "KEY A", 
				value: "This is the Key"
			}
		}).then((res)=>{
			const result = res.data;
			
			alert(`result ${result}`);
			
		}).catch((e)=>{
			alert(`authTest_onClick ${e.response.data}`)
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
				<DefaultButton text={"auth test"} onClick={authTest_onClick} />
			</div>
		</>
		
	);
}
 


export default Login;
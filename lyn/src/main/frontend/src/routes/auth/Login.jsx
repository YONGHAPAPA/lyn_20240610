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
		
		axios.post("/auth/loginUser", null, {
			params:{
				userEmail: userEmail, 
				userPassword: userPassword
			}
		}).then((res)=>{
			
			alert(res.data);
		})
		.catch((e)=>{
			
			alert(e.response.data)
		})
	}
	
	
	return (
		<>
			<div>Login</div>
			<div>
				email: <DefaultInput type="text" name="userEmail" value={userEmail} placeholder="user email" onChange={useremail_onChange}  />
				password: <DefaultInput type={"text"} name={"userPassword"} value={userPassword} placeholder={"user password"} onChange={userPassword_onChange} />
			</div>
			
			<div>
				<DefaultButton text={"login"} onClick={login_onClick}/>
			</div>
		</>
		
	);
}
 


export default Login;
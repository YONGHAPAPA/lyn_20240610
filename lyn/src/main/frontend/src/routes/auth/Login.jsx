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
			
			console.log(res.data);
			
			const jwtToken = res.data;
			
			axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken.accessToken}`

			//console.log(res.data.accessToken);
		})
		.catch((e)=>{
			
			//alert("err : " + e.response.data)
			//console.log(e.response.data.error.message);
			
			alert(e.response.data.error.message);
		})
	}
	
	
	const myInfo_onClick = (e) => {
		axios.post("/member/myInfo", null, {
			params:{
				key: "CD", 
				value: "TTTTT"
			}
		}).then((res)=>{
			const result = res.data;
			
			console.log(result);
			
			alert(`Status:${res.status}\r\nData:${res.data}`);
			
		}).catch((e)=>{
			//alert(e.response.status);
			console.log(e);
			
			if(e.response.status != "200"){
				alert(`myInfo_onClick Error :: ${e.message}`);	
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
			</div>
		</>
		
	);
}
 


export default Login;
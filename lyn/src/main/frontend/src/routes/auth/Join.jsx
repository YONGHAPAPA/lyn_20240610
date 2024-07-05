import {React, useRef, useState} from 'react'

import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import axios from "axios";




const Join = () => {
	
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	
	const userEmail_OnChange = (e) => {
		console.log(e.target.value);
		setUserEmail(e.target.value);
	}
	
	const userPassword_OnChange = (e) => {
		console.log(e.target.value);
		setUserPassword(e.target.value);
	}
	
	const join_onClick = (event) => {
		console.log("join_onclick");
		
	
		axios.post('/auth/JoinUser', null, {
			params: {
				userEmail: userEmail, 
				userPassword: userPassword
			}
		}).then((res)=>{
			
			alert(res.data);
			
		}).catch((err)=>{
			alert(err.response.data);
		});
	}
	
	
	return (
		
		<>
			<div>Join</div>
			<div>
				email: <DefaultInput type="text" placeholder="email address"  name="email" value={userEmail} onChange={userEmail_OnChange}  />
				password: <DefaultInput type="password" placeholder="password"  name="password" value={userPassword} onChange={userPassword_OnChange} />
			</div>
			<div>
				<DefaultButton text="JOIN" disable={false} onClick={join_onClick} />
			</div>
			<div></div>
		</>
	
		
	);
}


export default Join;
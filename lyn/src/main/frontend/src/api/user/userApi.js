import axios from "axios";
import { clientApi } from '../com/clientApi';

export async function authenticateUser(email, password){
	
	let result = {
		submit:{
			email: email,
		}, 
		success: false,
		payload:"",
		error: "",  
		message: ""
	};
	
	const url = "/auth/LoginUser";
	const params = {
		email: email, 
		password: password
	};
	
	//debugger;
	
	await axios.post(url, null, {params: params}).then(res=>{
		
		//console.log(res);
		if(res.status === 200){
			
			const resData = res.data;
			if(resData.success === true){
				//console.log("success", res.data.payload)
				result.success = true;
				result.payload = resData.payload;
			} else {
				//console.log("fail", res.data)
				const error = resData.error;
				result.success = false;
				result.error = error.code;
				result.message = error.message;
			}	
		}
	}).catch(e=>{
		console.log(e);
		result.success = false;
		result.message = e.description;
	})
	
	return result;
}

export async function logoutUser(session){
	
	let params = {
		email: session.user.id,
	};
	
	/*
	const url = "/auth/LogoutUser";
	const params = {
		email: email,
	}
	
	await axios.post(url, null, {params: params}).then(res=>{
		console.log(res);
		result.success = true;
	}).catch(e => {
		result.success = false;
	})*/
	
	const result = {
		success: false, 
		error: "",
	}
	
	const url = "/auth/LogoutUser";
	

	const prom = await clientApi.post(url, session, {...params}).then(res => {
		console.log(res);
	}).catch(err => {
		console.log(err);
		result.success = false;
		result.error = err;
	})
	
	
	console.log(result);
	
	/*debugger;
	
	result.then(res=>{
		console.log("clientApi.post > result");
	}).catch(err=>{
		console.log(err);
	});
	
	console.log(result);*/
	
	return result;
}


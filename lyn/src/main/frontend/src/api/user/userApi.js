import axios from "axios";

export async function invokeUserToken(email, password){
	
	let result = {
		success: false,
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
		console.log(res);

		if(res.status === 200){
			
			const resData = res.data;
			if(resData.success === true){
				//console.log("success", res.data.payload)
				result.success = true;
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


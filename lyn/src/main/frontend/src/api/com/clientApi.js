import axios from 'axios'


export async function clientApi(url, session, {...params} = {}, method){
	
	let result = {};
	
	console.log(url);
	console.log(session);
	console.log(params);
	
	debugger;
	
	try {
	
		axios.defaults.headers.common["Authorization"] = `${session.jwt.grantType} ${session.jwt.accessToken}`;
		
		if(method === "POST"){
			result = await axios.post(url, null, params)
			//console.log(result);
			//return result;
		} else {
			//axios.get(url)
		}
	} catch(err){
		const errorMessage = err.message ? err.message : "error occurred"; 
		//return Promise.reject(new Error(errorMessage));
		return Promise.reject(errorMessage);
		//return err;
	}
	
}



clientApi.get = function (url, session, params = {}) {
	return clientApi(url, session, {...params}, 'GET')
}


clientApi.post = function (url, session, params = {}) {
	return clientApi(url, session, {...params}, 'POST');	
}
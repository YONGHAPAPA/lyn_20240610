// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

import axios from 'axios'


export async function client(endpoint, { body, ...customConfig } = {}) {
  
  	
	
	const headers = { "Content-Type": `application/json` };
  
	const config = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers,
		},
	}


	if (body) {
		config.body = JSON.stringify(body)
     }


	 let data
  
	 try {
    
		//console.log("endpoint", endpoint);
		//console.log("config", config);
		
		/*
		const response = await window.fetch(endpoint, config).then(res=>{
			console.log(res);
			return res;
		});
		*/
		
		//https://dev.lyn.com:3000/fakeApi/posts
		const response = await window.fetch(endpoint, config);
		//const response = await axios.post(endpoint, config)
    
		//console.log("response", response);
		//onsole.log("client.js > response.json()", response.json());
		
		data = await response.json()	//readable Stream 객체는 두번읽으면잠겨서 읽지 못함 !!!
		//console.log("client.js > data", data, response.ok);
    
		if (response.ok) {
      
			//console.log("data", data);
			// Return a result object similar to Axios
			return {
				status: response.status,
				data,
				headers: response.headers,
				url: response.url,
			}
		}
    
		throw new Error(response.statusText)
  
	} catch (err) {
		return Promise.reject(err.message ? err.message : data)
	}
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}
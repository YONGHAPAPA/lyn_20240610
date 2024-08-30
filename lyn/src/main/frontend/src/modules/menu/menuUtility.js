import axios from "axios";
import * as auth from '../authentication';



export const getNavMenu = (domainCd) => {
	//console.log("domainCd", domainCd);
	//console.log("getNavMenu >> ", axios.defaults.headers.common["Authorization"]);
	
	console.log("getNaveMenu >>>>>> start ");
	
	try{
		let url = "/menu/getNavMenuByDomain";
		let url2 = "/admin/dashBoard";
		
		axios.post(url, null, {
			params:{
				domainCd: domainCd, 
			}
		} ).then((data)=>{
			
			console.log(data);
			
			
		}).catch((err)=>{
			
			console.log(err);
			
			if(err.response.status === 401){
				//Access Token is Unauthorized(Invalid/Expired/Unsupported/Empty)
				//Access Token 만료로 Access Token 재발급요청 
				auth.invokeAccessToken().then((result)=>{
					
					console.log("getNavMenu > invokeAccessToken >> ", result);
					if(result){
						console.log("get start nav menu data");
						
						getNavMenu(domainCd);
					}
				})
				console.log("[error]function getNavMenu :: ", err.response.data.error.message)
				//alert(`토큰인증이 거부되었습니다. 재로긴 해주세요. \r\n ${err.response.data.error.message}`);
				//alert(`메뉴 [${domainCd}]의 권한이 없습니다.`);
				//navigate("/auth/Login");
			}
		})
	}catch(e){
		console.log("[Error]getNavMenu", e.description);
	}
}
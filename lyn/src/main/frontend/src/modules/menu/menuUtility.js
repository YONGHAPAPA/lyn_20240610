import axios from "axios";


export const getNavMenu = (domainCd) => {
	//console.log("domainCd", domainCd);
	//console.log("getNavMenu >> ", axios.defaults.headers.common["Authorization"]);
	
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
			if(err.response.status === 401){
				//Access Token is Unauthorized(Invalid/Expired/Unsupported/Empty)
				console.log("[error]function getNavMenu :: ", err.response.data.error.message)
				alert(`토큰인증이 거부되었습니다. 재로긴 해주세요. \r\n ${err.response.data.error.message}`);
				//alert(`메뉴 [${domainCd}]의 권한이 없습니다.`);
			}
		})
	}catch(e){
		console.log("[Error]getNavMenu", e.description);
	}
}
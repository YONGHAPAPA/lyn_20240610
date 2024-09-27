import React, { useEffect } from 'react';
import axios from 'axios';
import DefaultButton from '../../components/DefaultButton';


const Home = () => {
	
	
	useEffect(()=>{
		
		console.log("init home");
		
	}, [])
	
	
	function doAction(){
		console.log("doAction")
		
		const url = "/home/index";
		axios.get(url, "", null).then(res=>{
			
			console.log(res);
		})
	}
	
	return (
		<>
			<div>Home</div>
			<DefaultButton onClick={doAction} text={"doAction"}/>
		</>
	);
}


export default Home;
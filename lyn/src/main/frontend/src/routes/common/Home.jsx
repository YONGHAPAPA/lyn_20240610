import React, { useEffect } from 'react';
import axios from 'axios';
import DefaultButton from '../../components/DefaultButton';


import {useSelector, useDispatch} from 'react-redux';


const Home = () => {
	
	const dispatch = useDispatch();
	const value1 = useSelector(state => state.addsubReducer.value1);
	const count1 = useSelector(state => state.countingReducer.count1);
	const loginUserInfo = useSelector(state => state.loginUserReducer.loginUserInfo);
	
	
	console.log("count1", count1)
	console.log("loginUser", loginUserInfo)
	
	const addValue = () => {
		dispatch({type: 'increment'})
	} 
	
	const subValue = () => {
		dispatch({type: 'decrement'});
	}
	
	const resetValue = () => {
		dispatch({type: 'reset'});
	}
	
	const jumpCount = () => {
		dispatch({type: 'jump', payload:20});
	}
	
	const pushCount = () => {
		dispatch({type: 'push'})
	}
	
	const changeUser = () =>{
		dispatch({type:'MUTATE_LOGIN_USER', payload:{userId:'22', accessToken:'cccc', accessTokenExpiryDate:'20241010 1020', refreshToken:'refresh ccc', refreshTokenExpiryDate:'333333'}})
	}
	
	
	useEffect(()=>{
		
		//console.log("init home");
		
	}, [])
	
	
	function doAction(){
		//console.log("doAction")
		
		const url = "/home/index";
		axios.get(url, "", null).then(res=>{
			
			console.log(res);
		})
	}
	
	return (
		<>
			<div>Home1</div>
			<DefaultButton onClick={doAction} text={"doAction"}/>
			
			<div>redux value: {value1}</div><button onClick={addValue}>+</button><button onClick={subValue}>-</button><button onClick={resetValue}>reset</button>
			<div>redux count: {count1}</div><button onClick={pushCount}>push</button><button onClick={jumpCount}>jump</button>
			
			<div>Login User: </div>
			<div>User ID : {loginUserInfo.userId}</div><button onClick={changeUser}>changeUser</button>
		</>
	);
}


export default Home;
import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom';

import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import * as common from '../src/modules/authentication';

import Join from './routes/auth/Join';
import Login from './routes/auth/Login';
import Home from './routes/common/Home';
import MyPage from './routes/member/MyPage';
import WorkBench from './routes/admin/WorkBench';
import Page1 from './routes/admin/routes/Page1';
import Page2 from './routes/admin/routes/Page2';

import { useInsertionEffect } from 'react';



function App() {
	
	let isAuthenticated = false;
	const [msg, setMsg] = useState('');
	
	let ref_token = useRef('');
	
	useEffect(()=>{
		
		//console.log("app localStorage", localStorage.getItem("auth"));
		ref_token.current = "newtoken~~~";
		
		/*
		axios.get('https://localhost:8080/index', {widthwithCredentials:true})
		.then((res)=>{setMsg(res.data)});
		*/
		
		let accessToken = common.extractAccessTokenFromRequestHeader(axios.defaults.headers.common["Authorization"]);
		//console.log("App:: accessToken", accessToken);
		
		if(accessToken){
			//isAuthenticated = true;
			//let newAccessToken = slientLogin(accessToken);
			//console.log("newAccessToken", newAccessToken)
		}
		
	}, []);
	
	
	
	
	const slientLogin = async (oldAccessToken) => {
		
		let newAccessToken = "";
		
		try{
			newAccessToken = await common.doSlientLogin(oldAccessToken, "/auth/SlientLogin");	
		} catch(e){
			console.log("slientLogin", e.description);
			newAccessToken = "";
		}
		
		return newAccessToken;
		
	}
	
	
	
	console.log("isAuthenticated: ",isAuthenticated);
	
	function app_test(){
		console.log("app_test");
	}
	
	
	return (
		<>
			<div className='App'>return API index msg : {msg}</div>
			<div><hr/></div>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="auth/Join" element={<Join/>} />
	            <Route path="auth/login" element={isAuthenticated ? <MyPage/> : <Login/>} />
				<Route path="member/Mypage" element={<MyPage/>} />
				<Route path="admin/WorkBench" element={<WorkBench/>}>
					<Route path="routes/Page1" element={<Page1/>} />
					<Route path="routes/Page2" element={<Page2/>} />
				</Route>
			</Routes>
		</>
	);
}

export default App;

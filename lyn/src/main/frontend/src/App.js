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
import UserManagement from './routes/admin/user/UserManagement';
import UserConfig from './routes/admin/user/UserConfig';
import MenuCreation from './routes/admin/menu/MenuCreation';
import MenuRole from './routes/admin/menu/MenuRole';

import { useInsertionEffect } from 'react';
import SetupUserType from './routes/admin/user/SetupUserType';



function App() {
	
	let isAuthenticated = false;
	const [msg, setMsg] = useState('');
	
	useEffect(()=>{
		
		/*
		axios.get('https://localhost:8080/index', {widthwithCredentials:true})
		.then((res)=>{setMsg(res.data)});
		*/
		
		let accessToken = common.extractAccessTokenFromRequestHeader(axios.defaults.headers.common["Authorization"]);
		
		if(accessToken){
			//isAuthenticated = true;
			//let newAccessToken = slientLogin(accessToken);
			//console.log("newAccessToken", newAccessToken)
		}
		
	}, []);
	

	return (
		<>
			<link rel="stylesheet" href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			
			<div className='App'>return API index msg : {msg}</div>
			<div className='main-wrapper'>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/auth/Join" element={<Join/>} />
		            <Route path="/auth/login" element={isAuthenticated ? <MyPage/> : <Login/>} />
					<Route path="/member/Mypage" element={<MyPage/>} />
					<Route path="/admin/" element={<WorkBench/>}> 
						<Route index path="user/UserConfig" element={<UserConfig/>} />
						<Route path="user/UserManagement" element={<UserManagement/>} />
						<Route path="menu/MenuCreation" element={<MenuCreation/>} />
						<Route path="menu/MenuRole" element={<MenuRole/>} />
						<Route path="user/SetupUserType" element={<SetupUserType/>} />
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default App;

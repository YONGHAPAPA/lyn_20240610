import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';

import {useEffect, useState} from 'react';
import axios from 'axios';

import Join from './routes/auth/Join';
import Login from './routes/auth/Login';
import Home from './routes/common/Home';


function App() {
	
	const [msg, setMsg] = useState('');
	
	useEffect(()=>{
		axios.get('http://localhost:8080/index', {widthwithCredentials:true})
		.then((res)=>{setMsg(res.data)});
		
	});

	
	return (
		<>
			<div className='App'>return msg : {msg}</div>
			<Routes>
				<Route path="" element={<Home/>} />
				<Route path="auth/Join" element={<Join/>} />
				<Route path="auth/Login" element={<Login/>} />
			</Routes>
		</>
	);
}

export default App;

import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';

import {useEffect, useState} from 'react';
import axios from 'axios';


function App() {

	
	const [msg, setMsg] = useState('');
	
	useEffect(()=>{
		axios.get('/index')
		.then((res)=>{setMsg(res.data)})
	});

	return (
		
		<div className='App'>
			return msg : {msg}
		</div>
	);
	
	  
}

export default App;

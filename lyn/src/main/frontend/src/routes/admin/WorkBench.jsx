
import {Routes, Route, Outlet} from 'react-router-dom'

import '../../App.css';
import NavBar from './WorkBenchNavBar';

const WorkBench = () => {
	
	
	
	return (
		<>
			<div className='main-wrapper'>
				<div className="div-side-nav-left">
					<NavBar/>
				</div>
				<div className="div-side-nav-right">
					<Outlet/>
				</div>
			</div>
		</>
	)
}


export default WorkBench
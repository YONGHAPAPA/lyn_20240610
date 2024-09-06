
import * as React from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import { CssBaseline, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material';
import { Container } from '@mui/material';




import '../../App.css';
import NavBar from './WorkBenchNavBar';


const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	}, 
	content: {
		flexGrow: 1, 
		paddingLeft: 6,  
		height: '100vh', 
		overflow: 'auto'
	}
}));

const WorkBench = () => {
	
	const classes = useStyles();
	//console.log(classes);
	
	return (
		<div className={classes.root}>
			<CssBaseline>
				<div>
					<NavBar/>
				</div>
				<main className={classes.content}>
					<Outlet/>
				</main>
			</CssBaseline>
		</div>
	)
}


export default WorkBench
import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, Typography } from "@mui/material";

import App from '../App';


const Footer = () => {
	return (
		<Box sx={{
	        width: "100%",
	        height: "auto",
	        backgroundColor: "whitesmoke",
	        paddingTop: "1rem",
	        paddingBottom: "1rem",
	      }}
	    >
    		<Container maxWidth="1g">
    			<Grid container direction="column" alignItems={"center"}>
    				<Grid item xs={12}>
    					<Typography color={"black"} variant='h6'>Lyn.com App</Typography>
    				</Grid>
    				<Grid item xs={12}>
    					<Typography color={"textSecondary"} variant='subtitle1'>
    						{`${new Date().getDate()} \r\n ${new Date()}`}
    					</Typography>
    				</Grid>
    			</Grid>
    		</Container>
   		</Box>
	);
}


export default Footer;
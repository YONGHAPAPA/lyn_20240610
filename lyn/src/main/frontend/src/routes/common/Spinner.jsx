import React from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = ({text = '', size = '5em'}) => {
	
	const header = text ? <h4>{text}</h4> : null
	
	return(
		<div>
			<div>{header}</div>
			<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
			    <CircularProgress color="success" />
			</Stack>
		</div>
		
	)
}
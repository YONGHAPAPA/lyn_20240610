import { styled } from '@mui/material/styles'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { fetchUserLogin } from '../../reducers/session/sessionSlice' 
import { useDispatch, useSelector } from 'react-redux'



export const LoginDialog = ({loginOpen, setLoginOpen, setLoginResult}) => {
	
	const disPatch = useDispatch();
	const userSession = useSelector(state => state.session);
	
	useEffect(()=>{
		//console.log(userSession);
	})
	
	const BootstrapDialog = styled(Dialog)(({theme})=>({
		'& .MuiDialogContent-root': {
			padding: theme.spacing(2), 
		}, 
		'& .MuiDialogActions-root': {
			padding: theme.spacing(1),
		}
	}));
	

	const handleClose = () => {
		setLoginOpen(false);
	}

	const doLogin = async (email, password) => {
		
		const objSubmit = {
			email: email, 
			password: password
		}
		
		disPatch(fetchUserLogin(objSubmit)).then(
			res => {
				//console.log(res);
				setLoginResult({
					success: res.payload.success, 
					message: res.payload.message,
				});
			}
		)
		
		setLoginOpen(false);
	}
	
	return (
		<React.Fragment>
			{/*
			BootstrapDialog 는 Dialog 대신사용 가능 
			<BootstrapDialog open={loginOpen} onClose={handleClose} aria-labelledby='login-dialog-title'>
			</BootstrapDialog>
			*/}
			
			
			<Dialog
				open={loginOpen}
				onClose={handleClose}
				PaperProps={{
					component: 'form', 
					onSubmit: (e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const formJson = Object.fromEntries(formData);
						const email = formJson.email;
						const password = formJson.password;
						doLogin(email, password);
					}, 
				}}
			>
				
				{/*
				<IconButton
					aria-label='close'
					onClick={handleClose}
					sx={(theme)=>({
						position: 'absolute', 
						right: 8, 
						top: 8,
						color: theme.palette.grey[500] 
					})} 
				>
					<CloseIcon />
				</IconButton>
				*/}
				
				
				
				{/* 
				<DialogContent dividers>
					<Typography gutterBottom>
						To use to this website, please enter your email address and password here. 
					</Typography>
				</DialogContent>
				*/}
				
				<DialogTitle id='login-dialog-title'>Login</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To use to this lyn.com, please enter your email address and password here.
					</DialogContentText>
					
					<TextField
						autoFocus
						required
						margin='dense'
						id='email'
						name='email'
						label='Email Address'
						type='text'	//[for test]테스트용으로 임시로 text 처리 나중에 email 변경!
						fullWidth
						variant='standard'
					/>
					
					<TextField
						required
						margin='dense'
						id='password'
						name='password'
						label='Password'
						type="password"
						fullWidth
						variant='standard' 
					/>
				</DialogContent>
				
				<DialogActions>
					{/*
					<Button autoFocus onClick={doLogin}>Login</Button>
					*/}
					
					<Button onClick={handleClose}>Cancel</Button>
					<Button type='submit'>Login</Button>
					
				</DialogActions>
			</Dialog>
			
		</React.Fragment>
	)
} 


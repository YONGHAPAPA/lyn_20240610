import React from 'react';
import {Link} from 'react-router-dom';



const Header = () => {
	
	return(
		<header>
			<Link to='/'>Home</Link>&nbsp;|&nbsp;
			<Link to='/auth/Join'>Join</Link>&nbsp;|&nbsp;
			<Link to='/auth/Login'>Login</Link>&nbsp;
			<hr/>
		</header>
	);
}


export default Header;


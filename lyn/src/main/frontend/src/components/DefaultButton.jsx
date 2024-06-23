import React from 'react';
import '../scss/DefaultButton.scss'


const DefaultButton = ({text, disable, onClick,}) => {
	
	return(
		<button className='defaultButton' disabled={disable} onClick={onClick}>{text}</button>
	);
}


export default DefaultButton;
import React from 'react';
import '../scss/DefaultInput.scss';


const DefaultInput = ({type, placeholder, value, name, onChange}) => {
	
	
	
	return(
		<input 
			className='defaultInput'
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			name={name}
		/>
	);
};


export default DefaultInput;
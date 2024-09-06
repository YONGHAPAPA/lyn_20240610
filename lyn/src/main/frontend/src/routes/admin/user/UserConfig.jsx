import { Typography } from '@mui/material';
import '../../../App.css';
import SetupUserType from './SetupUserType';


const UserConfig = () => {
	
	return(
		<>
			<div>
				<Typography variant='h6'>User Configruation</Typography>
				<div><SetupUserType/></div>
				<div></div>
			</div>
		</>
	)
}


export default UserConfig;
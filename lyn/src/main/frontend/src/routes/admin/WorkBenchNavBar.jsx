import {Link} from 'react-router-dom'
import '../../App.css'


const WorkBenchNavBar = () => {
	
	const SidebarData = [
		
		{
			
			title: "User Config", 
			path: "layout/UserConfig", 
			icon: "", 
			classNm: "nav_item"
		}, 
		
		{
			title: "User Management",
			path: "layout/UserManagement",
			icon:"", 
			classNm:"nav_item" 
		}, 
		
		{
			title: "Page3", 
			path: "./routes/Page3", 
			icon: "", 
			classNm: "nav_item"
		}
		
	];
	
	return(<>
		
		<div>
			<nav className='nav_list'>
				{SidebarData.map((item, index)=>{
					return(
						<li key={index} className={item.classNm}>
							<Link to={item.path} >
								<span>{item.title}</span>
							</Link>
						</li>	
					);					
				})}
			</nav>
		</div>
	</>)
}

export default WorkBenchNavBar;
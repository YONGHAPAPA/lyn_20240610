import {Link} from 'react-router-dom'


const WorkBenchNavBar = () => {
	
	const SidebarData = [
		{
			title: "Home",
			path: "/",
			icon:"", 
			cName:"nav-text" 
		}, 
		{
			
			title: "Reports", 
			path: "/Reports", 
			icon: "", 
			cName: "nav-text"
		}
		
	];
	
	return(<>
		
		<div>
			<nav>
				{SidebarData.map((item, index)=>{
					return(
						<li key={index} className={item.cName}>
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
import React from 'react';
import {Link} from 'react-router-dom';
//import '../../App.css'


import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';







const data = [
  { icon: <People />, label: 'Authentication' },
  { icon: <Dns />, label: 'Database' },
  { icon: <PermMedia />, label: 'Storage' },
  { icon: <Public />, label: 'Hosting' },
];


const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const SidebarData = [
	{
		title: "User Settings", 
	    id: "menu_1",
		key: "menu_1", 
		path: "", 
		icon: "",
		open: false,  
		sub: [
			{ 
				title: "user type setting",
				id: "menu_1_1", 
				key: "menu_1_1",
				path: "layout/UserConfig",
				icon: "", 
			}, 
			{
				title: "user management",
				id: "menu_1_2", 
				key: "menu_1_2",
				path: "layout/UserManagement", 
				icon: "", 
			} 
		]
	}, 
	{
		title: "Page3",
		id: "menu_2", 
		key: "menu_2",
		path: "./routes/Page3", 
		icon: "",
		open: true, 
		sub: [
			{
				title: "page3 - sub1",
				id: "menu_2_1", 
				key: "menu_2_1",
				path: "", 
				icon: "",
			}, 
			{
				title: "page3 - sub2",
				id: "menu_2_2", 
				key: "menu_2_2",
				path: "", 
				icon: "", 
			}
		]
	}, 
];



const WorkBenchNavBar = () => {
		
	//debugger;
	
	const [navMenu, setNavMenu] = React.useState(SidebarData);
	//setNavMenu(SidebarData);
	
	const getNavMenuData = () => {
		
		console.log(navMenu);
		
		return navMenu;
	}
	
	
	const navMenus = React.useMemo(()=>{
		//debugger;
		return getNavMenuData();
	}
	, [navMenu]);
	


	const nav_menu_toggle = (event, selectedId) => {
		
		console.log("nav_menu_toggle", selectedId);
		//console.log(navMenu);
		
		let newNavMenus = [];
		
		newNavMenus = navMenu.map((menu)=>{
			if(menu.id === selectedId){
				menu.open = !menu.open;
			}
			return menu;
		});
		
		console.log(newNavMenus);
		setNavMenu(newNavMenus);
	}
		
	return(
		<Box sx={{ display: 'flex' }}>
		      <ThemeProvider
		        theme={createTheme({
		          components: {
		            MuiListItemButton: {
		              defaultProps: {
		                disableTouchRipple: true,
		              },
		            },
		          },
		          palette: {
		            mode: 'dark',
		            primary: { main: 'rgb(102, 157, 246)' },
		            background: { paper: 'rgb(5, 30, 52)' },
		          },
		        })}
		      >
		        <Paper elevation={0} sx={{ maxWidth: 256 }}>
		          <FireNav component="nav" disablePadding>
		            <ListItemButton key="1" component="a" href="#customized-list" >
		              <ListItemIcon sx={{ fontSize: 20 }}> <AdminPanelSettingsIcon/> </ListItemIcon>
					  
		              <ListItemText
		                sx={{ my: 0 }}
		                primary="Bunker"
		                primaryTypographyProps={{
		                  fontSize: 20,
		                  fontWeight: 'medium',
		                  letterSpacing: 0,
		                }}
		              />
		            </ListItemButton>
		            <Divider />
		            <ListItem component="div" disablePadding>
		              <ListItemButton key="2" sx={{ height: 56 }}>
		                <ListItemIcon>
		                  <Home color="primary" />
		                </ListItemIcon>
		                <ListItemText
		                  primary="Project Overview"
		                  primaryTypographyProps={{
		                    color: 'primary',
		                    fontWeight: 'medium',
		                    variant: 'body2',
		                  }}
		                />
		              </ListItemButton>
		              <Tooltip title="Project Settings">
		                <IconButton
		                  size="large"
		                  sx={{
		                    '& svg': {
		                      color: 'rgba(255,255,255,0.8)',
		                      transition: '0.2s',
		                      transform: 'translateX(0) rotate(0)',
		                    },
		                    '&:hover, &:focus': {
		                      bgcolor: 'unset',
		                      '& svg:first-of-type': {
		                        transform: 'translateX(-4px) rotate(-20deg)',
		                      },
		                      '& svg:last-of-type': {
		                        right: 0,
		                        opacity: 1,
		                      },
		                    },
		                    '&::after': {
		                      content: '""',
		                      position: 'absolute',
		                      height: '80%',
		                      display: 'block',
		                      left: 0,
		                      width: '1px',
		                      bgcolor: 'divider',
		                    },
		                  }}
		                >
		                  <Settings />
		                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
		                </IconButton>
		              </Tooltip>
		            </ListItem>
					
					<Divider/>
					
					<Box 
						//sx={{
			            //    bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
			            //    pb: open ? 2 : 0,
			            //  }}
						
						sx={{
							bgcolor : 'rgba(71, 98, 130, 0.2)', 
							pb: 2,
						}}
					>
					{
						
						navMenus.map((item, index)=>{
							//console.log("index", index)
							//debugger;
							console.log(item.id);
							return (
									<React.Fragment key={`nav_menu_${index}`}>
										<ListItemButton key={item.id} onClick={(e)=>nav_menu_toggle(e, item.id)}>
											<ListItemText 
												primary={item.title}
												primaryTypographyProps={{
													fontSize: 14, 
													fontWeight: 'medium', 
													lineHeight: '15px', 
													mb: '2px'
												}}
											/>
											{item.open === true && item.sub.length > 0 && <KeyboardArrowUp/>} 
										</ListItemButton>
										
										{item.open === true && item.sub.map((sub_menu)=>(
											<ListItemButton key={sub_menu.id}>
												<ListItemIcon>{sub_menu.icon}</ListItemIcon>
												<ListItemText primary={sub_menu.title} primaryTypographyProps={{
													fontSize:13, 
													fontWeight:'medium'
												}} />
											</ListItemButton>
										))}
										
									</React.Fragment>
							)
						})
						
					}
					
					</Box>
		            
					
		          </FireNav>
		        </Paper>
		      </ThemeProvider>
		    </Box>
		
	)
}

export default WorkBenchNavBar;
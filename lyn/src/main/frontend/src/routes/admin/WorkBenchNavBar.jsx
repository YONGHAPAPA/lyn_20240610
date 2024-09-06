import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
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
import Grow from '@mui/material/Grow';

import * as menuUtil from '../../modules/menu/menuUtility';



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


const SidebarData2 = [
    {
        "title": "Menu Settings",
        "id": 1,
        "url": "",
        "icon": null,
        "open": false,
        "sub": [
            {
                "title": "menu creation",
                "id": 5,
                "key": 5,
                "url": "",
                "icon": null
            },
            {
                "title": "menu role setting",
                "id": 3,
                "key": 3,
                "url": "",
                "icon": null
            }
        ]
    },
    {
        "title": "User Settings",
        "id": 2,
        "key": 2,
        "url": "",
        "icon": null,
        "open": false,
        "sub": [
            {
                "title": "user type",
                "id": 4,
                "key": 4,
                "url": "",
                "icon": null
            },
            {
                "title": "user management",
                "id": 6,
                "key": 6,
                "url": "",
                "icon": null
            },
            {
                "title": "user management2",
                "id": 7,
                "key": 7,
                "url": "",
                "icon": null
            }
        ]
    }
];



const WorkBenchNavBar = () => {
		
	//debugger;
	const navigate = useNavigate();
	

	//const [navMenu, setNavMenu] = React.useState(SidebarData);
	//const [navMenu, setNavMenu] = React.useState(SidebarData2);
	const [navMenu, setNavMenu] = React.useState([]);
	//setNavMenu(SidebarData);
	
	/*
	const getNavMenuData = () => {
			
		console.log("getNavMenuData >> ", navMenu);
		
		return navMenu;
	}
	*/
	
	
	
	
	const containerRef = React.useRef(null);
	
		
	const navMenus = React.useMemo(()=>{
			const getNavMenuData = () => {
				return navMenu;
			}
		
			return getNavMenuData();
		}
	, [navMenu]);
			
			
	
	
	


	const nav_menu_toggle = (event, selectedId) => {
		//console.log("nav_menu_toggle", selectedId);
		//console.log(navMenu);
		
		
		let newNavMenus = [];
		
		newNavMenus = navMenu.map((menu)=>{
			if(menu.id === selectedId){
				menu.open = !menu.open;
			}
			return menu;
		});
		
		//console.log(newNavMenus);
		setNavMenu(newNavMenus);
		
	}
	
	
	
	
	/*
	 	useEffect 두번째 파라메터가 빈배열일경우는 최초 컴포넌트 로드시에만 실
	 */
	
	useEffect(()=>{
		
		menuUtil.getNavMenuByDomain("BUNKR").then(res=>{
			
			//console.log(res);
			
			if(res && res.data.success){
				const navMenuData = res.data.data;
				
				const navObj = [];
				navMenuData.forEach((item) => {
					//console.log(item)
					let navItem = {};
					
					if(item.level === 0){
						navItem.title = item.title;
						navItem.id = item.seq;
						navItem.key = item.seq;
						navItem.url = item.url;
						navItem.icon = item.icon;
						navItem.open = false;
						navItem.sub = [];
						navObj.push(navItem);
					}
					
					if(item.level === 1){
						navObj.forEach((upper)=>{
							//console.log(item);
							if(upper.id === item.parentSeq){
								navItem.title = item.title;
								navItem.id = item.seq;
								navItem.key = item.seq;
								navItem.url = item.url;
								navItem.icon = item.icon;
								upper.sub.push(navItem); 
							}
							
						})
					}
				});
				
				//console.log(navObj);
				
				
				let jsonString = JSON.stringify(navObj);
				//setNavMenu(jsonString); json 데이터를 stringify 로 navMenu 로 할당하면 문자열로 들어가게 되므로 Array 함수사용못해서 랜더링시 오류남, array로 만든거 그대로 useState Hook에 할(기억!!!)
				//console.log(jsonString)	
				
				//debugger;
				setNavMenu(navObj)
				
			}
			
		})
		
	},[]);
	
	
	

	//navMenu 변수 디버깅용 		
	function Tender(){
		console.log(navMenu.length, navMenu);
		if(navMenu){
			navMenu.map(item=>{
				console.log(item);
			})
		}
		
		return (<></>)
	}
	
	
	function navSumMenuClick(e, subMenu){
		
		//console.log(e)
		//console.log(subMenu);
		const url = subMenu.url;
		navigate(url);
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
		            mode: 'light',	//light, dark
		            primary: { main: '#696969' },
		            background: { paper: '#DCDCDC' },
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
						
						//console.log(navMenu);
						//navMenu && <Tender/>
						
						navMenus.length > 0 && navMenus.map((item, index)=>{
							//console.log("index", index)
							//debugger;
							//console.log(item.id);
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
											<Grow key={`grow_${sub_menu.id}`}
												in={item.open} 
												style={{transformOrigin:'0 4 4 0'}}
												{...(item.open ? {timeout: 200} : {})}
												>
												<ListItemButton key={sub_menu.id} onClick={(e)=>navSumMenuClick(e, sub_menu)}>
													<ListItemIcon>{sub_menu.icon}</ListItemIcon>
													<ListItemText primary={sub_menu.title} primaryTypographyProps={{
														fontSize:13, 
														fontWeight:'medium'
													}} />
												</ListItemButton>
											</Grow>
											
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
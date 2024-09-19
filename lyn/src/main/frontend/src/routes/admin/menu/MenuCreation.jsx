import * as React from 'react'
import { Box, Typography } from '@mui/material';
import TableList from '../../../components/List/TableList';
import * as menuUtil from '../../../modules/menu/menuUtility';






const MenuCreation = () => {
	
	/*const [headerData, setHeaderData] = React.useState([]);
	const [rowData, setRowData] = React.useState([
		{
			domainCd: "BUNKR", 
			title: "A",
			level: 0
		}, 
		{
			domainCd: "BUNKR", 
			title: "A-a",			
			level: 1
		}
	]);*/
	
	const initListDataSource = {
		headerDataSource: [],
		rowDataSource: [],
	};
	
	
	const [listDataSource, setListDataSource] = React.useState(initListDataSource);
	
	
	React.useEffect(()=>{
		
		console.log("MenuCreation - useEffect >>> ");
		menuUtil.getNavMenuByDomain('').then((res)=>{
			
			//console.log(res.data.data);
			let headerColumns = [
				{
					title: "SEQ", 
					cell_id: "seq", 
					editable: false, 
					type:"",
					hidden: true,
					width: "10%",
					align:"center",
					disablePadding: false,
				},
				{
					title: "DOMAIN", 
					cell_id: "domainCd",
					editable: false, 
					type: "text",
					hidden: false,
					width: "15%",
					align:"center", 
					disablePadding: true,
				}, 
				{
					title: "TITLE",
					cell_id: "title",
					editable: true, 
					type: "text",
					hidden: false,
					width: "30%",
					align:"left",
					disablePadding: true, 
				}, 
				{
					title: "LEVEL", 
					cell_id: "level",
					editable: false, 
					type: "", 
					hidden: false,
					width: "10%",
					align:"", 
					disablePadding: false,
				}, 
				{
					title: "ISUSE", 
					cell_id: "isUse",
					editable: false, 
					type: "combo",
					hidden: false,
					width: "10%",
					align:"",
					disablePadding: false,  
				}, 
				{
					title: "DELETE", 
					cell_id: "deltFlg",
					editable: false, 
					type: "combo",
					hidden: false,
					width: "10%",
					align:"",
					disablePadding: false, 
				}, 
				{
					title: "REMARK", 
					cell_id: "rmk",
					editable: true, 
					type: "text",
					hidden: false,
					width: "30%",
					align:"",
					disablePadding: false, 
				}];
			
			
			const menuRawData = res.data.data;
			let newRowData = [];
			
			if(menuRawData){
				
				for(let i=0; i<menuRawData.length; i++){
					//Row 단위별로 Table List 에 populated 될 datasource 생성	
					let rawRowData = menuRawData[i];	//{seq:'', domainCd:'', title:'', icon:''....}
					//console.log(rawRowData);
					
					let rowCells = [];
					for(let i=0; i<headerColumns.length;i++){

						let headerColumn = headerColumns[i];
						//console.log(headerColumn.cell_id);
						
						let cellKeys = Object.keys(rawRowData);
						for(let i=0; i<cellKeys.length;i++){
							
							let cell = {};
							if(headerColumn.cell_id === cellKeys[i]){
								cell.id = cellKeys[i];
								cell.value = rawRowData[cellKeys[i]];
								rowCells.push(cell);
							}
						}
					}
					
					newRowData.push(rowCells);
				}
				
				
				//debugger;
				
				//console.log(newRowData);
				
				//console.log(listDataSource);
				const newDataSource = {headerDataSource: headerColumns, rowDataSource: newRowData};
				//console.log("MenuCreation", newDataSource);
				setListDataSource(newDataSource);
			}
		});
	}, []);
	
	
	if(listDataSource) {
		return(
			<div>
				<Typography variant='h6' >Menu Creation</Typography>
				
				
				{/* menu table list (s)*/}
				{
					listDataSource && 
					<Box>
						<TableList dataSource={listDataSource}/>					
					</Box>
				}
				
				{/* menu table list (e)*/}
				
			</div>
		);
	};
}


/*
function handleSelectAllClick(e){
	
	console.log("handleSelectAllClick");
	
}
*/

export default MenuCreation;
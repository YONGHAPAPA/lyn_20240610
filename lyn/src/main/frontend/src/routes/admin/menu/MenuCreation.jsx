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
		headerCellData: [],
		rowData: [],
	};
	
	
	const [listDataSource, setListDataSource] = React.useState(initListDataSource);
	
	
	React.useEffect(()=>{
		
		console.log("MenuCreation - useEffect >>> ");
		menuUtil.getNavMenuByDomain('').then((res)=>{
			
			//console.log(res.data.data);
			let newHeaderCellData = [
				{
					title: "DOMAIN", 
					cell_id: "domainCd",
					type: "",
				}, 
				{
					title: "TITLE",
					cell_id: "title",
					type: "",
				}, 
				{
					title: "LEVEL", 
					cell_id: "level",
					type: "", 
				}, 
				{
					title: "ISUSE", 
					cell_id: "isUse",
					type: "", 
				}, 
				{
					title: "DELETE", 
					cell_id: "deltFlg",
					type: "",
				}, 
				{
					title: "REMARK", 
					cell_id: "rmk",
					type: "",
				}];
			//setListDataSource({...listDataSource, headerData:newHeaderData});
			
			const menuRawData = res.data.data;
			let newRowData = [];
			
			if(menuRawData){
				menuRawData.forEach(rowData=>{

					let rowCells = [];
					let keys = Object.keys(rowData);
					
					keys.forEach(key=>{

						let cell = {};
						cell.id = key;
						cell.value = rowData[key];
						
						newHeaderCellData.forEach(headerCell => {
							if(headerCell.cell_id === cell.id){
								rowCells.push(cell);
							}
						})
					})
					
					//console.log(rowCells);
					newRowData.push(rowCells);
				})
				
				//console.log(newRowData);
				
				//console.log(listDataSource);
				const newDataSource = {headerCellData: newHeaderCellData, rowData: newRowData};
				//console.log(newDataSource);
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
						<TableList dataSource={listDataSource} onSelectAll={handleSelectAllClick} />					
					</Box>
				}
				
				{/* menu table list (e)*/}
				
			</div>
		);
	};
}


function handleSelectAllClick(e){
	
	console.log("handleSelectAllClick");
	
}


export default MenuCreation;
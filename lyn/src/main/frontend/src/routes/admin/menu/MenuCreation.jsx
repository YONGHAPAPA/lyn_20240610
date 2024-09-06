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
			let headerColumns = [
				{
					title: "SEQ", 
					cell_id: "seq", 
					type:"",
					hidden: true,
				},
				{
					title: "DOMAIN", 
					cell_id: "domainCd",
					type: "",
					hidden: false, 
				}, 
				{
					title: "TITLE",
					cell_id: "title",
					type: "",
					hidden: false, 
				}, 
				{
					title: "LEVEL", 
					cell_id: "level",
					type: "", 
					hidden: false, 
				}, 
				{
					title: "ISUSE", 
					cell_id: "isUse",
					type: "",
					hidden: false,  
				}, 
				{
					title: "DELETE", 
					cell_id: "deltFlg",
					type: "",
					hidden: false, 
				}, 
				{
					title: "REMARK", 
					cell_id: "rmk",
					type: "",
					hidden: false, 
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
				
				console.log(newRowData);
				
				//console.log(listDataSource);
				const newDataSource = {headerCellData: headerColumns, rowData: newRowData};
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
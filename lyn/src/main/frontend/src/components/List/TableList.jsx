import { Paper, TableHead, TableRow, Box, TableContainer, Table, TableCell, Checkbox, TableSortLabel, TableBody } from "@mui/material";
import PropTypes from 'prop-types';
import * as React from "react";


const TableList = (props) => {

	/*
		테이블 리스트는 TableContainer > Table > TableHead > TableRow 구조를 포함해서 구성해야 오류 발생안함
	*/	
	const {dataSource} = props;
	const {headerCellData, rowData} = dataSource;
	
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [dense, setDense] = React.useState(false);
	
	const handleSelectAll = (event)=>{
		const checked = event.target.checked;
		
		if(checked){
			const selected = rowData.map((row, idx) =>{
				return idx;
			});
					
			setSelectedRows(selected);
			return;	
		}
		
		setSelectedRows([]);
	}
	
	const isSelected = (index) => {
		return selectedRows.indexOf(index) !== -1; 
	}
	
	const handleRowClick = (event, index) => {
		
		let newSelectedRows = [];
		if(selectedRows.includes(index)){
			newSelectedRows = selectedRows.filter(n => n !== index);	
		} else {
			newSelectedRows = [...selectedRows, index];
		}
		
		setSelectedRows([...newSelectedRows])
	}
	
	const getCellAlign = (cellId) => {
		const cell = headerCellData.filter(n=> n.cell_id === cellId);
		return cell[0].align === "" ? "center" : cell[0].align;
	}
	
	return (
		<Box>
			<Paper>
			
				{
					dataSource.headerCellData && <TableContainer>
					<Table
						size={dense ? 'small' : 'medium'}
						
						/* props ?? (s)*/
						sx={{minWidth: 500}}
						aria-labelledby="tableTitle"
						/* props ?? (e)*/
					>
						<TableListHead headerCellData={headerCellData} onSelectAll={handleSelectAll}  />
						<TableBody>
							{
								rowData.map((row, idx)=>{
									
									//console.log(idx);
									const labelId = `table-checkbox-${idx}`;
									const isSelectedRow = isSelected(idx);
									
									//console.log("labelId", labelId);
									
									
									return(
										<TableRow 
											hover 
											key={idx} 
											onClick={(e)=>handleRowClick(e, idx)} 
											selected={isSelectedRow}
											sx={{cursor:'pointer'}}
											
											/* props ?? (s) */
											role="checkbox"
											aria-checked={isSelectedRow}
											/* props ?? (e) */
											>
											<TableCell padding="checkbox">
												<Checkbox
													color="primary" 
													checked={isSelectedRow} 
													inputProps={{
														'aria-labelledby': labelId,
													}}
													/>
											</TableCell>
											
											{row.map(cell=>{
												
												const cellAlign = getCellAlign(cell.id);
												
												console.log(`${cell.id} : ${cellAlign}`)
												
												return(<TableCell
													component="th"
													padding="none"
													
													scope="row"
													id={labelId}
													align={cellAlign}
												>
													{cell.value}
												</TableCell>)
											})}
											
										</TableRow>	
									)
								})
							}
						</TableBody>
					</Table>
				</TableContainer> 
				}
				
			</Paper>
		</Box>
	);
	
	
	//TableList Property 정의
	
	/*TableList.propTypes = {
		dataSource: PropTypes.array.isRequired, 
	}*/
}

function TableListHead(props){
	
	const {headerCellData, onSelectAll} = props;
	
	//console.log("headCellData", headerCellData);
	
	return(
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox onChange={onSelectAll}  />
				</TableCell>
				
				
				{headerCellData.map(cell=>(
				<TableCell key={cell.cell_id} align="center" padding="normal">
					<TableSortLabel active={true} direction="desc" >
						{cell.title}
					</TableSortLabel>
				</TableCell>
				))}
				
			</TableRow>
		</TableHead>
	);
	
	
}

TableListHead.propTypes = {
	headerCellData: PropTypes.array.isRequired,
	//onSelectAll: PropTypes.func.isRequired, 
}

TableList.propTypes = {
	dataSource: PropTypes.object.isRequired,
	//onSelectAll: PropTypes.func.isRequired,
}


export default TableList;
import { Paper, TableHead, TableRow, Box, TableContainer, Table, TableCell, Checkbox, TableSortLabel, TableBody, TablePagination, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PropTypes from 'prop-types';
import * as React from "react";


const TableList = (props) => {

	/*
		테이블 리스트는 TableContainer > Table > TableHead > TableRow 구조를 포함해서 구성해야 오류 발생안함
	*/	
	const {dataSource} = props;
	
	//console.log(dataSource);
	
	const {headerCellData, rowDataSource} = dataSource;
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [dense, setDense] = React.useState(false);
	const [order, setOrder] = React.useState('desc');
	const [orderBy, setOrderBy] = React.useState();
	const rowsPerPageOption = [3, 5, 10];
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(0);
	
	const [tmp, setTmp] = React.useState(0);
	
	//console.log("rowDataSource", rowDataSource);
	const [rowData, setRowData] = React.useState([]);
	
	const [editRow, setEditRow] = React.useState([]);
	
	//console.log("rowDataSource", ...rowDataSource);
	
	React.useEffect(()=>{
		//console.log("rowDataSource", rowDataSource);
		
		/* 각 Row edit 여부 속성값 추가*/
		let newRowDataSource = [];
		if(Array.isArray(rowDataSource)){

			newRowDataSource = rowDataSource.map((row)=>{
				return [...row, {id:'isEdit', value: false}];
			});
			
			console.log("newRowDataSource", newRowDataSource);
					
			setRowData(newRowDataSource);	 
		} else {
			setRowData([]);
		}
		
		
		
		
	}, [rowDataSource])
	
	
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
	
	const handleCheckClick = (event, index) => {
		
		/*
			C.F) Table Row 객체에서 클릭이벤트시 이벤트 Row의 index 속성값을 useState 객체에 할당하면 
			Table 을 새로 렌더링한다 >> 원래 react는 그런건가? 왜그런가?? 신기하네...!!!!!!!!!!!!
		*/
		
		let newSelectedRows = [];
		if(selectedRows.includes(index)){
			newSelectedRows = selectedRows.filter(n => n !== index);	
		} else {
			newSelectedRows = [...selectedRows, index];
		}
		
		setSelectedRows([...newSelectedRows])
	}
	
	
	
	const onToggleEditMode = (event, index) => {
		console.log("onToggleEditMode", index, editRow);
		setEditRow([...editRow, index]);
	}
	
	const getCellAlign = (cellId) => {
		const cell = headerCellData.filter(n=> n.cell_id === cellId);
		return cell.length > 0 ? (cell[0].align === "" ? "center" : cell[0].align) : "center";
	}
	
	
	const handlePageChange = (e, newPage) => {
		
		const curPage = newPage;
		//console.log(curPage);
		setPage(curPage);
	}
	
	const handleRowsPerPageChange = (e) => {
		const selectedRowCnt = e.target.value;
		//console.log(selectedRowCnt);
		setRowsPerPage(parseInt(selectedRowCnt));
		setPage(0);
	}
	
	const handleSortTableList = (e, cellId) => {
		const isAsc = orderBy === cellId && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(cellId);
	}
	
	
	
	
	function getComparator(order, orderBy){
		
		//console.log("getComparator", order, orderBy)
		
		const getCellValueById = (rowCells, cellId) => {
			let cellValue = "";
			const cell = rowCells.filter(n => n.id === cellId);
		
			if(cell.length > 0){
				cellValue = cell[0].value;
			}
			
			return cellValue;
		}
		
		const descendingOrder = (a, b) => {
			const valueA = getCellValueById(a, orderBy);
			const valueB = getCellValueById(b, orderBy);
			
			if(valueA > valueB){
				return 1;
			}
			
			if(valueA < valueB){
				return -1;
			} 

			return 0;
		}
		
		if(orderBy && orderBy !== ""){
			//console.log(order, orderBy);
			return order === "desc" ? (a, b) => {return descendingOrder(a, b)} : (a, b) => { return -descendingOrder(a, b)}
		}
	}
	
	const visibleRows = React.useMemo(
		()=>{
			
			console.log("visibleRows", "start");
			//console.log("rowData", rowData);
			//debugger;
			
			const fm = rowsPerPage * page;
			const to = (rowsPerPage * (page + 1));
			return rowData ? [...rowData]
			.sort(getComparator(order, orderBy))
			.slice(fm, to) : [];
		}, 
		[page, rowsPerPage, rowData, order, orderBy]
	)
	
	
	return (
		<Box>
			<Paper sx={{width:'100%'}}>
				{
					dataSource.headerCellData && (
					<React.Fragment>
						<TableContainer>
							<Table
								size={dense ? 'small' : 'medium'}
								
								/* props ?? (s)*/
								sx={{minWidth: 500}}
								aria-labelledby="tableTitle"
								/* props ?? (e)*/
							>
								<TableListHead headerCellData={headerCellData} onSelectAll={handleSelectAll} orderBy={orderBy} order={order} onSortTableList={handleSortTableList}  />
								<TableBody>
									{
										
										visibleRows.length > 0 && visibleRows.map((row, idx)=>{
											
											console.log("Render Table Body !!!!")
											//console.log("tablebody visibleRows", visibleRows);
											//console.log("table body", idx);
											const labelId = `table-checkbox-${idx}`;
											const isSelectedRow = isSelected(idx);
											
											//console.log("isSelectedRow", idx, isSelectedRow);

											return(
												<TableRow 
													hover 
													key={idx} 
													//onClick={(e)=>handleRowClick(e, idx)}	//min 일단 셀별로 클릭이벤트 처리해야 할듯... 에디트 모드 처리하려면 전체 ROW에 클릭에 이벤트 주면 안되겠네.. 
													//selected={isSelectedRow}
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
															onClick={(e)=>handleCheckClick(e, idx)}
															/>
													</TableCell>
													
													{row.map(cell=>{
														
														const cellAlign = getCellAlign(cell.id);
														
														console.log(`${cell.id} : ${cellAlign}`)
														
														return(
															
															(cell.id === 'isEdit') ?
															<TableCell id='edit'>
																<IconButton aria-label="edit" onClick={(e) => onToggleEditMode(e, idx)}>
																	<ModeEditOutlineOutlinedIcon/>
																</IconButton>
															</TableCell> 
															: 
															<TableCell
															component="th"
															padding="none"
															scope="row"
															id={labelId}
															align={cellAlign}
															>
															{cell.value}
															</TableCell> 
														)
													})}
													
												</TableRow>	
											)
										})
									}
								</TableBody>
							</Table>
					</TableContainer>
					
					 
					<TablePagination 
						rowsPerPageOptions={rowsPerPageOption}
						component={"div"}
						count={rowData ? rowData.length : 0}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handlePageChange}
						onRowsPerPageChange={handleRowsPerPageChange}
					/>
				</React.Fragment>
				)
								
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
	
	//console.log("TableListHead", "start");
	
	const {headerCellData, onSelectAll, orderBy, order, onSortTableList} = props;
	//console.log("headCellData", headerCellData);
	
	return(
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox onChange={onSelectAll}  />
				</TableCell>
				
				
				{headerCellData.map(cell=>(
				<TableCell 
					key={cell.cell_id} 
					align="center" 
					padding={cell.disablePadding ? 'normal':'none'}
					sortDirection={false}
					>
					<TableSortLabel active={orderBy === cell.cell_id} onClick={(e) => onSortTableList(e, cell.cell_id)} direction={orderBy === cell.cell_id ? order : 'asc'} >
						{cell.title}
					</TableSortLabel>
				</TableCell>
				))}
				
				{/* Edit Cell */}
				<TableCell padding="normal">
				</TableCell>
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
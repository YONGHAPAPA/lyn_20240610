import { Paper, TableHead, TableRow, Box, TableContainer, Table, TableCell, Checkbox, TableSortLabel, TableBody, TablePagination, IconButton, Collapse, ButtonGroup } from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import PropTypes from 'prop-types';
import * as React from "react";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from "axios";


const TableList = (props) => {

	/*
		테이블 리스트는 TableContainer > Table > TableHead > TableRow 구조를 포함해서 구성해야 오류 발생안함
	*/	
	const {dataSource, handleSaveRow, handlInitList} = props;
	const [beforeEditRows, setBeforeEditRows] = React.useState([]);
	
	//console.log("changedList", changedList);
	//console.log("setChangedList", setChangedList);
	//console.log("populateChangedTableList", populateChangedTableList);
	
	const {headerDataSource, rowDataSource} = dataSource;
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [dense, setDense] = React.useState(false);
	const [order, setOrder] = React.useState('desc');
	const [orderBy, setOrderBy] = React.useState();
	const rowsPerPageOption = [3, 5, 10];
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(0);
	const [headerData, setHeaderData] = React.useState([]);
	const [rowData, setRowData] = React.useState([]);
	
	
	//console.log("handlInitList", handlInitList);
	
	const fetchRow = (rowDataJson)=>{
		const result = handleSaveRow(rowDataJson)
		//console.log(handleSaveRow);
	}
	
	
	
	
	const rowMutation  = useMutation({
		mutationKey: [`updaterow`],
		mutationFn: async (rowDataJson) => { 
			//fetchRow(rowData);
			
			
			console.log("mutation:", rowDataJson);
			
			return handleSaveRow(rowDataJson);
			
			//console.log(rowDataJson);
			
			/*
			const url = "/menu/updateNavMenuItem";
			return axios.post(url, rowDataJson, {
				headers: {
					"Content-Type": `application/json`
				}
			})
			*/
		}, 
		onMutate(){
			console.log("onMutate: isPending", rowMutation.isPending)
		}, 
		onSuccess(data, variable, context){
			//console.log(mutation.isSuccess);
			//console.log(variable);
			//console.log(context);
			
			//console.log("onSuccess.isPending", mutation.isPending);
			//console.log("onSuccess", variable)
			const rowId = variable.rowId;
			//console.log("rowId::", rowId);

			toggleRowEditModeByRowId(rowId, false);
						
			//setRowCellValueByRowId(rowId, "status", "R");
			//setRowCellValueByRowId(rowId, "isEdit", false);
			
			
			
			//console.log(`onSuccess >> isSuccess:${mutation.isSuccess}, isIdle:${mutation.isIdle}, isPending:${mutation.isPending} `)
		}, 
		onSettled(){
			//console.log(`onSettled >> isSuccess:${mutation.isSuccess}, isIdle:${mutation.isIdle}, isPending:${mutation.isPending} `)
		}, 
		onError(data, variable, context){
			
			//console.log("onError> data:", data);
			//console.log("onError> variable:", variable);
			//console.log("onError> context:", context);
			const rowId = variable.rowId;
			setRowCellValueByRowId(rowId, "status", "R");
			//setRowCellValueByRowId(rowId, "isEdit", false);
			//delete beforeEditRows[rowId];
			
		}
	});
	
	React.useEffect(()=>{

		//console.log("rowDataSource", rowDataSource);
		if(headerDataSource){
			
			//console.log()
			
			let newHeaderDataSource = [];
			const rowIdCell = {
				title: "RID", 
				cell_id: "rowId", 
				type: "number", 
				hidden: true, 
				width: 0,
				align: "", 
				disablePadding: false, 
			}
			
			const editCell = {
				title: "EDIT", 
				cell_id: "isEdit", 
				type: "icon", 
				hidden: false,
				width: 10, 
				align: "center", 
				disablePadding: false,
			}
			
			const statusCell = {
				title: "STATUS",
				cell_id: "status", 
				type: "text",
				hidden: true,
				width: 0,
				align: "",
				disablePadding: false,	 
			}
			
			newHeaderDataSource = [rowIdCell, ...headerDataSource, editCell, statusCell];
			//newHeaderDataSource = [rowIdCell, ...headerDataSource, editCell];
			
			setHeaderData(newHeaderDataSource);
		}
		
		
		
		/* 최초 Row Data에 rowid 및 Row edit 여부 속성값 추가*/
		let newRowDataSource = [];
		if(Array.isArray(rowDataSource)){

			let index = 0;
			newRowDataSource = rowDataSource.map((row)=>{
				
				//Header Cell과 매핑해준다. 헤더컬럼과 순서매핑, 헤더에 없는 컬럼은 제외처리한다. 
				const headerCells = headerDataSource.map(cell => (cell.cell_id));
				
				//console.log("headerCells", headerCells);
				//let reRangedRow = [];
				
				let reRangedRow = headerCells.map(headerCellId => {
					return row.filter(cell => cell.id === headerCellId)[0];
				})
				
				//console.log("reRangedRow", reRangedRow, row);
				//console.log("reRangedRow", reRangedRow);
				//let reRangeRow2 = reRangedRow
				
				const rowData = [{id:'rowId', value:index}, ...reRangedRow, {id:'isEdit', value: false}, {id:'status', value:"R"}];
				//const rowData = [{id:'rowId', value:index}, ...reRangedRow, {id:'isEdit', value: false}];
				index = index + 1;
				return rowData;
			});
			
			//console.log("newRowDataSource", newRowDataSource);
					
			setRowData(newRowDataSource);	 
		} else {
			setRowData([]);
		}

	}, [dataSource])
	
	
	
	
	
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
	
	const isSelected = (rowSeq) => {
		return selectedRows.indexOf(rowSeq) !== -1; 
	}
	
	const handleCheckClick = (event, rowSeq) => {
		
		/*
			C.F) Table Row 객체에서 클릭이벤트시 이벤트 Row의 index 속성값을 useState 객체에 할당하면 
			Table 을 새로 렌더링한다 >> 원래 react는 그런건가? 왜그런가?? 신기하네...!!!!!!!!!!!!
		*/
		
		let newSelectedRows = [];
		if(selectedRows.includes(rowSeq)){
			newSelectedRows = selectedRows.filter(n => n !== rowSeq);	
		} else {
			newSelectedRows = [...selectedRows, rowSeq];
		}
		
		setSelectedRows([...newSelectedRows])
	}
	
	
	
	const onToggleEditRow = (e, row) => {
		setRowCellValue(row, "isEdit", true);
	}
	
	
	const onRestoreEditRow = (e, row) => {
		
		const currRowId = getRowCellValueById(row, "rowId");
		const beforeEditRow = beforeEditRows[currRowId] ? beforeEditRows[currRowId] : [];
		
		setRowData(state => {
			return rowData.map(row=>{
				if(getRowCellValueById(row, "rowId") === currRowId){
					
					let newRow = beforeEditRow.length > 0 ? beforeEditRow : row;
					
					//isEdit 셀속성은 false 재처리
					return newRow.map(cell=>{
						//console.log(cell);
						return (cell.id === "isEdit") ? {id: 'isEdit', value: false} : cell; 
					})
					
				} else {
					return row;
				}
			})
		})
		
		
		delete beforeEditRows[currRowId];
	}
	
	const convertRowToJson = (row) => {
		
		let rowJson = {};
		
		row.map(cell => {
			rowJson[cell.id] = cell.value;
		})
		
		return rowJson;
	}
	
	
	const onSaveEditRow = (e, row) => {
		
		setRowCellValue(row, "status", "U");
		
		const rowJsonData = convertRowToJson(row); 
		//handleSaveRow(rowJsonData);
		
		//console.log("mutate.isPending", mutation.isPending);
		
		rowMutation.mutate(rowJsonData);
		
		console.log("onSaveEditRow: isPending", rowMutation.isPending);
		console.log("onSaveEditRow: isIdle", rowMutation.isIdle);
		
		//const result = mutation.mutateAsync(rowJsonData);
		//result.then(res=>{
			//console.log(res);
		//	console.log("mutation.isPending", mutation.isPending);
		//})
		
		console.log("after mutate: isPending", rowMutation.isPending);
		
		
		
		//edit:false 모드 변경
		/*
		setRowData(state => {
			return rowData.map(row => {
				return row.map(cell=>{
					return (cell.id === "isEdit") ? {id: 'isEdit', value: false} : cell; 
				});
			})
		})
		*/
	}	
	
	
	const getCellAlignFromHeader = (cellId) => {
		const cell = headerData.filter(n=> n.cell_id === cellId);
		return cell.length > 0 ? (cell[0].align === "" ? "center" : cell[0].align) : "center";
	}
	
	const getCellTypeFromHeader = (cellId) => {
		const cell = headerData.filter(n=> n.cell_id === cellId);
		//console.log("getCellType", cellId, cell)
		return cell.length > 0 ? cell[0].type ? cell[0].type : "" : "";
	}
	
	const getCellEditableFromHeader = (cellId) => {
		const cell = headerData.filter(n => n.cell_id === cellId);
		
		//if(cell.length > 0) console.log("cellId", cell[0].editable)
		return cell.length > 0 ? cell[0].editable ? cell[0].editable : false : false;
	}
	
	const getCellHiddenFromHeader = (cellId) => {
		const cell = headerData.filter(cell => cell.cell_id === cellId);
		return cell.length > 0 ? cell[0].hidden ? cell[0].hidden : false : false;
	}
	
	
	const getCellPaddingFromHeader = (cellId) => {
		const cell = headerData.filter(cell => cell.cell_id === cellId);
		return cell.length > 0 ? cell[0].disablePadding ? cell[0].disablePadding : false : false; 
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
	
	//const getCellType = (cellId)
	
	const handleSortTableList = (e, cellId) => {
		const isAsc = orderBy === cellId && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(cellId);
	}
	
	
	const handleCellChange = (e, row, editCell) => {
		const currRowId = getRowCellValueById(row, "rowId");
		
		//console.log(currRowId);
		//console.log("handleCellChange", row);
		//console.log("beforeEditRows", beforeEditRows);
		//beforeEditRows[currRowId]  
		
		if(!beforeEditRows[currRowId]){
			setBeforeEditRows(state => ({...state, [currRowId]: row}));
		}
		
		//setBeforeEditRows(state => ({...state, row}));
		//console.log(editCell.id);
		
		setRowCellValue(row, editCell.id, e.target.value);
		
		
		//변경사항 내용추가 
		//setChangedListData(newRowData);
	}
	
	
	function getRowCellValueById(row, cellId){
		const cell = row.filter(n=> n.id === cellId);
		
		if(cell.length > 0){
			return cell[0].value;
		}
		
		return "";
	}
	
	
	function toggleRowEditModeByRowId(rowId, isEdit){
		const newRowData = rowData.map(row => {
					
					if(rowId === getRowCellValueById(row, "rowId")){
						return row.map(cell => {
							
							if(isEdit){
								if(cell.id === "isEdit"){
									return {id:"isEdit", value:true};
								} else {
									return cell;
								}	
							} else {
								if(cell.id === "isEdit"){
									return {id:"isEdit", value: false}
								} else if(cell.id === "status"){
									return {id:"status", value:'R'}
								} else {
									return cell;
								}
							}
						})	
					} else {return row;} 
				})
				
				delete beforeEditRows[rowId];
				setRowData(newRowData);	
	}
	
	function setRowCellValueByRowId(rowId, cellId, value){
		
		const newRowData = rowData.map(row => {
			
			if(rowId === getRowCellValueById(row, "rowId")){
				return row.map(cell => {
					if(cell.id === cellId){
						console.log("setRowCellValueByRowId", cell, value);
						return {id: cellId, value: value};
					} else {
						return cell;
					}  
				})	
			} else {return row;} 
		})
		
		setRowData(newRowData);
	}
	
	
	
	
	function setRowCellValue(row, cellId, value){
		const currRowId = getRowCellValueById(row, "rowId");
		//console.log("currRowId", currRowId);
		
		const newRowData = rowData.map(
			r => {
				if(getRowCellValueById(r, "rowId") === currRowId){
					//cell update 처리
					return r.map(cell=>{
						if(cell.id === cellId){
							//속성값자체를 변경하니... 새로 랜더링하게 되네.. 신규값으로 바꿔 넣어주니 업데이트안하게 되고... [체크]
							//좀더 테스트 해보니 랜덤하게 재랜더링 되네...
							return {id:cellId, value: value};
						}
						return cell;
					})
					//return r;	//여길 리턴하면 안되고,, r.map 을 리턴 해야되네...
				} else {
					return r;
				}
			}
		);
		
		//console.log("newRowData", newRowData)
		
		//setRowData 를 호출하지 않아도 새로 리스트를 새로 render 하네... 일단 주석처리하고 코딩해보자 [체크]
		setRowData(newRowData);
	}
	
	function getComparator(order, orderBy){
		const descendingOrder = (a, b) => {
			const valueA = getRowCellValueById(a, orderBy);
			const valueB = getRowCellValueById(b, orderBy);
			
			//console.log("descendingOrder", valueA, valueB);
			
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
			
			//console.log("visibleRows", "start");
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
					headerData && (
					<React.Fragment>
						<TableContainer>
							<Table
								size={dense ? 'small' : 'medium'}
								
								/* props ?? (s)*/
								sx={{minWidth: 500}}
								aria-labelledby="tableTitle"
								/* props ?? (e)*/
							>
								<TableListHead headerData={headerData} onSelectAll={handleSelectAll} orderBy={orderBy} order={order} onSortTableList={handleSortTableList}  />
								<TableBody>
									{
										
										visibleRows.length > 0 && visibleRows.map((row, rowIdx)=>{
											
											//console.log("Render Table Body !!!!")
											//console.log("tablebody visibleRows", visibleRows);
											//console.log("table body", idx);
											//console.log("row", row)
											
											const rowId = getRowCellValueById(row, "rowId");
											const labelId = `table-checkbox-${rowIdx}`;
											const rowSeq = getRowCellValueById(row, "seq");
											const isEditRow = getRowCellValueById(row, "isEdit");
											const isSelectedRow = isSelected(rowSeq);
											const status = getRowCellValueById(row, "status");

											//console.log("rowSeq", rowSeq);
											//console.log("editRow", editRow);
											//console.log("isSelectedRow", idx, isSelectedRow);
											console.log("isEditRow", rowId, isEditRow);
											//console.log("status", rowId, status);

											return(
												<TableRow 
													hover 
													key={rowId} 
													//onClick={(e)=>handleRowClick(e, idx)}	//min 일단 셀별로 클릭이벤트 처리해야 할듯... 에디트 모드 처리하려면 전체 ROW에 클릭에 이벤트 주면 안되겠네.. 
													//selected={isSelectedRow}
													sx={{cursor:'pointer'}}
													
													/* props ?? (s) */
													role="checkbox"
													aria-checked={isSelectedRow}
													/* props ?? (e) */
													>
													<TableCell 
														padding="checkbox"
														sx={{
															//border:1
														}}
													>
														<Checkbox
															color="primary" 
															checked={isSelectedRow} 
															inputProps={{
																'aria-labelledby': labelId,
															}}
															onClick={(e)=>handleCheckClick(e, rowSeq)}
															/>
													</TableCell>
													
													{row.map(cell=>{
														
														const cellAlign = getCellAlignFromHeader(cell.id);
														const cellType = getCellTypeFromHeader(cell.id);
														const cellEditable = getCellEditableFromHeader(cell.id);
														const cellHidden = getCellHiddenFromHeader(cell.id);
														const cellPadding = getCellPaddingFromHeader(cell.id);
														 
														
														//console.log("cellPadding", cell.id, cellPadding);
														//console.log(`${cell.id} : ${cellAlign}`)
														//console.log(cell.id, cellType, cellEditable);
														
														return(
															
															(cell.id === 'isEdit') ?
															<TableCell 
																id='edit'
																padding={cellPadding ? "normal" : "none"}
																sx={{
																	//border:1
																}}
															>
																{isEditRow ?
																	<ButtonGroup> 
																		<IconButton onClick={(e)=> onRestoreEditRow(e, row)} >
																			<RestoreIcon/>
																		</IconButton>
																		
																		
																		{status === "U" ? (<Stack spacing={2} direction={"row"} alignItems={"center"}><CircularProgress size={20}/></Stack>) : 
																		(<IconButton onClick={(e)=> onSaveEditRow(e, row)}>
																			<SaveAsOutlinedIcon/>
																		</IconButton>)
																		}
																	</ButtonGroup>
																	 : 
																	<IconButton aria-label="edit" onClick={(e) => onToggleEditRow(e, row)}>
																		<ModeEditOutlineOutlinedIcon/>
																	</IconButton>
																}
																
															</TableCell> 
															: 
															<TableCell
															component="th"
															padding={cellPadding ? "normal" : "none"}
															scope="row"
															id={labelId}
															align="left"
															sx={{
																	display: cellHidden ? "none" : "", 
																	//border: 0,
																}}
															>
															 
															{(isEditRow) ?  cellEditable ? <EditableCell row={row} cell={cell} type={cellType} onCellChange={handleCellChange} /> : cell.value : cell.value}
															
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



function EditableCell(props){
	
	//console.log(rowData);  >> 접근안됨. 
	const {row, cell, type, onCellChange} = props;
	
	if(type === "text"){
		return (<input value={cell.value} onChange={(event)=>onCellChange(event, row, cell)} />
		)
	}
	
	return (<>
		
		</>);
}



function TableListHead(props){
	
	//console.log("TableListHead", "start");
	//console.log(rowData); >> 접근안됨. 
	
	const {headerData, onSelectAll, orderBy, order, onSortTableList} = props;
	
	//console.log("headerData", headerData);
	
	return(
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox onChange={onSelectAll}  />
				</TableCell>
				
				
				{headerData.map(cell=>{
					
				//console.log("cell.width", cell.width)	
				//console.log("cell.disablePadding", cell.disablePadding);
					return(
							<TableCell 
								key={cell.cell_id} 
								align="left" 
								padding={cell.disablePadding ? 'normal':'none'}
								sortDirection={false}
								sx={{
									display: cell.hidden ? "none" : "", 
									//border: 0,
									}}
								width={cell.width}>
									<TableSortLabel  active={orderBy === cell.cell_id} onClick={(e) => onSortTableList(e, cell.cell_id)} direction={orderBy === cell.cell_id ? order : 'asc'} >
										{cell.title}
									</TableSortLabel>
							</TableCell>
						
					)
				})}
				
				{/* Edit Cell */}
				<TableCell padding="normal">
				</TableCell>
			</TableRow>
		</TableHead>
	);
	
	
}

TableListHead.propTypes = {
	headerData: PropTypes.array.isRequired,
	//onSelectAll: PropTypes.func.isRequired, 
}

TableList.propTypes = {
	dataSource: PropTypes.object.isRequired,
	//onSelectAll: PropTypes.func.isRequired,
	//changedListData: PropTypes.array,
	//setChangedListData: PropTypes.func,
	handlInitList: PropTypes.func, 
	handleSaveRow: PropTypes.func,
}


export default TableList;
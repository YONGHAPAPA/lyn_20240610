import { Paper, TableHead, TableRow, Box, TableContainer, Table, TableCell, Checkbox, TableSortLabel, TableBody } from "@mui/material";
import PropTypes from 'prop-types';
import * as React from "react";


const TableList = (props) => {

	/*
		테이블 리스트는 TableContainer > Table > TableHead > TableRow 구조를 포함해서 구성해야 오류 발생안함
	*/	
	const {dataSource, onSelectAll} = props;
	
	console.log(dataSource.headerCellData)
	//console.log(dataSource.rowData)
	//const [headCellData, setHeadCellData] = React.useState(dataSource.headCellData);
	//const [order, setOrder] = React.useState('asc');
	
	//setHeadCellData(dataSource.headerData)
	//console.log("headCellData", headCellData);
	console.log(dataSource.rowData)
	
	//console.log('order >> ', order)
	
	return (
		<Box>
			<Paper>
			
				{
					dataSource.headerCellData && <TableContainer>
					<Table>
						<TableListHead headerCellData={dataSource.headerCellData} onSelectAll={onSelectAll}  />
						<TableBody>
							{
								dataSource.rowData.map(row=>(
									
									
									<TableRow key={row.seq}>
										<TableCell padding="checkbox">
											<Checkbox/>
										</TableCell>
										
										
									</TableRow>
									//console.log(cell.title)
								))
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
	
	const {headerCellData} = props;
	//console.log("headCellData", headerCellData);
	
	return(
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox onChange={props.onSelectAll}  />
				</TableCell>
				
				
				{headerCellData.map(cell=>(
				<TableCell key={cell.id} align="left" padding="normal">
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
	onSelectAll: PropTypes.func.isRequired, 
}

TableList.propTypes = {
	dataSource: PropTypes.object.isRequired,
	onSelectAll: PropTypes.func.isRequired,
}


export default TableList;
import * as React from 'react'
import PropTypes from 'prop-types';
import {alpha, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'

function createData(id, name, caloris, fat, carbs, protein){
	return {
		id, 
		name, 
		caloris,
		fat, 
		carbs, 
		protein,  
	}
}

const rows = [
	createData(1, 'cake', 100, 3.7, 67, 1.3), 
	createData(2, 'cake2', 130, 1.2, 38, 2.7),
	createData(3, 'cake3', 107, 5.9, 17, 5.9),
	createData(4, 'cake4', 110, 2.8, 54, 7.3),
	createData(5, 'cake5', 190, 4.7, 99, 9.1),
	createData(6, 'cake6', 200, 7.9, 6, 8.3),
	
];


const headCells = [
	{
		id: 'name', 
		numeric: false, 
		disablePadding: true, 
		label: 'Dessert (100g)'
	}, 
	{
		id: 'calories', 
		numeric: true, 
		disablePadding: false, 
		label: 'Calories'
	},
	{
		id: 'fat', 
		numeric: true, 
		disablePadding: false, 
		label: 'Fat (g)'
	},
	{
		id: 'carbs', 
		numeric: true, 
		disablePadding: false, 
		label: 'Carbs (g)'
	},
	{
		id: 'protein', 
		numeric: true, 
		disablePadding: false, 
		label: 'Protein (g)'
	},
	
];


function EnhancedTableToolbar(props){
	const {numSelected} = props;
	
	return(
		<Toolbar sx={{
						pl: {sm: 2}, 
						pr: {xs: 1, sm: 1}, 
						...(numSelected > 0 && {
							bgcolor:(theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
						})
					}}
		>
			{numSelected > 0 ? (
				<Typography 
					sx={{flex: '1 1 100%'}}
					color='inherit'
					variant='subtitle2'
					component='div'
				>
					{numSelected} selected</Typography>	
			) : ( 
				<Typography
					sx={{flex: '1 1 100%'}}
					variant='inherit'
					id='tableTitle'
					component='div'
				>Nutrition</Typography>
			)}
			
			{numSelected > 0 ? (
				<Tooltip title='Delete'>
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>		
	);
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


function EnhancedTableHead(props){
	const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};
	
	return(
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox 
						color='primary'
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts'
						}}
					/>
				</TableCell>
				{
					headCells.map((headCell) => (
						<TableCell 
							key={headCell.id} align={headCell.numeric ? 'right' : 'left'} 
							padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : 'asc'}
									onClick={createSortHandler(headCell.id)}
								>
									
									{headCell.label}
									{orderBy === headCell.id ? (
										<Box component="span" >
											{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
										</Box>
									) : null
										
									}
								</TableSortLabel>						
						</TableCell>
					))	
				}
				
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propType = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired, 
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired, 
	orderBy: PropTypes.string.isRequired, 
	rowCount: PropTypes.number.isRequired, 
	
}

 

const SetupUserType = () => {

	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0); 
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowPerPage] = React.useState(10);
	
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc':'asc');
		setOrderBy(property);
	}
	
	const handleSelectAllClick = (event) => {
		if(event.target.checked){
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		
		setSelected([]);
	}
	
	function descendingComparator(a, b, orderBy){
		if(b[orderBy] < a[orderBy]){
			return -1;
		}
		
		if(b[orderBy] > a[orderBy]){
			return 1;
		}
		
		return 0;
			
	}
	
	function getComparator(order, orderBy){
		return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy); 
	}
	
	
	function stableSort(array, comparator) {
		const stablizedThis = array.map((el, index) => [el, index]);
		
		stablizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			
			if(order !==0){
				return order;
			}
			
			return a[1] - b[1];	//이부분은 왜 필요할까??
				
		});
		
		
		return stablizedThis.map((el) => el[0]);
	}
	
	
	const isSelected = (id) => selected.indexOf(id) !== -1;
	
	
	const visibleRows = React.useMemo(()=> 
		stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), 
		[order, orderBy, page, rowsPerPage]
	);
	

	
	const handlClick = (event, id) =>{
		
		console.log(id);
		
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
		
		
		//debugger;
		if(selectedIndex === -1){
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex+1));
		}
		
		console.log("newSelected", newSelected);
		
		
		setSelected(newSelected);
		
		
		console.log("selected", selected)
		
		
	}
	
	
	const handleChangePage = (event, newPage) => {
		
		//debugger;
		console.log("newPage", newPage)
		setPage(newPage);
	}
	
	//console.log(result);;
	
	
	const handleChangeRowsPerPage = (event) => {
		
		//debugger;
		console.log("handleChangeRowsPerPage", event.target.value);
		setRowPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	
	return (
		<>
			<div>
				
				<Box sx={{width: '100%'}}>
					<Paper sx={{width:'100%', mb:2}}>
						<EnhancedTableToolbar numSelected={selected.length} />
						<TableContainer>
							<Table 
								sx={{ minWidth: 550}}
								aria-labelledby='tableTitle'
								size={dense ? 'small':'medium'}
							>
								<EnhancedTableHead 
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={rows.length}
								/>
								
								<TableBody>
									{
										
										visibleRows.map((row, index) => {
											const isItemSelected = isSelected(row.id);
											const labelId = `enhanced-table-checkbox-${index}`;
											
											return(
												<TableRow 
													hover
													onClick={(e) => handlClick(e, row.id)}
													role="checkbox"
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={row.id}
													selected={isItemSelected}
													sx={{cursor: 'pointer'}}
												>
													<TableCell padding='checkbox'>
														<Checkbox 
															color='primary'
															checked={isItemSelected}
															inputProps={{
																'aria-labelledby' : labelId,
															}}
														/>
													</TableCell>
													
													<TableCell
														component="th"
														id={labelId}
														scope='row'
														padding='none'
													>
													{row.name}
													</TableCell>
													
													<TableCell align='right'>{row.calories}</TableCell>
													<TableCell align='right'>{row.fat}</TableCell>
													<TableCell align='right'>{row.carbs}</TableCell>
													<TableCell align='right'>{row.protein}</TableCell>
													
												</TableRow>
											);
										})
									}
								</TableBody>
							</Table>
						</TableContainer>
						
						<TablePagination 
							rowsPerPageOptions={[2, 3, 4]}
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
					<FormControlLabel 
						control={<Switch checked={dense} />}
						label="Dense padding"
					/>
				</Box>
			</div>
		</>
	);
}


export default SetupUserType;
import * as React from 'react'
import PropTypes from 'prop-types';
import {alpha, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import {visuallyHidden} from '@mui/utils'
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
	createData(1, 'cake2', 130, 1.2, 38, 2.7),
	createData(1, 'cake3', 107, 5.9, 17, 5.9),
	createData(1, 'cake4', 110, 2.8, 54, 7.3),
	createData(1, 'cake5', 190, 4.7, 99, 9.1),
	createData(1, 'cake6', 200, 7.9, 6, 8.3),
	
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
					variant='h7'
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
										<Box component="span" sx={visuallyHidden}>
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
	const [rowsPerPage, setRowPerPage] = React.useState(5);
	
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

	
	return (
		<>
			<div>
				
				<Box sx={{width: '100%'}}>
					<Paper sx={{width:'100%', mb:2}}>
						<EnhancedTableToolbar numSelected={selected.length} />
						<TableContainer>
							<Table 
								sx={{ minWidth: 750}}
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
							</Table>
						</TableContainer>
					</Paper>
				</Box>
			</div>
		</>
	);
}


export default SetupUserType;
import React, { useState, useEffect, useMemo } from 'react';

// component
import Iconify from '@components/iconify';
import CommonGridSearchFrame from './CommonGridSearchFrame';

// library
import { produce } from 'immer';
import { DataGrid, GridPagination } from '@mui/x-data-grid';
import { Card, Popover, MenuItem, IconButton, Container, Grid, Box } from '@mui/material';
import { COMMON_GRID_INIT_PAGINATION_INFO } from '@/utils/pageCommonUtil';
import { useTheme } from '@mui/material/styles';

const customFooterStyle = {
  borderTop: '1px solid #F1F3F4',
  paddingTop: '0px',
};

/**
 * @param columns( [] ) : 그리드 컬럼 리스트
 * @param getRowId (function) : 행의 식별자 ex : {row => row.id}
 * @param rows( [] ) : 그리드 데이터 리스트
 * @param totalRowCount( number ) : 검색시 전체 데이터 카운트
 * @param condition( { searchParam:{}, pagination:{} } ) : 검색조건
 * @param setCondition( { searchParam:{}, pagination:{} } ) : 검색조건 state
 * @param children( jsx ) : 버튼 영역
 */
const CommonDataGrid = ({ onSortModelChange, columns, getRowId, rows = [], totalRowCount = 0, condition, setCondition, children }) => {
	const [rowCountState, setRowCountState] = useState(0);
	const theme = useTheme();

	useMemo(() => {
    setRowCountState(totalRowCount);
	}, [totalRowCount])

	const pageChange = (newPageModel) => {
		const newCondition = produce(condition, (draft) => {
			draft.searchParam.page = newPageModel.page;
			draft.searchParam.size = newPageModel.pageSize;
			draft.pagination = newPageModel;
		});
		setCondition(newCondition); 
	}
	
	/**
   * 컬럼 간 정렬 flex
   */
	const refineColumns = columns.map(column => ({ ...column, flex: column.width == null ? 1 : null })); 
	
	const CustomFooterComponent = (props) => {
		return (
			<Grid container spacing={2}> 
				<Grid item xs={4}  style={customFooterStyle}>
					<Box sx={{ p: 2}}>
					{children}
					</Box>
				</Grid>
				<Grid item xs={8}  style={customFooterStyle}>
					<GridPagination/>
				</Grid>
			</Grid>
		);
	}

	const customGetRowId = (row) => {
		console.log("getRowId ::: ", getRowId);
		console.log("row :::", row);
		return row.id
	}

	return (
	<>
		<Card>
		<DataGrid
			onSortModelChange={onSortModelChange}
			autoHeight={false}
			rows={rows}
			columns={refineColumns}
			getRowId={customGetRowId} 
			rowCount={rowCountState}
			paginationMode="server"
			paginationModel={condition.pagination}
			onPaginationModelChange={pageChange}
			pageSizeOptions={[10, 25, 50, 100]}
			slots={{footer: CustomFooterComponent}}
			sx={{			
			'&.MuiDataGrid-root': {
				border: 'none',
				width: '100%',
				'& a': {
					color:theme.palette.text.color,
				}, 
				'& .MuiDataGrid-columnHeaders': {
					background:theme.palette.background.dataGridBack,
					borderRadius: 0,
					'& .MuiDataGrid-columnHeader:last-child': {
						'& .MuiDataGrid-columnSeparator svg path': {
						display: 'none',
						},
					},
				},
				'& .MuiDataGrid-virtualScroller': {      
					height: 'calc(100vh - 368px)',
					minHeight:'400px',
				},
				'& .MuiGrid-container': {
					mt: 0,
				},
			},
			}}
		/>
		</Card>
	</>
	);
};

export default CommonDataGrid;

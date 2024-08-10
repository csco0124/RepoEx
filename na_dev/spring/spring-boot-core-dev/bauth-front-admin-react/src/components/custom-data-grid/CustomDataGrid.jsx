import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

// ----------------------------------------------------------------------



const CustomDataGrid = styled(DataGrid)(({theme}) => ({
  '&.MuiDataGrid-root': {
    border: 'none',
    width: '100%',
    '& .MuiDataGrid-columnHeaders': {
      background: '#F1F3F4',
      borderRadius: 0,
      '& .MuiDataGrid-columnHeader:last-child': {
        '& .MuiDataGrid-columnSeparator svg path': {
          display: 'none',
        },
      },
    },
    '& .MuiDataGrid-virtualScroller': {      
      height: '520px',
    },
  }
}));
export default CustomDataGrid;

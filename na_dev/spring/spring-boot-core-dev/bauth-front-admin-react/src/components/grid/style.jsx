import { DataGrid } from '@mui/x-data-grid';
import { styled, useTheme } from '@mui/material/styles';

export const StyledDataGrid = styled(DataGrid)(() => {
  const theme = useTheme();

  return {
    '&.MuiDataGrid-root': {
			border: 'none',
			width: '100%',

		  '& a': {
				color: theme.palette.text.color,
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
      }
    },
  }
})
 
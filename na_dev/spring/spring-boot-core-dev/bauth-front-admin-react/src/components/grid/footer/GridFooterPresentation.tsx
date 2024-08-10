// mui
import { Box } from '@mui/material';
import { GridPagination } from '@mui/x-data-grid';

// type
import type { GridFooterProps } from './interface';

// style
import { StyledGridFooter } from './style';

const GridFooterPresentation = (props: GridFooterProps) => {
  
  return (
    <>
      <StyledGridFooter container spacing={2}>

        <StyledGridFooter item xs={4}>
          <Box sx={{ p: 2 }}>
            {props.children} {/* 추가적으로 삽입할 element를 props로 받음 */}
          </Box>
        </StyledGridFooter>

        <StyledGridFooter item xs={8}>
          <GridPagination />
        </StyledGridFooter>
        
      </StyledGridFooter>
    </>
  );
};

export default GridFooterPresentation;
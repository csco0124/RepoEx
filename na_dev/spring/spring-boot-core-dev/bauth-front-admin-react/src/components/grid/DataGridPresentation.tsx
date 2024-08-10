// mui
import { Card } from '@mui/material';
// style
import { StyledDataGrid } from './style';
// components
import { NaruGridFooter } from './footer';
// interface
import { NaruDataGridProps } from './interface';

const DataGridPresentation = (props: NaruDataGridProps) => {

  const { columns, rows, getRowId, rowCount, paginationModel, pageChange, children} = props;
  
  const paginationMode = "server" // client | server
  const pageSizeOptions = [10, 25, 50, 100];

  return (
    <>
      <Card>
        <StyledDataGrid
          autoHeight={false}
          columns={columns}
          rows={rows}
          getRowId={getRowId}
          rowCount={rowCount}
          paginationMode={paginationMode}
          paginationModel={paginationModel}
          onPaginationModelChange={pageChange}
          pageSizeOptions={pageSizeOptions}
          slots={{
            footer: NaruGridFooter
          }}
          slotProps={{
            footer: { children }
          }}
        />
      </Card>
    </>
  );
};

export default DataGridPresentation;
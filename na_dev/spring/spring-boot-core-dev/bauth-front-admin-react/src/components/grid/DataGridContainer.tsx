// components
import DataGridPresentation from './DataGridPresentation';
// interface
import { DataGridContainer } from './interface';

const DataGridContainer = (props: DataGridContainer) => {
  const { columns } = props;
  const refineColumns = columns.map(column => ({ ...column, flex: column.width == null ? 1 : null }));

  return (
    <>
      <DataGridPresentation
        columns={refineColumns}
        rows={props.rows}
        getRowId={props.getRowId}
        rowCount={props.rowCount}
        paginationModel={props.pagination}
        children={props.footer}
      />
    </>
  );
};
  
export default DataGridContainer;

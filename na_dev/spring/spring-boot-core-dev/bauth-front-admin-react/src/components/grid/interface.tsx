import type { GridFooterProps } from '@components/grid/footer/interface';
import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import type { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';

export interface DataGridContainer extends DataGridProps {
  columns: GridColDef<any>[];
  footer: GridFooterProps;
}

  
export interface NodeModel {
  id: string | number;
  parent: number | string;
  droppable?: boolean;
  ord?: number;
  url?: string;
  path?: string;
  text: string;
  icon?: string;
};

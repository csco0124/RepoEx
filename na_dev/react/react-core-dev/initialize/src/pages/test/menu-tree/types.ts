export interface CustomData {
  fileType: string;
  fileSize: string;
};

export interface NodeModel<T = unknown> {
  id: string;
  parent: number | string;
  droppable?: boolean;
  ord?: number;
  url?: string;
  text: string;
  data?: T;
};

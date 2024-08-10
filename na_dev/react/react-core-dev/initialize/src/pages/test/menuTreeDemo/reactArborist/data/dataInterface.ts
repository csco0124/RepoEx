export interface menuTreeItem {
  id: string;
  name: string;
  children: menuTreeItem[];
  url?: string;
  dep?: number;
}
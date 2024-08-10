export type menuTreeItem = {
  id: string;
  name: string;
  oder: string;
  children: menuTreeItem[];
  url?: string;
  dep?: number;
  icon?: string;
}
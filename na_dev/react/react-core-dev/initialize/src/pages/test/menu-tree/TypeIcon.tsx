import React from "react";
import FolderIcon from "./menu-icons/FolderIcon";
import ImageIcon from "./menu-icons/ImageIcon";
import CsvIcon from "./menu-icons/CsvIcon";
import TextIcon from "./menu-icons/TextIcon";

interface Props {
  droppable?: boolean;
  fileType?: string;
};

export const TypeIcon: React.FC<Props> = (props) => {
  if (props.droppable) {
    return  <FolderIcon />;
  }

  switch (props.fileType) {
    case "image":
      return <ImageIcon />;
    case "csv":
      return <CsvIcon /> ;
    case "text":
      return <TextIcon />; 
    default:
      return null;
  }
};

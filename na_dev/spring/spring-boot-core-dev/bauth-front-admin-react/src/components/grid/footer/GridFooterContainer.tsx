// components
import GridFooterPresentation from "./GridFooterPresentation"

// type
import type { GridFooterProps } from "./interface";

const GridFooterContainer = (props: GridFooterProps)=> {
  
  return (
    <GridFooterPresentation children={props.children}></GridFooterPresentation>
  )
  
}

export default GridFooterContainer;
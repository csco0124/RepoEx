import { StackProps } from "@mui/material";
import StyledSearchItem from "./style";

const SearchItem = (props: StackProps) => {
  return (
    <>
      <StyledSearchItem>
        {props.children}
      </StyledSearchItem>
    </>
  )
}

export default SearchItem;
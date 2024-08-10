import { IconButton, Tooltip, AppBar } from "@mui/material";
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { header } from './BarGoBackStyle'

// interface Props {
//   readonly label: string;
//   readonly onClick: () => void;
// }

/** 뒤로가기 버튼이 있는 상단 nav bar */
export const AppBarGoBack = (props: any) => {
    const prevBtnClickEvent = () => {
        if (!!props.movePage) {
            props.movePage();
            return;
        }

        history.back();
    }
    return (
        <AppBar
            color="default"
            elevation={0}
            sx={header}>
            <Tooltip title="이전페이지">
                <IconButton onClick={prevBtnClickEvent}>
                    <ChevronLeft/>
                </IconButton>
            </Tooltip>
        </AppBar>
    )
};

export default AppBarGoBack;
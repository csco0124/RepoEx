import { Typography, Stack, Box, Button, TextField, Fab } from "@mui/material";
import { btnModal } from "@/components/popupStyle";
import { mt } from "date-fns/locale";
//modal sample
//모달의 공통 props는 onClose 임(모달에게 close를 위임하기 위함)
const ClientRoleModal = (props) => {

  return (
      <Stack>
        <Box>
          <TextField
            label="RoleName"
            value={""}
            />
          <Button variant="contained" sx={{height:"56px"}} onClick={props.onClose}>추가</Button>
          
          
          <Box sx={{mt:"10px"}}>
            <Fab variant="extended" size="medium">sssssss</Fab>
          </Box>
        
        </Box>
        <Stack sx={btnModal}>
          <Button variant="outlined" color="warning" onClick={props.onClose}>취소</Button>
          <Button variant="contained" color="warning" onClick={props.onClose}>확인</Button>
        </Stack>
      </Stack>
  )
}

export { ClientRoleModal };
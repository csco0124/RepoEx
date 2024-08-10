import { Stack, Box, Button } from '@mui/material';
import { btnModal } from '@/components/popupStyle';
//모달의 공통 props는 onClose 임(모달에게 close를 위임하기 위함)
const UserModal = props => {
  return (
    <Stack>
      <Box>
        <h2>{props.message || ''}</h2>
      </Box>
      <Stack sx={btnModal}>
        <Button variant="outlined" color="warning" onClick={props.onClose}>
          취소
        </Button>
        <Button variant="contained" color="warning" onClick={props.onClose}>
          확인
        </Button>
      </Stack>
    </Stack>
  );
};

export { UserModal };

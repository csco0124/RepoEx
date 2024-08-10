import { AlertProps } from "@components/alert/AlertContext";
import { Box, Stack, Button, Alert, Modal } from '@mui/material';
import { altStyle, btnAlt } from "@components/popupStyle";

const AlertContent = (props : AlertProps) => {
  const messageLines = props.message.split('\n');
  return (
    <Modal
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={altStyle}>
        <Alert variant="filled" severity={props.alertType}>
          {messageLines}
        </Alert>
        <Stack sx={btnAlt}>
          <Button variant="contained" onClick={props.onClose}>확인</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default AlertContent;

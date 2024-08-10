import { AlertProps } from "@components/alert/AlertContext";
import { Box, Stack, Button, Alert, Modal } from '@mui/material';
import { altStyle, btnAlt } from "../popupStyle";

const AlertContent = (props : AlertProps) => {
  const messageLines = props.message.trim().split('\n');
  return (
    <Modal
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={altStyle}>
        <Alert variant="filled" severity={props.alertType}>
          {messageLines.map((line, i) => <span key={i}>{line} {messageLines.length > 1 ? <br/> : ''}</span>)}
        </Alert>
        <Stack sx={btnAlt}>
          <Button variant="contained" color="warning" onClick={props.onClose}>확인</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default AlertContent;

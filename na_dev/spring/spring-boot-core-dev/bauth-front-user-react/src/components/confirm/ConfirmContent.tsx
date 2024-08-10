import { ConfirmProps } from "@components/confirm/ConfirmContext";
import { Box, Stack, Button, Alert, Modal } from '@mui/material';
import { confirm, btnAlt } from "../popupStyle";
const ConfirmContent = (props : ConfirmProps) => {
  
  return (
    <Modal
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={confirm}>
        <Alert variant="filled">
        {props.message}
        </Alert>
        <Stack sx={btnAlt}>
            <Button variant="outlined" color="warning" onClick={props.onCancel}>{props.noText}</Button>
            <Button variant="contained" color="warning" onClick={props.onConfirm}>{props.yesText}</Button>
        </Stack>
      </Box>
    </Modal>
      // <div className="modal-dialog">
      //   <div className="modal-content">
      //     <div className="modal-body"><p className="text-info fs-6">{props.message}</p>
      //     </div>
      //     <div className="modal-footer">
      //       <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal" onClick={props.onCancel}>{props.noText}</button>
      //       <button type="button" className="btn btn-sm btn-primary" onClick={props.onConfirm}>{props.yesText}</button>
      //     </div>
      //   </div>
      // </div>
  )
}

export default ConfirmContent;
import { Stack, Box, Button, TextField } from '@mui/material';
import { btnModal } from '@/components/popupStyle';
import React, { useState } from 'react';
import { useAlert } from '@/hooks/useAlert';
import { $axios } from '@/configs/axios/axiosConfig';

const CreateRoleModal = props => {
  const { Alert, AlertWarn, AlertError } = useAlert();
  const [authority, setAuthority] = useState('');

  const closeModal = () => {
    props.onClose();
  };

  const getRoleList = () => {
    props.callback();
  };

  const createRole = async () => {
    if (!!!validateCreateRole()) return;

    const res = await $axios.post(`/private/api/role/${authority}`, '', { isSkipLoading: true });

    if (res.data.error === 'MSG') {
      AlertError(res.data.message);
      return;
    }

    getRoleList();
    closeModal();
  };

  const validateCreateRole = () => {
    // TODO: validation
    if (authority === '') {
      Alert('Role Name을 입력해 주세요.');
      return false;
    }

    return true;
  };

  return (
    <Stack>
      <Box>
        <TextField
          label="Role Name"
          size="small"
          fullWidth
          value={authority}
          onChange={e => {
            setAuthority(e.target.value);
          }}
        />
      </Box>
      <Stack sx={btnModal}>
        <Button variant="outlined" onClick={closeModal}>
          취소
        </Button>
        <Button variant="contained" onClick={createRole}>
          확인
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreateRoleModal;

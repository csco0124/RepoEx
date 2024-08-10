import React, { useState } from 'react';
import axios from 'axios';
import { Stack, Box, Button, Switch, Grid, Chip } from '@mui/material';
import { btnModal } from '@/components/popupStyle';
import * as Icons from '@mui/icons-material';

const UserModal = ({ allAuthorities, clientData, userId, ...props }) => {
  // `activeAuthorities,activeClientAuthorities`는 각 권한의 활성화 여부를 나타내는 상태
  // 사용자가 가진 `authorities`를 기반으로 초기화하며, 해당 권한이 있으면 스위치는 켜진 상태로 표시
  const [activeUserAuthorities, setActiveUserAuthorities] = useState(
    (props.authorities || []).reduce((acc, authority) => {
      acc[authority] = true;
      return acc;
    }, {}),
  );

  const [activeClientAuthorities, setActiveClientAuthorities] = useState(
    (props.clientAuthorities || []).reduce((acc, authority) => {
      acc[authority] = true;
      return acc;
    }, {}),
  );

  // 권한에 해당하는 스위치의 상태를 변경할 때 호출
  const handleUserAuthoritySwitchChange = (authority, event) => {
    setActiveUserAuthorities(prev => ({ ...prev, [authority]: event.target.checked }));
  };

  const handleClientAuthoritySwitchChange = (authority, event) => {
    setActiveClientAuthorities(prev => ({ ...prev, [authority]: event.target.checked }));
  };

  //권한 리스트, 클라이언트 권한리스트 선언
  const authorityList = props.authorities;
  const clientAuthorityList = clientData.flatMap(client => client.authority);

  const updateAuthority = async () => {
    const authorities = Object.keys(activeUserAuthorities).filter(auth => activeUserAuthorities[auth]);
    try {
      const data = {
        authority: authorities,
        userId: userId,
      };
      const response = await axios.post('/private/api/admin/authority/user/list', data);
      console.log('User authority updated 성공', data);
    } catch (error) {
      console.error('User authority updated 실패:::', error);
    }
  };

  const updateClientAuthority = async () => {
    const clientAuthorities = Object.keys(activeClientAuthorities).filter(auth => activeClientAuthorities[auth]);
    try {
      const data = {
        authority: clientAuthorities,
        userId: userId,
      };
      const response = await axios.post('/private/api/admin/client-authority/user/list', data);
      console.log('User client authority updated 성공', data);
    } catch (error) {
      console.error('User client authority updated 실패:::', error);
    }
  };

  const handleConfirm = async () => {
    await updateAuthority();
    await updateClientAuthority();
    props.mutate(); // 확인 후 갱신
    props.onClose(); // 모달 닫기
  };

  return (
    <Stack spacing={0}>
      {/* 사용자의 닉네임과 그에 해당하는 권한을 표시 */}
      <Box display="grid" alignItems="center">
        <h2>{props.nickname || ''}</h2>
        <Grid container spacing={2}>
          {allAuthorities.map((authObj, index) => (
            <Grid item xs={6} key={index}>
              <Box display="flex" alignItems="center">
                <span>{authObj.authority}</span>
                <Switch
                  checked={activeUserAuthorities[authObj.authority] || false}
                  onChange={event => handleUserAuthoritySwitchChange(authObj.authority, event)}
                  name={authObj.authority}
                  color="primary"
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* 클라이언트 이름과 해당하는 권한을 표시  */}
        <Grid container spacing={2}>
          <Grid item xs={6} mt={2}>
            <Chip label="clientName" variant="outlined" color="primary" />
          </Grid>
          <Grid item xs={6} mt={2}>
            <Chip label="authority" variant="outlined" color="primary" />
          </Grid>
          {clientData.map((client, idx) => (
            <React.Fragment key={client.id}>
              <Grid
                item
                xs={6}
                style={{
                  borderBottom: idx === clientData.length - 1 ? 'none' : '1px solid #e0e0e0',
                  paddingBottom: '10px',
                }}>
                <span>{client.clientName}</span>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  borderBottom: idx === clientData.length - 1 ? 'none' : '1px solid #e0e0e0',
                  paddingBottom: '10px',
                }}>
                <Box display="flex" flexDirection="column" alignItems="start">
                  {client.authority.length === 0 ? (
                    <Icons.Close color="error" />
                  ) : (
                    client.authority.map((auth, index) => (
                      <Box key={index} display="flex" alignItems="center" marginBottom={1}>
                        <span style={{ marginRight: '5px' }}>{auth}</span>
                        <Switch
                          checked={activeClientAuthorities[auth] || false}
                          onChange={event => handleClientAuthoritySwitchChange(auth, event)}
                          name={auth}
                          color="primary"
                        />
                      </Box>
                    ))
                  )}
                </Box>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
      <Stack sx={btnModal}>
        <Button variant="outlined" color="primary" onClick={props.onClose}>
          취소
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          확인
        </Button>
      </Stack>
    </Stack>
  );
};

export { UserModal };

import { useState, useEffect } from 'react';

// component
import { $axios } from '@/configs/axios/axiosConfig';
import Iconify from '@components/iconify';

//library
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Card, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { parseJSON } from 'date-fns';

const LoginConfig = () => {
  const [emailUseStatus, setEmailUseStatus] = useState(true); // email 로그인 수단 사용 여부
  const [authUseStatus, setAuthUseStatus] = useState(true); // 간편(생체)인증 로그인 수단 사용 여부
  const [kakaoUseStatus, setKakaoUseStatus] = useState(true); // kakao 로그인 수단 사용 여부
  const [naverUseStatus, setNaverUseStatus] = useState(true); // naver 로그인 수단 사용 여부
  const [googleUseStatus, setGoogleUseStatus] = useState(true); // google 로그인 수단 사용 여부
  const [editMode, setEditMode] = useState(false); // 편집모드 on/off

  /**
   * 렌더링 시 최초 함수 실행
   */
  useEffect(() => {
    loginMethodGet();
  }, []);

  /**
   * 편집 모드 on/off
   */
  const editStatus =  () => setEditMode(!editMode);

  /**
   * 이전에 설정된 로그인 수단 렌더링 시 적용
   */
  const loginMethodGet = async () => {
    let res = await $axios.get('/private/api/admin/config');
    let resData = res.data.data[0]
    let configValue = JSON.parse(resData.configValue);
    setEmailUseStatus(configValue.email);
    setAuthUseStatus(configValue.webauthn);
    setKakaoUseStatus(configValue.kakao);
    setNaverUseStatus(configValue.naver);
    setGoogleUseStatus(configValue.google);
  }

  /**
   * 로그인 수단 value 값 변경
   */
  const emailLoginOnOff = () => setEmailUseStatus(!emailUseStatus);
  const authLoginOnOff = () => setAuthUseStatus(!authUseStatus);
  const kakaoLoginOnOff = () => setKakaoUseStatus(!kakaoUseStatus);
  const naverLoginOnOff = () => setNaverUseStatus(!naverUseStatus);
  const googleLoginOnOff = () => setGoogleUseStatus(!googleUseStatus);

  /**
   * 사용하는 로그인 수단 저장
   */
  const settingNowStatus = async () => {
    let configValArr = {
      email: emailUseStatus , 
      webauthn: authUseStatus , 
      kakao: kakaoUseStatus , 
      naver: naverUseStatus , 
      google:googleUseStatus
    }
    let data = {
      configKey : 'login_config',
      configValue : `${JSON.stringify(configValArr)}`  
    }
    let res = await $axios.post('/private/api/admin/config' , data);
    if(res.status === 200) setEditMode(!editMode);
  }

  return (
    <Card style={{ padding: 100 , textAlign: 'center' }}>
      <Typography variant="h5" >
        제어 설정
        <Button variant="warning" onClick={editStatus} sx={{ mb: 0.5 }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
        </Button>
      </Typography>
      <Grid>
        <Grid>
          <FormControlLabel
            control={<Switch disabled={!editMode} checked={emailUseStatus} onChange={emailLoginOnOff} />}
            label="이메일 로그인"
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={<Switch disabled={!editMode} checked={authUseStatus} onChange={authLoginOnOff} />}
            label="간편인증 로그인"
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={<Switch disabled={!editMode} checked={kakaoUseStatus} onChange={kakaoLoginOnOff} />}
            label="카카오 로그인"
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={<Switch disabled={!editMode} checked={naverUseStatus} onChange={naverLoginOnOff} />}
            label="네이버 로그인"
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={<Switch disabled={!editMode} checked={googleUseStatus} onChange={googleLoginOnOff} />}
            label="구글 로그인"
          />
        </Grid>
      </Grid>
      <Button variant="outlined" disabled={!editMode} onClick={settingNowStatus} sx={{ mt: 2, ml: 0.5 }}>
        저장
      </Button>
    </Card>
  );
};

export default LoginConfig;
 
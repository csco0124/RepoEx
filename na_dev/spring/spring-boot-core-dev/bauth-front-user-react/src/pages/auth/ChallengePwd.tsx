import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { $axios } from "@configs/axiosConfig";
import { Button, Typography, Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useAlert } from "@hooks/useAlert";
import AppBarGoBack from "@/components/AppBarGoBack";
import { authPath } from "@routes/paths";
import { content, title, btnSubmit } from '@pages/auth/authStyle'
import { isEmpty, removeCookie } from "@/utils/commonUtil";

const PWD_HELPER_TEXT = '비밀번호를 확인 해 주세요.';

const ChallengePwd = () => {
  const {Alert} = useAlert();
  const navigate = useNavigate();
  
  const identifier = sessionStorage.getItem('identifier') || '{}';
  const email = JSON.parse(identifier).email;

  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [badcredential, setBadcredential] = useState(false);

  const onSubmitHandler = (event : any) => {
    event.preventDefault();

    if (!password) {
      setValidPassword(false);
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    if(!isEmpty(rememberMe)){
      formData.append('remember-me', rememberMe);
    }

    $axios.post('/login', formData, {isSkipError: true})
      .then(res => {
        if (res.data.error === 'OK') {
          localStorage.setItem('email', email);
          removeCookie('webauthnEmail');
          if (res.data.data.authorities[0] && res.data.data.authorities[0].authority == "ROLE_PRE_AUTH") {
            Alert('challengeTotp 로 이동 TODO')
						//location.href = "/private/view/auth/challengeTotp";
					} else {
            //sessionStorage.setItem("identifier", JSON.stringify(res.data.data));
            location.href = res.data.data.targetUrl;
          }
        } else {
          setValidPassword(false);
        }
      })
      .catch(err => {
        setValidPassword(false);
        if (err.response.data.error === 'LOCKED') {
          Alert('로그인 불가 안내\n해당 계정은 퇴사 처리되었습니다.\n로그인하시려면 관리자에게 문의해 주세요.');
        }
        
        if (err.response.data.error === 'BADCREDENTIAL') {
          setBadcredential(true);
        }
    });
}

const rememberMeChange = (e:ChangeEvent<HTMLInputElement>) => {
  if(e.target == null){
    return;
  }
  
  if(e.target.checked){
    setRememberMe(e.target.value);
  }else{
    setRememberMe('');
  }
}

  return (
    <>
    <AppBarGoBack/>
    <Box sx={content}>
      <Box>
        <Typography variant="h3" sx={title}>
          비밀번호를 <br />입력해 주세요. 
        </Typography>
        <TextField fullWidth label={email} variant="outlined" color="warning" margin="normal" disabled/>
        <TextField fullWidth label="비밀번호" variant="outlined" color="warning" margin="normal" type="password"
          helperText={!validPassword && PWD_HELPER_TEXT}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmitHandler(e)}
        />
        
        {!!badcredential &&
          <Link to={authPath('/findPassword')}>
            비밀번호를 잊으셨나요?
          </Link>
        }
        <br/>
        <FormControlLabel
          control={<Checkbox sx={{width: 25, height: 25}} onChange={e => rememberMeChange(e)}/>}
          label={<Typography sx={{fontSize: '12px'}}>자동 로그인</Typography>}
          labelPlacement="start"
          sx={{margin: 0}}
        />
      </Box>
      <Box>
        <Box>
          <Button fullWidth variant="contained" size="large" color="warning" sx={btnSubmit} onClick={onSubmitHandler}>
            확인
          </Button>
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default ChallengePwd;
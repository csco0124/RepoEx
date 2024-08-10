import { useNavigate } from "react-router";
import { $axios } from "@/configs/axiosConfig";
import { Button, Typography, Box, TextField } from "@mui/material";
import AppBarGoBack from "@/components/AppBarGoBack";
import { useAlert } from "@hooks/useAlert";
import { content, title, btnSubmit } from '@pages/auth/authStyle'
import { authPath } from "@routes/paths";

const FindPassword = () => {
  const {Alert, AlertError} = useAlert();
  const navigate = useNavigate();

  const identifier = sessionStorage.getItem('identifier') || '{}';
  const email = JSON.parse(identifier).email;

  const onSubmitHandler = () => {
    $axios.post('/public/api/findPassword', null, {params: {email}, isSkipError: true})
      .then((res: any) => {
        Alert({
          message:`${email}으로 비밀번호 재설정 이메일을 발송하였습니다.`,
          onClose: () => navigate(authPath('/identifier'))
        });
      }).catch((err : any) => {
        AlertError({
          message: '비밀번호 재설정 이메일 발송에 실패하였습니다.', 
          onClose: () => navigate(authPath('/identifier'))
        });
        
      });
  }
  return (
    <>
    <AppBarGoBack/>
    <Box sx={content}>
      <Box>
        <Typography variant="h3" sx={title}>
          비밀번호 재설정 받으실 <br />계정 이메일입니다.
        </Typography>
        <TextField fullWidth label={'이메일'} variant="outlined" color="warning" margin="normal" value={email} disabled/>
      </Box>
      <Box>
        <Box>
          <Button fullWidth variant="contained" size="large" color="warning" sx={btnSubmit} onClick={onSubmitHandler}>
            비밀번호 찾기
          </Button>
        </Box>
      </Box>
    </Box>
    </>
  ) 
}

export default FindPassword;
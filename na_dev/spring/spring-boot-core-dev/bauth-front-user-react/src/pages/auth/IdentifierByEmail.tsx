import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authPath } from "@routes/paths";
import { $axios } from "@configs/axiosConfig";
import { isEmail } from "@utils/commonUtil";
import { Button, Typography, Box, TextField } from "@mui/material";

import AppBarGoBack from "@/components/AppBarGoBack";

import { content, title, btnSubmit } from '@pages/auth/authStyle'

const EMAIL_HELPER_TEXT = '이메일을 확인 해 주세요.';

const IdentifierByEmail = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);

  const accountlookup = () => {
    if (!email || !isEmail(email)) {
      setValidEmail(false);
      return;
    }

    $axios.post('/public/api/accountlookup', {email})
      .then(res => {
        if (res.data.error === 'OK') {
          sessionStorage.setItem("identifier", JSON.stringify(res.data.data));
          navigate(authPath('/challengePwd'));
        } else {
          setValidEmail(false);
        }
    });
  }

  const handleEmail = (value: string) => {
    setEmail(value);
    setValidEmail(!!value && isEmail(value));
  }

  return (
    <>
    <AppBarGoBack/>
    <Box sx={content}>
      <Box>
        <Typography variant="h3" sx={title}>
          이메일을 <br />입력해 주세요.
        </Typography>
        <TextField fullWidth label="이메일" variant="outlined" color="warning" margin="normal"
            value={email}
            onChange={e => handleEmail(e.target.value)}
            helperText={!validEmail && EMAIL_HELPER_TEXT}
            onKeyDown={(e) => e.key === 'Enter' && accountlookup()}
        />
      </Box>
      <Box>
        <Box>
          <Button fullWidth variant="contained" size="large" color="warning" sx={btnSubmit} onClick={accountlookup}>
            다음
          </Button>
        </Box>
      </Box>
    </Box>
  </>
  );
}

export default IdentifierByEmail;
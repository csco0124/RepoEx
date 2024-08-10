
import React, { useEffect, useState } from 'react'
import AppBarGoBack from '@components/AppBarGoBack';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { content, title, btnSubmit } from './authStyle'
import { $axios } from '@configs/axiosConfig';
import { useAlert } from '@hooks/useAlert';
import { authPath } from '@routes/paths';
import { getUrlParam, isLocal } from '@utils/commonUtil';
import { PasswordValidField } from '@components/PasswordValidField';
import base64url from 'base64url';

export interface Password {
  value: string;
  isValid: boolean;
  onFocused: boolean;
}

const initialPassword: Password = {
  value: '',
  isValid: false,
  onFocused: false,
}

const NOT_SAME_PASSWORD_MESSAGE = '비밀번호가 일치하지 않습니다.';
const PASSWORD_CONFIRM_MESSAGE = '비밀번호를 확인 해 주세요.';

const ResetPassword = () => {
  const [password, setPassword] = useState<Password>({...initialPassword});
  const [passwordConfirm, setPasswordConfirm] = useState<Password>({...initialPassword});
  
  const email = getUrlParam('email');

  const { Alert, AlertError } = useAlert();

  useEffect(() => {
    initValid();  
  },[]);

  const initValid = () => {
    if (!isLocal() && email === null) {
      AlertError({
        message : `잘못된 경로로 접근 하였습니다. 
        로그인 화면으로 이동합니다.`,
        onClose: () => location.replace(authPath('/identifier'))  
      });
      return;
    }
  }

  const passwordChangeHandler = (value: string, setPasswordState: React.Dispatch<React.SetStateAction<Password>>) => {
    setPasswordState((prev: Password) => ({ ...prev, value }));
  }

  const passwordFocusHandler = (setPasswordState: React.Dispatch<React.SetStateAction<Password>>) => {
    setPasswordState((prev: Password) => ({...prev, onFocused: true}));
  }

  const passwordBlurHandler = (setPasswordState: React.Dispatch<React.SetStateAction<Password>>) => {
    setPasswordState((prev: Password) => ({...prev, onFocused: false}));
  }

  const valid = {
    isPasswordSameMessage: function() {
      return this.isPasswordSame() ? '' : NOT_SAME_PASSWORD_MESSAGE;
    },
    isPasswordSame: function() {
      if (!!password.value && !!passwordConfirm.value) {
        return password.value === passwordConfirm.value;
      }
      return true;
    },
    all: function() {
      if (!!!this.isPasswordSame()) {
        Alert(NOT_SAME_PASSWORD_MESSAGE);
        return false;
      }

      if (!password.isValid && !passwordConfirm.isValid) {
        Alert(PASSWORD_CONFIRM_MESSAGE);
        return false;
      }

      return true;
    }
  }

  const resetPasswordSubmit = () => {
    if (!!!valid.all()) return;

    if (email === null) return;
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password.value);

    $axios.post('/public/api/auth/resetPassword', formData, {isSkipError: true})
          .then(() => Alert({message: `비밀번호가 변경되었습니다.`, onClose: () => location.replace(authPath('/identifier'))}))
          .catch(() => AlertError({message: `비밀번호 변경 실패했습니다`, onClose: () => location.replace(authPath('/findPassword'))}));
  }
  
  return (
      <>
        <AppBarGoBack movePage={() => location.replace(authPath('/identifier'))}/>
        <Box sx={content}>
          <Box>
            <Typography variant="h3" sx={title}>
            변경할 비밀번호를<br/>입력해주세요.
            </Typography>
            <FormControl variant="outlined" fullWidth margin='normal'>
              <InputLabel htmlFor='password' color='warning'>변경 비밀번호</InputLabel>
              <OutlinedInput color="warning" id="password" type='password' label="변경 비밀번호" 
                onChange={(e) => passwordChangeHandler(e.target.value, setPassword)}
                onFocus={() => passwordFocusHandler(setPassword)}
                onBlur={() => passwordBlurHandler(setPassword)}
                error={!!password.value && !password.isValid}
              />
            </FormControl>
            {password.onFocused && <PasswordValidField passwordValue={password.value} setPasswordState={setPassword}/>}

            <FormControl variant="outlined" fullWidth margin='normal'>
              <InputLabel htmlFor='passwordConfirm' color='warning'>비밀번호 확인</InputLabel>
              <OutlinedInput color="warning" id="passwordConfirm" type='password' label="비밀번호 확인" 
                onChange={(e) => passwordChangeHandler(e.target.value, setPasswordConfirm)}
                onFocus={() => passwordFocusHandler(setPasswordConfirm)}
                onBlur={() => passwordBlurHandler(setPasswordConfirm)}
                error={!!passwordConfirm.value && !passwordConfirm.isValid}
              />
            </FormControl>
            <FormHelperText error>
              {valid.isPasswordSameMessage()}
            </FormHelperText>
            {passwordConfirm.onFocused && <PasswordValidField passwordValue={passwordConfirm.value} setPasswordState={setPasswordConfirm}/>}
          </Box>
          
          <Box>
            <Box>
              <Button fullWidth size='large' onClick={resetPasswordSubmit} color="warning" variant="contained" sx={btnSubmit}>비밀번호 변경</Button>
            </Box>
          </Box>
        </Box>
      </>
  );
}

export default ResetPassword;
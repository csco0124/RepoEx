import AppBarGoBack from "@/components/AppBarGoBack";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { $axios } from "@/configs/axiosConfig";
import { Box, Button, Card, CardActions, CardContent, FormControl, InputBase, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { content, title, btnSubmit } from './authStyle'
import React, { useEffect, useRef, useState } from "react";
import { authPath } from "@/routes/paths";
import { useAlert } from "@/hooks/useAlert";

const WebGradSidvPhone = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [phoneVerifyBtnMsg, setPhoneVerifyBtnMsg] = useState<string>('확인');
  const email = useRef<string>('');
  const [verificationCodeReady, setVerificationCodeReady] = useState<boolean>(false);
  const [verificationCodeError, setVerificationCodeError] = useState<boolean>(false);
  const identifier = JSON.parse(sessionStorage.getItem("identifier") || '{}');
  JSON.parse(sessionStorage.getItem("identifier") || '{}');
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const { Alert, AlertError } = useAlert();

  const alertError = (msg: string) => AlertError(msg);
  
  /** validation 체크 후 sendVerifyCode 호출 */
  const verifyBeforeSendingCode = () => {
    if (!phoneRegex.test(phone)) {
        setPhoneError(true);
    } else {
        email.current = identifier.email;
        sendVerifyCode();
    }
  }
  
  /** 인증번호 전송 */
  const sendVerifyCode = () => {
    const phoneData = new FormData();
    phoneData.append('phone', phone);
    phoneData.append('verificationCode', verificationCode);
    phoneData.append('email', email.current);
    
    $axios.post('/public/api/webgradsidvphone', phoneData)
    .then(res => {
        if (res.data.error === "PHONEUNAUTHORIZED") {
            // 이미 등록된 사용자 경고
            alertError(res.data.message);
            setPhoneError(true);
        }else if (res.data.error === 'OK') {
            setPhoneVerifyBtnMsg('재요청');
            setPhoneError(false);
            setVerificationCodeReady(true);
            console.log(res.data);
            sessionStorage.setItem("identifier", JSON.stringify(res.data.data));
        } else {
            alertError("오류발생");
            setPhoneError(true);
        }
    });
  }

  /** 인증번호를 통한 휴대폰 인증 */
  const verifyPhoneHandler = () => {
    const codeData = new FormData();
    codeData.append('phone', phone);
    codeData.append('verificationCode', verificationCode);
    codeData.append('email', email.current);

    $axios.post('/public/api/webgradsidvverify', codeData)
    .then(res => {
        if (res.data.error === 'OK') {
            setPhoneError(false);
            setVerificationCodeError(false);
            Alert({message: '회원가입이 완료되었습니다.', onClose:() => navigate(authPath('/identifier'))});
        } else {
            alertError("오류발생");
            setVerificationCodeError(true);
        }
    });
  }

  return (
    <React.Fragment>
            <AppBarGoBack/>
            <Box sx={ content }>
                <CardContent>
                    <Typography variant="h5" color="inherit" sx={title} gutterBottom>
                        휴대폰 인증을<br/>진행해 주세요.
                    </Typography>
                    <Box
                        sx={{ 
                            display: "flex",
                        }}
                    >
                        <TextField fullWidth label="휴대폰번호" variant="outlined" color="warning"
                            type='tel'
                            onChange={(e) => setPhone(e.target.value)} 
                            error={phoneError} 
                            helperText={phoneError ? "휴대폰번호를 확인해주세요." : ""}
                            sx={{ 
                                flex: 1 
                            }}
                        />
                        <Button size='large' 
                            onClick={verifyBeforeSendingCode} 
                            color="warning" variant="outlined"
                            sx={btnSubmit}
                        >
                            <strong>{phoneVerifyBtnMsg}</strong>
                        </Button>
                    </Box>
                {verificationCodeReady &&
                    <Box>
                        <TextField fullWidth label="인증번호" variant="outlined" color="warning" margin='normal'
                            type='text' 
                            onChange={(e) => setVerificationCode(e.target.value)}
                            error={verificationCodeError} 
                            helperText={verificationCodeError ? "인증번호를 확인해주세요." : ""}
                        />
                        <Button fullWidth sx={btnSubmit} size='large' onClick={() => verifyPhoneHandler()} color="warning" variant="contained"><strong>확인</strong></Button>
                    </Box>
                }
                </CardContent>
            </Box>
        </React.Fragment>
    );
}

export default WebGradSidvPhone;
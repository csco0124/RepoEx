import AppBarGoBack from "@/components/AppBarGoBack";
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { $axios } from "@/configs/axiosConfig";
import { Box, Button, Card, CardActions, CardContent, FormControl, InputBase, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { authPath } from "@/routes/paths";
import { useConfirm } from "@/hooks/useConfirm";
import { isNotEmpty } from "@/utils/validateUtil";
import { annonymousWebauthnSetting } from "@/auth/Webauthn";

const WebGradSidvPhone = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<boolean>(false);
  const [rrn, setRrn] = useState<string>('');
  const [rrnBackDigit, setRrnBackDigit] = useState<string>('');
  const [rrnError, setRrnError] = useState<boolean>(false);
  const [telecomVal, setTelecomVal] = useState<string>('KT');
  const [id, setId] = useState<string>('');//verifySocial의 id
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [phoneVerifyBtnMsg, setPhoneVerifyBtnMsg] = useState<string>('확인');
  const [verificationCodeReady, setVerificationCodeReady] = useState<boolean>(false);
  const [verificationCodeError, setVerificationCodeError] = useState<boolean>(false);
  const identifier = JSON.parse(sessionStorage.getItem("identifier") || '{}');
  const {Alert} = useAlert();
  const {Confirm} = useConfirm();
  JSON.parse(sessionStorage.getItem("identifier") || '{}');
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const {state} = useLocation();
  let registType = 'social';

  if(isNotEmpty(state)){
    registType = state;
  }

//   useEffect(() => {
//     if (identifier.email.indexOf('@') !== -1) {
//         setEmail(identifier);
//     }
//   }, [identifier, email]);

//   async function getEmail() {
//     // setEmail(email => identifier);
//     setEmail(email => "111");
//   };
  
  /** validation 체크 후 sendVerifyCode 호출 */
  const verifyBeforeSendingCode = () => {

    if (!phoneRegex.test(phone)) {
        setPhoneError(true);
		return;
    }
    
    if(nickname == null || nickname == ''){
        setNicknameError(true);
        return;
    }
    if(rrn == null || rrn == '' || rrn.length < 6){
        setRrnError(true);
        return;
    }
    if(rrnBackDigit == null || rrnBackDigit == '' || rrnBackDigit.length < 1){
        setRrnError(true);
        return;
    }

    sendVerifyCode();
  }
  
  /** 인증번호 전송 */
  const sendVerifyCode = () => {
    const phoneData = new FormData();
    phoneData.append('phone', phone);
    phoneData.append('nickname', nickname);
    phoneData.append('verificationCode', verificationCode);
    
    $axios.post(`/auth/api/${registType}/webgradsidvphone`, phoneData)
    .then(res => {
        if (res.data.error === 'OK') {
            setPhoneVerifyBtnMsg('재요청');
            setPhoneError(false);
            setNicknameError(false);
            setRrnError(false);
            setVerificationCodeReady(true);
            setId(res.data.data);
            console.log(res);
        } else {
            alert("오류발생");
            setNicknameError(true);
            setPhoneError(true);
        }
    });
  }

  /** 인증번호를 통한 휴대폰 인증 */
  const verifyPhoneHandler = () => {
    const codeData = new FormData();
    codeData.append('id', id);
    codeData.append('phone', phone);
    codeData.append('nickname', nickname);
    codeData.append('verificationCode', verificationCode);

    $axios.post(`/auth/api/${registType}/webgradsidvverify`, codeData)
    .then(res => {
        if (res.data.error === 'OK') {
            setPhoneError(false);
            setVerificationCodeError(false);
            const data = res.data.data;
            //secretKey는 로그인이 되지 않은 상태에서 간편인증 등록을 진행할 때 보안을 위해 필요(로그인 상태에서 간편인증 등록은 secret키가 필요없음)
            if(data.userId == null){
                //회원가입 confirm
                const obj = {
                    id: data.id, 
                    secretKey: data.secretKey,
                    registType: registType
                };
                Confirm({message: '계정을 찾을 수 없습니다. 회원가입을 진행하시겠습니까?', yesText: '예', noText: '아니오'
                    ,onConfirm: () => {
                        navigate("/user/auth/webcreateaccountsocial", {state: obj});
                    }
                    , onCancel: () => {
                        Confirm({message: '로그인 화면으로 이동합니다.', yesText: '예', noText: '아니오'
                            ,onConfirm:() => navigate("/user/auth/identifier")});
                    }
                });
            }else{
                if(registType == 'social'){
                    location.href = "/oauth2/authorization/" + data.socialName; //여기랑 위에 확인
                }
                if(registType == 'webauthn'){
                    const params = {
                        alert: Alert,
                        userId: data.userId,
                        callbackFn: () => {navigate('/user/auth')},
                        verifySocialId: id,
                        secretKey: data.secretKey
                    }

                    annonymousWebauthnSetting(params);
                }
            }
        } else {
            alert("오류발생");
            setVerificationCodeError(true);
        }
    });
  }

  const telecomChange = (event:SelectChangeEvent<string>, child:ReactNode) => {
    const value = event.target.value;
    setTelecomVal(value);
  }

  return (
    <React.Fragment>
            <AppBarGoBack/>
            <Card>
                <CardContent>
                    <Box sx={{
                        minWidth: 275, 
                        maxWidth: "75vw", 
                        textAlign: 'center', 
                        margin: 'auto', 
                        border:'none',
                        }}>
                        <Typography variant="h5" color="inherit" sx={{textAlign: 'left'}} gutterBottom>
                            회원 여부를 확인하기 위해 <br/>
                            휴대폰 인증을 진행해 주세요.
                        </Typography>

                        <TextField fullWidth label="이름" variant="outlined" color="warning" margin='normal'
                            type='text'
                            onChange={(e) => setNickname(e.target.value)} 
                            error={nicknameError} 
                            helperText={nicknameError ? "이름을 확인해주세요." : ""}
                        />
                        <Box sx={{width: 1, display: 'grid', gridTemplateColumns: '1fr 20px 1fr', verticalAlign: "middle" }}>
                            <TextField label="주민등록번호" variant="outlined" color="warning" margin='normal'
                                inputProps={{maxLength: 6}}
                                type='text'
                                onChange={(e) => setRrn(e.target.value)} 
                                error={rrnError} 
                                helperText={rrnError ? "주민등록번호를 확인해주세요." : ""}
                            />
                            <Box sx={{position: "relative"}}><Typography sx={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>-</Typography></Box>
                            <TextField label="뒷자리" variant="outlined" color="warning" margin='normal'
                                inputProps={{maxLength: 1}}
                                type='text'
                                onChange={(e) => setRrnBackDigit(e.target.value)} 
                                error={rrnError} 
                                helperText={rrnError ? "주민등록번호를 확인해주세요." : ""}
                            />
                        </Box>
                        <Box>
                            <Select fullWidth id="telecomSelect" name="telecomSelect" onChange={telecomChange} value={telecomVal} label="통신사">{/* onchange생성해야함 */}
                                <MenuItem key='1' value='KT'>KT</MenuItem>
                                <MenuItem key='2' value='SK'>SK</MenuItem>
                                <MenuItem key='3' value='LG'>LG U+</MenuItem>
                            </Select>
                        </Box>
                        <TextField fullWidth label="휴대폰번호" variant="outlined" color="warning" margin='normal'
                            type='tel'
                            onChange={(e) => setPhone(e.target.value)} 
                            error={phoneError}
                            helperText={phoneError ? "휴대폰번호를 확인해주세요." : ""}
                        />
                        <Button size='large' 
                        onClick={verifyBeforeSendingCode} 
                        // onClick={() => sendVerifyCode()} 
                        color="warning" variant="outlined">
                            <strong>{phoneVerifyBtnMsg}</strong>
                        </Button>
                    </Box>
                </CardContent>
                {verificationCodeReady &&
                <CardContent sx={{ minWidth: 275, maxWidth: "75vw", textAlign: 'center', margin: 'auto', border:'none'}}>
                    <Box>
                        <TextField fullWidth label="인증번호" variant="outlined" color="warning" margin='normal'
                            type='text' 
                            onChange={(e) => setVerificationCode(e.target.value)}
                            error={verificationCodeError} 
                            helperText={verificationCodeError ? "인증번호를 확인해주세요." : ""}
                        />
                        <CardActions>
                            <Button fullWidth size='large' onClick={() => verifyPhoneHandler()} color="warning" variant="contained"><strong>확인</strong></Button>
                        </CardActions>
                    </Box>
                </CardContent>
                }
            </Card>
        </React.Fragment>
    );
}

export default WebGradSidvPhone;
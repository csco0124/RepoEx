import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'
// import $api from "../../utils/commonAxios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AppBarGoBack from '../../components/AppBarGoBack';
import { FormControl, InputLabel, OutlinedInput, Typography, useFormControl } from '@mui/material';
import { content, title, btnSubmit } from './authStyle'
import { $axios } from '@/configs/axiosConfig';
import { useAlert } from '@/hooks/useAlert';
import { authPath } from '@/routes/paths';
import { annonymousWebauthnSetting, registWebauthnSetting } from '@/auth/Webauthn';
import { isEmpty, isNotEmpty } from '@/utils/commonUtil';

const WebCreateAccount = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('이름을 확인해주세요.');
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('이메일을 확인해주세요.');
    const [using2FA, setUsing2FA] = useState<string>('false');
    const [focusedPw , setFocusedPw] = useState<boolean>();
    const [webauthnUserId, setWebauthnUserId] = useState<string>('');
    const [nextBtnOpen, setNextBtnOpen] = useState<boolean>(true);
    
    const { Alert, AlertError } = useAlert();
    const verifyId = loc.state.id;
    const registType = loc.state.registType;

    const alertErrorSample = (msg: string) => AlertError(msg);

    /** 모든 에러체크 및 메시지 리셋 */
    const resetAllErrors = () => {
        setUsernameError(false);
        setUsernameErrorMessage('');
        setEmailError(false);
        setEmailErrorMessage('');
    }


    const webCreateInit = () => {
        $axios.get(`/auth/api/verify-social/${verifyId}`).then((res) => {
            if(res.data.error != "OK"){
                return;
            }
            const data = res.data.data;
            console.log(data);
            setUsername(data.nickname);
            if(isNotEmpty(data.email)){
                setEmail(data.email);
            }
        });
    }
    useEffect(() => {
        webCreateInit();
    }, [])


    /** 회원가입 전 모든 데이터 검증하는 단계 */
    const signUpHandler = () => {
        resetAllErrors();

        const nameRegex = /^[ㄱ-ㅎ|가-힣]+$/;
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

		if (!nameRegex.test(username)) {
            alertErrorSample('이름은 한글만 가능합니다.');
			// alert('이름은 한글만 가능합니다.');
			return;
		}

        if (!emailRegEx.test(email)) {
			alert('이메일 양식을 확인해주세요.');
			return;
		}

        webCreateAccount();
    }

    /** 비밀번호 검증 창 보이기 설정이었으나 console창 에러 확인하여 수정 */
    // function HandleValidator() {
    //     const { focused } = useFormControl() ?? {};
    //     (focused) ? setFocusedPw(true) : setFocusedPw(false);
    //     //     setFocusedPw(true);
    //     // } else {
    //     //     setFocusedPw(false);
    //     // }
    //     return ""
    // }

    /** 회원가입 api 호출 */
    const webCreateAccount = () => {

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('using2FA', using2FA);

        $axios.post(`/auth/api/${registType}/webcreateaccount/${verifyId}`, formData)
        .then(res => {
            console.log(res.data);
            if (res.data.error === 'OK') {
                const verifyInfo = res.data.data;
                sessionStorage.setItem("identifier", JSON.stringify(res.data.data));
                if(registType == 'webauthn'){
                    Alert({message: '회원가입이 완료되었습니다. 생체인증을 등록해주세요.', onClose:() => {
                        sendWebauthn(verifyInfo.userId, verifyId);
                        setWebauthnUserId(verifyInfo.userId);
                        setNextBtnOpen(false);
                    }});
                }

                if(registType == 'social'){
                    Alert({message: '회원가입이 완료되었습니다.', onClose:() => {
                        location.href = '/oauth2/authorization/' + verifyInfo.socialName;
                    }});
                }
                    
            } else {
                if (res.data.error == "USERALREADYEXIST") {
                    // 이미 등록된 사용자 경고
                    setEmailError(true);
                    setEmailErrorMessage(res.data.message);
                }
                
                if (res.data.paramErrors) {
                    const usernameError = res.data.paramErrors.find((err: { field: string; }) => (err.field === "username"));
                    if (usernameError) {
                        // 이름 에러 화면에 표시하는 부분
                        setUsernameError(true);
                        setUsernameErrorMessage(res.data.message);
                    }

                    const emailError = res.data.paramErrors.find((err: { field: string; }) => (err.field === "email"));
                    if (emailError) {
                        // 이메일 에러 화면에 표시하는 부분
                        setEmailError(true);
                        setEmailErrorMessage(res.data.message);
                    }
                }
            }
        });
	}

    function sendWebauthn(userId:string, verifyId:any){
        const params = {
            alert: Alert,
            userId: userId,
            callbackFn: () => {navigate('/user/auth')},
            verifySocialId: verifyId,
            secretKey: loc.state.secretKey
        }
        annonymousWebauthnSetting(params);
    }
    
    return (
        // <Container maxWidth={false}
        //     sx={{
        //         overflowY: "auto",
        //         // position: "relative"
        //     }}
        // >
        <React.Fragment>
            <AppBarGoBack/>
            <Box sx={content}>
                <Box>
                    <Typography variant="h3" sx={title}>
                        회원가입 정보를<br/>입력해주세요.
                    </Typography>
                    <TextField fullWidth label="이름" variant="outlined" color="warning" margin='normal'
                        type='name' 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                        error={usernameError} 
                        helperText={usernameError ? usernameErrorMessage : ""}
                    />
                    <TextField fullWidth label="이메일" variant="outlined" color="warning" margin='normal'
                        type='email' 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        error={emailError} 
                        helperText={emailError ? emailErrorMessage : ""}
                    />
                    {focusedPw &&
                        <Card
                            sx={{
                                maxWidth: "280px",
                                position: 'absolute',
                                zIndex: '10',
                            }}
                        >
                            <CardContent 
                                sx={{
                                    backgroundColor: "#2EAC74",
                                    color: "white",
                                    fontSize: "13px",
                                    textAlign: "left"
                                }}
                            >
                                최소 8자 이상, 소문자, 대문자, 특수문자 반드시 포함
                            </CardContent>
                        </Card>
                    }

                    {/* <input type="hidden" id="using2FA" name="using2FA" value="false" /> */}
                </Box>
                <Box>
                    {nextBtnOpen &&
                        <Box>
                            <Button fullWidth size='large' onClick={() => signUpHandler()} color="warning" variant="contained" sx={btnSubmit}>다음</Button>
                        </Box>
                    }
                    {registType == 'webauthn' && isNotEmpty(webauthnUserId) && 
                        <Box>
                            <Button fullWidth size='medium' onClick={() => sendWebauthn(webauthnUserId, verifyId)} color="warning" variant="contained" sx={btnSubmit}>간편인증 재전송</Button>
                        </Box>
                    }
                </Box>
            </Box>
        {/* </Container> */}
        </React.Fragment>
    );
}

export default WebCreateAccount;
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import PasswordChecklist from "react-password-checklist";
import AppBarGoBack from '../../components/AppBarGoBack';
import { FormControl, InputLabel, OutlinedInput, Typography, useFormControl } from '@mui/material';
import { content, title, btnSubmit } from './authStyle'
import { $axios } from '@/configs/axiosConfig';
import { useAlert } from '@/hooks/useAlert';
import { authPath } from '@/routes/paths';


const WebCreateAccount = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('이름을 확인해주세요.');
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('이메일을 확인해주세요.');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('비밀번호를 확인해주세요.');
    const [using2FA, setUsing2FA] = useState<string>('false');
    const [pwCheckVal, setPwCheckVal] = useState<boolean>(false);
    const [focusedPw , setFocusedPw] = useState<boolean>();
    const { AlertError } = useAlert();

    const alertError = (msg: string) => AlertError(msg);

    /** 모든 에러체크 및 메시지 리셋 */
    const resetAllErrors = () => {
        setUsernameError(false);
        setUsernameErrorMessage('');
        setEmailError(false);
        setEmailErrorMessage('');
        setPasswordError(false);
        setPasswordErrorMessage('');
    }

    /** 회원가입 전 모든 데이터 검증하는 단계 */
    const signUpHandler = () => {
        resetAllErrors();

        const nameRegex = /^[ㄱ-ㅎ|가-힣]+$/;
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

		if (!nameRegex.test(username)) {
            alertError('이름은 한글만 가능합니다.');
			return;
		}

        if (!emailRegEx.test(email)) {	
			alertError('이메일 양식을 확인해주세요.');
			return;
		}

        if (!pwCheckVal) {
			alertError('비밀번호를 확인해주세요.');
			return;
		}

        webCreateAccount();
    }

    /** 회원가입 api 호출 */
    const webCreateAccount = () => {

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('using2FA', using2FA);

        $axios.post('/public/api/webcreateaccount', formData)
        .then(res => {
            console.log(res.data);
            if (res.data.error === 'OK') {
                sessionStorage.setItem("identifier", JSON.stringify(res.data.data));
                navigate(authPath('/webgradsidvphone'));
            } else {
                if (res.data.error == "USERALREADYEXIST") {
                    // 이미 등록된 사용자 경고
                    setEmailError(true);
                    setEmailErrorMessage(res.data.message);
                }

                if (res.data.error === "PHONEUNAUTHORIZED") {
                    // 사용자 저장은 하였으나 핸드폰 인증이 이루어지지 않았을 때
                    if (confirm(res.data.message)) {
                        sessionStorage.setItem("identifier", JSON.stringify(email));
                        location.href = authPath("/webgradsidvphone");
                    }
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

                    const passwordError = res.data.paramErrors.find((err: { field: string; }) => (err.field === "password"));
                    if (passwordError) {
                        // 비밀번호 에러 화면에 표시하는부분
                        setPasswordError(true);
                        setPasswordErrorMessage(res.data.message);
                    }
                }
            }
        });
	}

    return (
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
                        error={usernameError} 
                        helperText={usernameError ? usernameErrorMessage : ""}
                    />
                    <TextField fullWidth label="이메일" variant="outlined" color="warning" margin='normal'
                        type='email' 
                        onChange={(e) => {setEmail(e.target.value);setEmailError(false);}}
                        error={emailError} 
                        helperText={emailError ? emailErrorMessage : ""}
                    />
                    <FormControl variant="outlined" fullWidth margin='normal'>
                        <InputLabel htmlFor='password' color='warning'>비밀번호</InputLabel>
                        {/** MUI의 TextField에는 onChange 속성만 있지만 OutlinedInput에는 기존 input의 속성을 가지고 있는듯 */}
                        <OutlinedInput color="warning" id="password" type='password' label="비밀번호" onChange={(e) => {setPassword(e.target.value);setPasswordError(false);}}
                        onFocus={() => setFocusedPw(true)}
                        onBlur={() => setFocusedPw(false)}
                        error={passwordError}
                        />
                    </FormControl>
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
                            <CardContent>
                                <PasswordChecklist
                                    style={{
                                        fontSize: "14px",
                                        textAlign: "left",
                                        backgroundColor: "transparent"
                                    }}
                                    rules = {[
                                        "minLength",    
                                        "lowercase",
                                        "capital",
                                        "number",
                                        "specialChar",
                                    ]}
                                    minLength = {8}
                                    value = {password}
                                    messages = {{
                                        minLength: "비밀번호 길이",
                                        lowercase: "소문자",
                                        capital: "대문자",
                                        number: "숫자",
                                        specialChar: "특수문자",
                                    }}
                                    // iconSize = {10}
                                    iconComponents = {{
                                        ValidIcon: <CircleIcon sx={{ color: "#2EAC74" }}/>, 
                                        InvalidIcon: <CircleOutlinedIcon sx={{ color: "#2EAC74" }}/>
                                    }}
                                    onChange = {(isValid) => {
                                        setPwCheckVal(isValid);
                                    }}
                                />
                            </CardContent>
                        </Card>
                    }

                    {/* <input type="hidden" id="using2FA" name="using2FA" value="false" /> */}
                </Box>
                <Box>
                    <Box>
                        <Button fullWidth size='large' onClick={() => signUpHandler()} color="warning" variant="contained" sx={btnSubmit}>다음</Button>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default WebCreateAccount;
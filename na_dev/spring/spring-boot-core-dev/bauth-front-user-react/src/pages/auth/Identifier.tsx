import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Stack, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { isLocal, isProd, isDev, getUrlParam, isEmpty } from '@/utils/commonUtil';
import { mainStyle, logo, buttonStyle } from '@pages/auth/authStyle';
import NaruLogo from '@assets/images/logo.svg';
import EmailIcon from '@assets/images/icon/email-icon.svg';
import PinIcon from '@assets/images/icon/pin-icon.svg';
import KakaoIcon from '@assets/images/icon/kakao-icon.svg';
import NaverIcon from '@assets/images/icon/naver-icon.svg';
import GoogleIcon from '@assets/images/icon/google-icon.svg';
import FingerIcon from '@assets/images/icon/finger-icon.svg';
import { MainLoginButton } from '@components/MainLoginButton';
import { authPath } from '@routes/paths';
import { $axios } from '@/configs/axiosConfig';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAlert } from '@/hooks/useAlert';
import { registWebauthn, webAuthnLogin } from '@/auth/Webauthn';
import { useConfirm } from '@/hooks/useConfirm';

const Identifier = () => {
  
  const navigate = useNavigate();
  const {Confirm} = useConfirm();
  const {Alert} = useAlert();
	const clientId = getUrlParam('clientId');
  const  [redirectInfo, setRedirectInfo] = useState<any>();
  const [logoImg, setLogoImg] = useState<string>(NaruLogo);
  const [rememberMe, setRememberMe] = useState('');

  const [emailUseStatus, setEmailUseStatus] = useState(null); // email 로그인 수단 사용 여부
  const [authUseStatus, setAuthUseStatus] = useState(null); // 간편(생체)인증 로그인 수단 사용 여부
  const [kakaoUseStatus, setKakaoUseStatus] = useState(null); // kakao 로그인 수단 사용 여부
  const [naverUseStatus, setNaverUseStatus] = useState(null); // naver 로그인 수단 사용 여부
  const [googleUseStatus, setGoogleUseStatus] = useState(null); // google 로그인 수단 사용 여부

  useEffect(() => {
    socialAuthFailCheck();
  },[]);

  const socialAuthFailCheck = () => {
    const error = getUrlParam('error');
		if (error === 'USERNOTFOUND') {
			Alert({
        message: `등록 된 유저정보 가 없습니다.
        소셜 로그인을 사용하시려면
        먼저 이메일로 로그인 후
        소셜 로그인 등록 페이지에서
        등록해주시기 바랍니다.`,
        onClose: () => location.replace(authPath('/identifier'))
      });
		}

		if (error === 'FORBIDDEN') {
			Alert({
        message:`해당 소셜 계정에 등록된
        사용자가 너무 많습니다.
        소셜 로그인 이용이 불가합니다 
        관리자에게 문의해주세요.
        서비스를 이용하시려면 
        이메일 로그인을 이용해 주세요.`,
        onClose: () => location.replace(authPath('/identifier'))
      });
  	}
  }
  
  async function setClientInfo(){
		await $axios.get(`/public/api/client/redirect-info?clientId=${clientId}`).then((result) => {
				const data = result.data.data;
				
				if(result.data.error != 'OK'){
					Alert(result.data.message);
					return;
				}
				
				if(data == null){
					return;
				}
				
				console.log(data);
				
				setRedirectInfo(data);
        if(!isEmpty(data.logoUri)){
          setLogoImage(data.logoUri);
        }
    });
	}

  async function setLogoImage(logoUri:string){
    await $axios.get(`/public/api/get-image?imagename=${logoUri}`).then((result) => {
      if(!(isEmpty(result))){
        console.log(result);
        if(!isEmpty(result.data)){
          setLogoImg(`data:image/*;base64,${result.data}`);
        }
      }
    });
  }

  useEffect(() => {
    if(isEmpty(clientId)){
      return;
    }
    setClientInfo();
  }, [])

  function socialClick(social:string){
    let url = '/public/api/social/login/' + social;

    if(isEmpty(social)){
      console.log('parameter social is null');
      return;
    }
    if(rememberMe != ''){
      url += '?rememberMe=on';
    }
    console.log(url);
    location.href = url;
  }

  function registConfirm(){
    Confirm({message: '간편인증 정보가 없습니다. 등록하시겠습니까?', yesText: '예', noText: '아니오'
      ,onConfirm: () => {
        navigate("/user/auth/webgradsidvphonesocial", {state: 'webauthn'});
      }
    });
  }

  const backBtnClick = () => {
    console.log(redirectInfo.baseUrl + redirectInfo.homeUri);
    location.href = redirectInfo.baseUrl + redirectInfo.homeUri;
  }

  useEffect(() => {
    loginMethodGet();
  }, [])

  const loginMethodGet = async () => {
    let res = await $axios.get('/cmm/config/login');
    let resData = res.data.data
    let configValue = JSON.parse(resData.configValue);
    setEmailUseStatus(configValue.email);
    setAuthUseStatus(configValue.webauthn);
    setKakaoUseStatus(configValue.kakao);
    setNaverUseStatus(configValue.naver);
    setGoogleUseStatus(configValue.google);
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
    <Stack sx={mainStyle}>
      <Typography variant="h1" sx={{
        marginBlock: 0,
        marginBottom: '5px',
        display: 'flex',
        width: 200,
        height: 200,
        fontSize: 0,
        alignItems: 'center',
      }}>
        <img src={logoImg} alt="Logo Image" width={'100%'}/>
      </Typography>
      <Stack sx={buttonStyle}>
        {emailUseStatus? (<MainLoginButton component={RouterLink} to={authPath('/identifierByEmail')}>
          <Box>
            <img src={EmailIcon} alt="Email Icon" />
          </Box>
          <Box>
            이메일 로그인
          </Box>
        </MainLoginButton>) : ''}
        {authUseStatus? (<MainLoginButton onClick={() => webAuthnLogin(registConfirm, rememberMe)}>
          <Box>
            <img src={PinIcon} alt="Pin Icon" />
          </Box>
          <Box>
            간편인증 로그인
          </Box>
        </MainLoginButton>) : ''}
        {kakaoUseStatus? (<MainLoginButton onClick={() => socialClick('kakao')}>
          <Box>
            <img src={KakaoIcon} alt="Kakao Icon" />
          </Box>
          <Box>
          카카오 로그인
          </Box>
        </MainLoginButton>) : ''}
        {naverUseStatus? (<MainLoginButton onClick={() => socialClick('naver')}>
          <Box>
            <img src={NaverIcon} alt="Naver Icon" />
          </Box>
          <Box>
            네이버 로그인
          </Box>
        </MainLoginButton>) : ''}
        {googleUseStatus? (<MainLoginButton onClick={() => socialClick('google')}>
          <Box>
            <img src={GoogleIcon} alt="Google Icon" />
          </Box>
          <Box>
            구글 로그인
          </Box>
        </MainLoginButton>) : ''}
        
        <MainLoginButton component={RouterLink} to={authPath('/WebCreateAccount')}>
          <Box>
            <img src={FingerIcon} alt="Account Icon" />
          </Box>
          <Box>
            회원가입
          </Box>
        </MainLoginButton>        
        {!isProd() && (
          <MainLoginButton component={RouterLink} to={authPath('/sample')}>
            UI 공통 샘플페이지
          </MainLoginButton>
        )}
        {!isEmpty(redirectInfo) && !isEmpty(redirectInfo.homeUri) && (
          <MainLoginButton onClick={backBtnClick}>
            돌아가기
          </MainLoginButton>
        )}
        
        <FormControlLabel
          control={<Checkbox sx={{width: 25, height: 25}} onChange={e => rememberMeChange(e)}/>}
          label={<Typography sx={{fontSize: '12px'}}>자동 로그인</Typography>}
          labelPlacement="start"
          sx={{margin: '0 auto 0 0'}}
        />
      </Stack>
    </Stack>
  );
}

export default Identifier;
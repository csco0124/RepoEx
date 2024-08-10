import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';
import { isLocal, isProd, isDev} from '@/utils/commonUtil';
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
import { title } from '@pages/auth/authStyle'

const AuthenticatedHome = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack sx={mainStyle}>
        <Typography variant="h1" sx={logo}>
          <img src={NaruLogo} alt="Naru Logo" />
        </Typography>
        <Typography variant="h3" sx={title}>
          나루아이에 오신 것을 환영합니다.
        </Typography>
      </Stack> 
    </Box>
  );
}

export default AuthenticatedHome;
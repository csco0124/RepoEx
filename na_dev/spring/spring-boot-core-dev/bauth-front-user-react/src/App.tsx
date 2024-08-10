
import { HelmetProvider } from 'react-helmet-async';
// https://docs.minimals.cc/authentication/js-version
import { AuthProvider } from '@auth/AuthContext';
import { UIContextProvider } from '@routes/UiContext';
import { CssBaseline } from '@mui/material'
import { LoadingScreenInterceptor } from '@configs/axiosConfig';
import useScreenHeight from '@hooks/useScreenHeight'; // 화면 높이 조절
import Routes from '@routes/index';

function App() {
  
  useScreenHeight();
  
  return (
    <AuthProvider>
      <CssBaseline />
      <LoadingScreenInterceptor /> {/* axios loading interceptor */}
      <HelmetProvider>
        <UIContextProvider>
          <Routes />
        </UIContextProvider>
      </HelmetProvider>
    </AuthProvider>
  )
}

export default App
